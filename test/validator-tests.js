var should = require('chai').should();
var parser = require('../scripts/validator.js')();

describe('EGN Validator Tests', function() {

  it('Should validate a valid EGN', function() {
    const egn = '9409180882';

    validate(egn).should.equal(true);
  });
  
  it('Should validate a invalid EGN', function() {
    const egn = '9999999999';

    validate(egn).should.equal(false);
  });

  it('Should validte EGN length', function() {
    const egn = '9409180882';
    egn.length.should.equal(10);
  });

  it('Should validate digits only', function() {
    const egn = '9409180882generate()';
    /[0-9]/.test(egn).should.equal(true);
  });

});
