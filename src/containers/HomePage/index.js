/**
*
* HomePage
*
*/
import React, { useReducer } from 'react';
// import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import init from './init';

function HomePage() {
  const [reducerState, dispatch] = useReducer(reducer, initialState, init);

  return (
    <div>
      HomePage
    </div>
  );
}

HomePage.defaultProps = {};
HomePage.propTypes = {};

export default HomePage;