'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessInput } from './GuessInput';
import { GuessTable } from './GuessTable';
import { GamePlayStates } from '../constants/GamePlayConstants';
import { GuessPropType, PlayStatePropType } from '../constants/GamePropTypes';

const Win = ({ guesses }) => (
  <>
    <h1>You won!</h1>
    <p>Game finished in {guesses.length} guesses.</p>
    <p>Winning guess: {guesses[guesses.length - 1].guess}</p>
    <p>
      Press <q>Reset game</q> to play again.
    </p>
  </>
);
Win.displayName = 'Win';
Win.propTypes = { guesses: PropTypes.arrayOf(GuessPropType).isRequired };

const Lose = () => (
  <>
    <h1>You lose.</h1>
    <p>
      Press <q>Reset game</q> to play again.
    </p>
  </>
);
Lose.displayName = 'Lose';
Lose.propTypes = { guesses: PropTypes.arrayOf(GuessPropType).isRequired };

export const PlayState = ({ playState, guesses, makeGuess }) => {
  switch (playState) {
    case GamePlayStates.PLAY:
      return (
        <>
          <GuessInput setGuess={makeGuess} />
          <GuessTable guesses={guesses} />
        </>
      );
    case GamePlayStates.WIN:
      return <Win guesses={guesses} />;
    case GamePlayStates.LOSE:
      return <Lose guesses={guesses} />;
  }
};
PlayState.displayName = 'PlayState';
PlayState.propTypes = {
  guesses: PropTypes.arrayOf(GuessPropType).isRequired,
  makeGuess: PropTypes.func.isRequired,
  playState: PlayStatePropType.isRequired,
};
