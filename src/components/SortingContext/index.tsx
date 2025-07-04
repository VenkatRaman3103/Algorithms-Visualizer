import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { EntryType, InitialConditionType, SortingContextType } from '../types'

const SortingContext = createContext<SortingContextType | undefined>(undefined)

export const useSorting = () => {
	const context = useContext(SortingContext)
	if (!context) {
		throw new Error('useSorting must be used within a SortingProvider')
	}
	return context
}

export const SortingProvider = ({ children }: { children: ReactNode }) => {
	const [arrState, setArrState] = useState<EntryType[]>([])
	const [isRunning, setIsRunning] = useState(false)
	const [speed, setSpeed] = useState(300)
	const [currentAlgorithm, setCurrentAlgorithm] = useState<string>('')
	const [problemSize, setProblemSize] = useState(20)
	const [initialCondition, setInitialCondition] = useState<InitialConditionType>('Random')
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)
	const [totalSteps, setTotalSteps] = useState(0)

	const generateArray = (size: number, condition: InitialConditionType): number[] => {
		const baseArray = Array.from({ length: size }, (_, i) => (i + 1) * 5)

		switch (condition) {
			case 'Random':
				return baseArray.sort(() => Math.random() - 0.5)
			case 'Nearly Sorted':
				const sorted = [...baseArray].sort((a, b) => a - b)
				// Swap a few elements to make it nearly sorted
				const swaps = Math.floor(size * 0.1)
				for (let i = 0; i < swaps; i++) {
					const idx1 = Math.floor(Math.random() * size)
					const idx2 = Math.floor(Math.random() * size)
					;[sorted[idx1], sorted[idx2]] = [sorted[idx2], sorted[idx1]]
				}
				return sorted
			case 'Reversed':
				return baseArray.sort((a, b) => b - a)
			case 'Few Unique':
				const uniqueValues = [10, 20, 30, 40, 50]
				return Array.from(
					{ length: size },
					() => uniqueValues[Math.floor(Math.random() * uniqueValues.length)],
				)
			default:
				return baseArray.sort(() => Math.random() - 0.5)
		}
	}

	const resetArray = () => {
		const data = generateArray(problemSize, initialCondition)
		setArrState(data.map((value, index) => ({ height: value, position: index })))
		setIsRunning(false)
		setCurrentAlgorithm('')
		setIsPlaying(false)
		setCurrentStep(0)
		setTotalSteps(0)
	}

	useEffect(() => {
		resetArray()
	}, [problemSize, initialCondition])

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	const updatePositions = (newState: EntryType[]) => {
		return newState.map((item, idx) => ({ ...item, position: idx }))
	}

	// Bubble Sort
	const bubbleSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Bubble Sort')
		setIsPlaying(true)

		let stepCount = 0
		const n = arrState.length
		setTotalSteps((n * (n - 1)) / 2)

		for (let i = 0; i < arrState.length - 1; i++) {
			for (let j = 0; j < arrState.length - i - 1; j++) {
				if (!isPlaying) break

				setCurrentStep(stepCount++)

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
		setIsPlaying(false)
	}

	// Selection Sort
	const selectionSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Selection Sort')
		setIsPlaying(true)

		let stepCount = 0
		const n = arrState.length
		setTotalSteps((n * (n - 1)) / 2)

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
				if (!isPlaying) break

				setCurrentStep(stepCount++)

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
		setIsPlaying(false)
	}

	// Insertion Sort
	const insertionSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Insertion Sort')
		setIsPlaying(true)

		let currentArray = [...arrState]
		let stepCount = 0
		const n = currentArray.length
		setTotalSteps((n * (n - 1)) / 2)

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
				if (!isPlaying) break

				setCurrentStep(stepCount++)

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
		setIsPlaying(false)
	}

	// Quick Sort
	const quickSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Quick Sort')
		setIsPlaying(true)

		let currentArray = [...arrState]
		let stepCount = 0
		const n = currentArray.length
		setTotalSteps(n * Math.log2(n))

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
				if (!isPlaying) break

				setCurrentStep(stepCount++)

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
		setIsPlaying(false)
	}

	// Merge Sort
	const mergeSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Merge Sort')
		setIsPlaying(true)

		let currentArray = [...arrState]
		let stepCount = 0
		const n = currentArray.length
		setTotalSteps(n * Math.log2(n))

		const merge = async (left: number, mid: number, right: number) => {
			const leftArr = currentArray.slice(left, mid + 1)
			const rightArr = currentArray.slice(mid + 1, right + 1)

			let i = 0,
				j = 0,
				k = left

			while (i < leftArr.length && j < rightArr.length) {
				if (!isPlaying) break

				setCurrentStep(stepCount++)

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
		setIsPlaying(false)
	}

	// Heap Sort
	const heapSort = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Heap Sort')
		setIsPlaying(true)

		let currentArray = [...arrState]
		let stepCount = 0
		const n = currentArray.length
		setTotalSteps(n * Math.log2(n))

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
				setCurrentStep(stepCount++)

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
		setIsPlaying(false)
	}

	const value: SortingContextType = {
		arrState,
		setArrState,
		isRunning,
		setIsRunning,
		speed,
		setSpeed,
		currentAlgorithm,
		setCurrentAlgorithm,
		problemSize,
		setProblemSize,
		initialCondition,
		setInitialCondition,
		resetArray,
		bubbleSort,
		selectionSort,
		insertionSort,
		quickSort,
		mergeSort,
		heapSort,
		isPlaying,
		setIsPlaying,
		currentStep,
		setCurrentStep,
		totalSteps,
		setTotalSteps,
	}

	return <SortingContext.Provider value={value}>{children}</SortingContext.Provider>
}
