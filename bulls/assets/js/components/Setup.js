'use es6';

import '../../css/Setup.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useGameSetup } from '../hooks/useGameSetup';
import { PlayerTypes } from '../constants/GamePlayConstants';
import { MaybeLeaderboard } from './Leaderboard';

const TypePicker = ({ disabled, playerType, setPlayerType }) => {
  return (
    <div className="TypePicker">
      <p>I want to be a:</p>
      <div>
        <input
          id={PlayerTypes.OBSERVER}
          type="radio"
          disabled={disabled}
          checked={playerType === PlayerTypes.OBSERVER}
          onChange={() => setPlayerType(PlayerTypes.OBSERVER)}
        />
        <label htmlFor={PlayerTypes.OBSERVER}>Observer</label>
      </div>
      <div>
        <input
          id={PlayerTypes.PLAYER}
          type="radio"
          disabled={disabled}
          checked={playerType === PlayerTypes.PLAYER}
          onChange={() => setPlayerType(PlayerTypes.PLAYER)}
        />
        <label htmlFor={PlayerTypes.PLAYER}>Player</label>
      </div>
    </div>
  );
};
TypePicker.displayName = 'TypePicker';
TypePicker.propTypes = {
  disabled: PropTypes.bool.isRequired,
  playerType: PropTypes.oneOf(Object.keys(PlayerTypes)).isRequired,
  setPlayerType: PropTypes.func.isRequired,
};

const ReadyToggle = ({ disabled, playerIsReady, showToggle }) => (
  <div className="ReadyToggle">
    {showToggle ? (
      <>
        <input
          id="ready"
          type="checkbox"
          disabled={disabled}
          onClick={playerIsReady}
        />
        <label htmlFor="ready">I am ready</label>
      </>
    ) : null}
  </div>
);
ReadyToggle.displayName = 'ReadyToggle';
ReadyToggle.propTypes = {
  disabled: PropTypes.bool.isRequired,
  playerIsReady: PropTypes.func.isRequired,
  showToggle: PropTypes.bool.isRequired,
};

const PlayerStatuses = ({ numPlayers, numReady }) => (
  <p>
    {numReady} of {numPlayers} ready to play
  </p>
);
PlayerStatuses.displayName = 'PlayerStatuses';
PlayerStatuses.propTypes = {
  numPlayers: PropTypes.number.isRequired,
  numReady: PropTypes.number.isRequired,
};

const PreviousWinners = ({ winners }) => {
  if (winners.length === 0) return null;
  return (
    <p>
      Previous round winner{winners.length === 1 ? '' : 's'}:{' '}
      {winners.join(', ')}
    </p>
  );
};
PreviousWinners.displayName = 'PreviousWinners';
PreviousWinners.propTypes = {
  winners: PropTypes.arrayOf(PropTypes.string),
};

export const Setup = ({ numPlayers, numReady, winners, records }) => {
  const {
    disabled,
    showReadyToggle,
    playerType,
    setPlayerType,
    playerIsReady,
  } = useGameSetup();
  return (
    <div className="Setup">
      <TypePicker
        disabled={disabled}
        playerType={playerType}
        setPlayerType={setPlayerType}
      />
      <ReadyToggle
        disabled={disabled}
        playerIsReady={playerIsReady}
        showToggle={showReadyToggle}
      />
      <PlayerStatuses numPlayers={numPlayers} numReady={numReady} />
      <PreviousWinners winners={winners} />
      <MaybeLeaderboard records={records} />
    </div>
  );
};
Setup.displayName = 'Setup';
Setup.propTypes = {
  numPlayers: PropTypes.number,
  numReady: PropTypes.number,
  player: PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(PlayerTypes)).isRequired,
    ready: PropTypes.bool.isRequired,
  }),
  records: PropTypes.object.isRequired,
  winners: PropTypes.arrayOf(PropTypes.string),
};
Setup.defaultProps = {
  numPlayers: 0,
  numReady: 0,
  winners: [],
};
