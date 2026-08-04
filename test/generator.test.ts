import { describe, it, expect } from 'vitest';
import { generate } from '../src/generator';
import { validate } from '../src/validator';

describe('generate', () => {
  it('generates a 10-digit string', () => {
    const egn = generate();
    expect(egn).toHaveLength(10);
  });

  it('generates digits only', () => {
    const egn = generate();
    expect(egn).toMatch(/^\d{10}$/);
  });

  it('generates a valid EGN', () => {
    expect(validate(generate())).toBe(true);
  });

  it('generates 1000 valid EGNs', () => {
    for (let i = 0; i < 1000; i++) {
      expect(validate(generate())).toBe(true);
    }
  });

  it('respects specific year, month, day', () => {
    const egn = generate({ year: 1994, month: 9, day: 18 });
    expect(validate(egn)).toBe(true);
    expect(egn.slice(0, 6)).toBe('940918');
  });

  it('generates male EGN (even region code)', () => {
    for (let i = 0; i < 50; i++) {
      const egn = generate({ gender: 'male' });
      expect(validate(egn)).toBe(true);
      expect(Number(egn.slice(6, 9)) % 2).toBe(0);
    }
  });

  it('generates female EGN (odd region code)', () => {
    for (let i = 0; i < 50; i++) {
      const egn = generate({ gender: 'female' });
      expect(validate(egn)).toBe(true);
      expect(Number(egn.slice(6, 9)) % 2).toBe(1);
    }
  });

  it('respects specific region', () => {
    const egn = generate({ year: 1990, month: 1, day: 1, gender: 'male', region: 442 });
    expect(validate(egn)).toBe(true);
    expect(egn.slice(6, 9)).toBe('442');
  });

  it('encodes 2000s dates with month +40', () => {
    const egn = generate({ year: 2020, month: 3, day: 15 });
    expect(validate(egn)).toBe(true);
    expect(egn.slice(0, 2)).toBe('20');
    expect(egn.slice(2, 4)).toBe('43');
  });

  it('encodes 1900s dates without month offset', () => {
    const egn = generate({ year: 1990, month: 6, day: 10 });
    expect(validate(egn)).toBe(true);
    expect(egn.slice(2, 4)).toBe('06');
  });

  it('throws for invalid date', () => {
    expect(() => generate({ year: 2020, month: 13, day: 1 })).toThrow('Invalid date');
    expect(() => generate({ year: 2020, month: 2, day: 30 })).toThrow('Invalid date');
  });

  it('throws for Gregorian calendar gap dates', () => {
    expect(() => generate({ year: 1916, month: 4, day: 5 })).toThrow('Invalid date');
  });

  it('clamps region to valid range', () => {
    const egn = generate({ year: 1990, month: 1, day: 1, gender: 'male', region: 1500 });
    expect(validate(egn)).toBe(true);
  });
});
