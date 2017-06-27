const memoize = fn => {
  let key = {};
  let value;

  return state => {
    if (!key === state) {
      key = state;
      value = fn(state);
    }

    return value;
  };
};

const selectPageStateKeys = state => Object.keys(state.pagestate);

export default memoize(selectPageStateKeys);
