'use es6';

import '../../css/GuessTable.css';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessRow } from './GuessRow';
import { GuessPropType } from '../constants/GamePropTypes';

export const GuessTable = ({ guesses }) => (
  <table className="GuessTable">
    <thead>
      <tr>
        <th>#</th>
        <th>Guess</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      {guesses.map(({ guess, result }, idx) => (
        <GuessRow idx={idx} guess={guess} result={result} key={guess} />
      ))}
    </tbody>
  </table>
);
GuessTable.displayName = 'GuessTable';
GuessTable.propTypes = {
  guesses: PropTypes.arrayOf(GuessPropType).isRequired,
};
