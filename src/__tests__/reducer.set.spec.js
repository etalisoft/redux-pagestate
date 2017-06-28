import expect from 'expect';

import reducer from '../reducer';
import { set } from '../actions';

describe('reducer set', () => {
  let pathname;

  beforeEach(() => {
    pathname = global.window.location.pathname;
    global.window.location.pathname = '/a';
  });

  afterEach(() => {
    global.window.location.pathname = pathname;
  });

  it('should add the page state if the key does not exist', () => {
    const state = {
      b: {
        value: 'B',
        paths: ['/b'],
      },
    };
    const action = set({
      key: 'a',
      value: 'A',
      paths: ['/a'],
    });
    expect(reducer(state, action)).toMatch({
      a: {
        value: 'A',
        paths: ['/a'],
      },
      b: {
        value: 'B',
        paths: ['/b'],
      },
    });
  });

  it('should add the page state with a default path', () => {
    const state = {};
    const action = set({
      key: 'a',
      value: 'A',
    });
    expect(reducer(state, action)).toMatch({
      a: {
        value: 'A',
        paths: [global.document.location.pathname],
      },
    });
  });

  it('should update the page state value', () => {
    const state = {
      b: {
        value: 'b',
        paths: ['/b'],
      },
    };
    const action = set({
      key: 'b',
      value: 'B',
    });
    expect(reducer(state, action)).toMatch({
      b: {
        value: 'B',
        paths: ['/b'],
      },
    });
  });

  it('should update the page state value and paths', () => {
    const state = {
      b: {
        value: 'B',
        paths: ['/B'],
      },
    };
    const action = set({
      key: 'b',
      value: 'b',
      paths: ['/b'],
    });
    expect(reducer(state, action)).toMatch({
      b: {
        value: 'b',
        paths: ['/b'],
      },
    });
  });

  it('should return the original state if the value and paths are unchanged', () => {
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
    const action = set({
      key: 'a',
      value: 'A',
      paths: ['/a'],
    });
    expect(reducer(state, action)).toBe(state);
  });
});
