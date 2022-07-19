# Change Log

- **Last updated**: 2022-07-19T15:36:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@2.0.0) (2021-10-12)

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

- update imports (transducers) ([25b674f](https://github.com/thi-ng/umbrella/commit/25b674f))
- update imports ([6d302d0](https://github.com/thi-ng/umbrella/commit/6d302d0))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@1.1.0) (2021-08-09)

#### 🚀 Features

- add scale factor support ([b3f93d2](https://github.com/thi-ng/umbrella/commit/b3f93d2))

#### 🩹 Bug fixes

- add half-pixel offset to result coords ([9b90370](https://github.com/thi-ng/umbrella/commit/9b90370))

### [0.1.68](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.68) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.1.55](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.55) (2020-07-08)

#### ♻️ Refactoring

- update imports ([7fbc569](https://github.com/thi-ng/umbrella/commit/7fbc569))

### [0.1.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.31) (2020-02-25)

#### ♻️ Refactoring

- update imports ([9944925](https://github.com/thi-ng/umbrella/commit/9944925))

### [0.1.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.25) (2019-08-21)

#### ⏱ Performance improvements

- refactor contourVertex as jump table, minor updates ([d25827e](https://github.com/thi-ng/umbrella/commit/d25827e))

### [0.1.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.18) (2019-07-07)

#### ♻️ Refactoring

- address TS strictNullChecks flag ([70da11e](https://github.com/thi-ng/umbrella/commit/70da11e))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.2) (2019-02-11)

#### ⏱ Performance improvements

- flatten LUTs, manual destructure ([763d7b9](https://github.com/thi-ng/umbrella/commit/763d7b9))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.1) (2019-02-10)

#### ⏱ Performance improvements

- minor optimizations ([d990c3c](https://github.com/thi-ng/umbrella/commit/d990c3c))
  - use Uint8Array for pre-coded cells
  - cellValue() uses pre-computed index

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isoline@0.1.0) (2019-02-05)

#### 🚀 Features

- import package (ported from clojure) ([e30b211](https://github.com/thi-ng/umbrella/commit/e30b211))
