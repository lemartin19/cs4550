'use es6';

import React from 'react';
import PropTypes from 'prop-types';

const LeaderboardRow = ({ userId, wins, losses }) => (
  <tr>
    <td>{userId}</td>
    <td>{wins}</td>
    <td>{losses}</td>
  </tr>
);
LeaderboardRow.displayName = 'LeaderboardRow';
LeaderboardRow.propTypes = {
  losses: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  wins: PropTypes.number.isRequired,
};
const Leaderboard = ({ records }) => (
  <>
    <br />
    <p>Records for previous players</p>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(records).map((userId) => (
          <LeaderboardRow key={userId} userId={userId} {...records[userId]} />
        ))}
      </tbody>
    </table>
  </>
);
Leaderboard.displayName = 'Leaderboard';
Leaderboard.propTypes = {
  records: PropTypes.object.isRequired,
};

export const MaybeLeaderboard = ({ records }) =>
  Object.keys(records).length == 0 ? null : <Leaderboard records={records} />;
MaybeLeaderboard.displayName = 'Leaderboard';
MaybeLeaderboard.propTypes = {
  records: PropTypes.object.isRequired,
};
