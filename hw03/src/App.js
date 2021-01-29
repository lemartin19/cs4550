import { useState, useCallback, useEffect } from 'react';
import './App.css';
import GuessInput from './GuessInput';
import GuessOutput from './GuessOutput';

const NUM_LIVES = 8;

const generateSecret = () => {
  const num = Math.random() * 10000;
  const string = `${Math.floor(num)}`;
  return string.padStart(4, 0);
};

const useApp = () => {
  const [secret, setSecret] = useState();
  const [guess, setGuess] = useState('');
  const [lives, setLives] = useState(NUM_LIVES);

  useEffect(() => {
    setSecret(generateSecret());
    console.log('setting up the game');
  }, []);

  const resetGame = useCallback(() => {
    setSecret(generateSecret());
    setGuess('');
    setLives(NUM_LIVES);
  }, []);
  const makeGuess = useCallback((guess) => {
    setGuess(guess);
    setLives((numLives) => numLives - 1);
  }, []);

  console.log(`secret: ${secret}`);
  console.log(`lives: ${lives}`);

  return { secret: secret, resetGame, guess, makeGuess, lives };
};

const App = () => {
  const { secret, resetGame, guess, makeGuess, lives } = useApp();
  return (
    <div className="App">
      <button onClick={resetGame}>Reset Game</button>
      <GuessInput
        guess={guess}
        secret={secret}
        setGuess={makeGuess}
        lives={lives}
      />
      <GuessOutput guess={guess} secret={secret} lives={lives} />
    </div>
  );
};
App.displayName = 'App';

export default App;
