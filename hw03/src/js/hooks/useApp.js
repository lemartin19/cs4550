'use es6';

import { useState, useCallback, useEffect } from 'react';
import {
  CowBullTypes,
  GamePlayStates,
  NUM_LIVES,
} from '../constants/GamePlayConstants';

const generateSecret = () => {
  const num = Math.random() * 10000;
  const string = `${Math.floor(num)}`;
  return string.padStart(4, 0);
};

const calcNewPlayState = (playState, guesses, secret) => {
  if (guesses[guesses.length - 1] === secret) return GamePlayStates.WIN;
  if (guesses.length >= NUM_LIVES - 1) return GamePlayStates.LOSE;
  return playState;
};

const calcGuessResult = (guess, secret) =>
  guess.split('').map((digit, idx) => {
    if (secret.charAt(idx) === digit) return CowBullTypes.BULL;
    if (secret.includes(digit)) return CowBullTypes.COW;
    return null;
  });

export const useApp = () => {
  const [state, setState] = useState({
    playState: GamePlayStates.PLAY,
    secret: '',
    guesses: [],
  });
  const { playState, secret, guesses } = state;

  useEffect(() => {
    setState({ playState, secret: generateSecret(), guesses });
  }, []);

  const resetGame = useCallback(() => {
    setState({
      playState: GamePlayStates.PLAY,
      secret: generateSecret(),
      guesses: [],
    });
  }, []);

  const makeGuess = useCallback(
    (guess) => {
      const newGuesses = guesses.concat({
        guess,
        result: calcGuessResult(guess, secret),
      });
      const newPlayState = calcNewPlayState(playState, guesses, secret);
      setState({
        playState: newPlayState,
        secret,
        guesses: newGuesses,
      });
    },
    [playState, secret, guesses]
  );

  return { playState, guesses, resetGame, makeGuess };
};
