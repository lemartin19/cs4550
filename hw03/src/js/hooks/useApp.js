'use es6';

import { shuffle, last } from 'underscore';
import { useState, useCallback, useEffect } from 'react';
import {
  CowBullTypes,
  GamePlayStates,
  NUM_LIVES,
} from '../constants/GamePlayConstants';

const generateSecret = () => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const shuffled = shuffle(digits);
  return shuffled.slice(0, 4).join('');
};

const calcNewPlayState = (playState, guesses, secret) => {
  const { guess } = last(guesses);
  if (guess === secret) return GamePlayStates.WIN;
  if (guesses.length >= NUM_LIVES) return GamePlayStates.LOSE;
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
      const newPlayState = calcNewPlayState(playState, newGuesses, secret);
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
