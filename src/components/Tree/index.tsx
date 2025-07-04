import React, { useState } from 'react'
import './index.scss'
import { TrayBtn } from '../Buttons/TrayBtn'
import { Controls } from '../Buttons/Controls'

type TreeType<T> = {
	value: T
	left: TreeType<T> | null
	right: TreeType<T> | null
}

const strokeColor = '#dddee2'

export const BinaryTree = () => {
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
			right: {
				value: 'E',
				left: { value: 'F', left: null, right: null },
				right: null,
			},
		},
	}

	return (
		<>
			<div className="tree-container">
				<div className="tree-wrapper">
					<BinaryTreeVisual node={binaryTreeData} />
					<TrayBtn />
					<ArrayVisual />
				</div>
			</div>
		</>
	)
}

const ArrayVisual = () => {
	return (
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
