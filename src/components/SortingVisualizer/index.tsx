import { useEffect, useState } from 'react'
import './index.scss'

const data: number[] = [60, 20, 10, 40, 30, 50, 70, 15, 35, 25]
type EntryType = { height: number; position: number; isComparing?: boolean; isSelected?: boolean }

export const SortingVisualizer = () => {
	const [arrState, setArrState] = useState<EntryType[]>([])
	const [isRunning, setIsRunning] = useState(false)
	const [speed, setSpeed] = useState(300)
	const [currentAlgorithm, setCurrentAlgorithm] = useState<string>('')

	useEffect(() => {
		resetArray()
	}, [])

	const resetArray = () => {
		setArrState(data.map((value, index) => ({ height: value, position: index })))
		setIsRunning(false)
		setCurrentAlgorithm('')
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	const updatePositions = (newState: EntryType[]) => {
		return newState.map((item, idx) => ({ ...item, position: idx }))
	}

	// Bubble Sort
	const bubbleSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Bubble Sort')

		for (let i = 0; i < arrState.length - 1; i++) {
			for (let j = 0; j < arrState.length - i - 1; j++) {
				setArrState((prev) =>
					updatePositions(
						prev.map((item, idx) => ({
							...item,
							isComparing: idx === j || idx === j + 1,
						})),
					),
				)

				await sleep(speed)

				setArrState((prev) => {
					const newState = [...prev]
					if (newState[j].height > newState[j + 1].height) {
						const temp = newState[j]
						newState[j] = newState[j + 1]
						newState[j + 1] = temp
					}
					return updatePositions(
						newState.map((item) => ({ ...item, isComparing: false })),
					)
				})
			}
		}

		setIsRunning(false)
	}

	// Selection Sort
	const selectionSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Selection Sort')

		for (let i = 0; i < arrState.length - 1; i++) {
			let minIdx = i

			setArrState((prev) =>
				updatePositions(
					prev.map((item, idx) => ({
						...item,
						isSelected: idx === minIdx,
					})),
				),
			)

			for (let j = i + 1; j < arrState.length; j++) {
				setArrState((prev) =>
					updatePositions(
						prev.map((item, idx) => ({
							...item,
							isComparing: idx === j,
							isSelected: idx === minIdx,
						})),
					),
				)

				await sleep(speed)

				setArrState((prev) => {
					const newState = [...prev]
					if (newState[j].height < newState[minIdx].height) {
						minIdx = j
					}
					return updatePositions(
						newState.map((item, idx) => ({
							...item,
							isSelected: idx === minIdx,
							isComparing: false,
						})),
					)
				})
			}

			if (minIdx !== i) {
				setArrState((prev) => {
					const newState = [...prev]
					const temp = newState[i]
					newState[i] = newState[minIdx]
					newState[minIdx] = temp
					return updatePositions(
						newState.map((item) => ({
							...item,
							isSelected: false,
							isComparing: false,
						})),
					)
				})
				await sleep(speed)
			}
		}

		setIsRunning(false)
	}

	// Insertion Sort
	const insertionSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Insertion Sort')

		let currentArray = [...arrState]

		for (let i = 1; i < currentArray.length; i++) {
			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isSelected: idx === i,
						isComparing: false,
					})),
				),
			)

			await sleep(speed)

			let j = i
			while (j > 0 && currentArray[j].height < currentArray[j - 1].height) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: idx === j || idx === j - 1,
							isSelected: idx === i,
						})),
					),
				)

				await sleep(speed)

				const temp = currentArray[j]
				currentArray[j] = currentArray[j - 1]
				currentArray[j - 1] = temp

				setArrState(
					updatePositions(
						currentArray.map((item) => ({
							...item,
							isComparing: false,
							isSelected: false,
						})),
					),
				)

				j--
			}

			setArrState(
				updatePositions(
					currentArray.map((item) => ({
						...item,
						isComparing: false,
						isSelected: false,
					})),
				),
			)
		}

		setIsRunning(false)
	}

	// Quick Sort
	const quickSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Quick Sort')

		let currentArray = [...arrState]

		const partition = async (low: number, high: number) => {
			const pivot = currentArray[high].height

			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isSelected: idx === high,
						isComparing: false,
					})),
				),
			)

			await sleep(speed)

			let i = low - 1

			for (let j = low; j < high; j++) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: idx === j,
							isSelected: idx === high,
						})),
					),
				)

				await sleep(speed)

				if (currentArray[j].height < pivot) {
					i++
					if (i !== j) {
						const temp = currentArray[i]
						currentArray[i] = currentArray[j]
						currentArray[j] = temp

						setArrState(
							updatePositions(
								currentArray.map((item, idx) => ({
									...item,
									isComparing: false,
									isSelected: idx === high,
								})),
							),
						)
						await sleep(speed)
					}
				}
			}

			const temp = currentArray[i + 1]
			currentArray[i + 1] = currentArray[high]
			currentArray[high] = temp

			setArrState(
				updatePositions(
					currentArray.map((item) => ({
						...item,
						isComparing: false,
						isSelected: false,
					})),
				),
			)

			await sleep(speed)
			return i + 1
		}

		const quickSortHelper = async (low: number, high: number) => {
			if (low < high) {
				const pi = await partition(low, high)
				await quickSortHelper(low, pi - 1)
				await quickSortHelper(pi + 1, high)
			}
		}

		await quickSortHelper(0, currentArray.length - 1)
		setArrState(updatePositions(currentArray))
		setIsRunning(false)
	}

	// Merge Sort
	const mergeSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Merge Sort')

		let currentArray = [...arrState]

		const merge = async (left: number, mid: number, right: number) => {
			const leftArr = currentArray.slice(left, mid + 1)
			const rightArr = currentArray.slice(mid + 1, right + 1)

			let i = 0,
				j = 0,
				k = left

			while (i < leftArr.length && j < rightArr.length) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: idx === k,
						})),
					),
				)

				await sleep(speed)

				if (leftArr[i].height <= rightArr[j].height) {
					currentArray[k] = { ...leftArr[i] }
					i++
				} else {
					currentArray[k] = { ...rightArr[j] }
					j++
				}

				setArrState(
					updatePositions(
						currentArray.map((item) => ({
							...item,
							isComparing: false,
						})),
					),
				)

				k++
			}

			while (i < leftArr.length) {
				currentArray[k] = { ...leftArr[i] }
				setArrState(updatePositions(currentArray))
				i++
				k++
				await sleep(speed)
			}

			while (j < rightArr.length) {
				currentArray[k] = { ...rightArr[j] }
				setArrState(updatePositions(currentArray))
				j++
				k++
				await sleep(speed)
			}
		}

		const mergeSortHelper = async (left: number, right: number) => {
			if (left < right) {
				const mid = Math.floor((left + right) / 2)
				await mergeSortHelper(left, mid)
				await mergeSortHelper(mid + 1, right)
				await merge(left, mid, right)
			}
		}

		await mergeSortHelper(0, currentArray.length - 1)
		setArrState(updatePositions(currentArray))
		setIsRunning(false)
	}

	// Heap Sort
	const heapSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Heap Sort')

		let currentArray = [...arrState]

		const heapify = async (n: number, i: number) => {
			let largest = i
			const left = 2 * i + 1
			const right = 2 * i + 2

			if (left < n && currentArray[left].height > currentArray[largest].height) {
				largest = left
			}

			if (right < n && currentArray[right].height > currentArray[largest].height) {
				largest = right
			}

			if (largest !== i) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: idx === i || idx === largest,
						})),
					),
				)

				await sleep(speed)

				const temp = currentArray[i]
				currentArray[i] = currentArray[largest]
				currentArray[largest] = temp

				setArrState(
					updatePositions(
						currentArray.map((item) => ({
							...item,
							isComparing: false,
						})),
					),
				)

				await heapify(n, largest)
			}
		}

		for (let i = Math.floor(currentArray.length / 2) - 1; i >= 0; i--) {
			await heapify(currentArray.length, i)
		}

		for (let i = currentArray.length - 1; i > 0; i--) {
			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isSelected: idx === 0 || idx === i,
					})),
				),
			)

			await sleep(speed)

			const temp = currentArray[0]
			currentArray[0] = currentArray[i]
			currentArray[i] = temp

			setArrState(
				updatePositions(
					currentArray.map((item) => ({
						...item,
						isSelected: false,
					})),
				),
			)

			await heapify(i, 0)
		}

		setArrState(updatePositions(currentArray))
		setIsRunning(false)
	}

	return (
		<div className="sorting-container">
			<div className="button-container">
				<button
					onClick={bubbleSort}
					disabled={isRunning}
					className="sort-button bubble-sort"
				>
					Bubble Sort
				</button>
				<button
					onClick={selectionSort}
					disabled={isRunning}
					className="sort-button selection-sort"
				>
					Selection Sort
				</button>
				<button
					onClick={insertionSort}
					disabled={isRunning}
					className="sort-button insertion-sort"
				>
					Insertion Sort
				</button>
				<button onClick={quickSort} disabled={isRunning} className="sort-button quick-sort">
					Quick Sort
				</button>
				<button onClick={mergeSort} disabled={isRunning} className="sort-button merge-sort">
					Merge Sort
				</button>
				<button onClick={heapSort} disabled={isRunning} className="sort-button heap-sort">
					Heap Sort
				</button>
				<button
					onClick={resetArray}
					disabled={isRunning}
					className="sort-button reset-button"
				>
					Reset
				</button>
			</div>

			<div className="speed-container">
				<label>Speed: </label>
				<input
					type="range"
					min="50"
					max="1000"
					value={speed}
					onChange={(e) => setSpeed(Number(e.target.value))}
					disabled={isRunning}
					className="speed-slider"
				/>
				<span>{speed}ms</span>
			</div>

			{currentAlgorithm && (
				<div className="algorithm-status">
					Running: {currentAlgorithm} {isRunning && '🔄'}
				</div>
			)}

			<div className="sorting-wrapper">
				{arrState.map(({ height, position, isComparing, isSelected }, index) => (
					<div
						key={index}
						className={`strip ${isSelected ? 'selected' : ''} ${isComparing ? 'comparing' : ''}`}
						style={{
							height: `${height * 4}px`,
							left: `${position * 44}px`,
						}}
					>
						{height}
					</div>
				))}
			</div>

			<div className="legend">
				<p>
					<strong>Legend:</strong>
				</p>
				<div className="legend-items">
					<div className="legend-item">
						<div className="legend-color normal"></div>
						<span>Normal</span>
					</div>
					<div className="legend-item">
						<div className="legend-color comparing"></div>
						<span>Comparing</span>
					</div>
					<div className="legend-item">
						<div className="legend-color selected"></div>
						<span>Selected/Pivot</span>
					</div>
				</div>
			</div>
		</div>
	)
}
