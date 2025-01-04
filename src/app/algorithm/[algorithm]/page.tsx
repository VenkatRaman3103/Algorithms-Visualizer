'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SortingVisualizer } from '@/components/SortingVisualizer'

export default function AlgorithmPage({ params }: { params: { algorithm: string } }) {
	const router = useRouter()
	const { algorithm } = params

	// Validate algorithm
	const validAlgorithms = ['insertion', 'merge']
	if (!validAlgorithms.includes(algorithm)) {
		router.push('/') // Redirect to home if invalid
		return null
	}

	return (
		<div className="algorithm-page">
			{/* Back button */}
			<div className="back-button" onClick={() => router.push('/')}>
				Back
			</div>

			{/* SortingVisualizer */}
			<div className="visualizer-wrapper">
				<SortingVisualizer algorithm={algorithm as 'insertion' | 'merge'} />
			</div>
		</div>
	)
}
