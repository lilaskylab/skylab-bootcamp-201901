import React, { useRef, useState, useEffect, Fragment } from 'react';

import { withRouter, Switch, Route } from 'react-router-dom';

import gameService from '../../../services/game';

import GetReady from '../GetReady';
import GameBlock from '../GameBlock';

function Questions(props) {
	const {
		match: {
			params: { gameId },
		},
	} = props;

	const hostGame = useRef(null);

	const [totalQuestions, setTotalQuestions] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [totalUsers, setTotalUsers] = useState(0);

	useEffect(() => {
		getGame();
	}, []);

	const getGame = async () => {
		try {
			const game = await gameService.get(gameId);
			setCurrentQuestion(game.currentQuestion);
			setTotalQuestions(game.quiz.questions.length);
			setTotalUsers(game.users.length);
		} catch (error) {
			console.error(error);
		}
	};

	const nextQuestion = async () => {
		try {
			const game = await gameService.next(gameId);
			setCurrentQuestion(game.currentQuestion);

			if(currentQuestion) {
				props.history.push(`/game/${game.id}/questions/getready`);
			} else {
				props.history.push(`/game/${game.id}/gameover`);
			}

		} catch(error) {
			console.log(error)
		}
		console.log('NEXT');
	};

	return (
		<section className="host-game" ref={hostGame}>
			<Switch>
				{currentQuestion && (
					<Route
						path={`/game/:gameId/questions/getready`}
						render={() => (
							<GetReady
								hostGame={hostGame}
								totalQuestions={totalQuestions}
								currentQuestion={currentQuestion}
							/>
						)}
					/>
				)}
				{currentQuestion && (
					<Route
						path={`/game/:gameId/questions/gameblock`}
						render={() => (
							<GameBlock
								hostGame={hostGame}
								currentQuestion={currentQuestion}
								nextQuestion={nextQuestion}
								totalUsers={totalUsers}
							/>
						)}
					/>
				)}
			</Switch>
		</section>
	);
}

export default withRouter(Questions);
