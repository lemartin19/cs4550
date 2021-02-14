import { useState, useEffect, useCallback } from 'react';
import {
  joinChannel,
  channelReset,
  channelGuess,
  leaveChannel,
} from '../socket';

export const useInGame = ({ gameId, resetGameId }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (gameId) joinChannel(gameId, setState);
  }, [gameId]);

  const leaveGame = useCallback(() => {
    leaveChannel();
    setState({});
    resetGameId();
  });

  const { play_state, guesses } = state;
  return {
    playState: play_state,
    guesses,
    makeGuess: channelGuess,
    resetGame: channelReset,
    leaveGame,
  };
};
