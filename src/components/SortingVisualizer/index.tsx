'use client'

import React, { useState } from 'react'
import './index.scss'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'

export const SortingVisualizer: React.FC = (): React.JSX.Element => {
	const [isToggleActive, setIsToggleActive] = useState<boolean>(false)

	const arr = [
		22, 14, 6, 18, 9, 21, 3, 17, 11, 2, 20, 8, 15, 1, 19, 7, 16, 4, 13, 5, 10, 12, 21, 14, 5,
		26, 7, 16, 4, 14, 6, 18, 9, 21, 3, 17, 11, 2, 20, 8, 15, 1,
	]

	return (
		<>
			<div className="sorting-visualizer-container">
				<Tray setIsToggleActive={setIsToggleActive} isToggleActive={isToggleActive} />
				<div className="sorting-preview-container">
					<div className="sorting-preview-wrapper">
						{arr.map((num) => (
							<div
								className={`sorting-strip`}
								style={{ height: `calc(${num}0px + 300px)` }}
							></div>
						))}
					</div>
				</div>
			</div>
			<Buttons />
		</>
	)
}

type TrayProp = {
	setIsToggleActive: React.Dispatch<React.SetStateAction<boolean>>
	isToggleActive: boolean
}

export const Tray: React.FC<TrayProp> = ({
	setIsToggleActive,
	isToggleActive,
}): React.JSX.Element => {
	return (
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
	)
}

export const Buttons: React.FC = (): React.JSX.Element => {
	return (
		<>
			<div className="buttons-wrapper">
				<div className="paus-and-play-btn">
					<div className="btn-wrapper-play">
						<div className="btn-icon"></div>
						<div className="btn-label">Play</div>
					</div>
				</div>
				<div className="shuffle-btn">
					<div className="btn-wrapper-shuffle">
						<div className="btn-icon"></div>
						<div className="btn-label">Shuffle</div>
					</div>
				</div>
				<div className="reset-btn">
					<div className="btn-wrapper-reset">
						<div className="btn-icon"></div>
						<div className="btn-label">Reset</div>
					</div>
				</div>
				<div className="delay-btn-wrapper">
					<div className="delay-btn-slidder"></div>
					<div className="delay-btn-label"></div>
				</div>
			</div>
		</>
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
