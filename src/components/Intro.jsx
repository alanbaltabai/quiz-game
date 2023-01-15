export default function Intro(props) {
	return (
		<div className='intro'>
			<h1 className='intro__title'>Quizzical</h1>
			<p className='intro__desc'>Check your knowledge of this and that!</p>
			<button onClick={props.handleQuiz} className='button intro__button'>
				Start quiz
			</button>
		</div>
	);
}
