var validator = require('./scripts/validator.js')();
var generator = require('./scripts/generator.js')();

module.exports = function() {
    this.validate = require('./scripts/validator.js')(egn);
}
