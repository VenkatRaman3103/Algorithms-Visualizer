import React, { useEffect, useState } from 'react'
import './index.scss'

export const Algorithm = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(1)
	const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(true)
	const [delayedOptionsVisible, setDelayedOptionsVisible] = useState(false)

	useEffect(() => {
		if (!isCodeBlockOpen) {
			const timer = setTimeout(() => setDelayedOptionsVisible(true), 300)
			return () => clearTimeout(timer)
		} else {
			setDelayedOptionsVisible(false)
		}
	}, [isCodeBlockOpen])

	return (
		<div className="main-container">
			<IntroSection />
			<CodeBlock
				setIsCodeBlockOpen={setIsCodeBlockOpen}
				isCodeBlockOpen={isCodeBlockOpen}
				delayedOptionsVisible={delayedOptionsVisible}
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

				<TimeComplexity />

				<div className="divider"></div>
			</div>
		</div>
	)
}

export const TimeComplexity = () => {
	const data = [
		{ x: 50, y: 250 },
		{ x: 100, y: 200 },
		{ x: 150, y: 100 },
		{ x: 200, y: 150 },
		{ x: 300, y: 100 },
		{ x: 380, y: 50 },
	]
	return (
		<div className="time-container">
			<div className="time-wrapper">
				<div className="heading">Time Complexity</div>

				<div className="time-complexity-graph">
					<MultiPointCurveWithArea data={data} />
				</div>
			</div>
		</div>
	)
}

const MultiPointCurveWithArea = ({ data }) => {
	const generatePath = (points) => {
		if (points.length < 2) {
			return ''
		}

		const path = [`M ${points[0].x},${points[0].y}`]

		for (let i = 0; i < points.length - 1; i++) {
			let p0 = points[i]
			let p1 = points[i + 1]

			let midCurve = (p0.x + p1.x) / 2

			let cp0x = midCurve
			let cp0y = p0.y
			let cp1x = midCurve
			let cp1y = p1.y

			path.push(`C ${cp0x},${cp0y} ${cp1x},${cp1y} ${p1.x},${p1.y}`)
		}
		return path.join(' ')
	}

	const generateAreaPath = (points) => {
		const curvePath = generatePath(points)
		const lastPoint = points[points.length - 1]
		const firstPoint = points[0]

		return `${curvePath} L ${lastPoint.x},300 L ${firstPoint.x},300 Z`
	}

	const pathData = generatePath(data)

	const areaPathData = generateAreaPath(data)

	return (
		<svg width="400" height="300" className="graph">
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

export const CodeBlock = ({
	setSelectedLanguage,
	setIsCodeBlockOpen,
	isCodeBlockOpen,
	delayedOptionsVisible,
	selectedLanguage,
}) => {
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
					{!isCodeBlockOpen && delayedOptionsVisible && (
						<div className="language-switcher-container">
							<div className="language-switcher-wrapper">
								{Array.from({ length: 5 }).map((item, ind) => (
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

export const LanguageSelector = ({ setSelectedLanguage, selectedLanguage, ind }) => {
	return (
		<div
			className={`language-option ${selectedLanguage === ind + 1 ? 'active' : ''}`}
			onClick={() => setSelectedLanguage(ind + 1)}
		>
			option {ind + 1}
		</div>
	)
}
