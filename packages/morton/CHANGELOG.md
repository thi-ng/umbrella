# Change Log

- **Last updated**: 2021-12-13T10:26:00Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@3.1.0) (2021-11-17)

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

### [3.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@3.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@3.0.0) (2021-10-12)

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

- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [2.0.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@2.0.28) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@2.0.24) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types ([61cbfce](https://github.com/thi-ng/umbrella/commit/61cbfce))

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@2.0.9) (2020-04-11)

#### 🩹 Bug fixes

- fix tree coord conversion fns, add tests ([9a23fa2](https://github.com/thi-ng/umbrella/commit/9a23fa2))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@2.0.0) (2020-01-24)

#### 🛑 Breaking changes

- add ZCurve class, restructure package, update build target ([2ee4b68](https://github.com/thi-ng/umbrella/commit/2ee4b68))
- BREAKING CHANGE: module uses bigint and now uses ESNext build target

#### 🚀 Features

- add ZCurve range iterator and bigMin() impl ([a78d07a](https://github.com/thi-ng/umbrella/commit/a78d07a))

#### ⏱ Performance improvements

- add optimized ZCurve2/3 class impls ([d61c717](https://github.com/thi-ng/umbrella/commit/d61c717))
- precompute wipe masks, minor other refactoring ([4b79950](https://github.com/thi-ng/umbrella/commit/4b79950))

#### ♻️ Refactoring

- don't use bigint literals in ZCurve, replace w/ consts ([bcf4d8f](https://github.com/thi-ng/umbrella/commit/bcf4d8f))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([1fc2e9a](https://github.com/thi-ng/umbrella/commit/1fc2e9a))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@0.2.0) (2018-10-21)

#### 🚀 Features

- update/add muxScaled2/3 versions, add error handling ([ac2f3e8](https://github.com/thi-ng/umbrella/commit/ac2f3e8))
  - refactor encodeScaled*() fns, extract prescale()
  - add vector versions of muxScaled/demuxScaled2/3()

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/morton@0.1.0) (2018-10-17)

#### 🚀 Features

- import & update [@thi.ng/morton](https://github.com/thi-ng/umbrella/tree/main/packages/morton) package (MBP2010) ([501536b](https://github.com/thi-ng/umbrella/commit/501536b))
