'use es6';

import { useState, useMemo, useCallback } from 'react';
import { countBy } from 'underscore';

const isEachDigitUnique = (guess) => {
  const arr = guess.split('');
  const counted = countBy(arr);
  return Object.keys(counted).every((key) => counted[key] === 1);
};

const getError = (formContent) => {
  if (formContent.length !== 4) return 'Guess must be at least 4 digits';
  if (!isEachDigitUnique(formContent)) return 'Digits must be unique';
  return null;
};

export const useGuessInput = ({ makeGuess }) => {
  const [formContent, setFormContent] = useState('');

  const error = useMemo(() => getError(formContent), [formContent]);

  const onChange = ({ target }) => {
    setFormContent(target.value);
  };

  const onSubmit = useCallback(() => {
    makeGuess(formContent);
    setFormContent('');
  }, [makeGuess, formContent]);

  const onKeyPress = useCallback(({ which }) =>
    which === 13 ? onSubmit() : null
  );

  const passTurn = useCallback(() => makeGuess('PASS'));

  return { formContent, error, onChange, onSubmit, onKeyPress, passTurn };
};
