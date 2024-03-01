# Change Log

- **Last updated**: 2024-03-01T15:22:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@2.2.0) (2023-09-15)

#### 🚀 Features

- add comparison operators/predicates ([5a627b1](https://github.com/thi-ng/umbrella/commit/5a627b1))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@2.0.0) (2021-10-12)

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

### [1.3.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@1.3.16) (2020-09-13)

#### ♻️ Refactoring

- update deps, use new Fn types ([c3a4b97](https://github.com/thi-ng/umbrella/commit/c3a4b97))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@1.3.0) (2020-04-05)

#### 🚀 Features

- fix [#215](https://github.com/thi-ng/umbrella/issues/215), add sort key getter support for compareByKeysX() ([f364b4e](https://github.com/thi-ng/umbrella/commit/f364b4e))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@1.2.0) (2020-03-01)

#### 🚀 Features

- add HOFs, restructure, update deps & docs ([ed2c41c](https://github.com/thi-ng/umbrella/commit/ed2c41c))
  - add compareByKey(), compareByKeys2/3/4() HOF
  - add reverse() HOF
  - split into separate source files
  - update readme

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@1.1.0) (2019-11-30)

#### 🚀 Features

- add compareNumAsc/Desc numeric comparators ([2b8fafc](https://github.com/thi-ng/umbrella/commit/2b8fafc))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([025412a](https://github.com/thi-ng/umbrella/commit/025412a))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compare@0.1.0) (2018-05-10)

#### 🚀 Features

- add new package [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/main/packages/compare) ([e4a87c4](https://github.com/thi-ng/umbrella/commit/e4a87c4))
