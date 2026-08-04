import type { Locale, ParsedEgn } from './types';
import { parseEgnDate } from './utils';
import { getMonth } from './months';
import { getRegion } from './regions';
import { validate } from './validator';

const GENDER_TEXT = {
  male: { en: 'Male', bg: 'Мъж' } as const,
  female: { en: 'Female', bg: 'Жена' } as const,
};

export function parse(egn: string, locale: Locale = 'en'): ParsedEgn | null {
  if (!validate(egn)) return null;

  const { year, month, day } = parseEgnDate(egn);
  const regionCode = Number(egn.slice(6, 9));
  const monthName = getMonth(month, locale)!;
  const region = getRegion(regionCode, locale)!;
  const isMale = regionCode % 2 === 0;
  const gender = GENDER_TEXT[isMale ? 'male' : 'female'][locale];

  return {
    date: { year, month: monthName, monthIndex: month, day },
    region,
    gender,
  };
}
