export type Gender = 'male' | 'female';
export type Locale = 'en' | 'bg';

export interface ParsedEgn {
  date: {
    year: number;
    month: string;
    monthIndex: number;
    day: number;
  };
  region: string;
  gender: string;
}

export interface GenerateOptions {
  year?: number;
  month?: number;
  day?: number;
  gender?: Gender;
  region?: number;
}
