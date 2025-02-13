# Change Log

- **Last updated**: 2025-02-13T16:03:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.1.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@4.1.19) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@4.1.0) (2024-08-10)

#### 🚀 Features

- add poisson-image example ([87ec9e7](https://github.com/thi-ng/umbrella/commit/87ec9e7))
  - update readmes
  - cc @nkint :)

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@4.0.0) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([6882260](https://github.com/thi-ng/umbrella/commit/6882260))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate ISpatialMap, ISpatialSet, IRegionQuery
  - update imports
  - update deps

#### ♻️ Refactoring

- minor internal update NdQtNode.doQuery() ([b95ca8e](https://github.com/thi-ng/umbrella/commit/b95ca8e))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.6.0) (2024-04-20)

#### 🚀 Features

- fix [#463](https://github.com/thi-ng/umbrella/issues/463), add grid resolution check ([8688ad5](https://github.com/thi-ng/umbrella/commit/8688ad5))
  - update ASpatialGrid ctor to check for min res
  - add/rename internal helpers

#### ♻️ Refactoring

- update type usage ([aab2250](https://github.com/thi-ng/umbrella/commit/aab2250))

### [3.5.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.5.28) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.5.0) (2023-06-09)

#### 🚀 Features

- add AHashGrid.hasNeighborhood() ([4378125](https://github.com/thi-ng/umbrella/commit/4378125))
  - update HashGrid2/3 impls

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.4.0) (2023-04-25)

#### 🚀 Features

- add AHashGrid.get()/has() ([e94af0f](https://github.com/thi-ng/umbrella/commit/e94af0f))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.3.0) (2023-02-05)

#### 🚀 Features

- add AHashGrid and HashGrid2/3 impls ([493358a](https://github.com/thi-ng/umbrella/commit/493358a))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.2.0) (2022-05-02)

#### 🚀 Features

- add custom dist fn for NdQuadtreeMap/Set too ([5fccbd3](https://github.com/thi-ng/umbrella/commit/5fccbd3))
  - minor refactor KdTreeMap dist fn handling
