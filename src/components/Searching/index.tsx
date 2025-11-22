import { SearchingProvider, useSearching } from '../SearchingContext'
import './index.scss'

export const Searching = () => {
	return (
		<SearchingProvider>
			<div className="tree-container">
				<div className="tree-wrapper">
					<SearchingVisualizer />
				</div>
			</div>
		</SearchingProvider>
	)
}

export const SearchingVisualizer = () => {
	const {
		arrState,
		isRunning,
		speed,
		setSpeed,
		currentAlgorithm,
		resetArray,
		startSearch,
		stopSearch,
		currentStep,
		totalSteps,
		problemSize,
		setProblemSize,
		targetValue,
		setTargetValue,
		searchResult,
		selectedAlgorithm,
		setSelectedAlgorithm,
	} = useSearching()

	return (
		<div className="searching-container">
			<div className="controls-container">
				<div className="size-container">
					<label>Array Size: </label>
					<input
						type="range"
						min="10"
						max="50"
						value={problemSize}
						onChange={(e) => setProblemSize(Number(e.target.value))}
						disabled={isRunning}
						className="size-slider"
					/>
					<span>{problemSize}</span>
				</div>

				<div className="target-container">
					<label>Target Value: </label>
					<input
						type="number"
						min="5"
						max={problemSize * 5}
						step="5"
						value={targetValue}
						onChange={(e) => setTargetValue(Number(e.target.value))}
						disabled={isRunning}
						className="target-input"
					/>
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

				<div className="algorithm-container">
					<label>Algorithm: </label>
					<select
						value={selectedAlgorithm}
						onChange={(e) => setSelectedAlgorithm(e.target.value)}
						disabled={isRunning}
						className="algorithm-select"
					>
						<option value="linear">Linear Search</option>
						<option value="binary">Binary Search</option>
						<option value="jump">Jump Search</option>
						<option value="interpolation">Interpolation Search</option>
						<option value="exponential">Exponential Search</option>
					</select>
				</div>
			</div>

			<div className="button-container">
				<button
					onClick={() => startSearch(selectedAlgorithm)}
					disabled={isRunning}
					className="search-button start-button"
				>
					Start Search
				</button>
				<button
					onClick={stopSearch}
					disabled={!isRunning}
					className="search-button stop-button"
				>
					Stop Search
				</button>
				<button
					onClick={resetArray}
					disabled={isRunning}
					className="search-button reset-button"
				>
					Reset Array
				</button>
			</div>

			{currentAlgorithm && (
				<div className="algorithm-status">
					<div className="status-info">
						<span>
							Running: {currentAlgorithm} {isRunning && '🔄'}
						</span>
						<div className="progress-info">
							Step: {currentStep} / {Math.ceil(totalSteps)}
						</div>
					</div>
					{searchResult && (
						<div className="search-result">
							{searchResult.found ? (
								<span className="result-success">
									✅ Found at index {searchResult.index} in {searchResult.steps}{' '}
									steps
								</span>
							) : (
								<span className="result-failure">
									❌ Not found after {searchResult.steps} steps
								</span>
							)}
						</div>
					)}
				</div>
			)}

			<div className="searching-wrapper">
				{arrState.map(
					({ value, position, isComparing, isSelected, isFound, isTarget }, index) => (
						<div
							key={index}
							className={`search-element ${isSelected ? 'selected' : ''} ${
								isComparing ? 'comparing' : ''
							} ${isFound ? 'found' : ''} ${isTarget ? 'target' : ''}`}
							style={{
								left: `${position * 60}px`,
							}}
						>
							<div className="element-value">{value}</div>
							<div className="element-index">{index}</div>
						</div>
					),
				)}
			</div>

			<div className="algorithm-info">
				<div className="info-section">
					<h3>Search Algorithms Comparison</h3>
					<div className="algorithm-grid">
						<div className="algorithm-card">
							<h4>Linear Search</h4>
							<p>
								<strong>Time:</strong> O(n)
							</p>
							<p>
								<strong>Space:</strong> O(1)
							</p>
							<p>
								<strong>Best for:</strong> Unsorted arrays
							</p>
						</div>
						<div className="algorithm-card">
							<h4>Binary Search</h4>
							<p>
								<strong>Time:</strong> O(log n)
							</p>
							<p>
								<strong>Space:</strong> O(1)
							</p>
							<p>
								<strong>Best for:</strong> Sorted arrays
							</p>
						</div>
						<div className="algorithm-card">
							<h4>Jump Search</h4>
							<p>
								<strong>Time:</strong> O(√n)
							</p>
							<p>
								<strong>Space:</strong> O(1)
							</p>
							<p>
								<strong>Best for:</strong> Large sorted arrays
							</p>
						</div>
						<div className="algorithm-card">
							<h4>Interpolation Search</h4>
							<p>
								<strong>Time:</strong> O(log log n)
							</p>
							<p>
								<strong>Space:</strong> O(1)
							</p>
							<p>
								<strong>Best for:</strong> Uniformly distributed data
							</p>
						</div>
						<div className="algorithm-card">
							<h4>Exponential Search</h4>
							<p>
								<strong>Time:</strong> O(log n)
							</p>
							<p>
								<strong>Space:</strong> O(1)
							</p>
							<p>
								<strong>Best for:</strong> Unbounded/infinite arrays
							</p>
						</div>
					</div>
				</div>
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
						<span>Search Range</span>
					</div>
					<div className="legend-item">
						<div className="legend-color found"></div>
						<span>Found</span>
					</div>
					<div className="legend-item">
						<div className="legend-color target"></div>
						<span>Target Value</span>
					</div>
				</div>
			</div>
		</div>
	)
}
