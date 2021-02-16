'use es6';

import '../../css/GuessRow.css';

import React from 'react';
import PropTypes from 'prop-types';
import { CowsAndBulls } from './CowsAndBulls';
import { CowBullTypes } from '../constants/GamePlayConstants';
import { GuessPropType } from '../constants/GamePropTypes';

const GuessAndResult = ({ guess, result }) => (
  <>
    <td>{guess}</td>
    <td>
      <CowsAndBulls result={result} />
    </td>
  </>
);
GuessAndResult.displayName = 'GuessAndResult';
GuessAndResult.propTypes = {
  guess: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(CowBullTypes))),
};

export const GuessRow = ({ idx, round }) => (
  <tr className="GuessRow">
    <td>{idx + 1}</td>
    {round.map(({ guess, result }, idx) => (
      <GuessAndResult key={idx} guess={guess} result={result} />
    ))}
  </tr>
);
GuessRow.displayName = 'GuessRow';
GuessRow.propTypes = {
  idx: PropTypes.number.isRequired,
  round: PropTypes.arrayOf(GuessPropType).isRequired,
};
