# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.9.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.9.31) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [3.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.9.0) (2025-01-04)

#### 🚀 Features

- add `pascal()` case conversion ([2c3f4f4](https://github.com/thi-ng/umbrella/commit/2c3f4f4))

### [3.8.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.8.7) (2024-10-31)

#### ♻️ Refactoring

- update memoizations ([7c3ca44](https://github.com/thi-ng/umbrella/commit/7c3ca44))

## [3.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.8.0) (2024-07-19)

#### 🚀 Features

- add namedNumber() ([979ad33](https://github.com/thi-ng/umbrella/commit/979ad33))

### [3.7.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.34) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [3.7.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.31) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([4664361](https://github.com/thi-ng/umbrella/commit/4664361))

### [3.7.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.28) (2024-03-27)

#### ♻️ Refactoring

- update memoizations ([d7b188d](https://github.com/thi-ng/umbrella/commit/d7b188d))

### [3.7.27](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.27) (2024-03-22)

#### 🩹 Bug fixes

- fix unintentional, IDE-induced Unicode encoding issue ([a54a69b](https://github.com/thi-ng/umbrella/commit/a54a69b))
  - use unicode Kelvin sign as `\u212a` to avoid/fix bug in `encodeEntitiesNum()`
    - potential culprits for this issue: VSCode or Prettier
  - add tests

### [3.7.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.25) (2024-03-18)

#### ♻️ Refactoring

- minor update slugify()/slugifyGH() regexps ([03b77d1](https://github.com/thi-ng/umbrella/commit/03b77d1))

### [3.7.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.4) (2023-12-18)

#### 🩹 Bug fixes

- improve split() regexp handling ([65fe14b](https://github.com/thi-ng/umbrella/commit/65fe14b))
  - ensure given regexp has global flag enabled

## [3.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.7.0) (2023-11-24)

#### 🚀 Features

- add/migrate utf8 encode/decode/length fns ([a8955f2](https://github.com/thi-ng/umbrella/commit/a8955f2))
  - migrate & update from [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/main/packages/transducers-binary)

### [3.6.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.6.5) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.6.0) (2023-09-19)

#### 🚀 Features

- add escapeEntitiesNum() ([f921491](https://github.com/thi-ng/umbrella/commit/f921491))

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.5.0) (2023-09-15)

#### 🚀 Features

- add more HTML entities ([9fa5d91](https://github.com/thi-ng/umbrella/commit/9fa5d91))
- add support for numeric HTML entities ([8d942ba](https://github.com/thi-ng/umbrella/commit/8d942ba))
  - add `RE_ENTITIES_NUM`
  - update unescapeEntities() to also support numeric entities
- add unitless() formatter ([d5025ce](https://github.com/thi-ng/umbrella/commit/d5025ce))

### [3.4.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.4.12) (2023-08-22)

#### 🩹 Bug fixes

- empty string check for capitalize() ([f2dcee5](https://github.com/thi-ng/umbrella/commit/f2dcee5))

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.4.0) (2023-02-27)

#### 🚀 Features

- add more HTML entities ([d617132](https://github.com/thi-ng/umbrella/commit/d617132))

#### 🩹 Bug fixes

- add emoji ranges for slugify/slugifyGH() ([f5cb210](https://github.com/thi-ng/umbrella/commit/f5cb210))
