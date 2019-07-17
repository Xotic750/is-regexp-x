import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import has from 'has-own-property-x';
import gOPD from 'object-get-own-property-descriptor-x';
import defineProperty from 'object-define-property-x';
import toStringTag from 'to-string-tag-x';

const regexExec = /none/.exec;
const regexClass = '[object RegExp]';

const tryRegexExecCall = function tryRegexExec(value, descriptor) {
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
const isRegex = function isRegex(value) {
  if (isObjectLike(value) === false) {
    return false;
  }

  if (hasToStringTag === false) {
    return toStringTag(value) === regexClass;
  }

  const descriptor = gOPD(value, 'lastIndex');
  const hasLastIndexDataProperty = descriptor && has(descriptor, 'value');

  if (hasLastIndexDataProperty !== true) {
    return false;
  }

  return tryRegexExecCall(value, descriptor);
};

export default isRegex;
