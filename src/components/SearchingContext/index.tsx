import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'

export type SearchEntryType = {
	value: number
	position: number
	isComparing?: boolean
	isSelected?: boolean
	isFound?: boolean
	isTarget?: boolean
}

export type SearchingContextType = {
	arrState: SearchEntryType[]
	setArrState: (arr: SearchEntryType[]) => void
	isRunning: boolean
	setIsRunning: (running: boolean) => void
	speed: number
	setSpeed: (speed: number) => void
	currentAlgorithm: string
	setCurrentAlgorithm: (algorithm: string) => void
	problemSize: number
	setProblemSize: (size: number) => void
	targetValue: number
	setTargetValue: (value: number) => void
	resetArray: () => void
	startSearch: (algorithm: string) => void
	stopSearch: () => void
	isPlaying: boolean
	setIsPlaying: (playing: boolean) => void
	currentStep: number
	setCurrentStep: (step: number) => void
	totalSteps: number
	setTotalSteps: (steps: number) => void
	searchResult: { found: boolean; index: number; steps: number } | null
	setSearchResult: (result: { found: boolean; index: number; steps: number } | null) => void
	selectedAlgorithm: string
	setSelectedAlgorithm: (algorithm: string) => void
}

const SearchingContext = createContext<SearchingContextType | undefined>(undefined)

export const useSearching = () => {
	const context = useContext(SearchingContext)
	if (!context) {
		throw new Error('useSearching must be used within a SearchingProvider')
	}
	return context
}

export const SearchingProvider = ({ children }: { children: ReactNode }) => {
	const [arrState, setArrState] = useState<SearchEntryType[]>([])
	const [isRunning, setIsRunning] = useState(false)
	const [speed, setSpeed] = useState(300)
	const [currentAlgorithm, setCurrentAlgorithm] = useState<string>('')
	const [problemSize, setProblemSize] = useState(20)
	const [targetValue, setTargetValue] = useState(50)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)
	const [totalSteps, setTotalSteps] = useState(0)
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('linear')
	const [searchResult, setSearchResult] = useState<{
		found: boolean
		index: number
		steps: number
	} | null>(null)

	const isPlayingRef = useRef(false)

	useEffect(() => {
		isPlayingRef.current = isPlaying
	}, [isPlaying])

	const generateSortedArray = (size: number): number[] => {
		return Array.from({ length: size }, (_, i) => (i + 1) * 5)
	}

	const resetArray = () => {
		const data = generateSortedArray(problemSize)
		setArrState(
			data.map((value, index) => ({
				value,
				position: index,
				isComparing: false,
				isSelected: false,
				isFound: false,
				isTarget: false,
			})),
		)
		setIsRunning(false)
		setCurrentAlgorithm('')
		setIsPlaying(false)
		isPlayingRef.current = false
		setCurrentStep(0)
		setTotalSteps(0)
		setSearchResult(null)
		// Set a random target value from the array
		setTargetValue(data[Math.floor(Math.random() * data.length)])
	}

	const stopSearch = () => {
		setIsPlaying(false)
		setIsRunning(false)
		isPlayingRef.current = false
	}

	const startSearch = (algorithm: string) => {
		if (isRunning) return

		setIsPlaying(true)
		isPlayingRef.current = true
		setSearchResult(null)
		setCurrentStep(0)

		switch (algorithm) {
			case 'linear':
				linearSearch()
				break
			case 'binary':
				binarySearch()
				break
			case 'jump':
				jumpSearch()
				break
			case 'interpolation':
				interpolationSearch()
				break
			case 'exponential':
				exponentialSearch()
				break
		}
	}

	useEffect(() => {
		resetArray()
	}, [problemSize])

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	const updatePositions = (newState: SearchEntryType[]) => {
		return newState.map((item, idx) => ({ ...item, position: idx }))
	}

	// Linear Search
	const linearSearch = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Linear Search')

		let stepCount = 0
		const currentArray = [...arrState]
		setTotalSteps(currentArray.length)

		for (let i = 0; i < currentArray.length; i++) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			// Show current element being compared
			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === i,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			if (currentArray[i].value === targetValue) {
				// Found the target
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: false,
							isFound: idx === i,
							isTarget: item.value === targetValue,
						})),
					),
				)
				setSearchResult({ found: true, index: i, steps: stepCount })
				setIsRunning(false)
				setIsPlaying(false)
				isPlayingRef.current = false
				return
			}

			// Reset comparison state
			setArrState(
				updatePositions(
					currentArray.map((item) => ({
						...item,
						isComparing: false,
						isTarget: item.value === targetValue,
					})),
				),
			)
		}

		// Target not found
		setSearchResult({ found: false, index: -1, steps: stepCount })
		setIsRunning(false)
		setIsPlaying(false)
		isPlayingRef.current = false
	}

	// Binary Search
	const binarySearch = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Binary Search')

		let stepCount = 0
		let left = 0
		let right = arrState.length - 1
		const currentArray = [...arrState]
		setTotalSteps(Math.ceil(Math.log2(arrState.length)))

		while (left <= right) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			const mid = Math.floor((left + right) / 2)

			// Show current search range and middle element
			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === mid,
						isSelected: idx >= left && idx <= right,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			if (currentArray[mid].value === targetValue) {
				// Found the target
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: false,
							isSelected: false,
							isFound: idx === mid,
							isTarget: item.value === targetValue,
						})),
					),
				)
				setSearchResult({ found: true, index: mid, steps: stepCount })
				setIsRunning(false)
				setIsPlaying(false)
				isPlayingRef.current = false
				return
			}

			if (currentArray[mid].value < targetValue) {
				left = mid + 1
			} else {
				right = mid - 1
			}

			// Reset states for next iteration
			setArrState(
				updatePositions(
					currentArray.map((item) => ({
						...item,
						isComparing: false,
						isSelected: false,
						isTarget: item.value === targetValue,
					})),
				),
			)
		}

		// Target not found
		setSearchResult({ found: false, index: -1, steps: stepCount })
		setIsRunning(false)
		setIsPlaying(false)
		isPlayingRef.current = false
	}

	// Jump Search
	const jumpSearch = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Jump Search')

		let stepCount = 0
		const jumpSize = Math.floor(Math.sqrt(arrState.length))
		const currentArray = [...arrState]
		setTotalSteps(Math.ceil(Math.sqrt(arrState.length) + jumpSize))

		let prev = 0

		// Finding the block where element is present
		while (
			prev < currentArray.length &&
			currentArray[Math.min(prev + jumpSize, currentArray.length) - 1].value < targetValue
		) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			// Show current jump
			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === Math.min(prev + jumpSize, currentArray.length) - 1,
						isSelected: idx >= prev && idx < prev + jumpSize,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			prev += jumpSize
		}

		// Linear search in the identified block
		for (let i = prev; i < Math.min(prev + jumpSize, currentArray.length); i++) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === i,
						isSelected: false,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			if (currentArray[i].value === targetValue) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: false,
							isFound: idx === i,
							isTarget: item.value === targetValue,
						})),
					),
				)
				setSearchResult({ found: true, index: i, steps: stepCount })
				setIsRunning(false)
				setIsPlaying(false)
				isPlayingRef.current = false
				return
			}
		}

		setSearchResult({ found: false, index: -1, steps: stepCount })
		setIsRunning(false)
		setIsPlaying(false)
		isPlayingRef.current = false
	}

	// Interpolation Search
	const interpolationSearch = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Interpolation Search')

		let stepCount = 0
		let low = 0
		let high = arrState.length - 1
		const currentArray = [...arrState]
		setTotalSteps(Math.ceil(Math.log2(Math.log2(arrState.length))))

		while (
			low <= high &&
			targetValue >= currentArray[low].value &&
			targetValue <= currentArray[high].value
		) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			// Calculate interpolated position
			const pos =
				low +
				Math.floor(
					((targetValue - currentArray[low].value) /
						(currentArray[high].value - currentArray[low].value)) *
						(high - low),
				)

			// Show current search range and interpolated position
			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === pos,
						isSelected: idx >= low && idx <= high,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			if (currentArray[pos].value === targetValue) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: false,
							isSelected: false,
							isFound: idx === pos,
							isTarget: item.value === targetValue,
						})),
					),
				)
				setSearchResult({ found: true, index: pos, steps: stepCount })
				setIsRunning(false)
				setIsPlaying(false)
				isPlayingRef.current = false
				return
			}

			if (currentArray[pos].value < targetValue) {
				low = pos + 1
			} else {
				high = pos - 1
			}

			setArrState(
				updatePositions(
					currentArray.map((item) => ({
						...item,
						isComparing: false,
						isSelected: false,
						isTarget: item.value === targetValue,
					})),
				),
			)
		}

		setSearchResult({ found: false, index: -1, steps: stepCount })
		setIsRunning(false)
		setIsPlaying(false)
		isPlayingRef.current = false
	}

	// Exponential Search
	const exponentialSearch = async () => {
		setIsRunning(true)
		setCurrentAlgorithm('Exponential Search')

		let stepCount = 0
		const currentArray = [...arrState]
		setTotalSteps(Math.ceil(Math.log2(arrState.length)))

		// Find range for binary search
		let bound = 1
		while (bound < currentArray.length && currentArray[bound].value < targetValue) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === bound,
						isSelected: idx <= bound,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			bound *= 2
		}

		// Binary search in the found range
		let left = Math.floor(bound / 2)
		let right = Math.min(bound, currentArray.length - 1)

		while (left <= right) {
			if (!isPlayingRef.current) break

			setCurrentStep(stepCount++)

			const mid = Math.floor((left + right) / 2)

			setArrState(
				updatePositions(
					currentArray.map((item, idx) => ({
						...item,
						isComparing: idx === mid,
						isSelected: idx >= left && idx <= right,
						isTarget: item.value === targetValue,
					})),
				),
			)

			await sleep(speed)

			if (currentArray[mid].value === targetValue) {
				setArrState(
					updatePositions(
						currentArray.map((item, idx) => ({
							...item,
							isComparing: false,
							isSelected: false,
							isFound: idx === mid,
							isTarget: item.value === targetValue,
						})),
					),
				)
				setSearchResult({ found: true, index: mid, steps: stepCount })
				setIsRunning(false)
				setIsPlaying(false)
				isPlayingRef.current = false
				return
			}

			if (currentArray[mid].value < targetValue) {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}

		setSearchResult({ found: false, index: -1, steps: stepCount })
		setIsRunning(false)
		setIsPlaying(false)
		isPlayingRef.current = false
	}

	const value: SearchingContextType = {
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
		targetValue,
		setTargetValue,
		resetArray,
		startSearch,
		stopSearch,
		isPlaying,
		setIsPlaying,
		currentStep,
		setCurrentStep,
		totalSteps,
		setTotalSteps,
		searchResult,
		setSearchResult,
		selectedAlgorithm,
		setSelectedAlgorithm,
	}

	return <SearchingContext.Provider value={value}>{children}</SearchingContext.Provider>
}
