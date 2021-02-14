import { useState, useEffect } from 'react';
import { joinChannel, channelReset, channelGuess } from '../socket';

export const useApp = () => {
  const [gameId, setGameId] = useState();
  const [state, setState] = useState({});

  useEffect(() => {
    if (gameId) joinChannel(gameId, setState);
  }, [gameId]);

  const { play_state, guesses } = state;
  return {
    playState: play_state,
    guesses,
    makeGuess: channelGuess,
    resetGame: channelReset,
    setGameId,
  };
};
