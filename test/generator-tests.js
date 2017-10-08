var should = require('chai').should();
var generator = require('../scripts/generator.js')();
var validator = require('../scripts/validator.js')();

describe('EGN Generator Tests', function() {

  it('Should generate new valid EGN with length of 10', function() {
    const egn = generate();
    egn.length.should.equal(10);
  });

  it('Should generate new valid EGN with digits only', function() {
    const egn = generate();
    /[0-9]/.test(egn).should.equal(true);
  });

  it('Should generate new valid EGN, checked by validate() function', function() {
    validate(generate()).should.equal(true);
  });

  it('Should generate 1000 new valid EGN, checked by valdiate() function', function() {
    let flag = true;

    for(let i = 0; i < 1000; i++){
        let current = generate();
        if(!validate(current)){
            flag = false;
        }    
    }

    flag.should.equal(true);
  });
  
});
