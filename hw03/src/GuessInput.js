import { useState, useCallback } from 'react';

const useGuessInput = ({ setGuess }) => {
  const [formContent, setFormContent] = useState('');

  const disableGuess = formContent.length !== 4;

  const onChange = useCallback(({ target }) => {
    setFormContent(target.value);
  }, []);

  const onSubmit = useCallback(() => {
    setGuess(formContent);
  }, [setGuess, formContent]);
  return { formContent, disableGuess, onChange, onSubmit };
};

const GuessInput = ({ setGuess }) => {
  const { formContent, disableGuess, onChange, onSubmit } = useGuessInput({
    setGuess,
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
