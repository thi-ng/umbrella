# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [4.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/memoize@4.0.0/packages/memoize) (2024-10-31)

#### 🛑 Breaking changes

- add async versions of all memoize functions ([#493](https://codeberg.org/thi.ng/umbrella/issues/493)) ([e31543c](https://codeberg.org/thi.ng/umbrella/commit/e31543c))
- BREAKING CHANGE: remove obsolete arity overrides (i.e. 2/3/4 suffixed versions)
  - add memoizeAsync()
  - add memoizeAsync1()
  - add memoizeAsyncJ()
  - add memoizeAsyncO()
  - refactor memoize fns to be variadic
  - remove obsolete fixed arity versions (e.g. `memoize2O`, 3O, 4O etc.)
  - update tests

### [3.3.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/memoize@3.3.5/packages/memoize) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [3.3.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/memoize@3.3.2/packages/memoize) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([fcea178](https://codeberg.org/thi.ng/umbrella/commit/fcea178))

## [3.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/memoize@3.3.0/packages/memoize) (2024-04-08)

#### 🚀 Features

- add delay() wrapper ([d8f4733](https://codeberg.org/thi.ng/umbrella/commit/d8f4733))
  - migrated from [@thi.ng/compose](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/compose) since conceptually better at home here
  - add docs

#### ♻️ Refactoring

- rename `defonce()` => `defOnce()` ([08e876f](https://codeberg.org/thi.ng/umbrella/commit/08e876f))
  - deprecate old spelling

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/memoize@3.2.0/packages/memoize) (2024-03-27)

#### 🚀 Features

- add memoizeO() ([af2ead9](https://codeberg.org/thi.ng/umbrella/commit/af2ead9))
- add memoize2/3/4O() ([8309236](https://codeberg.org/thi.ng/umbrella/commit/8309236))

#### ♻️ Refactoring

- minor updates, use plain objects where possible ([f44be23](https://codeberg.org/thi.ng/umbrella/commit/f44be23))
  - update defOnce() & memoizeJ() to use Object.create(null) as default store
  - update default args in others
  - update docs

### [3.1.41](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/memoize@3.1.41/packages/memoize) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))
