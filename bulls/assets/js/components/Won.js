'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { GuessTable } from './GuessTable';

export const Won = ({ winners, guesses }) => {
  return (
    <>
      <p>
        Game over! Winner{winners.length > 1 ? 's' : ''}: {winners.join(',')}
      </p>
      <GuessTable guesses={guesses} winners={winners} />
    </>
  );
};
Won.displayName = 'Won';
Won.propTypes = {
  guesses: PropTypes.object.isRequired,
  winners: PropTypes.arrayOf(PropTypes.string),
};
Won.defaultProps = { winnners: [] };
