import type { Locale } from './types';

interface RegionEntry {
  maxCode: number;
  bg: string;
  en: string;
}

const EGN_REGIONS: RegionEntry[] = [
  { maxCode: 43, bg: 'Благоевград', en: 'Blagoevgrad' },
  { maxCode: 93, bg: 'Бургас', en: 'Burgas' },
  { maxCode: 139, bg: 'Варна', en: 'Varna' },
  { maxCode: 169, bg: 'Велико Търново', en: 'Veliko Turnovo' },
  { maxCode: 183, bg: 'Видин', en: 'Vidin' },
  { maxCode: 217, bg: 'Враца', en: 'Vratza' },
  { maxCode: 233, bg: 'Габрово', en: 'Gabrovo' },
  { maxCode: 281, bg: 'Кърджали', en: 'Kurdzhali' },
  { maxCode: 301, bg: 'Кюстендил', en: 'Kyustendil' },
  { maxCode: 319, bg: 'Ловеч', en: 'Lovech' },
  { maxCode: 341, bg: 'Монтана', en: 'Montana' },
  { maxCode: 377, bg: 'Пазарджик', en: 'Pazardzhik' },
  { maxCode: 395, bg: 'Перник', en: 'Pernik' },
  { maxCode: 435, bg: 'Плевен', en: 'Pleven' },
  { maxCode: 501, bg: 'Пловдив', en: 'Plovdiv' },
  { maxCode: 527, bg: 'Разград', en: 'Razgrad' },
  { maxCode: 555, bg: 'Русе', en: 'Ruse' },
  { maxCode: 575, bg: 'Силистра', en: 'Silistra' },
  { maxCode: 601, bg: 'Сливен', en: 'Sliven' },
  { maxCode: 623, bg: 'Смолян', en: 'Smolyan' },
  { maxCode: 721, bg: 'София', en: 'Sofia' },
  { maxCode: 751, bg: 'София (окръг)', en: 'Sofia (county)' },
  { maxCode: 789, bg: 'Стара Загора', en: 'Stara Zagora' },
  { maxCode: 821, bg: 'Добрич', en: 'Dobrich' },
  { maxCode: 843, bg: 'Търговище', en: 'Targovishte' },
  { maxCode: 871, bg: 'Хасково', en: 'Haskovo' },
  { maxCode: 903, bg: 'Шумен', en: 'Shumen' },
  { maxCode: 925, bg: 'Ямбол', en: 'Yambol' },
  { maxCode: 999, bg: 'Друг', en: 'Other' },
];

export function getRegion(regionCode: number, locale: Locale): string | null {
  if (regionCode < 0 || regionCode > 999) return null;

  for (const region of EGN_REGIONS) {
    if (regionCode <= region.maxCode) {
      return region[locale];
    }
  }

  return null;
}
