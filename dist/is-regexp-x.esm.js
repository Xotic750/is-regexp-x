import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import has from 'has-own-property-x';
import gOPD from 'object-get-own-property-descriptor-x';
import defineProperty from 'object-define-property-x';
import toStringTag from 'to-string-tag-x';
var regexExec = /none/.exec;
var regexClass = '[object RegExp]';

var tryRegexExecCall = function tryRegexExec(value, descriptor) {
  try {
    value.lastIndex = 0;
    regexExec.call(value);
    return true;
  } catch (e) {
    return false;
  } finally {
    defineProperty(value, 'lastIndex', descriptor);
  }
};
/**
 * This method tests if a value is a regex.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} `true` if value is a regex; otherwise `false`.
 */


export default function isRegex(value) {
  if (isObjectLike(value) === false) {
    return false;
  }

  if (hasToStringTag === false) {
    return toStringTag(value) === regexClass;
  }

  var descriptor = gOPD(value, 'lastIndex');
  var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');

  if (hasLastIndexDataProperty !== true) {
    return false;
  }

  return tryRegexExecCall(value, descriptor);
}

//# sourceMappingURL=is-regexp-x.esm.js.map