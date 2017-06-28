import { INITIALIZE, REMOVE, SET } from './actionTypes';

const changed = (state, key, value, paths) => {
  return state[key].value !== value || (paths && state[key].paths.join() !== paths.join());
};

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
      console.log('CHANGED');
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
          paths: paths || state[key].paths || [window.location.pathname],
        },
      };
    }

    console.log('RETURN ORIGINAL');
    return state;
  },
};

export default behaviors;
