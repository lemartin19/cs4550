'use es6';

import React from 'react';
import '../../css/App.css';
import { PlayState } from './PlayState';
import { useApp } from '../hooks/useApp';

const App = () => {
  const { playState, guesses, resetGame, makeGuess } = useApp();

  return (
    <div className="App">
      <button onClick={resetGame}>Reset Game</button>
      <PlayState
        playState={playState}
        guesses={guesses}
        makeGuess={makeGuess}
      />
    </div>
  );
};
App.displayName = 'App';
App.propTypes = {};

export default App;
