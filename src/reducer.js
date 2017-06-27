import behaviors from './reducerBehaviors';

export default (state, action) => {
  const behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};
