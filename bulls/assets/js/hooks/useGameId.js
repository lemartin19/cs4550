'use es6';

import { useCallback, useState } from 'react';

export const useGameId = () => {
  const [gameId, setGameId] = useState();

  const resetGameId = useCallback(() => setGameId(), []);
  return { gameId, setGameId, resetGameId };
};
