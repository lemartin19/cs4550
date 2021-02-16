'use es6';

import '../../css/GuessTable.css';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessRow } from './GuessRow';
import { GuessPropType } from '../constants/GamePropTypes';

const TableHeader = ({ users }) => (
  <thead>
    <tr>
      <th>Round</th>
      {users.map((userId) => (
        <th colSpan="2" key={userId}>
          {userId}
        </th>
      ))}
    </tr>
    <tr>
      <th></th>
      {users.map((userId) => (
        <>
          <th key={`${userId}-guess`}>Guess</th>
          <th key={`${userId}-result`}>Result</th>
        </>
      ))}
    </tr>
  </thead>
);
TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const TableBody = ({ orderedGuesses }) => (
  <tbody>
    {orderedGuesses[0].map((_, roundNum) => (
      <GuessRow
        key={roundNum}
        idx={roundNum}
        round={orderedGuesses.map((allGuesses) => allGuesses[roundNum])}
      />
    ))}
  </tbody>
);
TableBody.displayName = 'TableBody';
TableBody.propTypes = {
  orderedGuesses: PropTypes.arrayOf(PropTypes.arrayOf(GuessPropType))
    .isRequired,
};

export const GuessTable = ({ guesses }) => {
  const userIds = Object.keys(guesses);
  const orderedGuesses = userIds.map((userId) => guesses[userId]);
  return (
    <table className="GuessTable">
      <TableHeader users={userIds} />
      <TableBody orderedGuesses={orderedGuesses} />
    </table>
  );
};
GuessTable.displayName = 'GuessTable';
GuessTable.propTypes = {
  guesses: PropTypes.object.isRequired,
};
