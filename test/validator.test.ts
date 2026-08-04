import { describe, it, expect } from 'vitest';
import { validate, validateList } from '../src/validator';

describe('validate', () => {
  it('returns true for a valid EGN', () => {
    expect(validate('9409180882')).toBe(true);
  });

  it('returns true for another known valid EGN', () => {
    expect(validate('6808070004')).toBe(true);
  });

  it('returns false for an invalid EGN', () => {
    expect(validate('9999999999')).toBe(false);
  });

  it('returns false for wrong checksum', () => {
    expect(validate('9409180881')).toBe(false);
  });

  it('returns false for non-string input', () => {
    expect(validate(9409180882 as unknown as string)).toBe(false);
  });

  it('returns false for EGN shorter than 10 digits', () => {
    expect(validate('940918088')).toBe(false);
  });

  it('returns false for EGN longer than 10 digits', () => {
    expect(validate('94091808821')).toBe(false);
  });

  it('returns false for EGN with non-digit characters', () => {
    expect(validate('940918088a')).toBe(false);
    expect(validate('abcdefghij')).toBe(false);
    expect(validate('9409180 82')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(validate('')).toBe(false);
  });

  it('rejects dates during Bulgaria Gregorian calendar gap (April 1-13, 1916)', () => {
    expect(validate('1604050000')).toBe(false);
  });
});

describe('validateList', () => {
  it('returns true when all EGNs are valid', () => {
    expect(validateList(['9409180882', '6808070004'])).toBe(true);
  });

  it('returns false when any EGN is invalid', () => {
    expect(validateList(['9409180882', '9999999999'])).toBe(false);
  });

  it('returns false when all EGNs are invalid', () => {
    expect(validateList(['9999999999', '0000000000'])).toBe(false);
  });

  it('returns true for empty list', () => {
    expect(validateList([])).toBe(true);
  });
});
