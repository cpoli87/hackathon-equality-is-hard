# Hackathon languages comparison
> https://www.craigstuntz.com/posts/2020-03-09-equality-is-hard.html

Remember one of the laws for equals comparisons is that they should be transitive: `if a = b and b = c then a = c`.
Unfortunately, when coupled with **type coersion**, languages often fail at this.

In JavaScript,

```js
'' == 0;      // true
0  == '0';    // true
'' == '0';    // false!
```

Never use `==` in JavaScript. Use `===` instead.

# JavaScript

Type coersion: tries to convert first, then compare.

ECMA script last version docs: https://tc39.es/ecma262/#sec-testing-and-comparison-operations

The specification might say something but the implementations will vary: https://kangax.github.io/compat-table/es2016plus/

## Comparison operators
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

JavaScript has both strict and type–converting comparisons.

* A strict comparison (e.g., ===) is only true if the operands are of the same type and the contents match.
* The more commonly-used abstract comparison (e.g. ==) converts the operands to the same type before making the comparison.
* For relational abstract comparisons (e.g., <=), the operands are first converted to primitives, then to the same type, before comparison.

Features:
* Two *strings* are *strictly* equal when they have the same sequence of characters, same length, and same characters in corresponding positions.
* Two *numbers* are *strictly* equal when they are numerically equal (have the same number value).
  * `NaN` *is not* equal to anything, including `NaN`.
    * `NaN == NaN \\ false`
    * `NaN === NaN \\ false`
  * Positive and negative zeros *are* equal to one another.
    * `-0 == +0 \\ true`
    * `-0 === +0 \\ true`
* Two Boolean operands are strictly equal if both are true or both are false.
* Two distinct *objects* are *never equal* for either strict or abstract comparisons.
* An expression comparing Objects is only true if the operands reference the *same Object*.
* `Null` and `Undefined` Types are *strictly equal* to themselves and *abstractly equal* to each other.

### Equality `==` & Inequality `!=`

* The equality operator *converts* the operands if they are not of the same type, then applies *strict comparison*.
* If both operands are objects, then JavaScript compares internal references which are equal when operands refer to the same object in memory.

```js
1    ==  1         // true
'1'  ==  1         // true
1    == '1'        // true
0    == false      // true
0    == null       // false
var object1 = {'key': 'value'}, object2 = {'key': 'value'};
object1 == object2 // false
0    == undefined  // false
null == undefined  // true
```

### Identity / strict equality `(===)` & Non-identity / strict inequality `(!==)`

The identity operator returns true/false if the operands are *strictly (in)equal* with *no type conversion*.

```js
3 === 3   // true
3 === '3' // false
var object1 = {'key': 'value'}, object2 = {'key': 'value'};
object1 === object2 //false
```

### Relational operators

* Each of these operators will *coerce* its operands to primitives before a comparison is made.
  * Type *coercion* is the *implicit* conversion of values from one data type to another (such as strings to numbers).
* If both end up as strings, they are compared using lexicographic order, otherwise they are cast to numbers to be compared.
* A comparison against `NaN` will always yield `false`.

```js
const value1 = '5';
const value2 = 9;
let sum = value1 + value2;

console.log(sum); // 59, JS choose to change 9 to string

// you can force to convert to number
sum = Number(value1) + value2;
```

### Using the equality operators

* Standard (Abstract) equality operators (`==` and `!=`) convert/coerce the type before comparing.
* Strict equality operators (`===` and `!==`) consider the type as is.

```js
// true as both operands are type String (i.e. string primitives):
'foo' === 'foo'

var a = new String('foo');
var b = new String('foo');

// false as a and b are type Object and reference different objects
a == b

// false as a and b are type Object and reference different objects
a === b

// true as a and 'foo' are of different type and, the Object (a)
// is converted to String 'foo' before comparison
a == 'foo'
```

## Integer
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
> https://tc39.es/ecma262/#sec-isinteger

`Number.isInteger(args)`

It determines if argument is a finite integer Number value. It performs the following steps when called:

```
If Type(argument) is not Number, return false.
If argument is NaN, +∞, or -∞, return false.
If floor(abs(argument)) ≠ abs(argument), return false.
Return true.
```

Examples:
```js
Number.isInteger(0);         // true
Number.isInteger(1);         // true
Number.isInteger(-100000);   // true
Number.isInteger(99999999999999999999999); // true

Number.isInteger(0.1);       // false
Number.isInteger(Math.PI);   // false

Number.isInteger(NaN);       // false
Number.isInteger(Infinity);  // false
Number.isInteger(-Infinity); // false
Number.isInteger('10');      // false
Number.isInteger(true);      // false
Number.isInteger(false);     // false
Number.isInteger([1]);       // false

Number.isInteger(5.0);       // true
Number.isInteger(5.000000000000001); // false
Number.isInteger(5.0000000000000001); // true
```

In the last case `Number.isInteger(5.0000000000000001);`, JS treat the number as 5.

Basic arithmetic is broken: `Number.MAX_SAFE_INTEGER - 0.1 === Number.MAX_SAFE_INTEGER` returns `true`.

## Edge cases and memes
> https://dev.to/damxipo/javascript-versus-memes-explaining-various-funny-memes-2o8c

![](js-meme.png)
<!-- ![](js-meme-2.jpg) -->

<!-- ```js
0 == "0" // true
0 == [] // true
0 == "\t" // true
[] == "\t" // false
[] == "0" // false
"\t" == "0" // false
``` -->
```js
0 == "0" // true
0 == [] // true
"0" == [] // false
```

* `0 == "0" -> true`: converts `"0"` to `0` before performing the comparison.
* `0 == [] -> true`:
  * The left operand is `number`.
  * The right operand is coerced to `number`.
  * `Number([]) -> false`, the false is coerced to number.
  * `Number(false) -> 0`.
  * Finally, `0 == 0` is `true`.
* `"0" == [] -> false`: No idea!

More cases:

```js
typeof NaN // 'number'
9999999999999999 // 10000000000000000
0.5+0.1 == 0.6 // true
0.1+0.2 == 0.3 // false, because 0.1+0.2 == 0.30000000000000004
true+true+true === 3 // true
true === 1 // false
[] == 0 // true
"11" + 1 // "111"
"11" - 1 // 10
```

* `typeof NaN = "number"`: `NaN` is a number and can't be compared with any other `NaN` (`NaN==NaN - false`)
* `9999999999999999 -> 10000000000000000 `: JS doesn't have integers, only 64-bit floats. You've ran out of floating-point precision represented with the constant `Number.MAX_SAFE_INTEGER` constant (which is broken).
* `0.5+0.1==0.6 -> true `: operation first, then comparison. All good.
* `0.1+0.2==0.3 -> false`: problem with operation and precision. I don't know why.
  * `0.1+0.2 -> 0.30000000000000004`
  * `0.30000000000000004 = 0.6 - false`
* `true+true+true === 3 -> true`: `true` is casted to `1` when is used with the `+` operator, so is converted to `1+1+1`.
* `true === 1 -> false`: strictly comparison, no coercion/conversion.
* `[] == 0 -> true `: Array to number conversion, `Number([])` is `0`, so `0==0`.
* `"11" + 1 -> "111"`: Concatenation between string and number the, last is casted to String.
* `"11" - 1 -> 10`: the `minus` operator force arithmetic evaluation.


# R
