'use es6';

import { useCallback } from 'react';
import { channelReset, leaveChannel } from '../socket';

export const useResetGameHeader = ({ resetGameLogin }) => {
  const leaveGame = useCallback(() => {
    leaveChannel();
    resetGameLogin();
  });

  return { leaveGame, resetGame: channelReset };
};
