import './GuessInput.css';
import { useState, useCallback } from 'react';

const useGuessInput = ({ guess, setGuess, secret, lives }) => {
  const [formContent, setFormContent] = useState('');

  const disableGuess =
    formContent.length !== 4 || lives === 0 || guess === secret;

  const onChange = useCallback(({ target }) => {
    setFormContent(target.value);
  }, []);

  const onSubmit = useCallback(() => {
    setGuess(formContent);
    setFormContent('');
  }, [setGuess, formContent]);

  return { formContent, disableGuess, onChange, onSubmit };
};

const GuessInput = ({ guess, setGuess, secret, lives }) => {
  const { formContent, disableGuess, onChange, onSubmit } = useGuessInput({
    guess,
    setGuess,
    secret,
    lives,
  });
  return (
    <div className="GuessInput">
      <input type="text" id="logic" value={formContent} onChange={onChange} />
      <input type="submit" onClick={onSubmit} disabled={disableGuess} />
    </div>
  );
};
GuessInput.displayName = 'GuessInput';

export default GuessInput;
