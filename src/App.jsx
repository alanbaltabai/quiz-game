import { useState, useEffect } from 'react';

import Test from './components/Test';
import closeIcon from './assets/close-icon.png';

export default function App() {
	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
			.then((response) => response.json())
			.then((testData) => {
				setTest(
					testData.results.map((item) => {
						const corAnswer = {
							option: item.correct_answer,
							isCorrect: true,
							id: crypto.randomUUID(),
						};

						let answers = [];
						for (let i = 0; i < item.incorrect_answers.length; i++) {
							answers.push({
								option: item.incorrect_answers[i],
								isCorrect: false,
								id: crypto.randomUUID(),
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

	function startQuiz() {
		setIsQuiz(true);
	}

	function endQuiz() {
		setIsQuiz(false);
		setGameOver(false);

		fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
			.then((response) => response.json())
			.then((testData) => {
				setTest(
					testData.results.map((item) => {
						const corAnswer = {
							option: item.correct_answer,
							isCorrect: true,
							id: crypto.randomUUID(),
						};

						let answers = [];
						for (let i = 0; i < item.incorrect_answers.length; i++) {
							answers.push({
								option: item.incorrect_answers[i],
								isCorrect: false,
								id: crypto.randomUUID(),
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
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setRadioData((prevRadioData) => ({
			...prevRadioData,
			[name]: value,
		}));
	}

	function checkAnswers() {
		setGameOver(true);

		/* if (score === 0) {
			setTest((prevTest) =>
				prevTest.map((object) => ({
					...object,
					options: object.map((item) => item),
				}))
			);
		} */
	}

	function playAgain() {
		setGameOver(false);

		fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
			.then((response) => response.json())
			.then((testData) => {
				setTest(
					testData.results.map((item) => {
						const corAnswer = {
							option: item.correct_answer,
							isCorrect: true,
							id: crypto.randomUUID(),
						};

						let answers = [];
						for (let i = 0; i < item.incorrect_answers.length; i++) {
							answers.push({
								option: item.incorrect_answers[i],
								isCorrect: false,
								id: crypto.randomUUID(),
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
	}

	const [radioData, setRadioData] = useState({
		radioOption1: '',
		radioOption2: '',
		radioOption3: '',
		radioOption4: '',
		radioOption5: '',
	});
	const [isQuiz, setIsQuiz] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [test, setTest] = useState([]);
	const testDivs = test.map((item, i) => (
		<Test
			key={crypto.randomUUID()}
			question={item.question}
			options={item.options}
			isCorrect={item.isCorrect}
			handleChange={handleChange}
			radioData={radioData}
			radioNumber={i + 1}
			gameOver={gameOver}
		/>
	));

	console.log(radioData);

	return (
		<div className={!isQuiz ? 'container grid-center' : 'container'}>
			<div className='blob-yellow'></div>
			<div className='blob-lightblue'></div>

			{!isQuiz ? (
				<div className='intro'>
					<h1 className='intro__title'>Quizzical</h1>
					<p className='intro__desc'>Check your knowledge of this and that!</p>
					<button onClick={startQuiz} className='button intro__button'>
						Start quiz
					</button>
				</div>
			) : (
				<div className='quiz'>
					<div className='questions'>{testDivs}</div>

					<div className='below-questions'>
						{gameOver && (
							<p className='question'>You scored {score}/5 correct answers</p>
						)}

						{gameOver ? (
							<button
								className='button button-check-answers button-play-again'
								onClick={playAgain}
							>
								Play again
							</button>
						) : (
							<button
								onClick={checkAnswers}
								className='button button-check-answers'
							>
								Check answers
							</button>
						)}

						<img
							className='close-icon'
							onClick={endQuiz}
							src={closeIcon}
							alt='close icon'
						/>
					</div>
				</div>
			)}
		</div>
	);
}
