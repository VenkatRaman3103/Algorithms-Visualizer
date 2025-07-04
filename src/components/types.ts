// sorting algorithm

export type EntryType = {
	height: number
	position: number
	isComparing?: boolean
	isSelected?: boolean
}

export type InitialConditionType = 'Random' | 'Nearly Sorted' | 'Reversed' | 'Few Unique'

export interface SortingContextType {
	arrState: EntryType[]
	setArrState: (state: EntryType[] | ((prev: EntryType[]) => EntryType[])) => void
	isRunning: boolean
	setIsRunning: (running: boolean) => void
	speed: number
	setSpeed: (speed: number) => void
	currentAlgorithm: string
	setCurrentAlgorithm: (algorithm: string) => void
	problemSize: number
	setProblemSize: (size: number) => void
	initialCondition: InitialConditionType
	setInitialCondition: (condition: InitialConditionType) => void
	resetArray: () => void
	bubbleSort: () => Promise<void>
	selectionSort: () => Promise<void>
	insertionSort: () => Promise<void>
	quickSort: () => Promise<void>
	mergeSort: () => Promise<void>
	heapSort: () => Promise<void>
	isPlaying: boolean
	setIsPlaying: (playing: boolean) => void
	currentStep: number
	setCurrentStep: (step: number) => void
	totalSteps: number
	setTotalSteps: (steps: number) => void
}

// path finder

export type CellType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path'

export interface Cell {
	row: number
	col: number
	type: CellType
	isVisited: boolean
	isPath: boolean
	distance: number
	previousCell: Cell | null
	f: number // For A* algorithm
	g: number // For A* algorithm
	h: number // For A* algorithm
}

export interface PathfinderContextType {
	grid: Cell[][]
	isRunning: boolean
	setIsRunning: (running: boolean) => void
	speed: number
	setSpeed: (speed: number) => void
	currentAlgorithm: string
	setCurrentAlgorithm: (algorithm: string) => void
	gridSize: { rows: number; cols: number }
	setGridSize: (size: { rows: number; cols: number }) => void
	startCell: { row: number; col: number } | null
	endCell: { row: number; col: number } | null
	isPlacing: 'start' | 'end' | 'wall' | null
	setIsPlacing: (placing: 'start' | 'end' | 'wall' | null) => void
	mousePressed: boolean
	setMousePressed: (pressed: boolean) => void
	currentStep: number
	setCurrentStep: (step: number) => void
	totalSteps: number
	setTotalSteps: (steps: number) => void
	pathFound: boolean
	setPathFound: (found: boolean) => void

	// Methods
	initializeGrid: () => void
	clearGrid: () => void
	clearPath: () => void
	handleCellClick: (row: number, col: number) => void
	handleCellMouseEnter: (row: number, col: number) => void
	handleCellMouseDown: (row: number, col: number) => void
	handleCellMouseUp: () => void

	// Algorithms
	dijkstra: () => Promise<void>
	aStar: () => Promise<void>
	bfs: () => Promise<void>
	dfs: () => Promise<void>
}
