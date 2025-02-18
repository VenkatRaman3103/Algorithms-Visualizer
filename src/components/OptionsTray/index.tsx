import { useState } from 'react'

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
