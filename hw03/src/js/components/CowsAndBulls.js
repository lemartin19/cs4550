'use es6';

import '../../css/CowsAndBulls.css';
import cowJpg from '../../img/cow.jpg';
import bullJpg from '../../img/bull.jpg';

import React from 'react';
import PropTypes from 'prop-types';
import { CowBullTypes } from '../constants/GamePlayConstants';
import { CattlePropType } from '../constants/GamePropTypes';

const Cow = () => <img src={cowJpg} alt="cow" />;
Cow.displayName = 'Cow';

const Bull = () => <img src={bullJpg} alt="bull" />;
Bull.displayName = 'Bull';

const Cattle = ({ type }) => {
  switch (type) {
    case CowBullTypes.COW:
      return <Cow />;
    case CowBullTypes.BULL:
      return <Bull />;
    default:
      return null;
  }
};
Cattle.displayName = 'Cattle';
Cattle.propTypes = {
  type: CattlePropType,
};

export const CowsAndBulls = ({ result }) => {
  return (
    <div className="CowsAndBulls">
      {result.sort().map((type, idx) => (
        <Cattle type={type} key={idx} />
      ))}
    </div>
  );
};
CowsAndBulls.displayName = 'CowsAndBulls';
CowsAndBulls.propTypes = {
  result: PropTypes.arrayOf(CattlePropType).isRequired,
};
