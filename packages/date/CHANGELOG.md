# Change Log

- **Last updated**: 2024-02-22T11:59:16Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.6.0) (2024-02-22)

#### 🚀 Features

- add FMT_yyyyMMdd_ALT and FMT_HHmmss_ALT formatters ([658bcf9](https://github.com/thi-ng/umbrella/commit/658bcf9))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.5.0) (2023-11-04)

#### 🚀 Features

- add durationAs() & asXXX() duration helpers ([ad17cee](https://github.com/thi-ng/umbrella/commit/ad17cee))
- add absDifference(), add/update docs ([9b54f6c](https://github.com/thi-ng/umbrella/commit/9b54f6c))

### [2.4.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.4.10) (2023-03-27)

#### ♻️ Refactoring

- update imports (TS5.0) ([9ad7746](https://github.com/thi-ng/umbrella/commit/9ad7746))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.4.0) (2022-12-29)

#### 🚀 Features

- add formatDuration(), internal restructure ([d610a8a](https://github.com/thi-ng/umbrella/commit/d610a8a))
  - add formatDuration() & formatDurationParts()
  - add composeDuration()
  - refactor formatRelativeParts()
  - move all formatting fns to format.ts
  - move decomposeDuration() to duration.ts
  - add tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.3.0) (2022-06-15)

#### 🚀 Features

- update parseRelative() ([0f7ecfc](https://github.com/thi-ng/umbrella/commit/0f7ecfc))
  - add "mo" shorthand for months

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.2.0) (2022-05-18)

#### 🚀 Features

- use current time as default for all formatters ([ee536db](https://github.com/thi-ng/umbrella/commit/ee536db))

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.1.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([6d4be5a](https://github.com/thi-ng/umbrella/commit/6d4be5a))
- restructure source files ([fcb3f3d](https://github.com/thi-ng/umbrella/commit/fcb3f3d))
- rename internals ([8ee94b1](https://github.com/thi-ng/umbrella/commit/8ee94b1))

### [1.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@1.0.4) (2021-08-09)

#### 🩹 Bug fixes

- update i18n init, withLocale() err handling ([9f68bdf](https://github.com/thi-ng/umbrella/commit/9f68bdf))
  - add internal/pure prepLocale() helper due to init issue in ESM env
  - add error handling for withLocale()

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.9.0) (2021-08-04)

#### 🚀 Features

- add/update i18n functions, rel. format ([144a02d](https://github.com/thi-ng/umbrella/commit/144a02d))
  - add weekdayNames(), monthNames()
  - add units(), unitsLessThan(), tense()
  - fix/update locales, add support for dativ forms (singular/plural)
  - add doc strings
  - add tests

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.8.0) (2021-07-27)

#### 🚀 Features

- add/update constants ([2b28839](https://github.com/thi-ng/umbrella/commit/2b28839))
- major update DateTime methods, fixes ([9268573](https://github.com/thi-ng/umbrella/commit/9268573))
  - add/extend types (MaybeDate, Period, RoundingFn)
  - update various fns & methods to accept MaybeDate args
  -  update all rounding fns
  -  add/update/fix DateTime methods:
    - set()
    - copy()
    - withPrecision() / setPrecision()
    - isBefore() / isAfter()
    - add()
    - toISOString()
    - valueOf()
  - update return value for inc/decWeek() methods (week number)
  - add ensureDateTime(), ensureEpoch()
  - add maybeIsDate()
- add/update formatters & presets ([3f3d8d0](https://github.com/thi-ng/umbrella/commit/3f3d8d0))
  - add week-in-year formatters
  - update defFormat() to accept MaybeDate arg
  - migrate defTimecode() to sep file
  - add decomposeDuration()
- update Locale & presets ([50d889d](https://github.com/thi-ng/umbrella/commit/50d889d))
- add relative date calc & formatting ([3100814](https://github.com/thi-ng/umbrella/commit/3100814))
  - add formatRelative(), formatRelativeParts() (w/ locale support)
  - add decomposeDifference()
  - add support for quarters in parseRelative()
- add withLocale() helper ([8c9493e](https://github.com/thi-ng/umbrella/commit/8c9493e))
- update Locale, DateTime.add() ([f20c129](https://github.com/thi-ng/umbrella/commit/f20c129))
  - add Locale.dateTime, update setLocale()
  - add DateTime.toLocaleString()
  - update DateTime.add() to accept all Period units
  - simplify relative()
  - fix/refactor formatters
- add/update formatters ([56d9b64](https://github.com/thi-ng/umbrella/commit/56d9b64))
  - add `q` (quarter) formatter
  - add `SS` formatter for zero-padded millis
- add quarter-based rounding fns ([24a7a76](https://github.com/thi-ng/umbrella/commit/24a7a76))
- update DateTime, iterators, rounding ([7c0652a](https://github.com/thi-ng/umbrella/commit/7c0652a))
  - add DateTime quarter & week readonly props & inc/decQuarter/Week()
  - update defIterator(), add quarters() and weeks() iterators
  - add quarter/week rounding fns

#### 🩹 Bug fixes

- minor update EN_LONG locale ([a9dcd47](https://github.com/thi-ng/umbrella/commit/a9dcd47))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.7.0) (2021-07-01)

#### 🚀 Features

- add/update locales, add separators ([61f34e7](https://github.com/thi-ng/umbrella/commit/61f34e7))
  - add DE_SHORT/LONG, ES_LONG, FR_LONG, IT_LONG locales
  - update `Locale` interface, add separators
  - add `~`/`~~` formatters for referring to locale seperators
- update/extend locales, format prims ([089a9d4](https://github.com/thi-ng/umbrella/commit/089a9d4))
  - add LocaleSpec type, update setLocale()
  - add new formatters for unpadded/lowercase/separators
  - update all locale presets
- add new DateTime methods ([a0123cb](https://github.com/thi-ng/umbrella/commit/a0123cb))
  - add .dayInYear()
  - add .weekInYear()
  - extract isLeapYear(), daysInMonth() standalone fns
  - add/update tests
- add/update epoch rounding fns ([ec3033e](https://github.com/thi-ng/umbrella/commit/ec3033e))
  - add versions for second/minute/hour precisions

#### 🩹 Bug fixes

- fix UTC handling in formatters ([cab1434](https://github.com/thi-ng/umbrella/commit/cab1434))
  - update tests
- flip sign in TZ offset formatter (`Z`) ([dc536cb](https://github.com/thi-ng/umbrella/commit/dc536cb))

#### ⏱ Performance improvements

- refactor dayInYear() as O(1) ([2c2d684](https://github.com/thi-ng/umbrella/commit/2c2d684))
  - add DAYS_IN_MONTH_OFFSET index
  - add tests

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.6.0) (2021-06-08)

#### 🚀 Features

- extend parseRelative() ([5764ff3](https://github.com/thi-ng/umbrella/commit/5764ff3))
  - add support for weekday names
  - add tests

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.5.0) (2021-04-20)

#### 🚀 Features

- update relative date parsing ([2491668](https://github.com/thi-ng/umbrella/commit/2491668))
  - add support for signed offset strings
  - add/refactor tests
  - update docs/readme

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.4.0) (2021-03-21)

#### 🚀 Features

- add date decrement methods ([a52b89e](https://github.com/thi-ng/umbrella/commit/a52b89e))
- add relative date offset parsing/apply ([5329538](https://github.com/thi-ng/umbrella/commit/5329538))
  - add parseRelative()
  - add relative()
- update relative date handling ([80d406c](https://github.com/thi-ng/umbrella/commit/80d406c))
  - add `Period` type alias
  - update `parseRelative()`/`relative()` to support milliseconds
  - refactor `parseRelative()` (split up)
  - add tests
- add interface impls to DateTime ([e3417dd](https://github.com/thi-ng/umbrella/commit/e3417dd))
  - add impls for: `ICompare`, `IEquiv`, `IEqualsDelta`
- add weeks() iterator ([7ea9d1e](https://github.com/thi-ng/umbrella/commit/7ea9d1e))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.3.0) (2021-03-21)

#### 🚀 Features

- add/update formatters ([010e739](https://github.com/thi-ng/umbrella/commit/010e739))
  - add `FMT_ISO_SHORT` preset
  - add `ZZ` partial timezone formatter
  - update `defFormatI()` to support escaping
  - add tests

### [0.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.2.3) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([4b1eb35](https://github.com/thi-ng/umbrella/commit/4b1eb35))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.2.1) (2020-11-24)

#### 🩹 Bug fixes

- isLeapYear(), add centennial exceptions, tests ([7de0cd8](https://github.com/thi-ng/umbrella/commit/7de0cd8))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.2.0) (2020-09-22)

#### 🚀 Features

- add DateTime, defIterator, add/update iterators ([0e31c69](https://github.com/thi-ng/umbrella/commit/0e31c69))
- update/fix DateTime ([27c8617](https://github.com/thi-ng/umbrella/commit/27c8617))
  - add date/string/json conversions
  - add/fix leap year handling
  - add dateTime() factory
- add/update formatters, add locale ([c8e84ad](https://github.com/thi-ng/umbrella/commit/c8e84ad))
  - add LOCALE, setLocale()
  - add EN_SHORT, EN_LONG locales
  - update MMM and E formatters to use locale
  - update defFormat() to accept format fns in addition to strings
  - update/rename preset formatters
- add defTimecode() formatter ([42753e1](https://github.com/thi-ng/umbrella/commit/42753e1))
- add iterator arg coercions, refactor, add docs ([1256201](https://github.com/thi-ng/umbrella/commit/1256201))

#### 🩹 Bug fixes

- update ceilMonth(), add docstrings ([0c6c2cc](https://github.com/thi-ng/umbrella/commit/0c6c2cc))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@0.1.0) (2020-09-13)

#### 🚀 Features

- import as new pkg ([bfe457f](https://github.com/thi-ng/umbrella/commit/bfe457f))
