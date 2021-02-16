'use es6';

import '../../css/InGame.css';
import React from 'react';
import PropTypes from 'prop-types';
import { PlayState } from './PlayState';
import { useInGame } from '../hooks/useInGame';

const ResetGameHeader = ({ resetGame, leaveGame }) => (
  <div className="ResetGameHeader">
    <button onClick={resetGame}>Reset Game</button>
    <button onClick={leaveGame}>Pick a different game</button>
  </div>
);
ResetGameHeader.displayName = 'ResetGameHeader';
ResetGameHeader.propTypes = {
  leaveGame: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export const InGame = ({ gameId, userId, resetGameLogin }) => {
  const {
    playState,
    guesses,
    setupProps,
    makeGuess,
    resetGame,
    leaveGame,
  } = useInGame({
    gameId,
    userId,
    resetGameLogin,
  });
  return (
    <>
      <ResetGameHeader resetGame={resetGame} leaveGame={leaveGame} />
      <PlayState
        playState={playState}
        guesses={guesses}
        makeGuess={makeGuess}
        setup={setupProps}
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
