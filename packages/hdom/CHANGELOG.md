# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [9.4.97](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.97/packages/hdom) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [9.4.94](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.94/packages/hdom) (2025-11-19)

#### ♻️ Refactoring

- update setStyle() ([0cfae02](https://codeberg.org/thi.ng/umbrella/commit/0cfae02))
  - directly set referenced CSS properties, not combined CSS string (which might override others)

### [9.4.56](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.56/packages/hdom) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

### [9.4.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.36/packages/hdom) (2024-06-29)

#### 🧪 Tests

- fix imports ([52d50a0](https://codeberg.org/thi.ng/umbrella/commit/52d50a0))

### [9.4.35](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.35/packages/hdom) (2024-06-21)

#### ♻️ Refactoring

- split up internal normalizeTree() ([1fbca7b](https://codeberg.org/thi.ng/umbrella/commit/1fbca7b))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [9.4.14](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.14/packages/hdom) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([83ea177](https://codeberg.org/thi.ng/umbrella/commit/83ea177))

## [9.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.4.0/packages/hdom) (2023-12-11)

#### 🚀 Features

- update setAttrib(), more alignment w/ rdom logic ([639ca71](https://codeberg.org/thi.ng/umbrella/commit/639ca71))

### [9.3.31](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.3.31/packages/hdom) (2023-12-09)

#### 🧪 Tests

- add tests ([87927e6](https://codeberg.org/thi.ng/umbrella/commit/87927e6))

### [9.3.27](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.3.27/packages/hdom) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [9.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom@9.3.0/packages/hdom) (2023-02-27)

#### 🚀 Features

- update setAttrib() ([61aa627](https://codeberg.org/thi.ng/umbrella/commit/61aa627))
  - add IDeref support for individual attrib values (i.e. via `deref()` wrappers)
  - update attribute removal/deletion logic
