'use es6';

import '../../css/GuessInput.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useGuessInput } from '../hooks/useGuessInput';

export const GuessInput = ({ setGuess }) => {
  const { formContent, error, onChange, onSubmit } = useGuessInput({
    setGuess,
  });
  return (
    <div className="GuessInput">
      <input type="text" id="logic" value={formContent} onChange={onChange} />
      <p>{error}</p>
      <input type="submit" onClick={onSubmit} disabled={!!error} />
    </div>
  );
};
GuessInput.displayName = 'GuessInput';
GuessInput.propTypes = {
  setGuess: PropTypes.func.isRequired,
};
