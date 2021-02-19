'use es6';

import '../../css/GuessTable.css';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessRow } from './GuessRow';
import { GuessPropType } from '../constants/GamePropTypes';

const TableColorings = ({ userIds, winners }) => (
  <colgroup>
    <col />
    {userIds.map((userId, idx) => (
      <col
        key={idx}
        span="2"
        className={
          winners.includes(userId) ? 'winner' : idx % 2 === 0 ? 'even' : 'odd'
        }
      ></col>
    ))}
  </colgroup>
);
TableColorings.displayName = 'TableColorings';
TableColorings.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  winners: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const HeaderGuessAndResult = () => (
  <>
    <th>Guess</th>
    <th>Result</th>
  </>
);
HeaderGuessAndResult.displayName = 'HeaderGuessAndResult';
HeaderGuessAndResult.propTypes = {};

const TableHeader = ({ userIds }) => (
  <thead>
    <tr>
      <th>Round</th>
      {userIds.map((userId) => (
        <th colSpan="2" key={userId}>
          {userId}
        </th>
      ))}
    </tr>
    <tr>
      <th></th>
      {userIds.map((userId) => (
        <HeaderGuessAndResult key={`${userId}-guess-and-result`} />
      ))}
    </tr>
  </thead>
);
TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const TableBody = ({ orderedGuesses }) => (
  <tbody>
    {orderedGuesses.length
      ? orderedGuesses[0].map((_, roundNum) => (
          <GuessRow
            key={roundNum}
            idx={roundNum}
            round={orderedGuesses.map(
              (allGuesses) => allGuesses[allGuesses.length - 1 - roundNum]
            )}
          />
        ))
      : null}
  </tbody>
);
TableBody.displayName = 'TableBody';
TableBody.propTypes = {
  orderedGuesses: PropTypes.arrayOf(PropTypes.arrayOf(GuessPropType))
    .isRequired,
};

export const GuessTable = ({ guesses, winners }) => {
  const userIds = Object.keys(guesses);
  const orderedGuesses = userIds.map((userId) => guesses[userId]);
  return (
    <table className="GuessTable">
      <TableColorings userIds={userIds} winners={winners} />
      <TableHeader userIds={userIds} />
      <TableBody orderedGuesses={orderedGuesses} />
    </table>
  );
};
GuessTable.displayName = 'GuessTable';
GuessTable.propTypes = {
  guesses: PropTypes.object.isRequired,
  winners: PropTypes.arrayOf(PropTypes.string),
};
GuessTable.defaultProps = { winners: [] };
