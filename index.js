const validator = require('./scripts/validator.js')();
const generator = require('./scripts/generator.js')();
const parser = require('./scripts/parser.js')();

module.exports = validator;
module.exports = generator;
module.exports = parser;

var a = generate();
console.log(a);
console.log(parse(a));