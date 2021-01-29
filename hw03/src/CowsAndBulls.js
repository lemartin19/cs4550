import { useMemo } from 'react';

const COW = 'COW';
const BULL = 'BULL';

const Cow = () => <img src="./cow.jpg" alt="cow" />;
Cow.displayName = 'Cow';

const Bull = () => <img src="./bull.jpg" alt="bull" />;
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

const NoCowsAndBulls = () => {
  return <>No cows or bulls for current guess</>;
};
NoCowsAndBulls.displayName = 'NoCowsAndBulls';

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

  return cowsAndBulls.length ? (
    <SomeCowsAndBulls cowsAndBulls={cowsAndBulls} />
  ) : (
    <NoCowsAndBulls />
  );
};
CowsAndBulls.displayName = 'CowsAndBulls';

export default CowsAndBulls;
