<a href="https://travis-ci.org/Xotic750/is-regexp-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/is-regexp-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/is-regexp-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-regexp-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/is-regexp-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-regexp-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-regexp-x"
  title="npm version">
<img src="https://badge.fury.io/js/is-regexp-x.svg"
  alt="npm version" height="18">
</a>
<a href="https://www.jsdelivr.com/package/npm/is-regexp-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/is-regexp-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>

<a name="module_is-regexp-x"></a>

## is-regexp-x

Is this value a JS regex?

**Version**: 2.2.0

<a name="exp_module_is-regexp-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>boolean</code> ⏏

This method tests if a value is a regex.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if value is a regex; otherwise `false`.

| Param | Type            | Description        |
| ----- | --------------- | ------------------ |
| value | <code>\*</code> | The value to test. |

**Example**

```js
import isRegex from 'is-regexp-x';

console.log(isRegex(undefined)); // false
console.log(isRegex(null)); // false
console.log(isRegex(false)); // false
console.log(isRegex(true)); // false
console.log(isRegex(42)); // false
console.log(isRegex('foo')); // false
console.log(isRegex(function () {})); // false
console.log(isRegex([])); // false
console.log(isRegex({}))); // false

console.log(isRegex(/a/g)); // true
console.log(isRegex(new RegExp('a', 'g'))); // true
```
