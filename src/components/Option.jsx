export default function Option(props) {
	function cleanseString(str) {
		return str
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&eacute;/g, 'é')
			.replace(/&Uuml;/g, 'Ü')
			.replace(/&shy;/g, '-')
			.replace(/&Delta;/g, 'Δ');
	}

	return (
		<div
			className={props.isHeld ? 'option held' : 'option'}
			onClick={() => props.holdOption(props.value)}
		>
			<p>{cleanseString(props.value)}</p>
		</div>
	);
}
