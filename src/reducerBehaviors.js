import { INITIALIZE, REMOVE, SET } from './actionTypes';

const changed = (state, key, value, paths) => state[key].value !== value || (paths && state[key].paths !== paths);

const behaviors = {
  [INITIALIZE](state, { payload: { key, value, paths } }) {
    if (!state.hasOwnProperty(key)) {
      return {
        ...state,
        [key]: {
          value,
          paths: paths || [window.location.pathname],
        },
      };
    }

    return state;
  },
  [REMOVE](state, { payload: { key } }) {
    if (state.hasOwnProperty(key)) {
      const result = { ...state };
      delete result[key];
      return result;
    }

    return state;
  },
  [SET](state, { payload: { key, value, paths } }) {
    if (!state.hasOwnProperty(key)) {
      return behaviors[INITIALIZE](state, { payload: { key, value, paths } });
    }

    if (changed(state, key, value, paths)) {
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
          paths: paths || state[key].paths || [window.location.pathname],
        },
      };
    }

    return state;
  },
};

export default behaviors;
