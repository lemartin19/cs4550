'use es6';

import '../../css/InGame.css';
import React from 'react';
import PropTypes from 'prop-types';
import { GamePlayStates } from '../constants/GamePlayConstants';
import { useInGame } from '../hooks/useInGame';
import { GamePlay } from './GamePlay';
import { GameSetup } from './GameSetup';
import { useResetGameHeader } from '../hooks/useResetGameHeader';

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

export const InGame = ({ gameId, userId, resetGameLogin }) => {
  const { playState, guesses, setupProps, makeGuess } = useInGame({
    gameId,
    userId,
  });
  return (
    <>
      <ResetGameHeader resetGameLogin={resetGameLogin} />
      {playState === GamePlayStates.PLAY ? (
        <GamePlay userId={userId} guesses={guesses} makeGuess={makeGuess} />
      ) : (
        <GameSetup {...setupProps} />
      )}
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
