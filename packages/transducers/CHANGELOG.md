# Change Log

- **Last updated**: 2025-04-01T21:42:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [9.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.2.13) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [9.2.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.2.11) (2024-12-27)

#### ♻️ Refactoring

- update time-based transducers ([54ad446](https://github.com/thi-ng/umbrella/commit/54ad446))
  - add [@thi.ng/timestamp](https://github.com/thi-ng/umbrella/tree/main/packages/timestamp) micro dependency
  - update timestamp handling (more precise in some contexts)
  - update `benchmark()`, `partitionTime()`, `throttleTime()`

## [9.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.2.0) (2024-08-19)

#### 🚀 Features

- add syncTuples() transducer ([d3b77bd](https://github.com/thi-ng/umbrella/commit/d3b77bd))

## [9.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.1.0) (2024-08-13)

#### 🚀 Features

- add sortedFrequencies() reducer ([1257a79](https://github.com/thi-ng/umbrella/commit/1257a79))
- add pushKeys() reducer ([f19d152](https://github.com/thi-ng/umbrella/commit/f19d152))

### [9.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.0.6) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))
- dedupe min/maxCompare() impls, add tests ([22fc6e3](https://github.com/thi-ng/umbrella/commit/22fc6e3))

### [9.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.0.2) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([b0e87ab](https://github.com/thi-ng/umbrella/commit/b0e87ab))

# [9.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@9.0.0) (2024-04-08)

#### 🛑 Breaking changes

- update Reducer, Transducer and other types ([95c43f3](https://github.com/thi-ng/umbrella/commit/95c43f3))
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

### [8.9.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.9.6) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [8.9.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.9.5) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

## [8.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.9.0) (2024-02-06)

#### 🚀 Features

- update normRange(), add reverse order ([c7e7fef](https://github.com/thi-ng/umbrella/commit/c7e7fef))
  - add optional arg to reverse order of normRange()
  - update docstrings/examples

### [8.8.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.8.9) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

### [8.8.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.8.7) (2023-10-30)

#### 🩹 Bug fixes

- fix flatten1() arg types, update docs ([b7ae8eb](https://github.com/thi-ng/umbrella/commit/b7ae8eb))

## [8.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.8.0) (2023-10-11)

#### 🚀 Features

- add repeatedly2d/3d() iterators ([5057939](https://github.com/thi-ng/umbrella/commit/5057939))
- add consume() helper fn ([e612846](https://github.com/thi-ng/umbrella/commit/e612846))

## [8.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.7.0) (2023-09-15)

#### 🚀 Features

- update rename()/renamer() ([221b13e](https://github.com/thi-ng/umbrella/commit/221b13e))
  - add support for retaining keys

## [8.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.6.0) (2023-08-22)

#### 🚀 Features

- add length() transducer ([47a95b7](https://github.com/thi-ng/umbrella/commit/47a95b7))

### [8.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.5.3) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

## [8.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.5.0) (2023-08-04)

#### 🚀 Features

- fix [#401](https://github.com/thi-ng/umbrella/issues/401), update multiplex(), step() ([834b076](https://github.com/thi-ng/umbrella/commit/834b076))
  - add optional support to override single-result unwrapping behavior
  - update docstrings/examples
  - add tests

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))
- minor internal updates ([5ffdcbb](https://github.com/thi-ng/umbrella/commit/5ffdcbb))

## [8.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.4.0) (2023-03-19)

#### 🚀 Features

- add flatten1() transducer ([2ffd476](https://github.com/thi-ng/umbrella/commit/2ffd476))
  - syntax sugar for a common mapcat() usecase

## [8.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.3.0) (2022-03-11)

#### 🚀 Features

- add mapA() helper ([5cc5795](https://github.com/thi-ng/umbrella/commit/5cc5795))
