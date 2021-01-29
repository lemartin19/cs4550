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
  const [guess, setGuess] = useState('');

  const resetGame = useCallback(() => {
    setSecret(generateSecret());
    setGuess('');
  }, []);
  console.log(`secret: ${secret}`);
  return { secret: secret, resetGame, guess, setGuess };
};

const App = () => {
  const { secret, resetGame, guess, setGuess } = useApp();
  return (
    <div className="App">
      <NewGame resetGame={resetGame} />
      <GuessInput setGuess={setGuess} />
      <CowsAndBulls secret={secret} guess={guess} />
    </div>
  );
};
App.displayName = 'App';

export default App;
