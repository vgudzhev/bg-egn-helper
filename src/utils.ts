const EGN_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6];

export function parseEgnDate(egn: string): { year: number; month: number; day: number } {
  let year = Number(egn.slice(0, 2));
  let month = Number(egn.slice(2, 4));
  const day = Number(egn.slice(4, 6));

  if (month >= 40) {
    year += 2000;
    month -= 40;
  } else if (month >= 20) {
    year += 1800;
    month -= 20;
  } else {
    year += 1900;
  }

  return { year, month, day };
}

export function computeChecksum(egnDigits: string): number {
  let sum = 0;
  for (let i = 0; i < EGN_WEIGHTS.length; i++) {
    sum += EGN_WEIGHTS[i] * Number(egnDigits.charAt(i));
  }
  sum %= 11;
  return sum < 10 ? sum : 0;
}

export function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day &&
    !isSkippedGregorianDate(year, month, day)
  );
}

function isSkippedGregorianDate(year: number, month: number, day: number): boolean {
  return year === 1916 && month === 4 && day >= 1 && day <= 13;
}

export function padTwo(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

export function padThree(n: number): string {
  if (n < 10) return '00' + n;
  if (n < 100) return '0' + n;
  return String(n);
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
