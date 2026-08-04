import type { GenerateOptions } from './types';
import { computeChecksum, isValidDate, padTwo, padThree, randomInt } from './utils';

export function generate(options: GenerateOptions = {}): string {
  let { year, month, day, gender, region } = options;

  if (year === undefined || month === undefined || day === undefined) {
    const start = new Date(1900, 0, 1).getTime();
    const end = new Date(2099, 11, 31).getTime();
    let randomDate: Date;
    let y: number, m: number, d: number;
    do {
      randomDate = new Date(start + Math.random() * (end - start));
      y = year ?? randomDate.getFullYear();
      m = month ?? (randomDate.getMonth() + 1);
      d = day ?? randomDate.getDate();
    } while (!isValidDate(y, m, d));
    year = y;
    month = m;
    day = d;
  }

  if (!isValidDate(year, month, day)) {
    throw new Error(`Invalid date: ${year}-${month}-${day}`);
  }

  gender = gender ?? (Math.random() < 0.5 ? 'male' : 'female');
  region = region ?? randomInt(0, 999);
  region = Math.max(0, Math.min(999, region));

  if (gender === 'male' && region % 2 !== 0) {
    region = region > 0 ? region - 1 : 0;
  } else if (gender === 'female' && region % 2 === 0) {
    region = region < 999 ? region + 1 : 999;
  }

  let egnMonth = month;
  if (year < 1900) {
    egnMonth += 20;
  } else if (year >= 2000) {
    egnMonth += 40;
  }

  const egnStr = padTwo(year % 100) + padTwo(egnMonth) + padTwo(day) + padThree(region);
  const checksum = computeChecksum(egnStr);

  return egnStr + checksum;
}
