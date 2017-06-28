import expect from 'expect';

import reducer from '../reducer';
import { changePath } from '../actions';

describe('reducer changePath', () => {
  it('should whitelist pagestates', () => {
    const state = {
      a: {
        value: 'A',
        paths: ['/a'],
      },
      ab: {
        value: 'AB',
        paths: ['/a', '/b'],
      },
      b: {
        value: 'B',
        paths: ['/b'],
      },
    };
    const action = changePath({ path: '/a' });
    expect(reducer(state, action)).toEqual({
      a: {
        value: 'A',
        paths: ['/a'],
      },
      ab: {
        value: 'AB',
        paths: ['/a', '/b'],
      },
    });
  });

  it('should return unmodified state when unchanged', () => {
    const state = {
      a: {
        value: 'A',
        paths: ['/a'],
      },
      ab: {
        value: 'AB',
        paths: ['/a', '/b'],
      },
    };
    const action = changePath({ path: '/a' });
    expect(reducer(state, action)).toBe(state);
  });
});
