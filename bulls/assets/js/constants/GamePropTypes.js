'use es6';

import PropTypes from 'prop-types';
import { CowBullTypes, GamePlayStates } from './GamePlayConstants';

export const PlayStatePropType = PropTypes.oneOf(Object.keys(GamePlayStates));

export const CattlePropType = PropTypes.oneOf([
  CowBullTypes.COW,
  CowBullTypes.BULL,
  null,
]);

export const GuessPropType = PropTypes.shape({
  guess: PropTypes.string,
  result: PropTypes.arrayOf(CattlePropType),
});
