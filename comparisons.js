console.log("1 == 1", 1    ==  1)         // true
console.log("'1'  ==  1", '1'  ==  1)         // true
console.log("1 == '1'", 1 == '1')        // true
console.log("0 == false", 0 == false)      // true
console.log("0 == null", 0 == null)       // false

var object1 = {'key': 'value'}, object2 = {'key': 'value'};
console.log(object1 == object2) // false
console.log(0    == undefined)  // false
console.log(null == undefined)  // true



console.log("1 != 1",     1 !=  1)         // true
console.log("'1' != 1",   '1' !=  1)         // true
console.log("1 != '1'",   1 != '1')        // true
console.log("0 != false", 0 != false)      // true
console.log("0 != null",  0 != null)       // false
