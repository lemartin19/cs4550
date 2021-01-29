import { useState, useCallback } from 'react';
import './App.css';
import CowsAndBulls from './CowsAndBulls';
import GuessInput from './GuessInput';
import NewGame from './NewGame';

const generateSecret = () => {
  const num = Math.random() * 10000;
  const string = `${Math.floor(num)}`;
  return string.padStart(4, 0);
};

const useApp = () => {
  const [secret, setSecret] = useState(generateSecret());
  const resetSecret = useCallback(() => {
    setSecret(generateSecret());
  }, []);

  const [guess, setGuess] = useState('');
  console.log(`secret: ${secret}`);
  return { secret, resetSecret, guess, setGuess };
};

const App = () => {
  const { secret, resetSecret, guess, setGuess } = useApp();
  return (
    <>
      <NewGame resetSecret={resetSecret} />
      <GuessInput setGuess={setGuess} />
      <CowsAndBulls secret={secret} guess={guess} />
    </>
  );
};
App.displayName = 'App';

export default App;
