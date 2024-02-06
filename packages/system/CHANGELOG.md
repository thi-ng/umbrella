# Change Log

- **Last updated**: 2024-02-06T23:18:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@3.0.0) (2024-02-01)

#### 🛑 Breaking changes

- Async component factories ([998409d](https://github.com/thi-ng/umbrella/commit/998409d))
- BREAKING CHANGE: Component factory functions are async now
  - add async System.init()
  - update System ctor
  - add/update docs
  - update tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.3.0) (2024-01-31)

#### 🚀 Features

- update ILifecycle, add system arg ([89d341a](https://github.com/thi-ng/umbrella/commit/89d341a))
  - add/update tests

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.2.0) (2024-01-30)

#### 🚀 Features

- update start/stop logic ([71f2dc5](https://github.com/thi-ng/umbrella/commit/71f2dc5))
  - update System.start() to stop already started components if current
  component startup failed
  - update System.stop() to only return true if _all_ components did shutdown
  - update docs
  - add tests

### [2.1.80](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.80) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.1.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.34) (2022-12-06)

#### ♻️ Refactoring

- extract SystemSpec interface ([7c12bd4](https://github.com/thi-ng/umbrella/commit/7c12bd4))

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.9) (2022-06-09)

#### ♻️ Refactoring

- various (minor) TS4.7 related updates/fixes ([9d9ecae](https://github.com/thi-ng/umbrella/commit/9d9ecae))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.0) (2021-11-17)

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

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@0.3.0) (2021-03-30)

#### 🚀 Features

- add package LOGGER ([f67364c](https://github.com/thi-ng/umbrella/commit/f67364c))

### [0.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@0.2.31) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

### [0.2.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@0.2.26) (2020-09-13)

#### 🩹 Bug fixes

- fix [#247](https://github.com/thi-ng/umbrella/issues/247), allow custom keys in ILifecycle ([a7b8680](https://github.com/thi-ng/umbrella/commit/a7b8680))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@0.2.0) (2020-04-03)

#### 🚀 Features

- update ILifecycle, keep graph, add/update docs ([791c67d](https://github.com/thi-ng/umbrella/commit/791c67d))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@0.1.0) (2020-04-02)

#### 🚀 Features

- import as new pkg, add tests, readme ([709d896](https://github.com/thi-ng/umbrella/commit/709d896))
