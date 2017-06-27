import expect from 'expect';
import expectPredicate from 'expect-predicate';
import { isFSA } from 'flux-standard-action';

import { INITIALIZE, REMOVE, SET } from '../actionTypes';
import { initialize, remove, set } from '../actions';

expect.extend(expectPredicate);

describe('actions', () => {
  it('should create initialize action', () => {
    const data = { key: 'a', value: 'b', paths: 'c' };
    expect(initialize(data))
      .toEqual({
        type: INITIALIZE,
        payload: data,
      })
      .toPass(isFSA);
  });

  it('should create remove action', () => {
    const data = { key: 'a' };
    expect(remove(data))
      .toEqual({
        type: REMOVE,
        payload: data,
      })
      .toPass(isFSA);
  });

  it('should create set action', () => {
    const data = { key: 'a', value: 'b', paths: 'c' };
    expect(set(data))
      .toEqual({
        type: SET,
        payload: data,
      })
      .toPass(isFSA);
  });
});
