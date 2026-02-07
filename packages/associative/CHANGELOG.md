# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [7.1.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@7.1.21) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@7.1.0) (2025-07-10)

#### 🚀 Features

- add `Symbol.dispose` support ([6a7bba9](https://github.com/thi-ng/umbrella/commit/6a7bba9))
  - update all Set & Map impls
  - add `__disposableValues()` helper
  - add `__disposableEntries()` helper

#### ♻️ Refactoring

- update all Map/Set private state and `toString()` impls ([#505](https://github.com/thi-ng/umbrella/issues/505)) ([aef32a9](https://github.com/thi-ng/umbrella/commit/aef32a9))
  - use private class properties instead of WeakMap to strore internal state
  - replace `__inspectable` with `__tostringMixin`
  - update code examples

### [7.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@7.0.2) (2024-07-25)

#### 🩹 Bug fixes

- add explicit return type for `first()` ([8a53ee0](https://github.com/thi-ng/umbrella/commit/8a53ee0))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@7.0.0) (2024-07-22)

#### 🛑 Breaking changes

- restructure & split-up package ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([8e59a63](https://github.com/thi-ng/umbrella/commit/8e59a63))
- BREAKING CHANGE: restructure & split-up package, update readme
  - remove obsolete source files
  - update pkg exports
- migrate/remove SortedMap/Set, sortedObject() ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([9f4143a](https://github.com/thi-ng/umbrella/commit/9f4143a))
- BREAKING CHANGE: migrate/remove SortedMap/Set, sortedObject()
  - migrate `SortedMap`/`SortedSet` to [@thi.ng/sorted-map](https://github.com/thi-ng/umbrella/tree/main/packages/sorted-map) pkg
  - migrate `sortedObject()` to [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/main/packages/object-utils)
  - remove obsolete source files
  - remove obsolete deps
  - update readme
- migrate/remove sparse set features ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([db2957c](https://github.com/thi-ng/umbrella/commit/db2957c))
- BREAKING CHANGE: migrate sparse set features to [@thi.ng/sparse-set](https://github.com/thi-ng/umbrella/tree/main/packages/sparse-set) pkg
  - remove obsolete files
  - update pkg

### [6.3.61](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.3.61) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- dedupe BidirIndex deletion & iteration, update tests ([3c11a44](https://github.com/thi-ng/umbrella/commit/3c11a44))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [6.3.57](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.3.57) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([6274bf1](https://github.com/thi-ng/umbrella/commit/6274bf1))

### [6.3.55](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.3.55) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/main/packages/transducers) pkg ([2c7a18a](https://github.com/thi-ng/umbrella/commit/2c7a18a))

### [6.3.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.3.18) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [6.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.3.2) (2023-08-27)

#### ♻️ Refactoring

- update internal types (TS 5.2 update) ([3f686d0](https://github.com/thi-ng/umbrella/commit/3f686d0))

## [6.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.3.0) (2023-08-22)

#### 🚀 Features

- add partitionKeysMap/Obj() ([ca9b460](https://github.com/thi-ng/umbrella/commit/ca9b460))
- add objectFromKeys() ([0a6ba5f](https://github.com/thi-ng/umbrella/commit/0a6ba5f))

#### 🩹 Bug fixes

- update arg types and generics for selectKeys()/withoutKeys() ([4fa9ea1](https://github.com/thi-ng/umbrella/commit/4fa9ea1))

### [6.2.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.2.43) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

### [6.2.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.2.25) (2023-02-10)

#### 🩹 Bug fixes

- [#375](https://github.com/thi-ng/umbrella/issues/375) update .set() for existing keys ([4c1da10](https://github.com/thi-ng/umbrella/commit/4c1da10))
  - when updating existing keys, add missing value propagation
    for intermediate nodes
  - add tests
- [#375](https://github.com/thi-ng/umbrella/issues/375) fix SortedMap.delete(), add fuzz test ([ccbdfeb](https://github.com/thi-ng/umbrella/commit/ccbdfeb))
  - fix issue which caused lane corruption and detached heads
  - add fuzz test repeatedly setting/deleting keys

### [6.2.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.2.24) (2023-02-05)

#### 🩹 Bug fixes

- [#375](https://github.com/thi-ng/umbrella/issues/375) major update/rewrite SortedMap impl ([d5f793a](https://github.com/thi-ng/umbrella/commit/d5f793a))
  - update Node impl to use 4-way linkage
  - simplify .set()/.delete() impls
  - remove obsolete SortedMapOpts.capacity
  - add SortedMapOpts.rnd to customize IRandom impl
    (e.g. for reproducible behavior/branching)
  - update tests
  - update deps (add [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/main/packages/random))
