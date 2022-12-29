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
			.replace(/&ldquo;/g, '“');
	}

	function transform() {
		if (props.gameOver) {
			if (props.isCorrect) 'correct';
			if (!props.isCorrect && isChecked) return 'incorrect';

			return 'gray';
		}
	}

	/* let checkedIds = [];
	for (const key in props.radioData) {
		checkedIds.push(radioData[key]);
	}
	const isChecked = checkedIds.every((item) => props.radioValue === item.id); */

	return (
		<div className='option'>
			{props.gameOver ? (
				<input
					type='radio'
					name={`radioOption` + props.radioNumber}
					id={cleanseString(props.option)}
					value={props.radioValue}
					checked={
						props.radioData['radioOption' + props.radioNumber] ===
						props.radioValue
					}
					disabled
					isCorrect={props.isCorrect}
					onChange={props.handleChange}
				/>
			) : (
				<input
					type='radio'
					name={`radioOption` + props.radioNumber}
					id={cleanseString(props.option)}
					value={props.radioValue}
					checked={
						props.radioData['radioOption' + props.radioNumber] ===
						props.radioValue
					}
					isCorrect={props.isCorrect}
					onChange={props.handleChange}
				/>
			)}

			{
				<label
					/* className={transform()} */ htmlFor={cleanseString(props.option)}
				>
					{cleanseString(props.option)}
				</label>
			}
		</div>
	);
}
