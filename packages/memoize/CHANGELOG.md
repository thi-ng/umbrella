# Change Log

- **Last updated**: 2025-04-01T21:42:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@4.0.0) (2024-10-31)

#### 🛑 Breaking changes

- add async versions of all memoize functions ([#493](https://github.com/thi-ng/umbrella/issues/493)) ([e31543c](https://github.com/thi-ng/umbrella/commit/e31543c))
- BREAKING CHANGE: remove obsolete arity overrides (i.e. 2/3/4 suffixed versions)
  - add memoizeAsync()
  - add memoizeAsync1()
  - add memoizeAsyncJ()
  - add memoizeAsyncO()
  - refactor memoize fns to be variadic
  - remove obsolete fixed arity versions (e.g. `memoize2O`, 3O, 4O etc.)
  - update tests

### [3.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.3.5) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [3.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.3.2) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([fcea178](https://github.com/thi-ng/umbrella/commit/fcea178))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.3.0) (2024-04-08)

#### 🚀 Features

- add delay() wrapper ([d8f4733](https://github.com/thi-ng/umbrella/commit/d8f4733))
  - migrated from [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/main/packages/compose) since conceptually better at home here
  - add docs

#### ♻️ Refactoring

- rename `defonce()` => `defOnce()` ([08e876f](https://github.com/thi-ng/umbrella/commit/08e876f))
  - deprecate old spelling

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.2.0) (2024-03-27)

#### 🚀 Features

- add memoizeO() ([af2ead9](https://github.com/thi-ng/umbrella/commit/af2ead9))
- add memoize2/3/4O() ([8309236](https://github.com/thi-ng/umbrella/commit/8309236))

#### ♻️ Refactoring

- minor updates, use plain objects where possible ([f44be23](https://github.com/thi-ng/umbrella/commit/f44be23))
  - update defOnce() & memoizeJ() to use Object.create(null) as default store
  - update default args in others
  - update docs

### [3.1.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.1.41) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))
