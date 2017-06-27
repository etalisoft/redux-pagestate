import { INITIALIZE, REMOVE, SET } from './actionTypes';

export const initialize = ({ key, value, paths }) => {
  if (value instanceof Function) {
    return (dispatch, getState) => initialize(key, value(getState()), paths);
  }

  return {
    type: INITIALIZE,
    payload: {
      key,
      value,
      paths,
    },
  };
};

export const remove = ({ key, value, paths }) => ({
  type: REMOVE,
  value,
  paths,
});

export const set = ({ key, value, paths }) => ({
  type: SET,
  value,
  paths,
});
