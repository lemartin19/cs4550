'use es6';

import { useCallback } from 'react';
import { PlayerTypes } from '../constants/GamePlayConstants';
import { addPlayer, playerReady } from '../socket';

export const useGameSetup = ({ type, ready }) => {
  const setPlayerType = useCallback((type) => {
    addPlayer(type);
  }, []);

  const playerIsReady = useCallback(() => {
    playerReady();
  }, []);

  return {
    disabled: ready,
    playerType: type,
    showReadyToggle: type === PlayerTypes.PLAYER,
    setPlayerType,
    playerIsReady,
  };
};
