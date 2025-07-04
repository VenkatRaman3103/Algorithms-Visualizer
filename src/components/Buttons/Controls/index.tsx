import { useSorting } from '@/components/SortingContext'
import './index.scss'

export const Controls = () => {
	const {
		resetArray,
		isRunning,
		isPlaying,
		setIsPlaying,
		currentStep,
		setCurrentStep,
		totalSteps,
		arrState,
		setArrState,
	} = useSorting()

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying)
	}

	const handleBackward = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1)
		}
	}

	const handleForward = () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleShuffle = () => {
		if (!isRunning) {
			const shuffled = [...arrState].sort(() => Math.random() - 0.5)
			setArrState(shuffled.map((item, idx) => ({ ...item, position: idx })))
		}
	}

	return (
		<div className="controls-container">
			<div className="controls-wrapper">
				<div className="reset btn" onClick={resetArray}>
					reset
				</div>
				<div
					className={`backward btn ${currentStep === 0 ? 'disabled' : ''}`}
					onClick={handleBackward}
				>
					backward
				</div>
				<div className="play-pause btn" onClick={handlePlayPause}>
					{isPlaying ? 'pause' : 'play'}
				</div>
				<div
					className={`forward btn ${currentStep >= totalSteps ? 'disabled' : ''}`}
					onClick={handleForward}
				>
					forward
				</div>
				<div
					className={`shuffle btn end ${isRunning ? 'disabled' : ''}`}
					onClick={handleShuffle}
				>
					shuffle
				</div>
			</div>
		</div>
	)
}
