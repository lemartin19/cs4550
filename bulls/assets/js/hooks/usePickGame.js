'use es6';

import { useCallback, useState } from 'react';

export const usePickGame = ({ setGameId }) => {
  const [formInput, setFormInput] = useState('');

  const onChange = ({ target }) => {
    setFormInput(target.value);
  };

  const onSubmit = useCallback(() => {
    setGameId(formInput);
  }, [formInput]);

  const onKeyPress = useCallback(({ which }) =>
    which === 13 ? onSubmit() : null
  );

  return { formInput, onChange, onSubmit, onKeyPress };
};
