# Change Log

- **Last updated**: 2025-02-13T16:03:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.10.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.10.11) (2025-01-17)

#### 🩹 Bug fixes

- fix [#495](https://github.com/thi-ng/umbrella/issues/495), update shuffleRange() ([21a4c41](https://github.com/thi-ng/umbrella/commit/21a4c41))
  - fix/undo [8cbfc7b0c8](https://github.com/thi-ng/umbrella/commit/8cbfc7b0c8)
  - update loop type & condition to skip last iteration
  - switch back to using `rnd.minmax()`
  - see [comment](https://github.com/thi-ng/umbrella/issues/495#issuecomment-2595138357)

#### ⏱ Performance improvements

- fix [#495](https://github.com/thi-ng/umbrella/issues/495), update shuffleRange() ([8cbfc7b](https://github.com/thi-ng/umbrella/commit/8cbfc7b))
  - update loop to skip last iteration (obsolete)
  - use `rnd.minmaxInt()` to compute swap index

## [2.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.10.0) (2024-08-18)

#### 🚀 Features

- update topoSort() ([6606d08](https://github.com/thi-ng/umbrella/commit/6606d08))
  - add missing node check/assertion
  - update `deps` fn to incl. node ID as 2nd arg

### [2.9.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.9.7) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.9.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.9.4) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([35eddc8](https://github.com/thi-ng/umbrella/commit/35eddc8))

## [2.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.9.0) (2024-03-28)

#### 🚀 Features

- add findSequence() & tests ([5f4db56](https://github.com/thi-ng/umbrella/commit/5f4db56))

#### ♻️ Refactoring

- add support for typed arrays ([1383916](https://github.com/thi-ng/umbrella/commit/1383916))
  - add function overrides to support typed arrays for:
    - argSort()
    - bisect(), bisectWith()
    - floydRivest()
- update findSequence() ([f9e3c29](https://github.com/thi-ng/umbrella/commit/f9e3c29))
  - reverse inner scan direction

## [2.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.8.0) (2024-02-19)

#### 🚀 Features

- add blitPred1d() predicate version of blit1d() ([c13c4f9](https://github.com/thi-ng/umbrella/commit/c13c4f9))

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.7.0) (2023-10-27)

#### 🚀 Features

- add rotate(), rotateTyped() ([c1d322e](https://github.com/thi-ng/umbrella/commit/c1d322e))

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.6.0) (2023-10-05)

#### 🚀 Features

- add argMin()/argMax() ([33512ec](https://github.com/thi-ng/umbrella/commit/33512ec))
- add selectThresholdMin/Max() fns ([de9ba50](https://github.com/thi-ng/umbrella/commit/de9ba50))

### [2.5.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.5.15) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.5.0) (2022-12-29)

#### 🚀 Features

- add Floyd-Rivest impl, update readme ([7773d59](https://github.com/thi-ng/umbrella/commit/7773d59))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.4.0) (2022-10-31)

#### 🚀 Features

- add topoSort() ([f7f2e20](https://github.com/thi-ng/umbrella/commit/f7f2e20))
  - add topoSort() as lightweight alt for [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/main/packages/dgraph)
  - add tests
  - update readme

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.3.0) (2022-07-08)

#### 🚀 Features

- add blit1d/2d() functions ([56e8373](https://github.com/thi-ng/umbrella/commit/56e8373))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.2.0) (2022-03-11)

#### 🚀 Features

- add argSort() ([4b65c36](https://github.com/thi-ng/umbrella/commit/4b65c36))
