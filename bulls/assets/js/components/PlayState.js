'use es6';

import React from 'react';
import { last } from 'underscore';
import PropTypes from 'prop-types';
import { GamePlayStates } from '../constants/GamePlayConstants';
import { GuessPropType, PlayStatePropType } from '../constants/GamePropTypes';
import { GameSetup } from './GameSetup';
import { GuessInput } from './GuessInput';
import { GuessTable } from './GuessTable';

const Win = ({ guesses }) => (
  <>
    <h1>You won!</h1>
    <p>Game finished in {guesses.length} guesses.</p>
    <p>Winning guess: {last(guesses).guess}</p>
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

export const PlayState = ({ playState, guesses, makeGuess, setup }) => {
  switch (playState) {
    case GamePlayStates.SETUP:
      return <GameSetup {...setup} />;
    case GamePlayStates.PLAY:
      return (
        <>
          <GuessInput setGuess={makeGuess} />
          <GuessTable guesses={guesses} />
        </>
      );
    case GamePlayStates.OBSERVER:
      return <GuessTable guesses={guesses} />;
    case GamePlayStates.WIN:
      return <Win guesses={guesses} />;
    case GamePlayStates.LOSE:
      return <Lose guesses={guesses} />;
    default:
      // invalid play state
      return null;
  }
};
PlayState.displayName = 'PlayState';
PlayState.propTypes = {
  guesses: PropTypes.arrayOf(GuessPropType),
  makeGuess: PropTypes.func.isRequired,
  playState: PlayStatePropType,
  setGameId: PropTypes.func,
  setup: PropTypes.shape({
    numPlayers: PropTypes.number,
    numReady: PropTypes.number,
    player: PropTypes.object,
  }),
};
PlayState.defaultProps = {
  guesses: [],
  playState: null,
  setGameId: () => {},
  setup: {},
};
