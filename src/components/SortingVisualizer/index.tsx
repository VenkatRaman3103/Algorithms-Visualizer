import { TrayBtn } from '../Buttons/TrayBtn'
import { Controls } from '../Buttons/Controls'
import { SortingProvider, useSorting } from '../SortingContext'
import './index.scss'

export const Sorting = () => {
	return (
		<SortingProvider>
			<div className="tree-container">
				<div className="tree-wrapper">
					<SortingVisualizer />
					<TrayBtn />
					<Controls />
				</div>
			</div>
		</SortingProvider>
	)
}

export const SortingVisualizer = () => {
	const {
		arrState,
		isRunning,
		speed,
		setSpeed,
		currentAlgorithm,
		resetArray,
		bubbleSort,
		selectionSort,
		insertionSort,
		quickSort,
		mergeSort,
		heapSort,
		currentStep,
		totalSteps,
	} = useSorting()

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
					<div className="progress-info">
						Step: {currentStep} / {totalSteps}
					</div>
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
