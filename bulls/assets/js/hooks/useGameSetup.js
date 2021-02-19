'use es6';

import { useCallback, useState } from 'react';
import { PlayerTypes } from '../constants/GamePlayConstants';
import { addPlayer, playerReady } from '../socket';

export const useGameSetup = () => {
  const [localType, setLocalType] = useState(PlayerTypes.OBSERVER);
  const [ready, setReady] = useState(false);

  const setPlayerType = useCallback((type) => {
    setLocalType(type);
    addPlayer(type);
  }, []);

  const playerIsReady = useCallback(() => {
    playerReady();
    setReady(true);
  }, []);

  return {
    disabled: ready,
    playerType: localType,
    showReadyToggle: localType === PlayerTypes.PLAYER,
    setPlayerType,
    playerIsReady,
  };
};
