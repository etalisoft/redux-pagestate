import expect from 'expect';
import selectPageState from '../selectPageState';

describe('selectPageState', () => {
  it('should return a function', () => {
    expect(selectPageState()).toBeA('function');
  });

  it('should return the pagestate from the state', () => {
    expect(
      selectPageState('a')({
        pagestate: {
          a: {
            value: {
              name: 'Bob',
              age: 23,
            },
            paths: ['/a'],
          },
        },
      }),
    ).toEqual({
      name: 'Bob',
      age: 23,
    });
  });
});
