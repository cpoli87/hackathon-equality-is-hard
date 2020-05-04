var a1      = 5.000000000000001  // false
var a2      = 5.0000000000000001 // true
var maxInt  = Number.MAX_SAFE_INTEGER

console.log(a1);
console.log(a2);
// console.log(maxInt);

console.log("Is integer?")
console.log(Number.isInteger(a1))
console.log(Number.isInteger(a2))
// console.log(Number.isInteger(maxInt))

console.log("Is safe integer?")
console.log(a1, Number.isSafeInteger(a1))
console.log(Math.floor(Math.abs(a1)), Number.isSafeInteger(Math.floor(Math.abs(a1))))
console.log(Math.abs(a1), Number.isSafeInteger(Math.abs(a1)))

console.log(a2, Number.isSafeInteger(a2))
console.log(Math.floor(Math.abs(a2)), Number.isSafeInteger(Math.floor(Math.abs(a2))))
console.log(Math.abs(a2), Number.isSafeInteger(Math.abs(a2)))

console.log(findMaxSafeFloat(1, true))

process.exit(1)

// If Type(argument) is not Number, return false.
// If argument is NaN, +∞, or -∞, return false.
// If floor(abs(argument)) ≠ abs(argument), return false.
// Return true.

console.log("Types")
console.log(typeof a1)
console.log(typeof a2)
// console.log(typeof maxInt)

console.log("Other comparisons")
console.log(NaN == a1)
console.log(NaN == a2)
console.log(Number.NEGATIVE_INFINITY == a1)
console.log(Number.NEGATIVE_INFINITY == a2)
console.log(Number.POSITIVE_INFINITY == a1)
console.log(Number.POSITIVE_INFINITY == a2)

console.log("a1 ?")
console.log(Math.floor(Math.abs(a1)))
console.log(Math.abs(a1))
console.log(Math.floor(Math.abs(a1)) != Math.abs(a1))
console.log(Math.floor(Math.abs(a1)) !== Math.abs(a1))

console.log("a2 ?")
console.log(Math.floor(Math.abs(a2)))
console.log(Math.abs(a2))
console.log(Math.floor(Math.abs(a2)) != Math.abs(a2)) // does not matter the comparison here, the output is the same
console.log(Math.floor(Math.abs(a2)) !== Math.abs(a2))


// The Math.floor() function returns the largest integer less than or equal to a given number.
var exp1 = Math.floor(Math.abs(a1))
// The Math.abs() function returns the absolute value of a number
var exp2 = Math.abs(a1)


// https://stackoverflow.com/questions/45929493/node-js-maximum-safe-floating-point-number
// basic arithmetic is broken
// Number.MAX_SAFE_INTEGER - 0.1 === Number.MAX_SAFE_INTEGER // returns true

/**Returns whether basic arithmetic breaks between n and n+1, to a precision of `digits` after the decimal point*/
function isUnsafe(n, digits) {
  // digits = 1 loops 10 times with 0.1 increases.
  // digits = 2 means 100 steps of 0.01, and so on.
  let prev = n;
  for (let i = 10 ** -digits; i < 1; i += 10 ** -digits) {
    if (n + i === prev) { // eg 10.2 === 10.1
      rethttps://stackoverflow.com/questions/45929493/node-js-maximum-safe-floating-point-numberurn true;
    }
    prev = n + i;
  }
  return false;
}

/**Binary search between 0 and Number.MAX_SAFE_INTEGER (2**53 - 1) for the biggest number that is safe to the `digits` level of precision.
 * digits=9 took ~30s, I wouldn't pass anything bigger.*/
function findMaxSafeFloat(digits, log = false) {
  let n = Number.MAX_SAFE_INTEGER;
  let lastSafe = 0;
  let lastUnsafe = undefined;
  while (true) {
    if (log) {
      console.table({
        '': {
          n,
          'Relative to Number.MAX_SAFE_INTEGER': `(MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1`,
          lastSafe,
          lastUnsafe,
          'lastUnsafe - lastSafe': lastUnsafe - lastSafe
        }
      });
    }
    if (isUnsafe(n, digits)) {
      lastUnsafe = n;
    } else { // safe
      if (lastSafe + 1 === n) { // Closed in as far as possible
        console.log(`\n\nMax safe number to a precision of ${digits} digits after the decimal point: ${n}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1)\n\n`);
        return n;
      } else {
        lastSafe = n;
      }
    }
    n = Math.round((lastSafe + lastUnsafe) / 2);
  }
}
console.log(typeof exp1)
console.log(typeof exp2)

console.log(exp1 == exp2)
console.log(exp1 === exp2)
