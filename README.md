# bg-egn-helper

A national identification number, national identity number, or national insurance number is used by the governments of many countries as a means of tracking their citizens, permanent residents, and temporary residents for the purposes of work, taxation, government benefits, health care, and other governmentally-related functions. The number appears on identity documents issued by several of the countries.

Every citizen or permanent resident of Bulgaria has a unique 10-digit Uniform Civil Number (Bulgarian: Единен граждански номер, Edinen grazhdanski nomer, usually abbreviated as ЕГН, EGN), generated from the person's date of birth (encoded in six digits in the form YYMMDD), followed by a three-digit serial number and a single-digit checksum.

This project will help users to validate, generate new and extract information from any given valid EGN number

## Installation

  npm install bg-egn-helper --save

## Usage

  var helper = require('bg-egn-helper');

  validate('9999999999'); // Will return false

  validateList(['9999999999','9999999999']); // Will return false if any of the given EGN is not valid

  generate(); // Will generate new valid EGN

  generate(2017, 10, 10, 0, 442); // Will generate new valid egn for Male, born in Burgas in 10th of October 2017

## Tests

  npm test

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
