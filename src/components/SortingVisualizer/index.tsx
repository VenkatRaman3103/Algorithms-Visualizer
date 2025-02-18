import { useEffect, useState } from 'react'
import './index.scss'

const data: number[] = [60, 10, 20, 30, 40, 50]

type EntryType = { height: number; position: number }

export const SortingVisualizer = () => {
	const [arrState, setArrState] = useState<EntryType[]>([])

	useEffect(() => {
		setArrState(data.map((value, index) => ({ height: value, position: index })))
	}, [])

	const moveToRightEnd = async () => {
		for (let i = 0; i < arrState.length - 1; i++) {
			await new Promise((resolve) => setTimeout(resolve, 500))
			setArrState((prevState) => {
				const newState = [...prevState]
				if (newState[i].height > newState[i + 1].height) {
					const temp = newState[i]
					newState[i] = newState[i + 1]
					newState[i + 1] = temp
				}
				return newState.map((item, idx) => ({ ...item, position: idx }))
			})
		}
	}

	return (
		<div className="sorting-container">
			<button onClick={moveToRightEnd}>Compare & Move to End</button>
			<div className="sorting-wrapper">
				{arrState.map(({ height, position }, index) => (
					<div
						key={index}
						className="strip"
						style={{
							height: `${height}0px`,
							transform: `translateX(${position * 50}px)`,
							transition: 'transform 0.5s ease-in-out',
						}}
					></div>
				))}
			</div>
		</div>
	)
}
