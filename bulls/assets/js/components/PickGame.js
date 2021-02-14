'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { usePickGame } from '../hooks/usePickGame';

export const PickGame = ({ setGameId }) => {
  const { gameId, onChange, onKeyPress, onSubmit } = usePickGame({ setGameId });
  return (
    <div className="GuessInput">
      <input
        type="text"
        id="logic"
        value={gameId}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <input type="submit" onClick={onSubmit} disabled={!!gameId} />
    </div>
  );
};
PickGame.displayName = 'PickGame';
PickGame.propTypes = {
  setGameId: PropTypes.func.isRequired,
};
