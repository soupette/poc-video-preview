function init(initialState, props) {
  // Initialise props
  return initialState.keySeq().reduce((acc, current) => {
    if (props[current]) {
      return acc.set(current, props[current]);
    }

    return acc;
  }, initialState);
}

export default init;
