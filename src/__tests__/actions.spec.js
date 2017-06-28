import expect from 'expect';
import expectPredicate from 'expect-predicate';
import { isFSA } from 'flux-standard-action';

import { CHANGE_PATH, INITIALIZE, REMOVE, SET } from '../actionTypes';
import { changePath, initialize, remove, set } from '../actions';

expect.extend(expectPredicate);

describe('actions', () => {
  describe('changePath', () => {
    let pathname;

    beforeEach(() => {
      pathname = global.window.location.pathname;
      global.window.location.pathname = '/a';
    });

    afterEach(() => {
      global.window.location.pathname = pathname;
    });

    it('should create changePath (default: path+matcher)', () => {
      expect(changePath())
        .toEqual({
          type: CHANGE_PATH,
          payload: {
            path: global.document.location.pathname,
            matcher: 'equal',
          },
        })
        .toPass(isFSA);
    });

    it('should create changePath (default: path)', () => {
      const data = { matcher: 'lower' };
      expect(changePath(data))
        .toEqual({
          type: CHANGE_PATH,
          payload: {
            path: global.window.location.pathname,
            matcher: 'lower',
          },
        })
        .toPass(isFSA);
    });

    it('should create changePath (default: matcher)', () => {
      const data = { path: '/a' };
      expect(changePath(data))
        .toEqual({
          type: CHANGE_PATH,
          payload: {
            path: '/a',
            matcher: 'equal',
          },
        })
        .toPass(isFSA);
    });

    it('should create changePath action', () => {
      const data = { path: '/a', matcher: 'lower' };
      expect(changePath(data))
        .toEqual({
          type: CHANGE_PATH,
          payload: {
            path: '/a',
            matcher: 'lower',
          },
        })
        .toPass(isFSA);
    });
  });

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
