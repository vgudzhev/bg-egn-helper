# bg-egn-helper

[![CI](https://github.com/vgudzhev/bg-egn-helper/actions/workflows/ci.yml/badge.svg)](https://github.com/vgudzhev/bg-egn-helper/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bg-egn-helper.svg)](https://www.npmjs.com/package/bg-egn-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Validate, generate, and parse Bulgarian EGN (Единен Граждански Номер) numbers.

The EGN is a unique 10-digit Uniform Civil Number assigned to every Bulgarian citizen, encoding date of birth, region, gender, and a checksum.

## Installation

```bash
npm install bg-egn-helper
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

```typescript
validate('9409180882'); // true
validate('9999999999'); // false

validateList(['9409180882', '6808070004']); // true
validateList(['9409180882', '9999999999']); // false
```

### Generate

```typescript
// Random valid EGN
generate();

// With specific parameters
generate({ year: 2017, month: 10, day: 10, gender: 'male', region: 442 });

// Partial parameters (rest are random)
generate({ year: 1990, gender: 'female' });
```

### Parse

```typescript
parse('9409180882');
// {
//   date: { year: 1994, month: 'September', monthIndex: 9, day: 18 },
//   region: 'Burgas',
//   gender: 'Male'
// }

parse('9409180882', 'bg');
// {
//   date: { year: 1994, month: 'Септември', monthIndex: 9, day: 18 },
//   region: 'Бургас',
//   gender: 'Мъж'
// }

parse('9999999999'); // null (invalid EGN)
```

## API

### `validate(egn: string): boolean`

Returns `true` if the EGN is valid (correct length, digits only, valid date, valid checksum).

### `validateList(egns: string[]): boolean`

Returns `true` if all EGNs in the array are valid.

### `generate(options?: GenerateOptions): string`

Generates a valid EGN. All options are optional — omitted values are randomly generated.

| Option   | Type                 | Description            |
| -------- | -------------------- | ---------------------- |
| `year`   | `number`             | Birth year (1800-2099) |
| `month`  | `number`             | Birth month (1-12)     |
| `day`    | `number`             | Birth day (1-31)       |
| `gender` | `'male' \| 'female'` | Gender                 |
| `region` | `number`             | Region code (0-999)    |

### `parse(egn: string, locale?: 'en' | 'bg'): ParsedEgn | null`

Parses a valid EGN and returns structured data. Returns `null` for invalid EGNs.

## Types

```typescript
interface GenerateOptions {
  year?: number;
  month?: number;
  day?: number;
  gender?: 'male' | 'female';
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

type Gender = 'male' | 'female';
type Locale = 'en' | 'bg';
```

## Development

```bash
npm install          # Install dependencies
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run build        # Build the package
npm run lint         # Lint the code
npm run format       # Format the code
npm run typecheck    # Type check
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a Pull Request

## License

MIT - see [LICENSE](LICENSE)
