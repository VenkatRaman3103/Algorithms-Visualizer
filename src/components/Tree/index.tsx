import React from 'react'
import './index.scss'

type TreeType<T> = {
	value: T
	left: TreeType<T> | null
	right: TreeType<T> | null
}

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

export const BinaryTree = () => {
	return (
		<div className="bt-wrapper">
			<BinaryTreeVisual node={binaryTreeData} />
		</div>
	)
}

export const BinaryTreeVisual = ({ node }: { node: TreeType<string> }) => {
	const strokeColor = '#dddee2'

	const Tree: React.FC<{
		node: TreeType<string>
		x: number
		y: number
		parentX: number | null
		parentY: number | null
		spacingX?: number
		spacingY?: number
	}> = ({ node, x, y, parentX, parentY, spacingX = 200, spacingY = 100 }) => {
		const nodeRadius = 25
		const leftChildNodeX = x - spacingX / 2
		const leftChildNodeY = y + spacingY

		const rightChildNodeX = x + spacingX / 2
		const rightChildNodeY = y + spacingY

		return (
			<>
				{parentX !== null && parentY !== null && (
					<line
						x1={parentX}
						y1={parentY + nodeRadius}
						x2={x}
						y2={y - nodeRadius}
						stroke={strokeColor}
						strokeWidth="1.5"
					/>
				)}

				<g>
					<circle
						r={nodeRadius}
						cx={x}
						cy={y}
						fill="white"
						strokeWidth="1.5"
						stroke={strokeColor}
					></circle>

					<circle
						r={nodeRadius - 5}
						cx={x}
						cy={y}
						fill="none"
						strokeWidth="1"
						stroke={'red'}
					></circle>

					<text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle">
						{node.value}
					</text>
				</g>

				{node.left && (
					<Tree
						node={node.left}
						x={leftChildNodeX}
						y={leftChildNodeY}
						parentX={x}
						parentY={y}
						spacingX={spacingX / 1.5}
					/>
				)}
				{node.right && (
					<Tree
						node={node.right}
						x={rightChildNodeX}
						y={rightChildNodeY}
						parentX={x}
						parentY={y}
						spacingX={spacingX / 1.5}
					/>
				)}
			</>
		)
	}

	return (
		<svg width={800} height={500}>
			<Tree node={node} x={400} y={50} parentX={null} parentY={null} />
		</svg>
	)
}

export default BinaryTree
