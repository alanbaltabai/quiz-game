import Option from './Option';

export default function Test(props) {
	function cleanseString(str) {
		return str
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&eacute;/g, 'é')
			.replace(/&Uuml;/g, 'Ü')
			.replace(/&shy;/g, '-')
			.replace(/&Delta;/g, 'Δ');
	}

	function shuffle(array) {
		for (let i = 0; i < array.length; i++) {
			const j = Math.floor(Math.random() * array.length);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	}

	const optionDivs = shuffle(props.options).map((item) => (
		<Option
			key={crypto.randomUUID()}
			isheld={false}
			holdOption={props.holdOption}
			value={item}
		/>
	));

	return (
		<div className='question-container'>
			<p className='question'>{cleanseString(props.question)}</p>
			<div className='options'>{optionDivs}</div>
			<div className='breakline'></div>
		</div>
	);
}
