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
