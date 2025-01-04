'use client'
import Image from 'next/image'
import styles from './page.module.css'
import './page.scss'
import React, { useEffect, useState } from 'react'
import { SortingVisualizer } from '@/components/SortingVisualizer'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'

export default function Home() {
	const [algorithm, setAlgorithm] = useState<'insertion' | 'merge'>('insertion')
	const [isMenuBar, setIsMenuBar] = useState<boolean>()

	const listOfAlgorithms = ['insertion', 'merge']

	return (
		<>
			<div className="page-container">
				<div className={`search-container`}>
					<div className={`search-wrapper`}>
						<div className="search-label">Search the Algorithms</div>
						<div className="search-icon"></div>
					</div>

					<div className="menubar-container">
						{listOfAlgorithms.map((item) => (
							<div className="menubar-options">
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
					<SortingVisualizer algorithm={algorithm} />
				</div>
			</div>
		</>
	)
}
