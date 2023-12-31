# Change Log

- **Last updated**: 2023-12-31T09:44:24Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.1.41) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@3.0.0) (2021-10-12)

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

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@2.1.6) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@2.1.0) (2020-08-20)

#### 🚀 Features

- add doOnce(), update readme ([889e00d](https://github.com/thi-ng/umbrella/commit/889e00d))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@2.0.0) (2020-02-25)

#### 🛑 Breaking changes

- update imports ([d6b5614](https://github.com/thi-ng/umbrella/commit/d6b5614))
- BREAKING CHANGE: replace obsolete Fn type aliases w/ [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) types

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([a08cc69](https://github.com/thi-ng/umbrella/commit/a08cc69))

#### 🩹 Bug fixes

- return type memoize1() ([c0dafb9](https://github.com/thi-ng/umbrella/commit/c0dafb9))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([333bf6d](https://github.com/thi-ng/umbrella/commit/333bf6d))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([48670f5](https://github.com/thi-ng/umbrella/commit/48670f5))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@0.2.0) (2018-09-06)

#### 🚀 Features

- add defonce() ([61bed88](https://github.com/thi-ng/umbrella/commit/61bed88))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/memoize@0.1.0) (2018-08-08)

#### 🚀 Features

- add [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/main/packages/memoize) package ([adc4928](https://github.com/thi-ng/umbrella/commit/adc4928))
- add optional cache arg for memoizeJ() ([2bc092d](https://github.com/thi-ng/umbrella/commit/2bc092d))
