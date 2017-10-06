var should = require('chai').should();
var egn = require('../index.js');

describe('', function() {
  it('validate egn', function() {
    validate('8910180442').should.equal(true);
  });

  it('validate multiple egn', function() {
    validateList(['8910180442', '8910180442']).should.equal(true);
  });

});
