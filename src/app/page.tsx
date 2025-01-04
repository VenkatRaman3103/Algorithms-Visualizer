'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useEffect, useState } from 'react'
import { SortingVisualizer } from '@/components/SortingVisualizer'

export default function Home() {
	const [algorithm, setAlgorithm] = useState<'insertion' | 'merge'>('insertion')
	return <SortingVisualizer algorithm={algorithm} />
}
