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
			.replace(/&rsquo;/g, '`');
	}

	const optionDivs = props.options.map((item) => (
		<Option
			key={crypto.randomUUID()}
			handleChange={props.handleChange}
			radioData={props.radioData}
			option={item.option}
			correctivity={item.correctivity}
			question={cleanseString(props.question)}
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
