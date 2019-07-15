import noop from 'lodash/noop';
import isRegex from '../src/is-regexp-x';

/* eslint-disable-next-line compat/compat */
const hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const itHastoStringTag = hasToStringTag ? it : xit;

describe('isRegex', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof isRegex).toBe('function');
  });

  it('not regexes', function() {
    expect.assertions(9);
    expect(isRegex()).toBe(false, 'undefined is not regex');
    expect(isRegex(null)).toBe(false, 'null is not regex');
    expect(isRegex(false)).toBe(false, 'false is not regex');
    expect(isRegex(true)).toBe(false, 'true is not regex');
    expect(isRegex(42)).toBe(false, 'number is not regex');
    expect(isRegex('foo')).toBe(false, 'string is not regex');
    expect(isRegex([])).toBe(false, 'array is not regex');
    expect(isRegex({})).toBe(false, 'object is not regex');
    expect(isRegex(noop)).toBe(false, 'function is not regex');
  });

  itHastoStringTag('@@toStringTag', function() {
    expect.assertions(1);
    const regex = /a/g;
    const fakeRegex = {
      toString() {
        return String(regex);
      },
      valueOf() {
        return regex;
      },
    };

    /* eslint-disable-next-line compat/compat */
    fakeRegex[Symbol.toStringTag] = 'RegExp';
    expect(isRegex(fakeRegex)).toBe(false, 'fake RegExp with @@toStringTag "RegExp" is not regex');
  });

  it('regexes', function() {
    expect.assertions(2);
    expect(isRegex(/a/g)).toBe(true, 'regex literal is regex');
    expect(isRegex(new RegExp('a', 'g'))).toBe(true, 'regex object is regex');
  });

  it('lastIndex is a marker object', function() {
    expect.assertions(3);
    const regex = /a/;
    const marker = {};
    regex.lastIndex = marker;
    expect(regex.lastIndex).toBe(marker, 'lastIndex is the marker object');
    expect(isRegex(regex)).toBe(true, 'is regex');
    expect(regex.lastIndex).toBe(marker, 'lastIndex is the marker object after isRegex');
  });

  it('lastIndex is nonzero', function() {
    expect.assertions(3);
    const regex = /a/;
    regex.lastIndex = 3;
    expect(regex.lastIndex).toBe(3, 'lastIndex is 3');
    expect(isRegex(regex)).toBe(true, 'is regex');
    expect(regex.lastIndex).toBe(3, 'lastIndex is 3 after isRegex');
  });
});
