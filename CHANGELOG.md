# Changelog

## 2.0.0 (2026-08-04)

### Breaking Changes

- Converted to TypeScript with strict mode
- `generate()` now accepts an options object instead of positional parameters
- `parse()` returns `null` instead of `{error: '...'}` for invalid EGN
- Minimum Node.js version is now 18
- Package ships as dual ESM/CJS

### Bug Fixes

- Fixed broken exports — all functions (`validate`, `validateList`, `generate`, `parse`) are now properly exported
- Fixed `validateList` always returning `true` regardless of input
- Fixed `containsIntegerOnly` regex matching any string containing at least one digit instead of requiring all digits
- Fixed generator returning `gender` instead of `regionId` from region initialization
- Fixed generator using `getDay()` (day of week) instead of `getDate()` (day of month)
- Fixed parser determining gender from checksum digit instead of region code parity
- Fixed "Jule" typo to "July" in English month names

### Features

- Full TypeScript support with exported types (`Gender`, `Locale`, `ParsedEgn`, `GenerateOptions`)
- Dual ESM/CJS package output via tsup
- Comprehensive test suite (40+ tests) with >90% coverage
- ESLint + Prettier code quality tooling
- GitHub Actions CI pipeline testing Node.js 18, 20, and 22
- Dependabot for automated dependency updates
- GitHub issue and PR templates

## 1.0.1 (2019-04-08)

- Minor updates

## 1.0.0 (2017-10-06)

- Initial release
