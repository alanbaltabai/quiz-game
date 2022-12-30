import Option from './Option';

export default function Test(props) {
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

	const optionDivs = props.options.map((item) => (
		<Option
			key={crypto.randomUUID()}
			handleChange={props.handleChange}
			radioData={props.radioData}
			radioNumber={props.radioNumber}
			radioValue={item.id}
			option={item.option}
			isCorrect={item.isCorrect}
			gameOver={props.gameOver}
			checkedIds={props.checkedIds}
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
