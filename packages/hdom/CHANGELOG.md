# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [9.4.97](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.4.97) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [9.4.94](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.4.94) (2025-11-19)

#### ♻️ Refactoring

- update setStyle() ([0cfae02](https://github.com/thi-ng/umbrella/commit/0cfae02))
  - directly set referenced CSS properties, not combined CSS string (which might override others)

### [9.4.56](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.4.56) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [9.4.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.4.35) (2024-06-21)

#### ♻️ Refactoring

- split up internal normalizeTree() ([1fbca7b](https://github.com/thi-ng/umbrella/commit/1fbca7b))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [9.4.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.4.14) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([83ea177](https://github.com/thi-ng/umbrella/commit/83ea177))

## [9.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.4.0) (2023-12-11)

#### 🚀 Features

- update setAttrib(), more alignment w/ rdom logic ([639ca71](https://github.com/thi-ng/umbrella/commit/639ca71))

### [9.3.27](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.3.27) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [9.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.3.0) (2023-02-27)

#### 🚀 Features

- update setAttrib() ([61aa627](https://github.com/thi-ng/umbrella/commit/61aa627))
  - add IDeref support for individual attrib values (i.e. via `deref()` wrappers)
  - update attribute removal/deletion logic
