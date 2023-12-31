# Change Log

- **Last updated**: 2023-12-31T09:44:24Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.39) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.2.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.30) (2023-08-04)

#### ♻️ Refactoring

- update INotify impl ([d36aca6](https://github.com/thi-ng/umbrella/commit/d36aca6))
- update INotify impls ([cbdc527](https://github.com/thi-ng/umbrella/commit/cbdc527))

### [3.2.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.14) (2022-11-28)

#### ♻️ Refactoring

- update INotify.notify() signature ([066bae5](https://github.com/thi-ng/umbrella/commit/066bae5))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.0) (2022-06-17)

#### 🚀 Features

- add trailing slash option, optimize routeForID() ([c003dc2](https://github.com/thi-ng/umbrella/commit/c003dc2))
  - update BasicRouter default config init
  - pre-build `routeIndex` in ctor
  - optimize `routeForID()` to use new `routeIndex`
- update format(), hash/prefix handling ([724b3ad](https://github.com/thi-ng/umbrella/commit/724b3ad))
  - update HTMLRouter default prefix to "#/" if `useFragment` is true
  - remove obsolete `HTMLRouter.format()` (now the same as BasicRouter)
  - update BasicRouter.format() to throw error for missing route param value

### [3.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.1.5) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.0.0) (2021-10-12)

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

### [2.0.54](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@2.0.54) (2021-09-03)

#### ♻️ Refactoring

- fix up TS4.4 changes ([04a93a6](https://github.com/thi-ng/umbrella/commit/04a93a6))

### [2.0.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@2.0.36) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.0.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@2.0.33) (2020-09-22)

#### ♻️ Refactoring

- extract matchRoutes() ([d5917ec](https://github.com/thi-ng/umbrella/commit/d5917ec))

### [2.0.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@2.0.31) (2020-09-13)

#### ♻️ Refactoring

- update imports ([22cf5c6](https://github.com/thi-ng/umbrella/commit/22cf5c6))

### [2.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@2.0.10) (2020-02-25)

#### ♻️ Refactoring

- update imports, internal restruct ([bb2d60e](https://github.com/thi-ng/umbrella/commit/bb2d60e))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@2.0.0) (2019-07-07)

#### 🛑 Breaking changes

- address TS strictNullChecks, update types, add checks ([c7ff9a4](https://github.com/thi-ng/umbrella/commit/c7ff9a4))
- BREAKING CHANGE: Route & RouteMatch IDs MUST be strings now
  - update config fields from PropertyKey => string
  - add initial & default route checks in ctor

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([d3ecae3](https://github.com/thi-ng/umbrella/commit/d3ecae3))

### [1.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@1.0.5) (2019-03-10)

#### ♻️ Refactoring

- re-use type aliases from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([0d2fdff](https://github.com/thi-ng/umbrella/commit/0d2fdff))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [0.1.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@0.1.28) (2018-11-13)

#### ♻️ Refactoring

- update Route, RouteMatch & minor optimizations ([1d085bf](https://github.com/thi-ng/umbrella/commit/1d085bf))

### [0.1.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@0.1.20) (2018-08-01)

#### ♻️ Refactoring

- TS3.0 PropertyKey handling ([2ecd538](https://github.com/thi-ng/umbrella/commit/2ecd538))

### [0.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@0.1.11) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@0.1.1) (2018-03-21)

#### ♻️ Refactoring

- update INotify dummy impl ([b328780](https://github.com/thi-ng/umbrella/commit/b328780))
  - reflecting INotify updates in [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api)
- update error handling ([adc559a](https://github.com/thi-ng/umbrella/commit/adc559a))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@0.1.0) (2018-03-11)

#### 🚀 Features

- re-import router package (MBP2010), minor refactor & fixes ([07b4e06](https://github.com/thi-ng/umbrella/commit/07b4e06))
