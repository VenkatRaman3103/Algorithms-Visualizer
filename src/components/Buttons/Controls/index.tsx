import './index.scss'

export const Controls = () => {
	return (
		<div className="controls-container">
			<div className="controls-wrapper">
				<div className="reset btn">reset</div>
				<div className="backward btn">backward</div>
				<div className="play-pause btn">play</div>
				<div className="forward btn">forward</div>
				<div className="shuffle btn end">shuffle</div>
			</div>
		</div>
	)
}
