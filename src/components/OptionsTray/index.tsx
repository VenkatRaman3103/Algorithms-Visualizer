import { useState } from 'react'
import { useSorting } from '../SortingContext'

export const OptionsTray: React.FC = (): React.JSX.Element => {
	return (
		<div className="option-tray-wrapper">
			<InitialCondition />
			<ProblemSize />
		</div>
	)
}

export const InitialCondition: React.FC = (): React.JSX.Element => {
	const { initialCondition, setInitialCondition, isRunning } = useSorting()

	return (
		<>
			<OptionItemsHeading heading={'Initial Condition'} />
			<div className="conditions-wrapper">
				<Options
					optionHeading={'Random'}
					isSelected={initialCondition === 'Random'}
					onClick={() => !isRunning && setInitialCondition('Random')}
					disabled={isRunning}
				/>
				<Options
					optionHeading={'Nearly Sorted'}
					isSelected={initialCondition === 'Nearly Sorted'}
					onClick={() => !isRunning && setInitialCondition('Nearly Sorted')}
					disabled={isRunning}
				/>
				<Options
					optionHeading={'Reversed'}
					isSelected={initialCondition === 'Reversed'}
					onClick={() => !isRunning && setInitialCondition('Reversed')}
					disabled={isRunning}
				/>
				<Options
					optionHeading={'Few Unique'}
					isSelected={initialCondition === 'Few Unique'}
					onClick={() => !isRunning && setInitialCondition('Few Unique')}
					disabled={isRunning}
				/>
			</div>
			<Divider />
		</>
	)
}

export const Options: React.FC<{
	optionHeading: string
	isSelected?: boolean
	onClick?: () => void
	disabled?: boolean
}> = ({ optionHeading, isSelected, onClick, disabled }): React.JSX.Element => {
	return (
		<div
			className={`option-wrapper ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
			onClick={onClick}
		>
			<div className="option-preview"></div>
			<div className="option-heading">
				<p>{optionHeading}</p>
			</div>
		</div>
	)
}

export const ProblemSize: React.FC = (): React.JSX.Element => {
	const { problemSize, setProblemSize, isRunning } = useSorting()
	const sizes = [10, 20, 30, 40, 50]
	const selectedIndex = sizes.indexOf(problemSize)

	const handleCountClick = (size: number, index: number) => {
		if (!isRunning) {
			setProblemSize(size)
		}
	}

	return (
		<>
			<OptionItemsHeading heading={'Count'} />
			<div className="problem-size-wrapper">
				{sizes.map((count, index) => (
					<div
						key={index}
						className={`count ${selectedIndex === index ? 'selected' : ''} ${isRunning ? 'disabled' : ''}`}
						onClick={() => handleCountClick(count, index)}
					>
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

export const OptionItemsHeading: React.FC<{
	heading: string
}> = ({ heading }): React.JSX.Element => {
	return <h1 className="options-heading">{heading}</h1>
}

export const Divider: React.FC = (): React.JSX.Element => {
	return <div className="divider"></div>
}

export const OptionTrayToggle = () => {
	return (
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
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.3594 21.4L15.3594 1.60003"
				stroke="#B6B6B8"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
