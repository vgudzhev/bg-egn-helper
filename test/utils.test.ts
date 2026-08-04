import { describe, it, expect } from 'vitest';
import { parseEgnDate, computeChecksum, isValidDate, padTwo, padThree } from '../src/utils';

describe('parseEgnDate', () => {
  it('parses 1900s date', () => {
    expect(parseEgnDate('9409180000')).toEqual({ year: 1994, month: 9, day: 18 });
  });

  it('parses 2000s date (month >= 40)', () => {
    expect(parseEgnDate('0041150000')).toEqual({ year: 2000, month: 1, day: 15 });
  });

  it('parses 1800s date (month >= 20)', () => {
    expect(parseEgnDate('5025100000')).toEqual({ year: 1850, month: 5, day: 10 });
  });
});

describe('computeChecksum', () => {
  it('computes correct checksum for known EGN', () => {
    expect(computeChecksum('940918088')).toBe(2);
  });

  it('computes correct checksum for another known EGN', () => {
    expect(computeChecksum('680807000')).toBe(4);
  });
});

describe('isValidDate', () => {
  it('accepts valid dates', () => {
    expect(isValidDate(1994, 9, 18)).toBe(true);
    expect(isValidDate(2000, 1, 1)).toBe(true);
    expect(isValidDate(1900, 12, 31)).toBe(true);
  });

  it('rejects invalid dates', () => {
    expect(isValidDate(2020, 2, 30)).toBe(false);
    expect(isValidDate(2020, 13, 1)).toBe(false);
    expect(isValidDate(2020, 0, 1)).toBe(false);
  });

  it('rejects Gregorian calendar gap (April 1-13, 1916)', () => {
    for (let day = 1; day <= 13; day++) {
      expect(isValidDate(1916, 4, day)).toBe(false);
    }
    expect(isValidDate(1916, 4, 14)).toBe(true);
    expect(isValidDate(1916, 3, 31)).toBe(true);
  });
});

describe('padTwo', () => {
  it('pads single digit', () => {
    expect(padTwo(5)).toBe('05');
  });

  it('does not pad double digit', () => {
    expect(padTwo(12)).toBe('12');
  });

  it('pads zero', () => {
    expect(padTwo(0)).toBe('00');
  });
});

describe('padThree', () => {
  it('pads single digit', () => {
    expect(padThree(5)).toBe('005');
  });

  it('pads double digit', () => {
    expect(padThree(42)).toBe('042');
  });

  it('does not pad triple digit', () => {
    expect(padThree(123)).toBe('123');
  });

  it('pads zero', () => {
    expect(padThree(0)).toBe('000');
  });
});
