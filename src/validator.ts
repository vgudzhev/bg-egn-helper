import { parseEgnDate, computeChecksum, isValidDate } from './utils';

export function validate(egn: string): boolean {
  if (typeof egn !== 'string' || !/^\d{10}$/.test(egn)) {
    return false;
  }

  const { year, month, day } = parseEgnDate(egn);

  if (!isValidDate(year, month, day)) {
    return false;
  }

  const expectedChecksum = computeChecksum(egn);
  return expectedChecksum === Number(egn.charAt(9));
}

export function validateList(egns: string[]): boolean {
  return egns.every((egn) => validate(egn));
}
