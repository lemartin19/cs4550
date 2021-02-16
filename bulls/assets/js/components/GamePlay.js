'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessInput } from './GuessInput';
import { GuessTable } from './GuessTable';

export const GamePlay = ({ userId, guesses, makeGuess }) => (
  <>
    {guesses[userId] ? <GuessInput makeGuess={makeGuess} /> : null}
    <GuessTable guesses={guesses} />
  </>
);
GamePlay.displayName = 'GamePlay';
GamePlay.propTypes = {
  guesses: PropTypes.object,
  makeGuess: PropTypes.func.isRequired,
  userId: PropTypes.string,
};
GamePlay.defaultProps = {
  guesses: [],
  playState: null,
  setGameId: () => {},
  setup: {},
};
