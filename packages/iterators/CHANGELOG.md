# Change Log

- **Last updated**: 2022-07-19T15:36:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@6.1.0) (2021-11-17)

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

### [6.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@6.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [6.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@6.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@6.0.0) (2021-10-12)

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

- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [5.1.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.1.43) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [5.1.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.1.38) (2020-09-13)

#### ♻️ Refactoring

- update imports ([d7bd006](https://github.com/thi-ng/umbrella/commit/d7bd006))

### [5.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([010d9e5](https://github.com/thi-ng/umbrella/commit/010d9e5))

### [5.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.1.6) (2019-11-09)

#### ♻️ Refactoring

- add type hints (TS 3.6.4) ([327f76e](https://github.com/thi-ng/umbrella/commit/327f76e))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.1.0) (2019-07-07)

#### 🚀 Features

- TS strictNullChecks ([9f9be1d](https://github.com/thi-ng/umbrella/commit/9f9be1d))
  - last() now returns <T> or undefined
- enable TS strict compiler flags (refactor) ([24fd9e7](https://github.com/thi-ng/umbrella/commit/24fd9e7))

#### 🩹 Bug fixes

- update concat/mapcat, fnil args ([c51ff98](https://github.com/thi-ng/umbrella/commit/c51ff98))

### [5.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@5.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([ad5574b](https://github.com/thi-ng/umbrella/commit/ad5574b))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@4.2.0) (2018-12-20)

#### 🚀 Features

- add `children` arg for walk()/walkIterator() ([61b7b11](https://github.com/thi-ng/umbrella/commit/61b7b11))

### [4.1.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@4.1.33) (2018-10-17)

#### ♻️ Refactoring

- update Infinity consts in various packages ([296e1e0](https://github.com/thi-ng/umbrella/commit/296e1e0))

### [4.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@4.1.11) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@4.1.0) (2018-03-21)

#### 🚀 Features

- update error handling, add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep ([9316a6c](https://github.com/thi-ng/umbrella/commit/9316a6c))

### [4.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@4.0.2) (2018-01-31)

#### ♻️ Refactoring

- use Predicate/Predicate2 ([42bbb86](https://github.com/thi-ng/umbrella/commit/42bbb86))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@4.0.0) (2018-01-29)

#### 🛑 Breaking changes

- remove default exports ([651d07c](https://github.com/thi-ng/umbrella/commit/651d07c))
- BREAKING CHANGE: switch back to named function exports for project consistency
  and following lead from tslint (https://palantir.github.io/tslint/rules/no-default-export/)

### [3.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@3.2.2) (2018-01-25)

#### 🩹 Bug fixes

- project links in readme files ([e290d75](https://github.com/thi-ng/umbrella/commit/e290d75))

### [3.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/iterators@3.2.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
