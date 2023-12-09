# Change Log

- **Last updated**: 2023-12-09T19:12:03Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.84](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@2.1.84) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@2.0.0) (2021-10-12)

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
- update imports (transducers) ([09f223d](https://github.com/thi-ng/umbrella/commit/09f223d))
- update defmulti impls ([b7c0abe](https://github.com/thi-ng/umbrella/commit/b7c0abe))

### [1.1.56](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.56) (2021-01-10)

#### ♻️ Refactoring

- update $Z2 usage ([7e6cf98](https://github.com/thi-ng/umbrella/commit/7e6cf98))

### [1.1.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.52) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

### [1.1.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.21) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([c0e9914](https://github.com/thi-ng/umbrella/commit/c0e9914))

### [1.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.15) (2020-02-25)

#### ♻️ Refactoring

- update imports ([165ac9a](https://github.com/thi-ng/umbrella/commit/165ac9a))

### [1.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.11) (2019-11-09)

#### ♻️ Refactoring

- add vectors dep, update addXXX signatures ([2fe6f8c](https://github.com/thi-ng/umbrella/commit/2fe6f8c))

### [1.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.5) (2019-07-07)

#### ♻️ Refactoring

- address TS strictNullChecks flag ([995f5d2](https://github.com/thi-ng/umbrella/commit/995f5d2))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.1.0) (2019-04-15)

#### 🚀 Features

- add new entities, options, extract addEntity, update enums ([43426e5](https://github.com/thi-ng/umbrella/commit/43426e5))
  - switch to const enums where possible
  - add common addEntity helper to simplify others
  - add EntityOptions to allow specifying color & pattern
- add boolean tree, csg box & cylinder entities ([b1db275](https://github.com/thi-ng/umbrella/commit/b1db275))

### [1.0.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.0.14) (2019-04-02)

#### 🩹 Bug fixes

- TS3.4 type inference ([34eab59](https://github.com/thi-ng/umbrella/commit/34eab59))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [0.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.2.5) (2018-08-24)

#### 🩹 Bug fixes

- regression to due transducers update ([78d0a84](https://github.com/thi-ng/umbrella/commit/78d0a84))

#### ♻️ Refactoring

- transducer imports & usage ([3057237](https://github.com/thi-ng/umbrella/commit/3057237))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.2.2) (2018-08-08)

#### ♻️ Refactoring

- update to use [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings) ([df067d8](https://github.com/thi-ng/umbrella/commit/df067d8))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.2.1) (2018-08-02)

#### ♻️ Refactoring

- only expect ArrayLike points/vectors, minor other updates ([fdc7630](https://github.com/thi-ng/umbrella/commit/fdc7630))
  - add linewidth consts
  - update formatParams()

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.2.0) (2018-08-01)

#### ♻️ Refactoring

- make fill mode optional for addPolyline2d() ([3ca2cbf](https://github.com/thi-ng/umbrella/commit/3ca2cbf))

### [0.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.1.4) (2018-07-25)

#### 🚀 Features

- add PolylineMode enum, update addPolyline2d() ([f7a084a](https://github.com/thi-ng/umbrella/commit/f7a084a))
  - add addPolygon2d()

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.1.1) (2018-07-13)

#### ♻️ Refactoring

- update formatParams(), optimize iges file size ([976a6d8](https://github.com/thi-ng/umbrella/commit/976a6d8))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iges@0.1.0) (2018-07-12)

#### 🚀 Features

- re-import & update IGES exporter (via MBP2010) ([7f1b2d4](https://github.com/thi-ng/umbrella/commit/7f1b2d4))
  - update impl to use transducers
  - only use plain arrays for geo data (points)
  - remove broken pointer support for now
  - update readme

#### ♻️ Refactoring

- emit compressed globals section ([087f348](https://github.com/thi-ng/umbrella/commit/087f348))
  - reuse formatParams() for globals
  - add tests
  - update readme
