import React, { useEffect, useState } from 'react'
import './index.scss'

export const Algorithm = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(1)
	const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(true)
	const [delayedOptionsVisible, setDelayedOptionsVisible] = useState(false)

	useEffect(() => {
		if (!isCodeBlockOpen) {
			const timer = setTimeout(() => setDelayedOptionsVisible(true), 300)
			return () => clearTimeout(timer)
		} else {
			setDelayedOptionsVisible(false)
		}
	}, [isCodeBlockOpen])

	return (
		<div className="main-container">
			<div>Algorithm</div>
			<div className="code-block-container">
				<div className="code-block-wrapper">
					<div
						className="header-wrapper"
						onClick={() => setIsCodeBlockOpen(!isCodeBlockOpen)}
					>
						<div className="heading">Code instructions</div>
						<div className="toggle-btn">V</div>
					</div>
					<div className={`code-block ${isCodeBlockOpen ? 'expand' : ''}`}>
						{!isCodeBlockOpen && delayedOptionsVisible && (
							<div className="language-switcher-container">
								<div className="language-switcher-wrapper">
									{Array.from({ length: 5 }).map((item, ind) => (
										<LanguageSelector
											key={ind}
											selectedLanguage={selectedLanguage}
											setSelectedLanguage={setSelectedLanguage}
											ind={ind}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export const LanguageSelector = ({ setSelectedLanguage, selectedLanguage, ind }) => {
	return (
		<div
			className={`language-option ${selectedLanguage === ind + 1 ? 'active' : ''}`}
			onClick={() => setSelectedLanguage(ind + 1)}
		>
			option {ind + 1}
		</div>
	)
}
