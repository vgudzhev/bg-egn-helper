var should = require('chai').should();
var egn = require('../index.js');

describe('', function() {
  it('Should validate a valid egn', function() {
    validate('8910180442').should.equal(true);
  });

  it('Should validate multiple valid EGN', function() {
    validateList(['8910180442', '8910180442']).should.equal(true);
  });

  it('Should generate new valid EGN', function() {
    validate(generate()).should.equal(true);
  });
});
