import expect from 'expect';

import selectPageStateKeys from '../selectPageStateKeys';

describe('selectPageStateKeys', () => {
  it('should get the pagestate keys', () => {
    expect(
      selectPageStateKeys({
        pagestate: {
          a: {
            value: 'A',
            paths: ['/a'],
          },
          b: {
            value: 'B',
            paths: ['/b'],
          },
        },
      }),
    ).toMatch(['a', 'b']);
  });

  it('should be memoized', () => {
    const state = {
      pagestate: {
        a: {
          value: 'A',
          paths: ['/a'],
        },
        b: {
          value: 'B',
          paths: ['/b'],
        },
      },
    };
    const first = selectPageStateKeys(state);
    const second = selectPageStateKeys(state);
    expect(first).toBe(second);
  });
});
