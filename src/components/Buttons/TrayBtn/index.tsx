import { useState } from 'react'
import './index.scss'
import { OptionTrayToggle } from '@/assets/OptionTrayToggle'
import { OptionsTray } from '@/components/OptionsTray'

export const TrayBtn = () => {
	const [isToggleActive, setIsToggleActive] = useState<boolean>(false)
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
