'use es6';

import '../../css/GameSetup.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useGameSetup } from '../hooks/useGameSetup';
import { PlayerTypes } from '../constants/GamePlayConstants';

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

export const GameSetup = ({ numPlayers, numReady }) => {
  const {
    disabled,
    showReadyToggle,
    playerType,
    setPlayerType,
    playerIsReady,
  } = useGameSetup();
  return (
    <div className="GameSetup">
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
    </div>
  );
};
GameSetup.displayName = 'GameSetup';
GameSetup.propTypes = {
  numPlayers: PropTypes.number,
  numReady: PropTypes.number,
  player: PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(PlayerTypes)).isRequired,
    ready: PropTypes.bool.isRequired,
  }),
};
GameSetup.defaultProps = {
  numPlayers: 0,
  numReady: 0,
  player: { type: PlayerTypes.OBSERVER, ready: false },
};
