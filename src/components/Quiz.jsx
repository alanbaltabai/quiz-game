import { useState, useEffect } from 'react';

import closeIcon from '../assets/close-icon.png';
import SpinnerBox from './SpinnerBox';
import Test from './Test';

export default function Quiz(props) {
	useEffect(() => {
		fetchData();
	}, []);

	const [loading, setLoading] = useState(true);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [radioData, setRadioData] = useState({
		radioOption1: '',
		radioOption2: '',
		radioOption3: '',
		radioOption4: '',
		radioOption5: '',
	});
	const [test, setTest] = useState([]);
	const testDivs = test.map((item, i) => (
		<Test
			key={crypto.randomUUID()}
			question={item.question}
			options={item.options}
			isCorrect={item.isCorrect}
			radioNumber={i + 1}
			radioData={radioData}
			gameOver={gameOver}
			score={score}
			handleChange={handleChange}
			checkedIds={groupChecked()}
		/>
	));

	function fetchData() {
		setTimeout(
			() =>
				fetch(
					'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'
				)
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
						setGameOver(false);
						setLoading(false);
					}),
			1300
		);
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

	function handleChange(event) {
		const { name, value } = event.target;
		setRadioData((prevRadioData) => ({
			...prevRadioData,
			[name]: value,
		}));
	}

	function checkAnswers() {
		setGameOver(true);

		const arrayOfChecked = groupChecked().filter((item) => item !== '');

		let arrayOfTrues = [];
		const someArray = test.map((obj) => obj.options);
		for (let i = 0; i < someArray.length; i++) {
			for (let j = 0; j < someArray[i].length; j++) {
				if (someArray[i][j].isCorrect) arrayOfTrues.push(someArray[i][j].id);
			}
		}

		let count = 0;
		for (let i = 0; i < arrayOfTrues.length; i++) {
			if (arrayOfTrues[i] === arrayOfChecked[i]) count++;
		}

		setScore(count);
	}

	function groupChecked() {
		let checkedIds = [];
		for (const key in radioData) {
			checkedIds.push(radioData[key]);
		}

		return checkedIds;
	}

	function playAgain() {
		setLoading(true);
		fetchData();
	}

	return (
		<div className='quiz'>
			{loading ? <SpinnerBox /> : <div className='questions'>{testDivs}</div>}

			{!loading && (
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
						onClick={props.endQuiz}
						src={closeIcon}
						alt='close icon'
					/>
				</div>
			)}
		</div>
	);
}
