import React from 'react'
import './index.scss'

export const Algorithm = () => {
	return (
		<>
			<div className="main-container">
				<div>Algorithm</div>
				<div className="code-block-container">
					<div className="code-block-wrapper">
						<div className="header-wrapper">
							<div className="heading">Code instructions</div>
							<div className="toggle-btn">V</div>
						</div>
						<div className="code-block"></div>
					</div>
				</div>
			</div>
		</>
	)
}
