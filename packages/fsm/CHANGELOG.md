# Change Log

- **Last updated**: 2022-06-09T16:14:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@3.1.7) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@3.1.0) (2021-11-17)

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

### [3.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@3.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@3.0.0) (2021-10-12)

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

- update imports ([7eece31](https://github.com/thi-ng/umbrella/commit/7eece31))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [2.4.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.4.29) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([6b1c0b3](https://github.com/thi-ng/umbrella/commit/6b1c0b3))
- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.4.2) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([9c0d2ec](https://github.com/thi-ng/umbrella/commit/9c0d2ec))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.4.0) (2020-03-06)

#### 🚀 Features

- add altsLitObj(), update deps & char range matchers ([300fe2b](https://github.com/thi-ng/umbrella/commit/300fe2b))

### [2.3.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.3.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([0b8976c](https://github.com/thi-ng/umbrella/commit/0b8976c))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.3.0) (2019-11-09)

#### 🚀 Features

- update str() to NOT collect input by default (match only) ([6105ea7](https://github.com/thi-ng/umbrella/commit/6105ea7))

### [2.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.2.4) (2019-08-21)

#### ♻️ Refactoring

- extract reduceResult() ([84002bd](https://github.com/thi-ng/umbrella/commit/84002bd))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.2.0) (2019-07-07)

#### 🚀 Features

- TS strictNullChecks, update color conversion fns ([04dc356](https://github.com/thi-ng/umbrella/commit/04dc356))
- enable TS strict compiler flags (refactor) ([135b838](https://github.com/thi-ng/umbrella/commit/135b838))

#### 🩹 Bug fixes

- callback return types ([09b047b](https://github.com/thi-ng/umbrella/commit/09b047b))

### [2.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.1.5) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.1.0) (2019-02-20)

#### 🚀 Features

- add optional FSM ctx update handler, add iterator support ([da9ff03](https://github.com/thi-ng/umbrella/commit/da9ff03))
- add altsLit() matcher, optimize whitespace() ([5243241](https://github.com/thi-ng/umbrella/commit/5243241))
- add optional failure callbacks in all matchers & fsm ([4b51c9a](https://github.com/thi-ng/umbrella/commit/4b51c9a))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@2.0.0) (2019-02-15)

#### 🛑 Breaking changes

- update / split until() ([aeb05f8](https://github.com/thi-ng/umbrella/commit/aeb05f8))
- BREAKING CHANGE: make until() array based, add untilStr()
  - rename existing `until()` => `untilStr()`

#### ♻️ Refactoring

- update to use [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) ([3abdc9e](https://github.com/thi-ng/umbrella/commit/3abdc9e))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fsm@0.1.0) (2019-01-04)

#### 🚀 Features

- add never(), optimize alts(), add docs for all matchers ([81e3fc7](https://github.com/thi-ng/umbrella/commit/81e3fc7))
- update not() ([a933607](https://github.com/thi-ng/umbrella/commit/a933607))
- add always(), lit(), not(), cleanup imports ([992f31a](https://github.com/thi-ng/umbrella/commit/992f31a))
- add support for lookahead-1, add docs ([4a9bb3d](https://github.com/thi-ng/umbrella/commit/4a9bb3d))
- add repeat(), success(), refactor all matchers ([55671fc](https://github.com/thi-ng/umbrella/commit/55671fc))
- import fsm package ([e03390b](https://github.com/thi-ng/umbrella/commit/e03390b))
