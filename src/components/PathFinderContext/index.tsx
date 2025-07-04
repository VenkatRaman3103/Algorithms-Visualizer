import { createContext, ReactNode, useContext, useEffect, useState, useRef } from 'react'
import { Cell, PathfinderContextType } from '../types'

const PathfinderContext = createContext<PathfinderContextType | undefined>(undefined)

export const usePathfinder = () => {
	const context = useContext(PathfinderContext)
	if (!context) {
		throw new Error('usePathfinder must be used within a PathfinderProvider')
	}
	return context
}

export const PathfinderProvider = ({ children }: { children: ReactNode }) => {
	const [grid, setGrid] = useState<Cell[][]>([])
	const [isRunning, setIsRunning] = useState(false)
	const [speed, setSpeed] = useState(50)
	const [currentAlgorithm, setCurrentAlgorithm] = useState<string>('')
	const [gridSize, setGridSize] = useState({ rows: 20, cols: 40 })
	const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null)
	const [endCell, setEndCell] = useState<{ row: number; col: number } | null>(null)
	const [isPlacing, setIsPlacing] = useState<'start' | 'end' | 'wall' | null>(null)
	const [mousePressed, setMousePressed] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)
	const [totalSteps, setTotalSteps] = useState(0)
	const [pathFound, setPathFound] = useState(false)

	const gridRef = useRef<Cell[][]>([])

	useEffect(() => {
		gridRef.current = grid
	}, [grid])

	const createCell = (row: number, col: number): Cell => ({
		row,
		col,
		type: 'empty',
		isVisited: false,
		isPath: false,
		distance: Infinity,
		previousCell: null,
		f: 0,
		g: 0,
		h: 0,
	})

	const initializeGrid = () => {
		const newGrid: Cell[][] = []
		for (let row = 0; row < gridSize.rows; row++) {
			const currentRow: Cell[] = []
			for (let col = 0; col < gridSize.cols; col++) {
				currentRow.push(createCell(row, col))
			}
			newGrid.push(currentRow)
		}

		const startRow = Math.floor(gridSize.rows / 2)
		const startCol = Math.floor(gridSize.cols / 4)
		const endRow = Math.floor(gridSize.rows / 2)
		const endCol = Math.floor((gridSize.cols * 3) / 4)

		newGrid[startRow][startCol].type = 'start'
		newGrid[endRow][endCol].type = 'end'

		setGrid(newGrid)
		setStartCell({ row: startRow, col: startCol })
		setEndCell({ row: endRow, col: endCol })
		setPathFound(false)
		setCurrentStep(0)
		setTotalSteps(0)
	}

	const clearGrid = () => {
		setGrid((prev) =>
			prev.map((row) =>
				row.map((cell) => ({
					...cell,
					type: cell.type === 'start' || cell.type === 'end' ? cell.type : 'empty',
					isVisited: false,
					isPath: false,
					distance: Infinity,
					previousCell: null,
					f: 0,
					g: 0,
					h: 0,
				})),
			),
		)
		setPathFound(false)
		setCurrentStep(0)
		setTotalSteps(0)
		setCurrentAlgorithm('')
	}

	const clearPath = () => {
		setGrid((prev) =>
			prev.map((row) =>
				row.map((cell) => ({
					...cell,
					isVisited: false,
					isPath: false,
					distance: Infinity,
					previousCell: null,
					f: 0,
					g: 0,
					h: 0,
				})),
			),
		)
		setPathFound(false)
		setCurrentStep(0)
		setTotalSteps(0)
	}

	const handleCellClick = (row: number, col: number) => {
		if (isRunning) return

		setGrid((prev) => {
			const newGrid = [...prev]
			const cell = newGrid[row][col]

			if (isPlacing === 'start') {
				if (cell.type !== 'end') {
					// Clear previous start
					if (startCell) {
						newGrid[startCell.row][startCell.col].type = 'empty'
					}
					cell.type = 'start'
					setStartCell({ row, col })
				}
			} else if (isPlacing === 'end') {
				if (cell.type !== 'start') {
					// Clear previous end
					if (endCell) {
						newGrid[endCell.row][endCell.col].type = 'empty'
					}
					cell.type = 'end'
					setEndCell({ row, col })
				}
			} else if (isPlacing === 'wall') {
				if (cell.type === 'empty') {
					cell.type = 'wall'
				} else if (cell.type === 'wall') {
					cell.type = 'empty'
				}
			}

			return newGrid
		})
	}

	const handleCellMouseEnter = (row: number, col: number) => {
		if (!mousePressed || isRunning) return

		if (isPlacing === 'wall') {
			setGrid((prev) => {
				const newGrid = [...prev]
				const cell = newGrid[row][col]
				if (cell.type === 'empty') {
					cell.type = 'wall'
				}
				return newGrid
			})
		}
	}

	const handleCellMouseDown = (row: number, col: number) => {
		setMousePressed(true)
		handleCellClick(row, col)
	}

	const handleCellMouseUp = () => {
		setMousePressed(false)
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	const getNeighbors = (cell: Cell, currentGrid: Cell[][]): Cell[] => {
		const neighbors: Cell[] = []
		const { row, col } = cell

		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]

		for (const [dRow, dCol] of directions) {
			const newRow = row + dRow
			const newCol = col + dCol

			if (
				newRow >= 0 &&
				newRow < currentGrid.length &&
				newCol >= 0 &&
				newCol < currentGrid[0].length
			) {
				neighbors.push(currentGrid[newRow][newCol])
			}
		}

		return neighbors
	}

	const reconstructPath = (endCell: Cell): Cell[] => {
		const path: Cell[] = []
		let current: Cell | null = endCell

		while (current) {
			path.unshift(current)
			current = current.previousCell
		}

		return path
	}

	const animatePath = async (path: Cell[]) => {
		for (let i = 1; i < path.length - 1; i++) {
			setGrid((prev) => {
				const newGrid = prev.map((row) => [...row])
				newGrid[path[i].row][path[i].col] = {
					...newGrid[path[i].row][path[i].col],
					isPath: true,
				}
				return newGrid
			})
			await sleep(Math.max(speed * 2, 50))
		}
		setPathFound(true)
	}

	// Dijkstra's Algorithm
	const dijkstra = async () => {
		if (!startCell || !endCell) return

		setIsRunning(true)
		setCurrentAlgorithm('Dijkstra')
		setPathFound(false)
		setCurrentStep(0)

		setGrid((prev) =>
			prev.map((row) =>
				row.map((cell) => ({
					...cell,
					isVisited: false,
					isPath: false,
					distance: cell.type === 'start' ? 0 : Infinity,
					previousCell: null,
				})),
			),
		)

		await sleep(10)

		const unvisited: Cell[] = []

		const workingGrid = gridRef.current.map((row) =>
			row.map((cell) => ({
				...cell,
				distance: cell.type === 'start' ? 0 : Infinity,
				previousCell: null,
			})),
		)

		for (let row = 0; row < workingGrid.length; row++) {
			for (let col = 0; col < workingGrid[row].length; col++) {
				unvisited.push(workingGrid[row][col])
			}
		}

		let stepCount = 0
		setTotalSteps(gridSize.rows * gridSize.cols)

		while (unvisited.length > 0) {
			unvisited.sort((a, b) => a.distance - b.distance)
			const current = unvisited.shift()!

			if (current.distance === Infinity) break
			if (current.type === 'wall') continue

			setCurrentStep(stepCount++)

			setGrid((prev) => {
				const newGrid = prev.map((row) => [...row])
				newGrid[current.row][current.col] = {
					...newGrid[current.row][current.col],
					isVisited: true,
				}
				return newGrid
			})

			await sleep(speed)

			if (current.type === 'end') {
				const path = reconstructPath(current)
				await animatePath(path)
				setIsRunning(false)
				return
			}

			const neighbors = getNeighbors(current, workingGrid)
			for (const neighbor of neighbors) {
				if (!neighbor.isVisited && neighbor.type !== 'wall') {
					const tentativeDistance = current.distance + 1
					if (tentativeDistance < neighbor.distance) {
						neighbor.distance = tentativeDistance
						neighbor.previousCell = current
					}
				}
			}
		}

		setIsRunning(false)
	}

	// A* Algorithm
	const aStar = async () => {
		if (!startCell || !endCell) return

		setIsRunning(true)
		setCurrentAlgorithm('A*')
		setPathFound(false)
		setCurrentStep(0)

		setGrid((prev) =>
			prev.map((row) =>
				row.map((cell) => ({
					...cell,
					isVisited: false,
					isPath: false,
					f: 0,
					g: 0,
					h: 0,
					previousCell: null,
				})),
			),
		)

		await sleep(10)

		const openSet: Cell[] = []
		const closedSet: Cell[] = []

		const workingGrid = gridRef.current.map((row) => row.map((cell) => ({ ...cell })))
		const start = workingGrid[startCell.row][startCell.col]
		const end = workingGrid[endCell.row][endCell.col]

		start.g = 0
		start.h = Math.abs(start.row - end.row) + Math.abs(start.col - end.col)
		start.f = start.g + start.h

		openSet.push(start)

		let stepCount = 0
		setTotalSteps(gridSize.rows * gridSize.cols)

		while (openSet.length > 0) {
			let current = openSet[0]
			for (let i = 1; i < openSet.length; i++) {
				if (openSet[i].f < current.f) {
					current = openSet[i]
				}
			}

			openSet.splice(openSet.indexOf(current), 1)
			closedSet.push(current)

			setCurrentStep(stepCount++)

			setGrid((prev) => {
				const newGrid = prev.map((row) => [...row])
				newGrid[current.row][current.col] = {
					...newGrid[current.row][current.col],
					isVisited: true,
				}
				return newGrid
			})

			await sleep(speed)

			if (current.type === 'end') {
				const path = reconstructPath(current)
				await animatePath(path)
				setIsRunning(false)
				return
			}

			const neighbors = getNeighbors(current, workingGrid)
			for (const neighbor of neighbors) {
				if (closedSet.includes(neighbor) || neighbor.type === 'wall') continue

				const tentativeG = current.g + 1

				if (!openSet.includes(neighbor)) {
					openSet.push(neighbor)
				} else if (tentativeG >= neighbor.g) {
					continue
				}

				neighbor.previousCell = current
				neighbor.g = tentativeG
				neighbor.h =
					Math.abs(neighbor.row - endCell.row) + Math.abs(neighbor.col - endCell.col)
				neighbor.f = neighbor.g + neighbor.h
			}
		}

		setIsRunning(false)
	}

	// Breadth-First Search
	const bfs = async () => {
		if (!startCell || !endCell) return

		setIsRunning(true)
		setCurrentAlgorithm('BFS')
		setPathFound(false)
		setCurrentStep(0)

		setGrid((prev) =>
			prev.map((row) =>
				row.map((cell) => ({
					...cell,
					isVisited: false,
					isPath: false,
					previousCell: null,
				})),
			),
		)

		await sleep(10)

		const queue: Cell[] = []
		const visited = new Set<string>()

		const workingGrid = gridRef.current.map((row) => row.map((cell) => ({ ...cell })))
		const start = workingGrid[startCell.row][startCell.col]
		queue.push(start)
		visited.add(`${start.row}-${start.col}`)

		let stepCount = 0
		setTotalSteps(gridSize.rows * gridSize.cols)

		while (queue.length > 0) {
			const current = queue.shift()!

			setCurrentStep(stepCount++)

			setGrid((prev) => {
				const newGrid = prev.map((row) => [...row])
				newGrid[current.row][current.col] = {
					...newGrid[current.row][current.col],
					isVisited: true,
				}
				return newGrid
			})

			await sleep(speed)

			if (current.type === 'end') {
				const path = reconstructPath(current)
				await animatePath(path)
				setIsRunning(false)
				return
			}

			const neighbors = getNeighbors(current, workingGrid)
			for (const neighbor of neighbors) {
				const key = `${neighbor.row}-${neighbor.col}`
				if (!visited.has(key) && neighbor.type !== 'wall') {
					visited.add(key)
					neighbor.previousCell = current
					queue.push(neighbor)
				}
			}
		}

		setIsRunning(false)
	}

	// Depth-First Search
	const dfs = async () => {
		if (!startCell || !endCell) return

		setIsRunning(true)
		setCurrentAlgorithm('DFS')
		setPathFound(false)
		setCurrentStep(0)

		setGrid((prev) =>
			prev.map((row) =>
				row.map((cell) => ({
					...cell,
					isVisited: false,
					isPath: false,
					previousCell: null,
				})),
			),
		)

		await sleep(10)

		const stack: Cell[] = []
		const visited = new Set<string>()

		const workingGrid = gridRef.current.map((row) => row.map((cell) => ({ ...cell })))
		const start = workingGrid[startCell.row][startCell.col]
		stack.push(start)

		let stepCount = 0
		setTotalSteps(gridSize.rows * gridSize.cols)

		while (stack.length > 0) {
			const current = stack.pop()!
			const key = `${current.row}-${current.col}`

			if (visited.has(key)) continue
			visited.add(key)

			setCurrentStep(stepCount++)

			setGrid((prev) => {
				const newGrid = prev.map((row) => [...row])
				newGrid[current.row][current.col] = {
					...newGrid[current.row][current.col],
					isVisited: true,
				}
				return newGrid
			})

			await sleep(speed)

			if (current.type === 'end') {
				const path = reconstructPath(current)
				await animatePath(path)
				setIsRunning(false)
				return
			}

			const neighbors = getNeighbors(current, workingGrid)
			for (const neighbor of neighbors) {
				const neighborKey = `${neighbor.row}-${neighbor.col}`
				if (!visited.has(neighborKey) && neighbor.type !== 'wall') {
					neighbor.previousCell = current
					stack.push(neighbor)
				}
			}
		}

		setIsRunning(false)
	}

	useEffect(() => {
		initializeGrid()
	}, [gridSize])

	const value: PathfinderContextType = {
		grid,
		isRunning,
		setIsRunning,
		speed,
		setSpeed,
		currentAlgorithm,
		setCurrentAlgorithm,
		gridSize,
		setGridSize,
		startCell,
		endCell,
		isPlacing,
		setIsPlacing,
		mousePressed,
		setMousePressed,
		currentStep,
		setCurrentStep,
		totalSteps,
		setTotalSteps,
		pathFound,
		setPathFound,

		initializeGrid,
		clearGrid,
		clearPath,
		handleCellClick,
		handleCellMouseEnter,
		handleCellMouseDown,
		handleCellMouseUp,

		dijkstra,
		aStar,
		bfs,
		dfs,
	}

	return <PathfinderContext.Provider value={value}>{children}</PathfinderContext.Provider>
}
