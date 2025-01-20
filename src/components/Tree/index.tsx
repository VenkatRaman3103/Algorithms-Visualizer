import React from 'react'

const binaryTreeData = {
	value: 'Root',
	left: {
		value: 'Left Child',
		left: { value: 'Left Grandchild', left: null, right: null },
		right: { value: 'Right Grandchild', left: null, right: null },
	},
	right: {
		value: 'Right Child',
		left: { value: 'Left Grandchild', left: null, right: null },
		right: null,
	},
}

export const BinaryTree = () => {
	return (
		<div>
			<Practice node={binaryTreeData} />
		</div>
	)
}

export const Practice = ({ node }) => {
	const Tree = ({ node, x, y, parentX, parentY, spacingX = 200, spacingY = 100 }) => {
		const nodeRadius = 20
		let leftChildNodeX = x - spacingX / 2
		let leftChildNodeY = y + spacingY

		let rightChildNodeX = x + spacingX / 2
		let rightChildNodeY = y + spacingY

		return (
			<>
				{parentX !== null && parentY !== null && (
					<line
						x1={parentX}
						y1={parentY + nodeRadius}
						x2={x}
						y2={y - nodeRadius}
						stroke="#e9ebef"
						strokeWidth="1.5"
					/>
				)}

				<g>
					<circle r={nodeRadius} cx={x} cy={y} fill="white" stroke="#e9ebef" />
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
		<svg
			width={800}
			height={800}
			// style={{
			// 	border: '1px solid #ddd',
			// 	backgroundColor: '#f9f9f9',
			// }}
		>
			<Tree node={node} x={400} y={50} parentX={null} parentY={null} />
		</svg>
	)
}

export default BinaryTree
