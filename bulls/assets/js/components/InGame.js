'use es6';

import '../../css/InGame.css';
import React from 'react';
import PropTypes from 'prop-types';
import { GamePlayStates } from '../constants/GamePlayConstants';
import { useInGame } from '../hooks/useInGame';
import { Play } from './Play';
import { Setup } from './Setup';
import { Won } from './Won';
import { useResetGameHeader } from '../hooks/useResetGameHeader';
import { PlayStatePropType } from '../constants/GamePropTypes';

const ResetGameHeader = ({ resetGameLogin }) => {
  const { resetGame, leaveGame } = useResetGameHeader({ resetGameLogin });
  return (
    <div className="ResetGameHeader">
      <button onClick={resetGame}>Reset Game</button>
      <button onClick={leaveGame}>Pick a different game</button>
    </div>
  );
};
ResetGameHeader.displayName = 'ResetGameHeader';
ResetGameHeader.propTypes = {
  resetGameLogin: PropTypes.func.isRequired,
};

const PlayState = ({ playState, setupProps, playProps, wonProps }) => {
  switch (playState) {
    case GamePlayStates.SETUP:
      return <Setup {...setupProps} />;
    case GamePlayStates.PLAY:
      return <Play {...playProps} />;
    case GamePlayStates.WON:
      return <Won {...wonProps} />;
    default:
      return null;
  }
};
PlayState.displayName = 'PlayState';
PlayState.propTypes = {
  playState: PlayStatePropType,
  setupProps: PropTypes.shape({
    numPlayers: PropTypes.number,
    numReady: PropTypes.number,
    player: PropTypes.object,
    winners: PropTypes.arrayOf(PropTypes.string),
  }),
  playProps: PropTypes.shape({
    userId: PropTypes.string,
    currentGuess: PropTypes.string,
    guesses: PropTypes.object,
    makeGuess: PropTypes.func,
  }),
  wonProps: PropTypes.shape({
    guesses: PropTypes.object,
    winners: PropTypes.arrayOf(PropTypes.string),
  }),
};

export const InGame = ({ gameId, userId, resetGameLogin }) => {
  const { playState, playProps, setupProps, wonProps } = useInGame({
    gameId,
    userId,
  });

  return (
    <>
      <ResetGameHeader resetGameLogin={resetGameLogin} />
      <PlayState
        playState={playState}
        setupProps={setupProps}
        playProps={playProps}
        wonProps={wonProps}
      />
    </>
  );
};
InGame.displayName = 'InGame';
InGame.propTypes = {
  gameId: PropTypes.string.isRequired,
  resetGameLogin: PropTypes.func,
  userId: PropTypes.string.isRequired,
};
InGame.defaultProps = { resetGameLogin: () => {} };
