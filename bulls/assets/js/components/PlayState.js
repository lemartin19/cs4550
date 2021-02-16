'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { GamePlayStates } from '../constants/GamePlayConstants';
import { PlayStatePropType } from '../constants/GamePropTypes';
import { GameSetup } from './GameSetup';
import { GuessInput } from './GuessInput';
import { GuessTable } from './GuessTable';

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
    default:
      // invalid play state
      return null;
  }
};
PlayState.displayName = 'PlayState';
PlayState.propTypes = {
  guesses: PropTypes.object,
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
