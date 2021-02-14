'use es6';

import React from 'react';
import '../../css/App.css';
import { PlayState } from './PlayState';
import { useApp } from '../hooks/useApp';
import { PickGame } from './PickGame';

const App = () => {
  const { playState, guesses, resetGame, makeGuess, setGameId } = useApp();

  return playState ? (
    <>
      <button onClick={resetGame}>Reset Game</button>
      <PlayState
        playState={playState}
        guesses={guesses}
        makeGuess={makeGuess}
      />
    </>
  ) : (
    <PickGame setGameId={setGameId} />
  );
};
App.displayName = 'App';
App.propTypes = {};

export default App;
