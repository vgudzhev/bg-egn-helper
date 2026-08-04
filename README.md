# bg-egn-helper

[![CI](https://github.com/vgudzhev/bg-egn-helper/actions/workflows/ci.yml/badge.svg)](https://github.com/vgudzhev/bg-egn-helper/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bg-egn-helper.svg)](https://www.npmjs.com/package/bg-egn-helper)
[![npm downloads](https://img.shields.io/npm/dm/bg-egn-helper.svg)](https://www.npmjs.com/package/bg-egn-helper)
[![bundle size](https://img.shields.io/bundlephobia/minzip/bg-egn-helper)](https://bundlephobia.com/package/bg-egn-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Validate, generate, and parse Bulgarian EGN (Единен Граждански Номер) numbers.

## What is an EGN?

The EGN (Единен Граждански Номер — Uniform Civil Number) is a unique 10-digit personal identification number assigned to every Bulgarian citizen. It encodes:

- **Date of birth** (digits 1-6) — `YYMMDD` format with century offsets for 1800s and 2000s
- **Region & gender** (digits 7-9) — a serial number mapped to one of 28 administrative regions; even = male, odd = female
- **Checksum** (digit 10) — a weighted mod-11 check digit

## Installation

```bash
# npm
npm install bg-egn-helper

# yarn
yarn add bg-egn-helper

# pnpm
pnpm add bg-egn-helper
```

## Quick Start

```typescript
import { validate, generate, parse } from 'bg-egn-helper';

validate('9409180882'); // true

const egn = generate({ year: 1994, month: 9, day: 18, gender: 'male' });

parse(egn);
// { date: { year: 1994, month: 'September', monthIndex: 9, day: 18 },
//   region: '...', gender: 'Male' }
```

## Usage

### ESM (TypeScript / modern JavaScript)

```typescript
import { validate, generate, parse, validateList } from 'bg-egn-helper';
```

### CommonJS

```javascript
const { validate, generate, parse, validateList } = require('bg-egn-helper');
```

### Validate

Check whether a given EGN string is structurally valid (length, digits only, valid date, correct checksum).

```typescript
validate('9409180882'); // true
validate('9999999999'); // false
validate('940918088a'); // false — non-digit characters

// Validate multiple EGNs at once
validateList(['9409180882', '6808070004']); // true
validateList(['9409180882', '9999999999']); // false — one is invalid
```

### Generate

Generate a new valid EGN. All parameters are optional — omitted values are filled randomly.

```typescript
// Fully random
generate();

// Specific date, gender, and region
generate({ year: 2017, month: 10, day: 10, gender: 'male', region: 442 });

// Partial — only specify what you need
generate({ year: 1990, gender: 'female' });
generate({ gender: 'male' });
```

### Parse

Extract structured information from a valid EGN. Returns `null` for invalid input.

```typescript
parse('9409180882');
// {
//   date: { year: 1994, month: 'September', monthIndex: 9, day: 18 },
//   region: 'Burgas',
//   gender: 'Male'
// }

// Bulgarian locale
parse('9409180882', 'bg');
// {
//   date: { year: 1994, month: 'Септември', monthIndex: 9, day: 18 },
//   region: 'Бургас',
//   gender: 'Мъж'
// }

parse('9999999999'); // null
```

## API Reference

### `validate(egn: string): boolean`

Returns `true` if the EGN is valid. Checks length, digits-only, date validity (including Bulgaria's 1916 Gregorian calendar adoption gap), and weighted checksum.

### `validateList(egns: string[]): boolean`

Returns `true` if every EGN in the array is valid.

### `generate(options?: GenerateOptions): string`

Generates a valid EGN string. Throws if an explicitly provided date is invalid.

| Option   | Type                 | Description            |
| -------- | -------------------- | ---------------------- |
| `year`   | `number`             | Birth year (1800-2099) |
| `month`  | `number`             | Birth month (1-12)     |
| `day`    | `number`             | Birth day (1-31)       |
| `gender` | `'male' \| 'female'` | Gender                 |
| `region` | `number`             | Region code (0-999)    |

### `parse(egn: string, locale?: Locale): ParsedEgn | null`

Parses a valid EGN into structured data. Returns `null` for invalid EGNs. Supported locales: `'en'` (default), `'bg'`.

## Types

All types are exported for TypeScript consumers:

```typescript
import type { Gender, Locale, ParsedEgn, GenerateOptions } from 'bg-egn-helper';

type Gender = 'male' | 'female';
type Locale = 'en' | 'bg';

interface GenerateOptions {
  year?: number;
  month?: number;
  day?: number;
  gender?: Gender;
  region?: number;
}

interface ParsedEgn {
  date: {
    year: number;
    month: string;
    monthIndex: number;
    day: number;
  };
  region: string;
  gender: string;
}
```

## Supported Regions

The region code (digits 7-9) maps to one of 28 Bulgarian administrative regions:

| Code Range | Region (EN)    | Region (BG)    |
| ---------- | -------------- | -------------- |
| 000-043    | Blagoevgrad    | Благоевград    |
| 044-093    | Burgas         | Бургас         |
| 094-139    | Varna          | Варна          |
| 140-169    | Veliko Turnovo | Велико Търново |
| 170-183    | Vidin          | Видин          |
| 184-217    | Vratza         | Враца          |
| 218-233    | Gabrovo        | Габрово        |
| 234-281    | Kurdzhali      | Кърджали       |
| 282-301    | Kyustendil     | Кюстендил      |
| 302-319    | Lovech         | Ловеч          |
| 320-341    | Montana        | Монтана        |
| 342-377    | Pazardzhik     | Пазарджик      |
| 378-395    | Pernik         | Перник         |
| 396-435    | Pleven         | Плевен         |
| 436-501    | Plovdiv        | Пловдив        |
| 502-527    | Razgrad        | Разград        |
| 528-555    | Ruse           | Русе           |
| 556-575    | Silistra       | Силистра       |
| 576-601    | Sliven         | Сливен         |
| 602-623    | Smolyan        | Смолян         |
| 624-721    | Sofia          | София          |
| 722-751    | Sofia (county) | София (окръг)  |
| 752-789    | Stara Zagora   | Стара Загора   |
| 790-821    | Dobrich        | Добрич         |
| 822-843    | Targovishte    | Търговище      |
| 844-871    | Haskovo        | Хасково        |
| 872-903    | Shumen         | Шумен          |
| 904-925    | Yambol         | Ямбол          |
| 926-999    | Other          | Друг           |

## Migrating from v1

v2.0.0 is a full rewrite with breaking changes. Here's what to update:

### Imports

```diff
- var helper = require('bg-egn-helper');
- validate('...');        // was a global side effect
+ const { validate, generate, parse } = require('bg-egn-helper');
+ validate('...');
```

### `generate()` — options object instead of positional args

```diff
- generate(2017, 10, 10, 0, 442);
+ generate({ year: 2017, month: 10, day: 10, gender: 'male', region: 442 });
```

### `parse()` — returns `null` instead of error object

```diff
- const result = parse('invalid');
- if (result.error) { /* handle */ }
+ const result = parse('invalid');
+ if (result === null) { /* handle */ }
```

## Development

```bash
npm install            # Install dependencies
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
npm run build          # Build ESM + CJS output
npm run lint           # Lint with ESLint
npm run format         # Format with Prettier
npm run typecheck      # Type check with tsc
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT - see [LICENSE](LICENSE)
