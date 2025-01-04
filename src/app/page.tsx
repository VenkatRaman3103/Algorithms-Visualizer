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
			<div className="menubar-container"></div>
			<div className="toggle-menu-btn" onClick={() => setIsMenuBar(!isMenuBar)}>
				<OptionTrayToggle />
			</div>
			<div className={`algorith-view-container ${isMenuBar ? 'minimize' : ''}`}>
				<SortingVisualizer algorithm={algorithm} />
			</div>
		</>
	)
}
