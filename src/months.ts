import type { Locale } from './types';

const MONTHS: Record<Locale, string>[] = [
  { bg: 'Януари', en: 'January' },
  { bg: 'Февруари', en: 'February' },
  { bg: 'Март', en: 'March' },
  { bg: 'Април', en: 'April' },
  { bg: 'Май', en: 'May' },
  { bg: 'Юни', en: 'June' },
  { bg: 'Юли', en: 'July' },
  { bg: 'Август', en: 'August' },
  { bg: 'Септември', en: 'September' },
  { bg: 'Октомври', en: 'October' },
  { bg: 'Ноември', en: 'November' },
  { bg: 'Декември', en: 'December' },
];

export function getMonth(monthIndex: number, locale: Locale): string | null {
  if (monthIndex < 1 || monthIndex > 12) return null;
  return MONTHS[monthIndex - 1][locale];
}
