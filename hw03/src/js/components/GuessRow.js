'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { CowsAndBulls } from './CowsAndBulls';
import { CowBullTypes } from '../constants/GamePlayConstants';

export const GuessRow = ({ guess, result, idx }) => (
  <tr>
    <td>{idx}</td>
    <td>{guess}</td>
    <td>
      <CowsAndBulls result={result} />
    </td>
  </tr>
);
GuessRow.displayName = 'GuessRow';
GuessRow.propTypes = {
  guess: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  result: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(CowBullTypes)))
    .isRequired,
};
