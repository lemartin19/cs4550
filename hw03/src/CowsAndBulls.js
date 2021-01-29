import './CowsAndBulls.css';
import cowJpg from './cow.jpg';
import bullJpg from './bull.jpg';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const COW = 'COW';
const BULL = 'BULL';

const Cow = () => <img src={cowJpg} alt="cow" />;
Cow.displayName = 'Cow';

const Bull = () => <img src={bullJpg} alt="bull" />;
Bull.displayName = 'Bull';

const Cattle = ({ type }) => {
  switch (type) {
    case COW:
      return <Cow />;
    case BULL:
      return <Bull />;
    default:
      throw new Error(`unexepcted type of cattle: ${type}`);
  }
};
Cattle.displayName = 'Cattle';
Cattle.propTypes = {
  type: PropTypes.oneOf([COW, BULL]).isRequired,
};

const SomeCowsAndBulls = ({ cowsAndBulls }) => {
  return (
    <>
      {cowsAndBulls.map((type, idx) => (
        <Cattle type={type} key={idx} />
      ))}
    </>
  );
};
SomeCowsAndBulls.displayName = 'SomeCowsAndBulls';
SomeCowsAndBulls.propTypes = {
  cowsAndBulls: PropTypes.array.isRequired,
};

const NoCowsAndBulls = () => {
  return <>No cows or bulls for current guess</>;
};
NoCowsAndBulls.displayName = 'NoCowsAndBulls';
NoCowsAndBulls.propTypes = {};

const CowsAndBulls = ({ secret, guess }) => {
  const cowsAndBulls = useMemo(
    () =>
      guess
        .split('')
        .map((digit, idx) => {
          if (secret.charAt(idx) === digit) return BULL;
          if (secret.includes(digit)) return COW;
          return null;
        })
        .filter(Boolean)
        .sort(),
    [secret, guess]
  );

  return (
    <div className="CowsAndBulls">
      {cowsAndBulls.length ? (
        <SomeCowsAndBulls cowsAndBulls={cowsAndBulls} />
      ) : (
        <NoCowsAndBulls />
      )}
    </div>
  );
};
CowsAndBulls.displayName = 'CowsAndBulls';
CowsAndBulls.propTypes = {
  guess: PropTypes.string.isRequired,
  secret: PropTypes.string,
};

export default CowsAndBulls;
