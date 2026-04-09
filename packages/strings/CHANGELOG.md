# Change Log

- **Last updated**: 2026-04-09T11:46:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.12.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.12.0/packages/strings) (2026-04-09)

#### 🚀 Features

- update missing key handling in `interpolateKeys()` ([e3b6ccf](https://codeberg.org/thi.ng/umbrella/commit/e3b6ccf))
  - add optional arg to ignore missing keys
  - add tests
  - update docs

## [3.11.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.11.0/packages/strings) (2026-03-21)

#### 🚀 Features

- add `balance()`, incl. docs, examples, tests ([20cba08](https://codeberg.org/thi.ng/umbrella/commit/20cba08))

## [3.10.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.10.0/packages/strings) (2026-03-11)

#### 🚀 Features

- add Error & RegExp support for `stringify()` ([78690d4](https://codeberg.org/thi.ng/umbrella/commit/78690d4))

### [3.9.31](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.9.31/packages/strings) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [3.9.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.9.0/packages/strings) (2025-01-04)

#### 🚀 Features

- add `pascal()` case conversion ([2c3f4f4](https://codeberg.org/thi.ng/umbrella/commit/2c3f4f4))

### [3.8.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.8.7/packages/strings) (2024-10-31)

#### ♻️ Refactoring

- update memoizations ([7c3ca44](https://codeberg.org/thi.ng/umbrella/commit/7c3ca44))

## [3.8.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.8.0/packages/strings) (2024-07-19)

#### 🚀 Features

- add namedNumber() ([979ad33](https://codeberg.org/thi.ng/umbrella/commit/979ad33))

### [3.7.34](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.34/packages/strings) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [3.7.31](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.31/packages/strings) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([4664361](https://codeberg.org/thi.ng/umbrella/commit/4664361))

### [3.7.28](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.28/packages/strings) (2024-03-27)

#### ♻️ Refactoring

- update memoizations ([d7b188d](https://codeberg.org/thi.ng/umbrella/commit/d7b188d))

### [3.7.27](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.27/packages/strings) (2024-03-22)

#### 🩹 Bug fixes

- fix unintentional, IDE-induced Unicode encoding issue ([a54a69b](https://codeberg.org/thi.ng/umbrella/commit/a54a69b))
  - use unicode Kelvin sign as `\u212a` to avoid/fix bug in `encodeEntitiesNum()`
    - potential culprits for this issue: VSCode or Prettier
  - add tests

### [3.7.25](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.25/packages/strings) (2024-03-18)

#### ♻️ Refactoring

- minor update slugify()/slugifyGH() regexps ([03b77d1](https://codeberg.org/thi.ng/umbrella/commit/03b77d1))

### [3.7.4](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.4/packages/strings) (2023-12-18)

#### 🩹 Bug fixes

- improve split() regexp handling ([65fe14b](https://codeberg.org/thi.ng/umbrella/commit/65fe14b))
  - ensure given regexp has global flag enabled

## [3.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.7.0/packages/strings) (2023-11-24)

#### 🚀 Features

- add/migrate utf8 encode/decode/length fns ([a8955f2](https://codeberg.org/thi.ng/umbrella/commit/a8955f2))
  - migrate & update from [@thi.ng/transducers-binary](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/transducers-binary)

### [3.6.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.6.5/packages/strings) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [3.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.6.0/packages/strings) (2023-09-19)

#### 🚀 Features

- add escapeEntitiesNum() ([f921491](https://codeberg.org/thi.ng/umbrella/commit/f921491))

## [3.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.5.0/packages/strings) (2023-09-15)

#### 🚀 Features

- add more HTML entities ([9fa5d91](https://codeberg.org/thi.ng/umbrella/commit/9fa5d91))
- add support for numeric HTML entities ([8d942ba](https://codeberg.org/thi.ng/umbrella/commit/8d942ba))
  - add `RE_ENTITIES_NUM`
  - update unescapeEntities() to also support numeric entities
- add unitless() formatter ([d5025ce](https://codeberg.org/thi.ng/umbrella/commit/d5025ce))

### [3.4.12](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.4.12/packages/strings) (2023-08-22)

#### 🩹 Bug fixes

- empty string check for capitalize() ([f2dcee5](https://codeberg.org/thi.ng/umbrella/commit/f2dcee5))

## [3.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/strings@3.4.0/packages/strings) (2023-02-27)

#### 🚀 Features

- add more HTML entities ([d617132](https://codeberg.org/thi.ng/umbrella/commit/d617132))

#### 🩹 Bug fixes

- add emoji ranges for slugify/slugifyGH() ([f5cb210](https://codeberg.org/thi.ng/umbrella/commit/f5cb210))
