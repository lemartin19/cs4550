import { useState, useEffect } from 'react';
import { joinChannel, channelGuess } from '../socket';

export const useInGame = ({ gameId, userId }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    joinChannel(gameId, userId, setState);
  }, [gameId, userId]);

  const {
    play_state,
    current_guess,
    guesses,
    num_players,
    num_players_ready,
    winners,
    player,
    records,
    time_left,
  } = state;

  return {
    playState: play_state,
    playProps: {
      userId,
      currentGuess: current_guess,
      guesses,
      timeLeft: time_left,
      makeGuess: channelGuess,
    },
    setupProps: {
      numPlayers: num_players,
      numReady: num_players_ready,
      player,
      winners,
      records,
    },
    wonProps: {
      winners,
      guesses,
    },
  };
};
