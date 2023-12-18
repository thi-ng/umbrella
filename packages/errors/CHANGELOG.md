# Change Log

- **Last updated**: 2023-12-18T13:41:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.4.1) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.4.0) (2023-10-24)

#### 🚀 Features

- update assert() import.meta.env check ([#425](https://github.com/thi-ng/umbrella/issues/425)) ([d30d000](https://github.com/thi-ng/umbrella/commit/d30d000))
  - also check for `import.meta.env.UMBRELLA_ASSERTS` for non-ViteJS tooling
  - btw. this is **not** a fix for the esbuild issue in [#425](https://github.com/thi-ng/umbrella/issues/425)
  (but part of its solution posted in comments)

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.3.0) (2023-08-04)

#### 🚀 Features

- add ensureXXX() functions ([be70868](https://github.com/thi-ng/umbrella/commit/be70868))

### [2.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.2.3) (2022-10-28)

#### 🩹 Bug fixes

- potential fix regression of env var check ([#361](https://github.com/thi-ng/umbrella/issues/361)) ([1d3a805](https://github.com/thi-ng/umbrella/commit/1d3a805))

### [2.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.2.2) (2022-10-04)

#### 🩹 Bug fixes

- update assertion switch logic ([781470d](https://github.com/thi-ng/umbrella/commit/781470d))
  - remove support for obsolete (& broken) snowpack setup
  - add support for Vite's env var handling

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.2.0) (2022-09-21)

#### 🚀 Features

- add I/O error types & factories ([898584b](https://github.com/thi-ng/umbrella/commit/898584b))
  - add IOError
  - add FileNotFoundError

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.1.0) (2021-11-17)

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

### [2.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.0.4) (2021-10-25)

#### 🩹 Bug fixes

- [#324](https://github.com/thi-ng/umbrella/issues/324) update snowpack issue workaround ([6dfbf71](https://github.com/thi-ng/umbrella/commit/6dfbf71))
  - switch to another temp workaround until snowpack team
    fixes snowpackjs/snowpack[#3621](https://github.com/thi-ng/umbrella/issues/3621)

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.0.0) (2021-10-12)

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

#### 🚀 Features

- migrate assert() from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([7030a6a](https://github.com/thi-ng/umbrella/commit/7030a6a))
  - add existing assert() fn from api pkg
  - add AssertionError class
  - update pkg
- add snowpack env var support for assert ([52822b1](https://github.com/thi-ng/umbrella/commit/52822b1))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- set string as default generic ([936a9d7](https://github.com/thi-ng/umbrella/commit/936a9d7))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@1.3.0) (2021-03-17)

#### 🚀 Features

- add outOfBounds(), ensureIndex() ([fb5ca0a](https://github.com/thi-ng/umbrella/commit/fb5ca0a))
- add ensureIndex2(), update outOfBounds() arg type ([ab007d6](https://github.com/thi-ng/umbrella/commit/ab007d6))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@1.2.0) (2019-08-21)

#### 🚀 Features

- add defError(), refactor all existing, update readme ([ded89c2](https://github.com/thi-ng/umbrella/commit/ded89c2))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([8460aea](https://github.com/thi-ng/umbrella/commit/8460aea))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([d9f4bd3](https://github.com/thi-ng/umbrella/commit/d9f4bd3))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@0.1.1) (2018-05-10)

#### ♻️ Refactoring

- update return types (`never`) ([5227dd1](https://github.com/thi-ng/umbrella/commit/5227dd1))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@0.1.0) (2018-05-10)

#### 🚀 Features

- add new package [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/main/packages/errors) ([1e97856](https://github.com/thi-ng/umbrella/commit/1e97856))
