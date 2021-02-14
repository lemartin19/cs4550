'use es6';

import React from 'react';
import '../../css/App.css';
import { useGameLogin } from '../hooks/useGameLogin';
import { InGame } from './InGame';
import { PickGame } from './PickGame';

const App = () => {
  const { gameId, userId, setGameLogin, resetGameLogin } = useGameLogin();

  return (
    <div className="App">
      {gameId && userId ? (
        <InGame
          gameId={gameId}
          userId={userId}
          resetGameLogin={resetGameLogin}
        />
      ) : (
        <PickGame setGameLogin={setGameLogin} />
      )}
    </div>
  );
};
App.displayName = 'App';
App.propTypes = {};

export default App;
