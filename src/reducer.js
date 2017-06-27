import behaviors from './reducerBehaviors';
import initialState from './initialState';

export default (state = initialState, action) => {
  const behavior = action && action.type && behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};
