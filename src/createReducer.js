import { CHANGE_PATH, INITIALIZE, REMOVE, SET } from './actionTypes';
import initialState from './initialState';

const changed = (state, key, value, paths) => {
  return state[key].value !== value || (paths && state[key].paths.join() !== paths.join());
};

const createReducer = ({ matchers }) => {
  const behaviors = {
    [CHANGE_PATH](state, { payload: { path, matcher } }) {
      const match = matchers[matcher](path);
      const current = Object.keys(state).filter(k => state[k].paths.some(match));
      const compose = (o, k) => ({ ...o, [k]: state[k] });
      return current.length === Object.keys(state).length ? state : current.reduce(compose, {});
    },
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

  return (state = initialState, action) => {
    const behavior = action && action.type && behaviors[action.type];
    return behavior ? behavior(state, action) : state;
  };
};

export default createReducer;
