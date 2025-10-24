# Change Log

- **Last updated**: 2025-10-24T17:47:43Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@2.0.0) (2025-06-24)

#### 🛑 Breaking changes

- update KMeansInit & kmeansPlusPlus() ([58d7eb1](https://github.com/thi-ng/umbrella/commit/58d7eb1))
- BREAKING CHANGE: update `KMeansInit` to return vectors not IDs
  - update `KMeansInit` return type
  - update `KMeansOpts.initial`
  - rename `initKmeanspp()` => `kmeansPlusPlus()`

#### 🚀 Features

- add meanCut/medianCut() ([867889d](https://github.com/thi-ng/umbrella/commit/867889d))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@1.1.0) (2025-06-14)

#### 🚀 Features

- update initKmeanspp(), add configurable distance exponent ([2aed319](https://github.com/thi-ng/umbrella/commit/2aed319))
  - add KMeansOpts.exponent
  - update doc strings

### [0.7.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.7.10) (2024-10-05)

#### ♻️ Refactoring

- add explicit type casts (TS5.6.2) ([dcbdd60](https://github.com/thi-ng/umbrella/commit/dcbdd60))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.7.0) (2024-07-25)

#### 🚀 Features

- update `KMeansOpts.initial` ([f70073d](https://github.com/thi-ng/umbrella/commit/f70073d))
  - support custom init functions
  - add KMeansInit type alias
  - update handling in `kmeans()`

### [0.6.89](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.6.89) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [0.6.85](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.6.85) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([5966258](https://github.com/thi-ng/umbrella/commit/5966258))

### [0.6.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.6.43) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.6.0) (2023-02-10)

#### 🚀 Features

- filter result clusters, minor optimizations ([78169e6](https://github.com/thi-ng/umbrella/commit/78169e6))
  - use u32 array for internal cluster assignments
  - remove attempt to start new cluster if one became unused
  - update buildClusters to filter out empty
