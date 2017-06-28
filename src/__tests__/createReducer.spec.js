import expect from 'expect';

import createReducer from '../createReducer';
import { changePath } from '../actions';

describe('createReducer', () => {
  it('should utilize custom matchers', () => {
    const matchers = {
      startsWith: a => b => a.startsWith(b),
    };
    const reducer = createReducer({ matchers });
    const state = {
      a: {
        value: 'A',
        paths: ['/a'],
      },
      b: {
        value: 'B',
        paths: ['/b'],
      },
    };
    const action = changePath({ path: '/a/b/c/d/e', matcher: 'startsWith' });
    expect(reducer(state, action)).toEqual({
      a: {
        value: 'A',
        paths: ['/a'],
      },
    });
  });
});
