import { useState, useEffect } from 'react';

import Test from './components/Test';

function App() {
	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
			.then((response) => response.json())
			.then((testData) => {
				test = testData.results;
				setUpdatedTest(
					test.map((item) => {
						const corAnswer = {
							option: item.correct_answer,
							correctivity: true,
							isHeld: false,
						};

						let answers = [];
						for (let i = 0; i < item.incorrect_answers.length; i++) {
							answers.push({
								option: item.incorrect_answers[i],
								correctivity: false,
								isHeld: false,
							});
						}

						answers.push(corAnswer);
						item.options = answers;

						delete item.category;
						delete item.difficulty;
						delete item.type;
						delete item.correct_answer;
						delete item.incorrect_answers;

						return item;
					})
				);

				console.log(test);
			});
	}, []);

	function holdOption(value) {
		console.log(value);

		/* setTest((prevTest) =>
			prevTest.map((item) =>
				item.id === id ? { ...item, isHeld: !item.isHeld } : item
			)
		); */

		tes;
	}

	const [startQuiz, setStartQuiz] = useState(true);
	let test;
	const [updatedTest, setUpdatedTest] = useState([]);

	const testDivs = updatedTest.map((item) => (
		<Test
			key={crypto.randomUUID()}
			question={item.question}
			// options={[...item.incorrect_answers, item.correct_answer]}
			holdOption={holdOption}
		/>
	));

	return (
		<div className={startQuiz ? 'container grid-center' : 'container'}>
			<div className='blob-yellow'></div>
			<div className='blob-lightblue'></div>

			{startQuiz ? (
				<div className='intro'>
					<h1 className='intro__title'>Quizzical</h1>
					<p className='intro__desc'>Check your knowledge of this and that!</p>
					<button
						onClick={() => setStartQuiz(false)}
						className='button intro__button'
					>
						Start quiz
					</button>
				</div>
			) : (
				<div className='quiz'>
					{/* <div className='questions'>{testDivs}</div> */}
					<button
						onClick={() => console.log(test)}
						className='button button-check-answers'
					>
						Check answers
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
