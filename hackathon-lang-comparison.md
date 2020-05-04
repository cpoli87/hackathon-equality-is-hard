# Hackathon languages comparison
> https://www.craigstuntz.com/posts/2020-03-09-equality-is-hard.html

Remember one of the laws for equals comparisons is that they should be transitive: `if a = b and b = c then a = c`.
Unfortunately, when coupled with **type coersion**, languages often fail at this.

In JavaScript,

```
'' == 0;      // true
0  == '0';    // true
'' == '0';    // false!
```

Never use `==` in JavaScript. Use `===` instead.

# JavaScript

Type coersion: tries to convert first, then compare.

ECMA script last version docs: https://tc39.es/ecma262/#sec-testing-and-comparison-operations

The specification might say something but the implementations will vary: https://kangax.github.io/compat-table/es2016plus/

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
```
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


## Comparison operators
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

JavaScript has both strict and type–converting comparisons.

* A strict comparison (e.g., ===) is only true if the operands are of the same type and the contents match.
* The more commonly-used abstract comparison (e.g. ==) converts the operands to the same type before making the comparison.
* For relational abstract comparisons (e.g., <=), the operands are first converted to primitives, then to the same type, before comparison.

Features:
* Two strings are *strictly* equal when they have the same sequence of characters, same length, and same characters in corresponding positions.
* Two numbers are strictly equal when they are numerically equal (have the same number value). NaN is not equal to anything, including NaN. Positive and negative zeros are equal to one another.
Two Boolean operands are strictly equal if both are true or both are false.
Two distinct objects are never equal for either strict or abstract comparisons.
An expression comparing Objects is only true if the operands reference the same Object.
Null and Undefined Types are strictly equal to themselves and abstractly equal to each other.



# R
