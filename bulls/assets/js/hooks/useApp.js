import { useState, useEffect } from "react";
import { joinChannel, channelReset, channelGuess } from "../socket";

export const useApp = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    joinChannel(setState);
  });

  const { play_state, guesses } = state;

  return {
    playState: play_state,
    guesses,
    makeGuess: channelGuess,
    resetGame: channelReset,
  };
};
