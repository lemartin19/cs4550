import './GuessOutput.css';

import React from 'react';
import PropTypes from 'prop-types';
import CowsAndBulls from './CowsAndBulls';

const GuessesLeft = ({ guess, secret, lives }) => {
  if (guess === secret) {
    return <div>You win! Restart the game to continue playing.</div>;
  } else if (lives > 0) {
    return <div>You have {lives} guesses left.</div>;
  }
  return <div>You lose! Restart the game to continue playing.</div>;
};
GuessesLeft.displayName = 'GuessesLeft';
GuessesLeft.propTypes = {
  guess: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  secret: PropTypes.string,
};

const GuessOutput = ({ guess, secret, lives }) => {
  return (
    <div className="GuessOutput">
      <GuessesLeft guess={guess} secret={secret} lives={lives} />
      <CowsAndBulls guess={guess} secret={secret} />
    </div>
  );
};
GuessOutput.displayName = 'GuessOutput';
GuessOutput.propTypes = {
  guess: PropTypes.string.isRequired,
  lives: PropTypes.number.isRequired,
  secret: PropTypes.string,
};

export default GuessOutput;
