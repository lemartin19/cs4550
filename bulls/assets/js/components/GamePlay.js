'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessInput } from './GuessInput';
import { GuessTable } from './GuessTable';

const MaybeGuessInput = ({ isObserver, currentGuess, setGuess }) => {
  if (isObserver) return null;
  if (currentGuess)
    return <p>Made guess: {currentGuess}. Waiting for other players</p>;
  return <GuessInput makeGuess={setGuess} />;
};
MaybeGuessInput.displayName = '';
MaybeGuessInput.propTypes = {
  currentGuess: PropTypes.string,
  isObserver: PropTypes.bool.isRequired,
  setGuess: PropTypes.func.isRequired,
};
MaybeGuessInput.defaultProps = { currentGuess: null };

export const GamePlay = ({ userId, currentGuess, guesses, makeGuess }) => (
  <>
    <MaybeGuessInput
      isObserver={!guesses[userId]}
      currentGuess={currentGuess}
      setGuess={makeGuess}
    />
    <GuessTable guesses={guesses} />
  </>
);
GamePlay.displayName = 'GamePlay';
GamePlay.propTypes = {
  currentGuess: PropTypes.string,
  guesses: PropTypes.object,
  makeGuess: PropTypes.func.isRequired,
  userId: PropTypes.string,
};
GamePlay.defaultProps = {
  currentGuess: null,
  guesses: [],
  userId: '',
};
