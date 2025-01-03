'use client'

import React, { useState } from 'react'
import './index.scss'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'

export const SortingVisualizer: React.FC = (): React.JSX.Element => {
	const [isToggleActive, setIsToggleActive] = useState<boolean>(false)

	return (
		<div className="sorting-visualizer-container">
			<div
				className={`options-tray-toggle ${isToggleActive ? 'open-tray' : ''}`}
				onMouseEnter={() => setIsToggleActive(true)}
				onMouseLeave={() => setIsToggleActive(true)}
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
