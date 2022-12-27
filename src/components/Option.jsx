export default function Option(props) {
	function cleanseString(str) {
		return str
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&eacute;/g, 'é')
			.replace(/&Uuml;/g, 'Ü')
			.replace(/&shy;/g, '-')
			.replace(/&Delta;/g, 'Δ')
			.replace(/&amp;/g, '&');
	}

	return (
		<div
			className={props.isHeld ? 'option held' : 'option'}
			onClick={() => props.holdOption(props.option)}
		>
			<p>{cleanseString(props.option)}</p>
		</div>
	);
}
