'use es6';

import React from 'react';
import '../../css/App.css';
import { useGameId } from '../hooks/useGameId';
import { InGame } from './InGame';
import { PickGame } from './PickGame';

const App = () => {
  const { gameId, setGameId, resetGameId } = useGameId();

  return (
    <div className="App">
      {gameId ? (
        <InGame gameId={gameId} resetGameId={resetGameId} />
      ) : (
        <PickGame setGameId={setGameId} />
      )}
    </div>
  );
};
App.displayName = 'App';
App.propTypes = {};

export default App;
