import expect from 'expect';

import reducer from '../reducer';
import { initialize } from '../actions';

describe('reducer initialize', () => {
  let pathname;

  beforeEach(() => {
    pathname = global.window.location.pathname;
    global.window.location.pathname = '/a';
  });

  afterEach(() => {
    global.window.location.pathname = pathname;
  });

  it('should initialize if the key does not exist', () => {
    const state = {};
    const action = initialize({
      key: 'a',
      value: 'A',
      paths: ['/a'],
    });
    expect(reducer(state, action)).toMatch({
      a: {
        value: 'A',
        paths: ['/a'],
      },
    });
  });

  it('should initialize with a default path if one was not provided', () => {
    const state = {};
    const action = initialize({
      key: 'a',
      value: 'A',
    });
    expect(reducer(state, action)).toMatch({
      a: {
        value: 'A',
        paths: [global.window.location.pathname],
      },
    });
  });

  it('should return the unmodified state if the key exists', () => {
    const state = {
      a: {
        value: 'A',
        paths: [],
      },
    };
    const action = initialize({
      key: 'a',
      value: 'aaa',
      paths: ['/a'],
    });
    expect(reducer(state, action)).toEqual(state);
  });
});
