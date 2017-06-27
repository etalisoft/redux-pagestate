import { INITIALIZE, REMOVE, SET } from './actionTypes';

export const initialize = ({ key, value, paths }) => ({
  type: INITIALIZE,
  payload: {
    key,
    value,
    paths,
  },
});

export const remove = ({ key }) => ({
  type: REMOVE,
  payload: {
    key,
  },
});

export const set = ({ key, value, paths }) => ({
  type: SET,
  payload: {
    key,
    value,
    paths,
  },
});
