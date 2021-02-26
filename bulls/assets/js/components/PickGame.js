'use es6';

import '../../css/PickGame.css';

import React from 'react';
import PropTypes from 'prop-types';
import { usePickGame } from '../hooks/usePickGame';

export const PickGame = ({ setGameLogin }) => {
  const {
    gameId,
    userId,
    onGameIdChange,
    onUserIdChange,
    onKeyPress,
    onSubmit,
  } = usePickGame({
    setGameLogin,
  });

  return (
    <div className="PickGame">
      <label htmlFor="gameId">Game</label>
      <input
        type="text"
        id="gameId"
        value={gameId}
        onChange={onGameIdChange}
        onKeyPress={onKeyPress}
      />
      <label htmlFor="userId">Username</label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={onUserIdChange}
        onKeyPress={onKeyPress}
      />
      <input type="submit" onClick={onSubmit} disabled={!gameId || !userId} />
    </div>
  );
};
PickGame.displayName = 'PickGame';
PickGame.propTypes = {
  setGameLogin: PropTypes.func.isRequired,
};
