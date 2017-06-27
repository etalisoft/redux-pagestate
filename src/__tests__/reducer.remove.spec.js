import expect from 'expect';

import reducer from '../reducer';
import { remove } from '../actions';

describe('reducer remove', () => {
  it('should remove the key from the state if it exists', () => {
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
    const action = remove({ key: 'a' });
    expect(reducer(state, action)).toMatch({
      b: {
        value: 'B',
        paths: ['/b'],
      },
    });
  });

  it('should return the unmodified state if the key does not exist', () => {
    const state = {
      a: {
        value: 'A',
        paths: ['/a'],
      },
    };
    const action = remove({ key: 'b' });
    expect(reducer(state, action)).toMatch({});
  });
});
