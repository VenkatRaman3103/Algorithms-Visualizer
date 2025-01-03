import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
	Divider,
	InitialCondition,
	OptionItemsHeading,
	Options,
	OptionsTray,
	ProblemSize,
	SortingVisualizer,
} from '@/components/SortingVisualizer'

describe('SortingVisualizer Component', () => {
	it('renders the SortingVisualizer component', () => {
		render(<SortingVisualizer />)
		expect(screen.getByClassName('sorting-visualizer-container')).toBeInTheDocument()
	})

	it('toggles the options tray on hover', () => {
		render(<SortingVisualizer />)
		const toggleDiv = screen.getByClassName('options-tray-toggle')

		fireEvent.mouseEnter(toggleDiv)
		expect(toggleDiv).toHaveClass('open-tray')

		fireEvent.mouseLeave(toggleDiv)
		expect(toggleDiv).toHaveClass('open-tray')
	})
})

describe('OptionsTray Component', () => {
	it('renders the OptionsTray component', () => {
		render(<OptionsTray />)
		expect(screen.getByClassName('option-tray-wrapper')).toBeInTheDocument()
	})

	it('contains InitialCondition and ProblemSize components', () => {
		render(<OptionsTray />)
		expect(screen.getByText('Initial Condition')).toBeInTheDocument()
		expect(screen.getByText('Count')).toBeInTheDocument()
	})
})

describe('InitialCondition Component', () => {
	it('renders all initial condition options', () => {
		render(<InitialCondition />)
		expect(screen.getByText('Random')).toBeInTheDocument()
		expect(screen.getByText('Nearly Sorted')).toBeInTheDocument()
		expect(screen.getByText('Reversed')).toBeInTheDocument()
		expect(screen.getByText('Few Unique')).toBeInTheDocument()
	})
})

describe('Options Component', () => {
	it('renders an option with a given heading', () => {
		render(<Options optionHeading="Test Option" />)
		expect(screen.getByText('Test Option')).toBeInTheDocument()
	})
})

describe('ProblemSize Component', () => {
	it('renders count options and highlights selected count', () => {
		render(<ProblemSize />)

		const counts = screen.getAllByClassName('count')
		expect(counts.length).toBe(5)

		fireEvent.click(counts[2])
		const highlight = screen.getByClassName('highlight')
		expect(highlight).toHaveStyle('transform: translateX(200%)')
	})
})

describe('OptionItemsHeading Component', () => {
	it('renders heading text', () => {
		render(<OptionItemsHeading heading="Test Heading" />)
		expect(screen.getByText('Test Heading')).toBeInTheDocument()
	})
})

describe('Divider Component', () => {
	it('renders a divider', () => {
		render(<Divider />)
		expect(screen.getByClassName('divider')).toBeInTheDocument()
	})
})
