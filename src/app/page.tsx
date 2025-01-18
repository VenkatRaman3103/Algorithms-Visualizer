'use client'
import { AlgorithmsGallery } from '@/components/AlgorithmsGallery'
import { Homepage } from '@/components/HomePage'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
	return (
		<>
			<Homepage />
			<AlgorithmsGallery />
		</>
	)
}
