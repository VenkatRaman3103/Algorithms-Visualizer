import React from 'react'
import './index.scss'
import { PathfinderProvider, usePathfinder } from '../PathFinderContext'

export const Pathfinder = () => {
	return (
		<PathfinderProvider>
			<div className="pathfinder-container">
				<div className="pathfinder-wrapper">
					<PathfinderVisualizer />
				</div>
			</div>
		</PathfinderProvider>
	)
}

export const PathfinderVisualizer = () => {
	const {
		grid,
		isRunning,
		speed,
		setSpeed,
		currentAlgorithm,
		setCurrentAlgorithm,
		gridSize,
		setGridSize,
		isPlacing,
		setIsPlacing,
		currentStep,
		totalSteps,
		pathFound,
		clearGrid,
		clearPath,
		handleCellMouseDown,
		handleCellMouseEnter,
		handleCellMouseUp,
		dijkstra,
		aStar,
		bfs,
		dfs,
	} = usePathfinder()

	const getCellClass = (cell: any) => {
		let className = 'cell'

		if (cell.type === 'start') className += ' start'
		else if (cell.type === 'end') className += ' end'
		else if (cell.type === 'wall') className += ' wall'
		else if (cell.isPath) className += ' path'
		else if (cell.isVisited) className += ' visited'

		return className
	}

	const hasStartAndEnd = () => {
		let hasStart = false
		let hasEnd = false

		for (let row of grid) {
			for (let cell of row) {
				if (cell.type === 'start') hasStart = true
				if (cell.type === 'end') hasEnd = true
			}
		}

		return hasStart && hasEnd
	}

	const startAlgorithm = () => {
		if (!currentAlgorithm || !hasStartAndEnd()) return

		switch (currentAlgorithm) {
			case 'dijkstra':
				dijkstra()
				break
			case 'astar':
				aStar()
				break
			case 'bfs':
				bfs()
				break
			case 'dfs':
				dfs()
				break
		}
	}

	return (
		<div className="pathfinder-visualizer">
			<div className="controls-section">
				<div className="algorithm-selection">
					<label>Choose Algorithm:</label>
					<div className="algorithm-buttons">
						<button
							onClick={() => setCurrentAlgorithm('dijkstra')}
							disabled={isRunning}
							className={`algorithm-button dijkstra ${currentAlgorithm === 'dijkstra' ? 'selected' : ''}`}
						>
							Dijkstra
						</button>
						<button
							onClick={() => setCurrentAlgorithm('astar')}
							disabled={isRunning}
							className={`algorithm-button astar ${currentAlgorithm === 'astar' ? 'selected' : ''}`}
						>
							A*
						</button>
						<button
							onClick={() => setCurrentAlgorithm('bfs')}
							disabled={isRunning}
							className={`algorithm-button bfs ${currentAlgorithm === 'bfs' ? 'selected' : ''}`}
						>
							BFS
						</button>
						<button
							onClick={() => setCurrentAlgorithm('dfs')}
							disabled={isRunning}
							className={`algorithm-button dfs ${currentAlgorithm === 'dfs' ? 'selected' : ''}`}
						>
							DFS
						</button>
					</div>
				</div>

				<div className="action-buttons">
					<button
						onClick={startAlgorithm}
						disabled={isRunning || !currentAlgorithm || !hasStartAndEnd()}
						className="start-button"
					>
						{isRunning ? 'Running...' : 'Start Pathfinding'}
					</button>
				</div>

				<div className="placement-buttons">
					<button
						onClick={() => setIsPlacing(isPlacing === 'start' ? null : 'start')}
						disabled={isRunning}
						className={`placement-button ${isPlacing === 'start' ? 'active' : ''}`}
					>
						Place Start
					</button>
					<button
						onClick={() => setIsPlacing(isPlacing === 'end' ? null : 'end')}
						disabled={isRunning}
						className={`placement-button ${isPlacing === 'end' ? 'active' : ''}`}
					>
						Place End
					</button>
					<button
						onClick={() => setIsPlacing(isPlacing === 'wall' ? null : 'wall')}
						disabled={isRunning}
						className={`placement-button ${isPlacing === 'wall' ? 'active' : ''}`}
					>
						Draw Walls
					</button>
				</div>

				<div className="utility-buttons">
					<button
						onClick={clearPath}
						disabled={isRunning}
						className="utility-button clear-path"
					>
						Clear Path
					</button>
					<button
						onClick={clearGrid}
						disabled={isRunning}
						className="utility-button clear-grid"
					>
						Clear Grid
					</button>
				</div>
			</div>

			<div className="settings-section">
				<div className="speed-control">
					<label>Speed: </label>
					<input
						type="range"
						min="10"
						max="200"
						value={speed}
						onChange={(e) => setSpeed(Number(e.target.value))}
						disabled={isRunning}
						className="speed-slider"
					/>
					<span>{speed}ms</span>
				</div>

				<div className="grid-size-control">
					<label>Grid Size: </label>
					<select
						value={`${gridSize.rows}x${gridSize.cols}`}
						onChange={(e) => {
							const [rows, cols] = e.target.value.split('x').map(Number)
							setGridSize({ rows, cols })
						}}
						disabled={isRunning}
						className="grid-size-select"
					>
						<option value="15x30">15x30</option>
						<option value="20x40">20x40</option>
						<option value="25x50">25x50</option>
						<option value="30x60">30x60</option>
					</select>
				</div>
			</div>

			{currentAlgorithm && (
				<div className="algorithm-status">
					<div className="status-info">
						{isRunning
							? `Running: ${currentAlgorithm} 🔄`
							: `Selected: ${currentAlgorithm}`}
						{pathFound && ' ✅ Path Found!'}
					</div>
					{isRunning && (
						<div className="progress-info">
							Step: {currentStep} / {totalSteps}
						</div>
					)}
				</div>
			)}

			<div className="grid-container">
				<div
					className="grid"
					style={{
						gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
						gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
					}}
				>
					{grid.map((row, rowIndex) =>
						row.map((cell, colIndex) => (
							<div
								key={`${rowIndex}-${colIndex}`}
								className={getCellClass(cell)}
								onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
								onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
								onMouseUp={handleCellMouseUp}
							/>
						)),
					)}
				</div>
			</div>

			<div className="legend">
				<div className="legend-title">Legend:</div>
				<div className="legend-items">
					<div className="legend-item">
						<div className="legend-color start"></div>
						<span>Start</span>
					</div>
					<div className="legend-item">
						<div className="legend-color end"></div>
						<span>End</span>
					</div>
					<div className="legend-item">
						<div className="legend-color wall"></div>
						<span>Wall</span>
					</div>
					<div className="legend-item">
						<div className="legend-color visited"></div>
						<span>Visited</span>
					</div>
					<div className="legend-item">
						<div className="legend-color path"></div>
						<span>Path</span>
					</div>
				</div>
			</div>
		</div>
	)
}
