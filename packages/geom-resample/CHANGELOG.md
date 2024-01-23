# Change Log

- **Last updated**: 2024-01-23T15:58:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.3.8) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.3.0) (2023-10-12)

#### 🚀 Features

- add Sampler.extractRange() ([f3b0fbc](https://github.com/thi-ng/umbrella/commit/f3b0fbc))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.2.0) (2023-01-10)

#### 🚀 Features

- add sampleUniformX/Y() fns ([88f9ec5](https://github.com/thi-ng/umbrella/commit/88f9ec5))
  - update deps (add [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/main/packages/geom-isec))
  - update pkg

### [2.1.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.1.38) (2022-12-10)

#### 🩹 Bug fixes

- avoid unnecessary resampling ([f2b0ef2](https://github.com/thi-ng/umbrella/commit/f2b0ef2))
  - update resample(), check if given `opts` are actually usable
    if not, just use orig points (or copies)

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.0.0) (2021-10-12)

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
- update imports ([aa038c4](https://github.com/thi-ng/umbrella/commit/aa038c4))

### [0.2.50](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@0.2.50) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.2.48](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@0.2.48) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([e0dd721](https://github.com/thi-ng/umbrella/commit/e0dd721))

### [0.2.46](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@0.2.46) (2020-09-22)

#### ♻️ Refactoring

- update Sampler.closestPoint() ([62472f5](https://github.com/thi-ng/umbrella/commit/62472f5))
  - re-use closestPointPolyline()

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@0.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([c4b0919](https://github.com/thi-ng/umbrella/commit/c4b0919))

#### ♻️ Refactoring

- TS strictNullChecks, update return types ([198fb4c](https://github.com/thi-ng/umbrella/commit/198fb4c))
