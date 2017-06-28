import expect from 'expect';

import matchers from '../matchers';

describe('matchers', () => {
  describe('equal', () => {
    it('should be case-sensitive', () => {
      const matcher = matchers['equal'];
      expect(matcher('/a')('/a')).toBe(true);
      expect(matcher('/a')('/b')).toBe(false);
    });
  });

  describe('lower', () => {
    it('should be case-insensitive', () => {
      const matcher = matchers['lower'];
      expect(matcher('/Aa')('/aA')).toBe(true);
      expect(matcher('/Aa')('/bB')).toBe(false);
    });

    it('should treat falsy as empty string', () => {
      const matcher = matchers['lower'];
      expect(matcher(0)(null)).toBe(true);
      expect(matcher(undefined)('')).toBe(true);
      expect(matcher(false)(NaN)).toBe(true);
      expect(matcher(0)('a')).toBe(false);
    });
  });

  describe('regex', () => {
    it('should use regular expressions', () => {
      const matcher = matchers['regex'];
      expect(matcher('/cat/tiger')('^/cat')).toBe(true);
      expect(matcher('/dog/poodle')('^/cat')).toBe(false);
    });
  });
});
