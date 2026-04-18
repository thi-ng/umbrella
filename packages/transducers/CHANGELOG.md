# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [9.6.29](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.6.29/packages/transducers) (2026-03-11)

#### ♻️ Refactoring

- update const use in for-of loops ([c768f87](https://codeberg.org/thi.ng/umbrella/commit/c768f87))

### [9.6.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.6.19/packages/transducers) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [9.6.9](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.6.9/packages/transducers) (2025-09-01)

#### ♻️ Refactoring

- internal update range(), improve precision ([437021f](https://codeberg.org/thi.ng/umbrella/commit/437021f))
  - use `from + i * step` to avoid float error accumulation
  - update Range iterator and `$reduce()` impls
  - add tests

## [9.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.6.0/packages/transducers) (2025-07-13)

#### 🚀 Features

- add result caching for `step()` ([101760b](https://codeberg.org/thi.ng/umbrella/commit/101760b))
  - update `StepFn` type, add `IDeref` support
  - update `step()` to cache most recent result (can be disabled)

#### ♻️ Refactoring

- minor update `multiplex()` ([d2cae35](https://codeberg.org/thi.ng/umbrella/commit/d2cae35))
  - disable result caching for internal`step()` usage to reduce RAM usage

## [9.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.5.0/packages/transducers) (2025-07-09)

#### 🚀 Features

- add `StepFn` function type ([f1fc685](https://codeberg.org/thi.ng/umbrella/commit/f1fc685))

## [9.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.4.0/packages/transducers) (2025-06-09)

#### 🚀 Features

- add join() transducer ([3bbc88d](https://codeberg.org/thi.ng/umbrella/commit/3bbc88d))

### [9.3.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.3.1/packages/transducers) (2025-05-28)

#### 🩹 Bug fixes

- fix [#500](https://codeberg.org/thi.ng/umbrella/issues/500), update initial timestamp handling in `throttleTime()` ([6a8d88e](https://codeberg.org/thi.ng/umbrella/commit/6a8d88e))

## [9.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.3.0/packages/transducers) (2025-04-30)

#### 🚀 Features

- add `binned()` transducer & example ([6e8d9cd](https://codeberg.org/thi.ng/umbrella/commit/6e8d9cd))

### [9.2.13](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.2.13/packages/transducers) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

### [9.2.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.2.11/packages/transducers) (2024-12-27)

#### ♻️ Refactoring

- update time-based transducers ([54ad446](https://codeberg.org/thi.ng/umbrella/commit/54ad446))
  - add [@thi.ng/timestamp](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/timestamp) micro dependency
  - update timestamp handling (more precise in some contexts)
  - update `benchmark()`, `partitionTime()`, `throttleTime()`

## [9.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.2.0/packages/transducers) (2024-08-19)

#### 🚀 Features

- add syncTuples() transducer ([d3b77bd](https://codeberg.org/thi.ng/umbrella/commit/d3b77bd))

## [9.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.1.0/packages/transducers) (2024-08-13)

#### 🚀 Features

- add sortedFrequencies() reducer ([1257a79](https://codeberg.org/thi.ng/umbrella/commit/1257a79))
- add pushKeys() reducer ([f19d152](https://codeberg.org/thi.ng/umbrella/commit/f19d152))

### [9.0.6](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.0.6/packages/transducers) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))
- dedupe min/maxCompare() impls, add tests ([22fc6e3](https://codeberg.org/thi.ng/umbrella/commit/22fc6e3))

### [9.0.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.0.2/packages/transducers) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([b0e87ab](https://codeberg.org/thi.ng/umbrella/commit/b0e87ab))

# [9.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@9.0.0/packages/transducers) (2024-04-08)

#### 🛑 Breaking changes

- update Reducer, Transducer and other types ([95c43f3](https://codeberg.org/thi.ng/umbrella/commit/95c43f3))
- BREAKING CHANGE: update generics in Reducer, Transducer and other types
  - swap generic type args in `Reducer` and `IReducible` to be same order as in `Transducer`, `IXform`,
    i.e. `Reducer<A, B>` maps items from type A to type B, **not** the other way (as was)!
  - this new order is more logical, less confusing and also in line with upcoming async transducers pkg
  - changes in userland should be minimal (if any), only impacted are custom reducer definitions
  - update all pkg internal occurrences
  - various other small refactorings, type/arg updates, e.g.
    - add generics for `reduced()`/`ensureReduced()`/`unreduced()`
    - update `step()` return type (incl. undefined)
    - add `StructField` generics

### [8.9.14](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.9.14/packages/transducers) (2024-03-18)

#### 🧪 Tests

- minor update tests in various pkgs (regexp, annotations) ([b731a57](https://codeberg.org/thi.ng/umbrella/commit/b731a57))

### [8.9.6](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.9.6/packages/transducers) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

### [8.9.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.9.5/packages/transducers) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://codeberg.org/thi.ng/umbrella/commit/c71a526))

## [8.9.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.9.0/packages/transducers) (2024-02-06)

#### 🚀 Features

- update normRange(), add reverse order ([c7e7fef](https://codeberg.org/thi.ng/umbrella/commit/c7e7fef))
  - add optional arg to reverse order of normRange()
  - update docstrings/examples

### [8.8.9](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.8.9/packages/transducers) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://codeberg.org/thi.ng/umbrella/commit/020ef6c))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [8.8.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.8.7/packages/transducers) (2023-10-30)

#### 🩹 Bug fixes

- fix flatten1() arg types, update docs ([b7ae8eb](https://codeberg.org/thi.ng/umbrella/commit/b7ae8eb))

## [8.8.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.8.0/packages/transducers) (2023-10-11)

#### 🚀 Features

- add repeatedly2d/3d() iterators ([5057939](https://codeberg.org/thi.ng/umbrella/commit/5057939))
- add consume() helper fn ([e612846](https://codeberg.org/thi.ng/umbrella/commit/e612846))

## [8.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.7.0/packages/transducers) (2023-09-15)

#### 🚀 Features

- update rename()/renamer() ([221b13e](https://codeberg.org/thi.ng/umbrella/commit/221b13e))
  - add support for retaining keys

## [8.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.6.0/packages/transducers) (2023-08-22)

#### 🚀 Features

- add length() transducer ([47a95b7](https://codeberg.org/thi.ng/umbrella/commit/47a95b7))

### [8.5.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.5.3/packages/transducers) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://codeberg.org/thi.ng/umbrella/commit/c8c8141))

## [8.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.5.0/packages/transducers) (2023-08-04)

#### 🚀 Features

- fix [#401](https://codeberg.org/thi.ng/umbrella/issues/401), update multiplex(), step() ([834b076](https://codeberg.org/thi.ng/umbrella/commit/834b076))
  - add optional support to override single-result unwrapping behavior
  - update docstrings/examples
  - add tests

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://codeberg.org/thi.ng/umbrella/commit/b6db053))
- minor internal updates ([5ffdcbb](https://codeberg.org/thi.ng/umbrella/commit/5ffdcbb))

## [8.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers@8.4.0/packages/transducers) (2023-03-19)

#### 🚀 Features

- add flatten1() transducer ([2ffd476](https://codeberg.org/thi.ng/umbrella/commit/2ffd476))
  - syntax sugar for a common mapcat() usecase
