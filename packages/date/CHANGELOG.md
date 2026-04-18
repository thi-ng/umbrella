# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.8.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.8.1/packages/date) (2026-04-06)

#### ♻️ Refactoring

- add `Formatter` type alias ([269d6cc](https://codeberg.org/thi.ng/umbrella/commit/269d6cc))

## [2.8.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.8.0/packages/date) (2026-04-04)

#### 🚀 Features

- update/fix formatters, update default locale ([c1d81f2](https://codeberg.org/thi.ng/umbrella/commit/c1d81f2))
  - update format presets: `FMT_dMyyyy`, `FMT_dMMMyyyy`, `FMT_HHmm`, `FMT_hm`, `FMT_HHmmss`, `FMT_hms`
    - use correct locale-specific separators (e.g. `/HM`, `/DM` etc.)
  - add `/MS` minute-second separator & formatter
  - add tests

### [2.7.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.7.19/packages/date) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [2.7.9](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.7.9/packages/date) (2024-03-18)

#### ♻️ Refactoring

- update defFormat() internals ([cf5890c](https://codeberg.org/thi.ng/umbrella/commit/cf5890c))

## [2.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.7.0/packages/date) (2024-02-22)

#### 🚀 Features

- add single component formatter presets ([661a4b7](https://codeberg.org/thi.ng/umbrella/commit/661a4b7))

## [2.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.6.0/packages/date) (2024-02-22)

#### 🚀 Features

- add FMT_yyyyMMdd_ALT and FMT_HHmmss_ALT formatters ([658bcf9](https://codeberg.org/thi.ng/umbrella/commit/658bcf9))

### [2.5.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.5.1/packages/date) (2023-11-09)

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [2.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.5.0/packages/date) (2023-11-04)

#### 🚀 Features

- add durationAs() & asXXX() duration helpers ([ad17cee](https://codeberg.org/thi.ng/umbrella/commit/ad17cee))
- add absDifference(), add/update docs ([9b54f6c](https://codeberg.org/thi.ng/umbrella/commit/9b54f6c))

### [2.4.10](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/date@2.4.10/packages/date) (2023-03-27)

#### ♻️ Refactoring

- update imports (TS5.0) ([9ad7746](https://codeberg.org/thi.ng/umbrella/commit/9ad7746))

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
