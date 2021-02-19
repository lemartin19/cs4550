'use es6';

import '../../css/GuessInput.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useGuessInput } from '../hooks/useGuessInput';

export const GuessInput = ({ makeGuess }) => {
  const {
    formContent,
    error,
    onChange,
    onSubmit,
    onKeyPress,
    passTurn,
  } = useGuessInput({
    makeGuess,
  });
  return (
    <div className="GuessInput">
      <input
        type="text"
        id="logic"
        value={formContent}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <p>{error}</p>
      <input type="submit" onClick={onSubmit} disabled={!!error} />
      <button onClick={passTurn}>Pass</button>
    </div>
  );
};
GuessInput.displayName = 'GuessInput';
GuessInput.propTypes = {
  makeGuess: PropTypes.func.isRequired,
};
