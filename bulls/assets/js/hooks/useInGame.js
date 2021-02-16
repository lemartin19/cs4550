import { useState, useEffect } from 'react';
import { joinChannel, channelGuess } from '../socket';

export const useInGame = ({ gameId, userId }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    joinChannel(gameId, userId, setState);
  }, [gameId, userId]);

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
  };
};
