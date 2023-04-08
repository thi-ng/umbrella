# Change Log

- **Last updated**: 2023-04-08T11:09:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.6.0) (2023-02-10)

#### 🚀 Features

- filter result clusters, minor optimizations ([78169e6](https://github.com/thi-ng/umbrella/commit/78169e6))
  - use u32 array for internal cluster assignments
  - remove attempt to start new cluster if one became unused
  - update buildClusters to filter out empty

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.5.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [0.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.4.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.4.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.3.0) (2021-08-04)

#### 🚀 Features

- auto-correct `k` if needed ([d3c3ffa](https://github.com/thi-ng/umbrella/commit/d3c3ffa))
  - update initKmeanspp() & kmeans() to auto-adjust (reduce) `k` if needed
  - add potential failsafe to bail early in initKmeanspp()

### [0.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.2.5) (2021-08-04)

#### 🩹 Bug fixes

- update initKmeanspp() ([dd0d965](https://github.com/thi-ng/umbrella/commit/dd0d965))
  - use `dist` for argmin() calls
  - use `rnd` for weightedRandom()

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.2.0) (2021-04-20)

#### 🚀 Features

- add meansLatLon centroid strategy, docstrings ([269c11c](https://github.com/thi-ng/umbrella/commit/269c11c))

#### ♻️ Refactoring

- update initKmeanspp() ([193c054](https://github.com/thi-ng/umbrella/commit/193c054))
  - ensure unique centroids

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/k-means@0.1.0) (2021-04-19)

#### 🚀 Features

- import as new pkg ([a32aaf6](https://github.com/thi-ng/umbrella/commit/a32aaf6))
- add k-medians support ([6bc450b](https://github.com/thi-ng/umbrella/commit/6bc450b))
  - add CentroidStrategy, update KMeansOpts
  - update kmeans() to use strategy impl
  - extract means() & medians() strategies
- add kmeans++ initialization, update opts ([fcc2dcc](https://github.com/thi-ng/umbrella/commit/fcc2dcc))
  - add `KMeansOpts.initial` to provide initial centroids
  - add initKmeanspp() impl
  - update kmeans() to use improved init step (if needed)

#### 🩹 Bug fixes

- use dist metric in initKmeanspp() ([37bd6c6](https://github.com/thi-ng/umbrella/commit/37bd6c6))
  - update to use user-provided distance metric
