const validator = require('./scripts/validator.js')();
const generator = require('./scripts/generator.js')();
const parser = require('./scripts/parser.js')();

module.exports = validator;
module.exports = generator;
module.exports = parser;

console.log(parse('8910180442'));
