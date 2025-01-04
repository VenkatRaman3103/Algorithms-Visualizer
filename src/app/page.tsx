'use client'
import Image from 'next/image'
import styles from './page.module.css'
import './page.scss'
import React, { useEffect, useRef, useState } from 'react'
import { SortingVisualizer } from '@/components/SortingVisualizer'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'

export default function Home() {
	const [algorithm, setAlgorithm] = useState<'insertion' | 'merge'>('insertion')
	const [isMenuBar, setIsMenuBar] = useState<boolean>(false)
	const [activeAlgorithm, setActiveAlgorithm] = useState<string>('insertion')
	const [activeAlgorithmIndex, setActiveAlgorithmIndex] = useState<number>(0)

	const algorithmRefs = useRef<(HTMLDivElement | null)[]>([])

	const listOfAlgorithms = ['insertion', 'merge']

	useEffect(() => {
		if (activeAlgorithmIndex !== undefined && algorithmRefs.current[activeAlgorithmIndex]) {
			algorithmRefs.current[activeAlgorithmIndex].scrollIntoView({ behavior: 'smooth' })
		}
	}, [activeAlgorithmIndex])

	return (
		<>
			<div className="page-container">
				<div className={`search-container`}>
					<div className={`search-wrapper`}>
						<div className="search-label">Search the Algorithms</div>
						<div className="search-icon"></div>
					</div>

					<div className="menubar-container">
						{listOfAlgorithms.map((item, ind) => (
							<div
								key={ind}
								className="menubar-options"
								onMouseEnter={() => {
									setActiveAlgorithm(item)
									setActiveAlgorithmIndex(ind)
								}}
								onClick={() => {
									setAlgorithm(item)
									setIsMenuBar(false)
								}}
								ref={(el) => (algorithmRefs.current[ind] = el)}
							>
								<p>{item}</p>
							</div>
						))}
					</div>
				</div>

				<div
					className={`toggle-menu-btn ${isMenuBar ? 'moverRight' : ''}`}
					onClick={() => setIsMenuBar(!isMenuBar)}
				>
					<OptionTrayToggle />
				</div>

				<div className={`algorith-view-container ${isMenuBar ? 'minimize' : ''}`}>
					{listOfAlgorithms.map((item, ind) => (
						<div
							key={ind}
							className={`algorith-view-wrapper ${isMenuBar ? 'minimize' : ''}`}
							ref={(el) => (algorithmRefs.current[ind] = el)}
						>
							<SortingVisualizer algorithm={algorithm} />
						</div>
					))}
				</div>
			</div>
		</>
	)
}
