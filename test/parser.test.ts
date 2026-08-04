import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser';
import { generate } from '../src/generator';

describe('parse', () => {
  const TEST_EGN = '9409180882';

  it('extracts year', () => {
    expect(parse(TEST_EGN)?.date.year).toBe(1994);
  });

  it('extracts month name and index', () => {
    const result = parse(TEST_EGN);
    expect(result?.date.month).toBe('September');
    expect(result?.date.monthIndex).toBe(9);
  });

  it('extracts day', () => {
    expect(parse(TEST_EGN)?.date.day).toBe(18);
  });

  it('extracts region', () => {
    expect(parse(TEST_EGN, 'en')?.region).toBe('Burgas');
  });

  it('extracts gender from region code parity', () => {
    expect(parse(TEST_EGN, 'en')?.gender).toBe('Male');
  });

  it('returns null for invalid EGN', () => {
    expect(parse('9999999999')).toBeNull();
  });

  it('supports Bulgarian locale', () => {
    const result = parse(TEST_EGN, 'bg');
    expect(result?.date.month).toBe('Септември');
    expect(result?.region).toBe('Бургас');
    expect(result?.gender).toBe('Мъж');
  });

  it('defaults to English locale', () => {
    const result = parse(TEST_EGN);
    expect(result?.date.month).toBe('September');
    expect(result?.gender).toBe('Male');
  });

  it('parses a known EGN (6808070004)', () => {
    const result = parse('6808070004', 'en');
    expect(result?.date.year).toBe(1968);
    expect(result?.date.month).toBe('August');
    expect(result?.date.day).toBe(7);
    expect(result?.region).toBe('Blagoevgrad');
    expect(result?.gender).toBe('Male');
  });
});

describe('generate + parse roundtrip', () => {
  it('generates and parses male EGN correctly', () => {
    const egn = generate({ year: 1990, month: 6, day: 15, gender: 'male', region: 500 });
    const result = parse(egn, 'en');
    expect(result).not.toBeNull();
    expect(result?.date.year).toBe(1990);
    expect(result?.date.monthIndex).toBe(6);
    expect(result?.date.day).toBe(15);
    expect(result?.gender).toBe('Male');
  });

  it('generates and parses female EGN correctly', () => {
    const egn = generate({ year: 2005, month: 12, day: 25, gender: 'female', region: 101 });
    const result = parse(egn, 'en');
    expect(result).not.toBeNull();
    expect(result?.date.year).toBe(2005);
    expect(result?.date.monthIndex).toBe(12);
    expect(result?.date.day).toBe(25);
    expect(result?.gender).toBe('Female');
  });

  it('roundtrips 500 random EGNs', () => {
    for (let i = 0; i < 500; i++) {
      const egn = generate();
      const result = parse(egn);
      expect(result).not.toBeNull();
      expect(result?.date.year).toBeGreaterThanOrEqual(1900);
      expect(result?.date.year).toBeLessThanOrEqual(2099);
      expect(result?.date.monthIndex).toBeGreaterThanOrEqual(1);
      expect(result?.date.monthIndex).toBeLessThanOrEqual(12);
      expect(result?.date.day).toBeGreaterThanOrEqual(1);
      expect(result?.date.day).toBeLessThanOrEqual(31);
    }
  });
});
