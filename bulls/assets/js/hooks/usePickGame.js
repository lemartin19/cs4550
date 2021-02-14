'use es6';

import { useCallback, useState } from 'react';
import { joinChannel } from '../socket';

export const usePickGame = () => {
  const [gameId, setGameId] = useState('');

  const onChange = ({ target }) => {
    setGameId(target.value);
  };

  const onSubmit = useCallback(() => {
    joinChannel(gameId);
  }, [gameId]);

  const onKeyPress = useCallback(({ which }) =>
    which === 13 ? onSubmit() : null
  );

  return { gameId, onChange, onSubmit, onKeyPress };
};
