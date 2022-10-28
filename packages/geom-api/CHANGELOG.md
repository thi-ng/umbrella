# Change Log

- **Last updated**: 2022-10-28T19:08:39Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@3.3.0) (2022-06-28)

#### 🚀 Features

- add IAttributed, update IShape ([35799db](https://github.com/thi-ng/umbrella/commit/35799db))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@3.2.0) (2022-06-20)

#### 🚀 Features

- add AABBLike.offset() ([9152db3](https://github.com/thi-ng/umbrella/commit/9152db3))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@3.0.0) (2021-10-12)

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

- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@2.0.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) remove Type enum ([e2cd24a](https://github.com/thi-ng/umbrella/commit/e2cd24a))
- BREAKING CHANGE: remove obsolete shape Type enum
- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([c079a2a](https://github.com/thi-ng/umbrella/commit/c079a2a))
- BREAKING CHANGE: replace SegmentType enum w/ type alias

### [1.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@1.1.4) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@1.1.0) (2020-09-22)

#### 🚀 Features

- add Type.TEXT/3 ([0a45ef8](https://github.com/thi-ng/umbrella/commit/0a45ef8))

### [1.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@1.0.8) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([f25bfa4](https://github.com/thi-ng/umbrella/commit/f25bfa4))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@1.0.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([aa0f356](https://github.com/thi-ng/umbrella/commit/aa0f356))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@1.0.0) (2020-01-24)

#### 🛑 Breaking changes

- replace ISpatialAccel w/ new interfaces ([baa05d1](https://github.com/thi-ng/umbrella/commit/baa05d1))
- BREAKING CHANGE: replace ISpatialAccel with new interfaces:
  ISpatialMap, ISpatialSet, IRegionQuery

#### ♻️ Refactoring

- update ISpatialMap/Set ([7015512](https://github.com/thi-ng/umbrella/commit/7015512))
  - add IClear, ICopy, IEmpty
  - add keys()/values() map-like iterators

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@0.3.0) (2019-07-12)

#### 🚀 Features

- add CubicOpts ([81ac728](https://github.com/thi-ng/umbrella/commit/81ac728))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@0.2.0) (2019-04-15)

#### 🚀 Features

- add more Type enums ([90e8b50](https://github.com/thi-ng/umbrella/commit/90e8b50))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-api@0.1.0) (2019-02-05)

#### 🚀 Features

- add ISpatialAccel.selectVals() ([4bde37e](https://github.com/thi-ng/umbrella/commit/4bde37e))
