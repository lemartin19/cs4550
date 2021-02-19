'use es6';

import { useCallback, useState } from 'react';

export const useGameLogin = () => {
  const [gameLogin, setGameLogin] = useState({});

  const resetGameLogin = useCallback(() => setGameLogin({}), []);
  return { ...gameLogin, setGameLogin, resetGameLogin };
};
