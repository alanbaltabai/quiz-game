export default function Option(props) {
	function cleanseString(str) {
		return str
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&eacute;/g, 'é')
			.replace(/&Uuml;/g, 'Ü')
			.replace(/&shy;/g, '-')
			.replace(/&Delta;/g, 'Δ')
			.replace(/&amp;/g, '&')
			.replace(/&rsquo;/g, '`')
			.replace(/&lrm;/g, '')
			.replace(/&hellip;/g, '…')
			.replace(/&rdquo;/g, '”')
			.replace(/&ldquo;/g, '“')
			.replace(/&oacute;/g, 'ó');
	}

	function transform() {
		const isChecked = props.checkedIds.includes(props.radioValue);

		if (props.isCorrect) return 'correct-label';
		if (isChecked && !props.isCorrect) return 'incorrect-label';

		return 'gray-label';
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
						{cleanseString(props.option)}
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
						{cleanseString(props.option)}
					</label>
				</div>
			)}

			{}
		</>
	);
}
