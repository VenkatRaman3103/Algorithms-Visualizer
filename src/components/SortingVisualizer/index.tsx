'use client'

import React, { useEffect, useState } from 'react'
import './index.scss'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'

export const SortingVisualizer: React.FC = ({ algorithm }): React.JSX.Element => {
	const arrTemp = [22, 14, 6, 18, 9, 21, 3, 17, 11, 2, 20, 8, 15, 19, 7, 16, 4, 13, 5, 10, 12, 1]
	const [arr, setArr] = useState<number[]>(arrTemp)
	const [isToggleActive, setIsToggleActive] = useState<boolean>(false)
	const [play, setPlay] = useState<boolean>(false)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const speed = 300

	useEffect(() => {
		if (play) {
			async function insertionSort(A: number[]) {
				for (let i = 1; i < A.length; i++) {
					let key = A[i]
					let j = i - 1

					while (j >= 0 && A[j] > key) {
						setActiveIndex(j)
						A[j + 1] = A[j]
						j = j - 1
						await new Promise((resolve) => setTimeout(resolve, speed))
						setArr([...A])
					}

					A[j + 1] = key
					setActiveIndex(j)
					await new Promise((resolve) => setTimeout(resolve, speed))
					setArr([...A])
				}
			}

			async function mergeSort(A: number[], p: number, r: number) {
				if (p < r) {
					const q = Math.floor((p + r) / 2)
					await mergeSort(A, p, q)
					await mergeSort(A, q + 1, r)
					await merge(A, p, q, r)
				}
			}

			async function merge(A: number[], p: number, q: number, r: number) {
				let nL = q - p + 1
				let nR = r - q
				let L = Array(nL).fill(0)
				let R = Array(nR).fill(0)

				for (let i = 0; i < L.length; i++) {
					L[i] = A[p + i]
				}

				for (let i = 0; i < R.length; i++) {
					R[i] = A[q + 1 + i]
				}

				let k = p
				let i = 0
				let j = 0

				while (i < L.length && j < R.length) {
					if (L[i] <= R[j]) {
						A[k] = L[i]
						i++
					} else {
						A[k] = R[j]
						j++
					}
					k++
					setActiveIndex(k)
					setArr([...A])
					await new Promise((resolve) => setTimeout(resolve, speed))
				}

				while (i < L.length) {
					A[k] = L[i]
					i++
					k++
					setActiveIndex(k)
					setArr([...A])
					await new Promise((resolve) => setTimeout(resolve, speed))
				}

				while (j < R.length) {
					A[k] = R[j]
					j++
					k++
					setActiveIndex(k)
					setArr([...A])
					await new Promise((resolve) => setTimeout(resolve, speed))
				}
			}

			if (algorithm === 'insertion') {
				insertionSort([...arr])
			} else if (algorithm === 'merge') {
				mergeSort([...arr], 0, arr.length - 1)
			}
		}
	}, [play, algorithm])

	console.log('Active Index:', activeIndex)

	const getBackgroundColor = (ind: number) => {
		if (activeIndex === ind) {
			return 'red'
		} else if (activeIndex !== null && ind <= activeIndex) {
			return '#0e0e0e'
		}
		return ''
	}

	return (
		<>
			{/* <h1>{algorithm}</h1> */}
			<div className="sorting-visualizer-container">
				<div className="sorting-visualizer-wrapper">
					<Tray setIsToggleActive={setIsToggleActive} isToggleActive={isToggleActive} />
					<div className="sorting-preview-container">
						<div className="sorting-preview-wrapper">
							{arr.map((num: number, ind: number) => (
								<div
									key={ind}
									className={`sorting-strip ${activeIndex === ind ? 'active' : ''}`}
									style={{
										height: `calc(${num}0px + 300px)`,
										backgroundColor: getBackgroundColor(ind),
										order: `${ind}`,
									}}
								>
									{num}
								</div>
							))}
						</div>
					</div>
				</div>
				<Buttons setPlay={setPlay} play={play} />
			</div>
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
	)
}

export const Buttons: React.FC<{
	setPlay: React.Dispatch<React.SetStateAction<boolean>>
	play: boolean
}> = ({ setPlay, play }): React.JSX.Element => {
	return (
		<>
			<div className="buttons-wrapper">
				<div className="paus-and-play-btn" onClick={() => setPlay(!play)}>
					<div className="btn-wrapper-play">
						<div className="btn-icon"></div>
						<div className="btn-label">{play ? 'Pause' : 'Play'}</div>
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

type OptionsProp = {
	optionHeading: string
}

export const Options: React.FC<OptionsProp> = ({ optionHeading }): React.JSX.Element => {
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

interface OptionItemsHeadingProps {
	heading: string
}

export const OptionItemsHeading: React.FC<OptionItemsHeadingProps> = ({ heading }) => {
	return <h1 className="options-heading">{heading}</h1>
}

export const Divider: React.FC = (): React.JSX.Element => {
	return <div className="divider"></div>
}
