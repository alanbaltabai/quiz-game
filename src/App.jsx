import { useState, useEffect } from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';

export default function App() {
	const [isQuiz, setIsQuiz] = useState(false);

	function endQuiz() {
		setIsQuiz(false);
		setGameOver(true);
	}

	return (
		<div className={!isQuiz ? 'container grid-center' : 'container'}>
			<div className='blob-yellow'></div>
			<div className='blob-lightblue'></div>

			{!isQuiz ? (
				<Intro handleQuiz={() => setIsQuiz(true)} />
			) : (
				<Quiz endQuiz={endQuiz} />
			)}
		</div>
	);
}
