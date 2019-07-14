let isRegex;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  isRegex = require('../../index.js');
} else {
  isRegex = returnExports;
}

const hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const itHastoStringTag = hasToStringTag ? it : xit;

describe('isRegex', function() {
  it('is a function', function() {
    expect(typeof isRegex).toBe('function');
  });

  it('not regexes', function() {
    expect(isRegex()).toBe(false, 'undefined is not regex');
    expect(isRegex(null)).toBe(false, 'null is not regex');
    expect(isRegex(false)).toBe(false, 'false is not regex');
    expect(isRegex(true)).toBe(false, 'true is not regex');
    expect(isRegex(42)).toBe(false, 'number is not regex');
    expect(isRegex('foo')).toBe(false, 'string is not regex');
    expect(isRegex([])).toBe(false, 'array is not regex');
    expect(isRegex({})).toBe(false, 'object is not regex');
    expect(isRegex(function() {})).toBe(false, 'function is not regex');
  });

  itHastoStringTag('@@toStringTag', function() {
    const regex = /a/g;
    const fakeRegex = {
      toString() {
        return String(regex);
      },
      valueOf() {
        return regex;
      },
    };

    fakeRegex[Symbol.toStringTag] = 'RegExp';
    expect(isRegex(fakeRegex)).toBe(false, 'fake RegExp with @@toStringTag "RegExp" is not regex');
  });

  it('regexes', function() {
    expect(isRegex(/a/g)).toBe(true, 'regex literal is regex');
    expect(isRegex(new RegExp('a', 'g'))).toBe(true, 'regex object is regex');
  });

  it('lastIndex is a marker object', function() {
    const regex = /a/;
    const marker = {};
    regex.lastIndex = marker;
    expect(regex.lastIndex).toBe(marker, 'lastIndex is the marker object');
    expect(isRegex(regex), 'is regex');
    expect(regex.lastIndex).toBe(marker, 'lastIndex is the marker object after isRegex');
  });

  it('lastIndex is nonzero', function() {
    const regex = /a/;
    regex.lastIndex = 3;
    expect(regex.lastIndex).toBe(3, 'lastIndex is 3');
    expect(isRegex(regex)).toBe(true, 'is regex');
    expect(regex.lastIndex).toBe(3, 'lastIndex is 3 after isRegex');
  });
});
