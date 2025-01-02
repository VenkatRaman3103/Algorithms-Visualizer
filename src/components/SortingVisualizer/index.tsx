import React from 'react'
import './index.scss'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'

export const SortingVisualizer: React.FC = (): React.JSX.Element => {
	return (
		<div className="sorting-visualizer-container">
			<div className="options-tray-toggle">
				<OptionTrayToggle />
			</div>
		</div>
	)
}
