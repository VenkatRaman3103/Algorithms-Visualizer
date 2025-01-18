import React, { useState } from 'react'
import './index.scss'

export const Algorithm = () => {
	const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(true)
	return (
		<>
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
						<div className={`code-block ${isCodeBlockOpen ? 'expand' : ''}`}></div>
					</div>
				</div>
			</div>
		</>
	)
}
