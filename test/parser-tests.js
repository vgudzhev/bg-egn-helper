var should = require('chai').should();
var parser = require('../scripts/parser.js')();

describe('EGN Parser Tests', function() {

  it('Should extract year from EGN', function() {
    const egn = '9409180882';
    const parsedYear = parse(egn).date.year;

    parsedYear.should.equal(1994);
  });
  
  it('Should extract month from EGN', function() {
    const egn = '9409180882';
    const parsedMonth = parse(egn).date.month;
    const parsedMonthIndex = parse(egn).date.monthIndex;
    
    parsedMonth.should.equal('September');
    parsedMonthIndex.should.equal(9);
  });

  it('Should extract day from EGN', function() {
    const egn = '9409180882';
    const parsedDay = parse(egn).date.day;
    
    parsedDay.should.equal(18);
  });

  it('Should extract region from EGN', function() {
    const egn = '9409180882';
    const parsedRegion = parse(egn, 'en').region;
    
    parsedRegion.should.equal('Burgas');
  });

  it('Should extract gender from EGN', function() {
    const egn = '9409180882';
    const parsedGender = parse(egn, 'en').gender;
    
    parsedGender.should.equal('Male');
  });
});
