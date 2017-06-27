import expect from 'expect';

import initialState from '../initialState';
import reducer from '../reducer';

describe('reducer', () => {
  it('should initialize state to initialState if not supplied', () => {
    expect(reducer()).toEqual(initialState);
  });

  it('should otherwise use the supplied state', () => {
    const state = { a: 'a', b: 'b' };
    expect(reducer(state)).toEqual(state);
  });
});
