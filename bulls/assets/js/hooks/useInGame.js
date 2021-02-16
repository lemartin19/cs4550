import { useState, useEffect, useCallback } from 'react';
import {
  joinChannel,
  channelReset,
  channelGuess,
  leaveChannel,
} from '../socket';

export const useInGame = ({ gameId, userId, resetGameLogin }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    joinChannel(gameId, userId, setState);
  }, [gameId]);

  const leaveGame = useCallback(() => {
    leaveChannel();
    setState({});
    resetGameLogin();
  });

  const {
    play_state,
    guesses,
    num_players,
    num_players_ready,
    winners,
    player,
  } = state;

  return {
    playState: play_state,
    guesses,
    makeGuess: channelGuess,
    setupProps: {
      numPlayers: num_players,
      numReady: num_players_ready,
      player,
      winners,
    },
    resetGame: channelReset,
    leaveGame,
  };
};
