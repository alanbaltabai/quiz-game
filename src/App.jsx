import { useState, useEffect } from 'react';

import Test from './components/Test';

function App() {
	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
			.then((response) => response.json())
			.then((testData) => {
				setTest(
					testData.results.map((item) => {
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
						item.options = shuffle(answers);

						delete item.category;
						delete item.difficulty;
						delete item.type;
						delete item.correct_answer;
						delete item.incorrect_answers;

						return item;
					})
				);
			});
	}, []);

	function shuffle(array) {
		for (let i = 0; i < array.length; i++) {
			const j = Math.floor(Math.random() * array.length);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	}

	function holdOption(option) {
		console.log(option);

		setTest((prevTest) =>
			prevTest.map((obj) => ({
				...obj,
				options: obj.options.map((item) =>
					item.option === option ? { ...item, isHeld: !item.isHeld } : item
				),
			}))
		);

		console.log(test);
	}

	const [startQuiz, setStartQuiz] = useState(true);
	const [test, setTest] = useState([]);

	const testDivs = test.map((item) => (
		<Test
			key={crypto.randomUUID()}
			question={item.question}
			options={item.options}
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
					<div className='questions'>{testDivs}</div>
					<button className='button button-check-answers'>Check answers</button>
				</div>
			)}
		</div>
	);
}

export default App;
