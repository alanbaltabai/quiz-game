import Option from './Option';

export default function Test(props) {
	function cleanseString(str) {
		return str
			.replace(/&#039;/g, "'")
			.replace(/&quot;/g, '"')
			.replace(/&eacute;/g, 'é')
			.replace(/&Eacute;/g, 'É')
			.replace(/&Uuml;/g, 'Ü')
			.replace(/&uuml;/g, 'ü')
			.replace(/&shy;/g, '-')
			.replace(/&Delta;/g, 'Δ')
			.replace(/&amp;/g, '&')
			.replace(/&rsquo;/g, '`')
			.replace(/&lrm;/g, '')
			.replace(/&hellip;/g, '…')
			.replace(/&rdquo;/g, '”')
			.replace(/&ldquo;/g, '“')
			.replace(/&oacute;/g, 'ó')
			.replace(/&aacute;/g, 'á')
			.replace(/&iacute;/g, 'í')
			.replace(/&ntilde;/g, 'ñ')
			.replace(/&ouml;/g, 'ö');
	}

	const optionDivs = props.options.map((item) => (
		<Option
			key={crypto.randomUUID()}
			handleChange={props.handleChange}
			radioData={props.radioData}
			radioNumber={props.radioNumber}
			gameOver={props.gameOver}
			checkedIds={props.checkedIds}
			score={props.score}
			radioValue={item.id}
			option={item.option}
			isCorrect={item.isCorrect}
			cleanseString={cleanseString}
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
