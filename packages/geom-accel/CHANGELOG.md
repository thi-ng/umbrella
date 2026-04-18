# Change Log

- **Last updated**: 2026-04-18T11:32:54Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.1.71](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@4.1.71/packages/geom-accel) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [4.1.43](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@4.1.43/packages/geom-accel) (2025-06-19)

#### ⏱ Performance improvements

- minor update hash grids ([e6d572a](https://codeberg.org/thi.ng/umbrella/commit/e6d572a))
  - hoist local vars in hotspots

### [4.1.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@4.1.19/packages/geom-accel) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

## [4.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@4.1.0/packages/geom-accel) (2024-08-10)

#### 🚀 Features

- add poisson-image example ([87ec9e7](https://codeberg.org/thi.ng/umbrella/commit/87ec9e7))
  - update readmes
  - cc @nkint :)

# [4.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@4.0.0/packages/geom-accel) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/geom-api) ([6882260](https://codeberg.org/thi.ng/umbrella/commit/6882260))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/geom-api)
  - add/migrate ISpatialMap, ISpatialSet, IRegionQuery
  - update imports
  - update deps

#### ♻️ Refactoring

- minor internal update NdQtNode.doQuery() ([b95ca8e](https://codeberg.org/thi.ng/umbrella/commit/b95ca8e))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

## [3.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@3.6.0/packages/geom-accel) (2024-04-20)

#### 🚀 Features

- fix [#463](https://codeberg.org/thi.ng/umbrella/issues/463), add grid resolution check ([8688ad5](https://codeberg.org/thi.ng/umbrella/commit/8688ad5))
  - update ASpatialGrid ctor to check for min res
  - add/rename internal helpers

#### ♻️ Refactoring

- update type usage ([aab2250](https://codeberg.org/thi.ng/umbrella/commit/aab2250))

### [3.5.28](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@3.5.28/packages/geom-accel) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [3.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@3.5.0/packages/geom-accel) (2023-06-09)

#### 🚀 Features

- add AHashGrid.hasNeighborhood() ([4378125](https://codeberg.org/thi.ng/umbrella/commit/4378125))
  - update HashGrid2/3 impls

## [3.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@3.4.0/packages/geom-accel) (2023-04-25)

#### 🚀 Features

- add AHashGrid.get()/has() ([e94af0f](https://codeberg.org/thi.ng/umbrella/commit/e94af0f))

### [3.3.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@3.3.11/packages/geom-accel) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))

## [3.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-accel@3.3.0/packages/geom-accel) (2023-02-05)

#### 🚀 Features

- add AHashGrid and HashGrid2/3 impls ([493358a](https://codeberg.org/thi.ng/umbrella/commit/493358a))
