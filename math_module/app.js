var math_module = require('./mathlib.js')();

var sum = math_module.add(3,18);
console.log(sum);

var product = math_module.multiply(12, 3);
console.log(product);

var square = math_module.square(5);
console.log(square);

var random = math_module.random(1, 35);
console.log(random);
