import React, { JSX, useState } from 'react'
import './index.scss'
import BinaryTree from '../Tree'
import { ContentBlock } from '../Content'

export const Algorithm = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(1)
	const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(true)

	return (
		<div className="main-container">
			<IntroSection />
			<BinaryTree />
			<ContentBlock />
			<CodeBlock
				setIsCodeBlockOpen={setIsCodeBlockOpen}
				isCodeBlockOpen={isCodeBlockOpen}
				// delayedOptionsVisible={delayedOptionsVisible}
				selectedLanguage={selectedLanguage}
				setSelectedLanguage={setSelectedLanguage}
			/>
		</div>
	)
}

export const IntroSection = () => {
	return (
		<div className="intro-section-container">
			<div className="intro-section-wrapper">
				<div className="algorithm-title">Binary Search</div>

				<div className="description">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
					perferendis Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Consequatur
				</div>

				<div className="complexity-overview-wrapper">
					<TimeComplexity />
					<SpaceComplexity />
				</div>

				{/* <div className="divider"></div> */}
			</div>
		</div>
	)
}

export const SpaceComplexity = () => {
	return (
		<>
			<VisualizerWrapper>
				<BarChart />
			</VisualizerWrapper>
		</>
	)
}

export const TimeComplexity = () => {
	return (
		<>
			<VisualizerWrapper>
				<MultiPointCurveWithArea />
			</VisualizerWrapper>
		</>
	)
}

const BarChart = () => {
	const data = [20, 30, 40]

	return (
		<div className="bar-chart-container">
			<div className="bar-chart-wrapper">
				{data.map((item: number, ind: number) => (
					<div
						key={ind}
						className={`bar type-${ind + 1}`}
						style={{ height: `${item * 5}px` }}
					></div>
				))}
				<div></div>
			</div>
		</div>
	)
}

type VisualizerWrapperType = {
	children: JSX.Element
}

const VisualizerWrapper = ({ children }: VisualizerWrapperType) => {
	return (
		<div className="complexity-container">
			<div className="complexity-wrapper">
				<div className="header-wrapper">
					<div className="heading">Time Complexity</div>
				</div>

				<div className="complexity-graph">{children}</div>

				<div className="cases-wrapper">
					<div className="cases">Scenarios :</div>
					<div className="case">
						<div className="dot"></div>
						<div>Best case</div>
					</div>
					<div className="case">
						<div className="dot"></div>
						<div>Average case</div>
					</div>
					<div className="case">
						<div className="dot"></div>
						<div>Worst case</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const MultiPointCurveWithArea = () => {
	const data = [
		{ x: 0, y: 250 },
		{ x: 100, y: 200 },
		{ x: 150, y: 100 },
		{ x: 200, y: 150 },
		{ x: 250, y: 200 },
		{ x: 300, y: 100 },
		{ x: 350, y: 30 },
		{ x: 400, y: 100 },
		{ x: 450, y: 10 },
	]
	const generatePath = (points: { x: number; y: number }[]) => {
		if (points.length < 2) {
			return ''
		}

		const path = [`M ${points[0].x},${points[0].y}`]

		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[i]
			const p1 = points[i + 1]

			const midCurve = (p0.x + p1.x) / 2

			const cp0x = midCurve
			const cp0y = p0.y
			const cp1x = midCurve
			const cp1y = p1.y

			path.push(`C ${cp0x},${cp0y} ${cp1x},${cp1y} ${p1.x},${p1.y}`)
		}
		return path.join(' ')
	}

	const generateAreaPath = (points: { x: number; y: number }[]) => {
		const curvePath = generatePath(points)
		const lastPoint = points[points.length - 1]
		const firstPoint = points[0]

		return `${curvePath} L ${lastPoint.x},300 L ${firstPoint.x},300 Z`
	}

	const pathData = generatePath(data)

	const areaPathData = generateAreaPath(data)

	return (
		<svg width="400" height="250" className="graph">
			<defs>
				<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#1da1f2 " stopOpacity="0.5" />
					<stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0.2" />
				</linearGradient>
			</defs>
			<path d={areaPathData} fill="url(#areaGradient)" stroke="none" />
			<path d={pathData} fill="none" stroke="#1da1f2" strokeWidth="2" />
			{data.map((point, index) => (
				<circle key={index} cx={point.x} cy={point.y} r="4" fill="#1da1f2" />
			))}
		</svg>
	)
}

type CodeBlockType = {
	setSelectedLanguage: React.Dispatch<React.SetStateAction<number>>
	setIsCodeBlockOpen: React.Dispatch<React.SetStateAction<boolean>>
	isCodeBlockOpen: boolean
	selectedLanguage: number
}

export const CodeBlock: React.FC<CodeBlockType> = ({
	setSelectedLanguage,
	setIsCodeBlockOpen,
	isCodeBlockOpen,
	selectedLanguage,
}): React.JSX.Element => {
	return (
		<div className="code-block-container">
			<div className="code-block-wrapper">
				<div
					className="header-wrapper"
					onClick={() => setIsCodeBlockOpen(!isCodeBlockOpen)}
				>
					<div className="heading">Code instructions</div>
					<div className="toggle-btn">V</div>
				</div>
				<div className={`code-block ${isCodeBlockOpen ? 'expand' : ''}`}>
					{!isCodeBlockOpen && (
						<div className="language-switcher-container">
							<div className="language-switcher-wrapper">
								{Array.from({ length: 5 }).map((_, ind: number) => (
									<LanguageSelector
										key={ind}
										selectedLanguage={selectedLanguage}
										setSelectedLanguage={setSelectedLanguage}
										ind={ind}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

type LanguageSelectorType = {
	setSelectedLanguage: React.Dispatch<React.SetStateAction<number>>
	selectedLanguage: number
	ind: number
}

export const LanguageSelector: React.FC<LanguageSelectorType> = ({
	setSelectedLanguage,
	selectedLanguage,
	ind,
}): React.JSX.Element => {
	return (
		<div
			className={`language-option ${selectedLanguage === ind + 1 ? 'active' : ''}`}
			onClick={() => setSelectedLanguage(ind + 1)}
		>
			option {ind + 1}
		</div>
	)
}
