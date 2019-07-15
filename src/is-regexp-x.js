/**
 * @file Is this value a JS regex?
 * @version 2.2.0.
 * @author Xotic750 <Xotic750@gmail.com>.
 * @copyright  Xotic750.
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module Is-regexp-x.
 */

const isObjectLike = require('is-object-like-x');

let toStringTag;
let regexClass;
let has;
let gOPD;
let regexExec;
let defineProperty;

if (require('has-to-string-tag-x')) {
  has = require('has-own-property-x');
  gOPD = require('object-get-own-property-descriptor-x');
  defineProperty = require('object-define-property-x');
  regexExec = RegExp.prototype.exec;
} else {
  toStringTag = require('to-string-tag-x');
  regexClass = '[object RegExp]';
}

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
 * @example
 * var isRegex = require('is-regexp-x');.
 *
 * isRegex(undefined); // false
 * isRegex(null); // false
 * isRegex(false); // false
 * isRegex(true); // false
 * isRegex(42); // false
 * isRegex('foo'); // false
 * isRegex(function () {}); // false
 * isRegex([]); // false
 * isRegex({})); // false
 *
 * isRegex(/a/g); // true
 * isRegex(new RegExp('a', 'g')); // true
 */
module.exports = function isRegex(value) {
  if (isObjectLike(value) === false) {
    return false;
  }

  if (toStringTag) {
    return toStringTag(value) === regexClass;
  }

  const descriptor = gOPD(value, 'lastIndex');
  const hasLastIndexDataProperty = descriptor && has(descriptor, 'value');

  if (hasLastIndexDataProperty !== true) {
    return false;
  }

  return tryRegexExecCall(value, descriptor);
};