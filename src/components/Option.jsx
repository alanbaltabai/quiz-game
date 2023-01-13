export default function Option(props) {
	function transform() {
		const isChecked = props.checkedIds.includes(props.radioValue);

		if (props.score === 0) {
			if (props.isCorrect) return 'incorrect-label';
			return 'gray-label';
		} else {
			if (props.isCorrect) return 'correct-label';
			if (isChecked && !props.isCorrect) return 'incorrect-label';
			return 'gray-label';
		}
	}

	return (
		<>
			{props.gameOver ? (
				<div className='option'>
					<input
						disabled
						type='radio'
						name={`radioOption` + props.radioNumber}
						id={props.radioValue}
						value={props.radioValue}
						checked={
							props.radioData['radioOption' + props.radioNumber] ===
							props.radioValue
						}
						onChange={props.handleChange}
					/>
					<label className={transform()} htmlFor={props.radioValue}>
						{props.cleanseString(props.option)}
					</label>
				</div>
			) : (
				<div className='option'>
					<input
						type='radio'
						name={`radioOption` + props.radioNumber}
						id={props.radioValue}
						value={props.radioValue}
						checked={
							props.radioData['radioOption' + props.radioNumber] ===
							props.radioValue
						}
						onChange={props.handleChange}
					/>
					<label className='in-game-label' htmlFor={props.radioValue}>
						{props.cleanseString(props.option)}
					</label>
				</div>
			)}

			{}
		</>
	);
}
