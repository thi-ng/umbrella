# Change Log

- **Last updated**: 2023-12-31T09:44:24Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.3.0) (2023-12-18)

#### 🚀 Features

- add rotationAroundPoint23() ([7b3ed38](https://github.com/thi-ng/umbrella/commit/7b3ed38))

### [2.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.2.7) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.2.0) (2023-10-23)

#### 🚀 Features

- add fit23 & fit44() matrix ops ([e2040e1](https://github.com/thi-ng/umbrella/commit/e2040e1))

### [2.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.1.22) (2022-08-16)

#### 🩹 Bug fixes

- fix [#352](https://github.com/thi-ng/umbrella/issues/352), update set() return var ([d32026c](https://github.com/thi-ng/umbrella/commit/d32026c))

### [2.1.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.1.19) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([39565cb](https://github.com/thi-ng/umbrella/commit/39565cb))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.0.0) (2021-10-12)

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
- internal restructure/imports ([766afe9](https://github.com/thi-ng/umbrella/commit/766afe9))

### [0.6.58](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.6.58) (2021-04-24)

#### ♻️ Refactoring

- simplify mat44n() ([60b9e7e](https://github.com/thi-ng/umbrella/commit/60b9e7e))

### [0.6.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.6.37) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.6.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.6.33) (2020-09-22)

#### ♻️ Refactoring

- add/update types, minor refactor ([096b7c7](https://github.com/thi-ng/umbrella/commit/096b7c7))

### [0.6.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.6.32) (2020-09-13)

#### ♻️ Refactoring

- update imports ([4bc3c6d](https://github.com/thi-ng/umbrella/commit/4bc3c6d))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.6.0) (2020-02-25)

#### 🚀 Features

- add project3(), refactor unproject(), mulV344() ([61c36fc](https://github.com/thi-ng/umbrella/commit/61c36fc))

#### 🩹 Bug fixes

- ([#205](https://github.com/thi-ng/umbrella/issues/205)) fix `w` calc in mulV344() ([46c1061](https://github.com/thi-ng/umbrella/commit/46c1061))

#### ♻️ Refactoring

- update imports, internal restruct ([5a8fba7](https://github.com/thi-ng/umbrella/commit/5a8fba7))

### [0.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.5.3) (2019-07-31)

#### ♻️ Refactoring

- update mat23to44, mat33to44 ([7dac1e6](https://github.com/thi-ng/umbrella/commit/7dac1e6))

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.5.1) (2019-07-08)

#### 🩹 Bug fixes

- mixQ result handling ([cc9ab35](https://github.com/thi-ng/umbrella/commit/cc9ab35))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.5.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([7b1c81a](https://github.com/thi-ng/umbrella/commit/7b1c81a))
- add matXXn & matXXv fns ([7a2ef82](https://github.com/thi-ng/umbrella/commit/7a2ef82))
- add matXXn, matXXv, mulXXvm fns ([9359bbc](https://github.com/thi-ng/umbrella/commit/9359bbc))

#### 🩹 Bug fixes

- update maddN call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([4a985c5](https://github.com/thi-ng/umbrella/commit/4a985c5))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([7ee8361](https://github.com/thi-ng/umbrella/commit/7ee8361))
  - update various fns to unify api (1st arg can be null)
- add explicit types to workaround typedoc bug ([099a651](https://github.com/thi-ng/umbrella/commit/099a651))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.4.0) (2019-05-22)

#### 🚀 Features

- add outerProduct for vec 2/3/4 ([2a9d076](https://github.com/thi-ng/umbrella/commit/2a9d076))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.3.1) (2019-04-09)

#### 🚀 Features

- rename normal44 => normal33, add new normal44 (w/ M44 result) ([d54f746](https://github.com/thi-ng/umbrella/commit/d54f746))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.3.0) (2019-04-07)

#### 🚀 Features

- add transform23/44 fns ([dab6839](https://github.com/thi-ng/umbrella/commit/dab6839))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.2.0) (2019-04-02)

#### 🚀 Features

- add MatXXLike type aliases ([a2ace9f](https://github.com/thi-ng/umbrella/commit/a2ace9f))

### [0.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.1.6) (2019-02-19)

#### 🩹 Bug fixes

- Fix identity44 dispatch ([6812b2b](https://github.com/thi-ng/umbrella/commit/6812b2b))

#### ♻️ Refactoring

- freeze IDENT* consts ([3591899](https://github.com/thi-ng/umbrella/commit/3591899))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@0.1.0) (2019-01-21)

#### 🚀 Features

- add m22 & m23 matrix converters ([2aceab9](https://github.com/thi-ng/umbrella/commit/2aceab9))
