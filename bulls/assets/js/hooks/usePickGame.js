'use es6';

import { useCallback, useState } from 'react';

export const usePickGame = ({ setGameLogin }) => {
  const [gameId, setGameId] = useState('');
  const [userId, setUserId] = useState('');

  const onGameIdChange = ({ target }) => {
    setGameId(target.value);
  };
  const onUserIdChange = ({ target }) => {
    setUserId(target.value);
  };

  const onSubmit = useCallback(
    () => gameId && userId && setGameLogin({ gameId, userId }),
    [gameId, userId]
  );
  const onKeyPress = useCallback(({ which }) =>
    which === 13 ? onSubmit() : null
  );

  return {
    gameId,
    userId,
    onGameIdChange,
    onUserIdChange,
    onKeyPress,
    onSubmit,
  };
};
