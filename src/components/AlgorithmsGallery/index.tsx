import React from 'react'

import './index.scss'

export const AlgorithmsGallery = () => {
	return (
		<>
			<div className="gallery-container">
				<div className="gallery-wrapper">
					<AlgorithmsPreview />
					<AlgorithmsPreview />
					<AlgorithmsPreview />
					<AlgorithmsPreview />
					<AlgorithmsPreview />
					<AlgorithmsPreview />
					<AlgorithmsPreview />
				</div>
			</div>
		</>
	)
}

export const AlgorithmsPreview = () => {
	return (
		<>
			<div className="preview-container">
				<div className="preview-wrapper">
					<div className="topic">topic</div>
					<div className="image"></div>
					<div className="divider"></div>
					<div className="heading">Heading</div>
					<div className="description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet veritatis
						praesentium iusto!
					</div>
				</div>
			</div>
		</>
	)
}
