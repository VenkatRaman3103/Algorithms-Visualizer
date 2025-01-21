import React, { useState } from 'react'
import './index.scss'

type TreeType<T> = {
	value: T
	left: TreeType<T> | null
	right: TreeType<T> | null
}

const strokeColor = '#dddee2'

export const BinaryTree = () => {
	const [isToggleActive, setIsToggleActive] = useState<boolean>(false)
	const binaryTreeData: TreeType<string> = {
		value: 'A',
		left: {
			value: 'B',
			left: { value: 'C', left: null, right: null },
			right: { value: 'D', left: null, right: null },
		},
		right: {
			value: 'E',
			left: { value: 'F', left: null, right: null },
			right: null,
		},
	}

	return (
		<>
			<div className="tree-container">
				<div className="tree-wrapper">
					<BinaryTreeVisual node={binaryTreeData} />
					<div className="array-list-container">
						<div className="array-list-wrapper">
							<div className="element">0</div>
							<div className="element">1</div>
							<div className="element">2</div>
							<div className="element">3</div>
							<div className="element">4</div>
							<div className="element">5</div>
							<div className="element">6</div>
						</div>
					</div>

					<div
						className={`options-tray-toggle ${isToggleActive ? 'open-tray' : ''}`}
						onMouseEnter={() => setIsToggleActive(true)}
						onMouseLeave={() => setIsToggleActive(false)}
					>
						{!isToggleActive ? (
							<div className={`btn-wrapper ${isToggleActive ? 'disolve' : ''}`}>
								<OptionTrayToggle />
							</div>
						) : (
							<OptionsTray />
						)}
					</div>
				</div>

				<div className="controls-container">
					<div className="controls-wrapper">
						<div className="reset btn">reset</div>
						<div className="backward btn">backward</div>
						<div className="play-pause btn">play</div>
						<div className="forward btn">forward</div>
						<div className="shuffle btn end">shuffle</div>
					</div>
				</div>
			</div>
		</>
	)
}

const BinaryTreeVisual = ({ node }: { node: TreeType<string> }) => {
	const stack = ['A', 'B', 'D']

	const calculateTreeDimensions = (
		node: TreeType<string>,
	): { width: number; height: number; leafCount: number; depth: number } => {
		if (!node) return { width: 0, height: 0, leafCount: 0, depth: 0 }

		const left = calculateTreeDimensions(node.left)
		const right = calculateTreeDimensions(node.right)

		const leafCount =
			node.left === null && node.right === null ? 1 : left.leafCount + right.leafCount
		const depth = Math.max(left.depth, right.depth) + 1
		const width = Math.max(leafCount * 100, left.width + right.width)
		const height = depth * 120

		return { width, height, leafCount, depth }
	}

	const treeDimensions = calculateTreeDimensions(node)
	const svgWidth = Math.max(800, treeDimensions.width)
	const svgHeight = Math.max(550, treeDimensions.height)

	const Tree: React.FC<{
		node: TreeType<string>
		x: number
		y: number
		parentX: number | null
		parentY: number | null
		level: number
		index: number
		totalNodesAtLevel: number
	}> = ({ node, x, y, parentX, parentY, level, index, totalNodesAtLevel }) => {
		const nodeRadius = 25

		const getChildPositions = () => {
			const nextLevel = level + 1
			const childSpacing = svgWidth / Math.pow(2, nextLevel + 1)
			const leftChildX = x - childSpacing
			const rightChildX = x + childSpacing
			const childY = y + 120

			return { leftChildX, rightChildX, childY }
		}

		const { leftChildX, rightChildX, childY } = getChildPositions()

		const areConsecutiveInStack = (value1: string, value2: string) => {
			const index1 = stack.indexOf(value1)
			const index2 = stack.indexOf(value2)
			return index1 !== -1 && index2 !== -1 && Math.abs(index1 - index2) === 1
		}

		const isHighlighted =
			parentX !== null &&
			parentY !== null &&
			areConsecutiveInStack(node.value, stack[stack.indexOf(node.value) - 1])

		return (
			<g>
				<g>
					{parentX !== null && parentY !== null && (
						<line
							x1={x > parentX ? parentX + nodeRadius : parentX - nodeRadius}
							y1={parentY + 10}
							x2={x}
							y2={y - nodeRadius}
							stroke={isHighlighted ? '#1da1f2' : strokeColor}
							strokeWidth="2"
						/>
					)}
					{node.left && (
						<Tree
							node={node.left}
							x={leftChildX}
							y={childY}
							parentX={x}
							parentY={y}
							level={level + 1}
							index={index * 2}
							totalNodesAtLevel={totalNodesAtLevel * 2}
						/>
					)}
					{node.right && (
						<Tree
							node={node.right}
							x={rightChildX}
							y={childY}
							parentX={x}
							parentY={y}
							level={level + 1}
							index={index * 2 + 1}
							totalNodesAtLevel={totalNodesAtLevel * 2}
						/>
					)}
				</g>
				<g>
					<circle
						r={stack.includes(node.value) ? nodeRadius + 5 : nodeRadius + 1}
						cx={x}
						cy={y}
						fill="white"
						strokeWidth="1.5"
						filter={stack.includes(node.value) ? 'url(#drop-shadow)' : ''}
						stroke={stack.includes(node.value) ? '' : strokeColor}
					/>
					{stack.includes(node.value) && (
						<circle
							r={nodeRadius + 4}
							cx={x}
							cy={y}
							fill="none"
							strokeWidth="2.5"
							stroke="#1da1f2"
						/>
					)}
					<text
						x={x}
						y={y + 1}
						textAnchor="middle"
						dominantBaseline="middle"
						className="select-none"
					>
						{node.value}
					</text>
				</g>
			</g>
		)
	}

	return (
		<svg width={svgWidth} height={svgHeight} className="min-w-full">
			<defs>
				<filter id="drop-shadow" x="-50%" y="-50%" width="400%" height="400%">
					<feDropShadow
						dx="0"
						dy="12"
						stdDeviation="15"
						flood-color="rgba(0, 0, 0, 0.15)"
					/>
				</filter>
			</defs>
			<Tree
				node={node}
				x={svgWidth / 2}
				y={50}
				parentX={null}
				parentY={null}
				level={0}
				index={0}
				totalNodesAtLevel={1}
			/>
		</svg>
	)
}

export const OptionsTray: React.FC = (): React.JSX.Element => {
	return (
		<div className="option-tray-wrapper">
			<InitialCondition />
			<ProblemSize />
		</div>
	)
}

export const InitialCondition: React.FC = (): React.JSX.Element => {
	return (
		<>
			<OptionItemsHeading heading={'Initial Condition'} />
			<div className="conditions-wrapper">
				<Options optionHeading={'Random'} />
				<Options optionHeading={'Nearly Sorted'} />
				<Options optionHeading={'Reversed'} />
				<Options optionHeading={'Few Unique'} />
			</div>
			<Divider />
		</>
	)
}

export const Options: React.FC = ({
	optionHeading,
}: {
	optionHeading: string
}): React.JSX.Element => {
	return (
		<>
			<div className="option-wrapper">
				<div className="option-preview"></div>
				<div className="option-heading">
					<p>{optionHeading}</p>
				</div>
			</div>
		</>
	)
}

export const ProblemSize: React.FC = (): React.JSX.Element => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0)

	const handleCountClick = (index: number) => {
		setSelectedIndex(index)
	}

	return (
		<>
			<OptionItemsHeading heading={'Count'} />
			<div className="problem-size-wrapper">
				{[10, 20, 30, 40, 50].map((count, index) => (
					<div key={index} className="count" onClick={() => handleCountClick(index)}>
						{count}
					</div>
				))}
				<div
					className="highlight"
					style={{
						transform: `translateX(${selectedIndex * 100}%)`,
					}}
				></div>
			</div>
		</>
	)
}

export const OptionItemsHeading: React.FC = ({
	heading,
}: {
	heading: string
}): React.JSX.Element => {
	return (
		<>
			<h1 className="options-heading">{heading}</h1>
		</>
	)
}

export const Divider: React.FC = (): React.JSX.Element => {
	return <div className="divider"></div>
}

export const OptionTrayToggle = () => {
	return (
		<>
			<svg
				width="24"
				height="23"
				viewBox="0 0 24 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4.16008 21.4L19.8401 21.4C21.0772 21.4 22.0801 20.4151 22.0801 19.2L22.0801 3.80003C22.0801 2.585 21.0772 1.60003 19.8401 1.60003L4.16008 1.60003C2.92296 1.60003 1.92008 2.585 1.92008 3.80003L1.92008 19.2C1.92008 20.4151 2.92296 21.4 4.16008 21.4Z"
					stroke="#B6B6B8"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M15.3594 21.4L15.3594 1.60003"
					stroke="#B6B6B8"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</>
	)
}
export default BinaryTree
