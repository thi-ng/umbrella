# Change Log

- **Last updated**: 2024-01-26T18:03:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.2.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@4.2.43) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@4.2.0) (2022-05-21)

#### 🚀 Features

- add fold() & tests ([2394ff8](https://github.com/thi-ng/umbrella/commit/2394ff8))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@4.1.0) (2021-11-17)

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

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@4.0.0) (2021-10-12)

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

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@3.0.0) (2021-02-20)

#### 🛑 Breaking changes

- restructure for functional API ([e05d723](https://github.com/thi-ng/umbrella/commit/e05d723))
- BREAKING CHANGE: the API has been updated to be largely functional
  - replace all static and most instance methods w/ standalone functions
  - only class methods remaining are to implement these standard interfaces:
    `ICompare`, `IContains`, `ICopy`, `IEquiv`
  - add samples() iterator
  - update/replace values() iterator
  - add doc strings
  - add/update tests

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@2.1.0) (2020-11-24)

#### 🚀 Features

- add min/max/clamp() impls ([2747f9c](https://github.com/thi-ng/umbrella/commit/2747f9c))

### [2.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@2.0.24) (2020-09-13)

#### ♻️ Refactoring

- update imports ([0dcc3e8](https://github.com/thi-ng/umbrella/commit/0dcc3e8))

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@2.0.8) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([fe50ef6](https://github.com/thi-ng/umbrella/commit/fe50ef6))

### [2.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@2.0.3) (2020-02-25)

#### ♻️ Refactoring

- update imports ([f4ff137](https://github.com/thi-ng/umbrella/commit/f4ff137))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@2.0.0) (2019-11-30)

#### 🛑 Breaking changes

- fix [#171](https://github.com/thi-ng/umbrella/issues/171), various fixes, additions, add tests ([2d13c71](https://github.com/thi-ng/umbrella/commit/2d13c71))
  - add interval() factory fn
  - add ctor range & openness check
  - invert meaning of isBefore/isAfter()
  - include() always returns new interval
  - add Classifier.EQUIV
  - update/fix classify() & overlaps()
  - fix result openness in union/intersection/prefix/suffix()
  - extract toString, min/max methods as private fns
  - add/update deps
  - add initial tests
- BREAKING CHANGE: inverted meaning of isBefore/isAfter() to be
  more understandable

#### 🩹 Bug fixes

- add union/intersection tests ([d301628](https://github.com/thi-ng/umbrella/commit/d301628))
- update compare() to consider openness, add tests ([995b32a](https://github.com/thi-ng/umbrella/commit/995b32a))

### [1.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@1.0.13) (2019-08-21)

#### ♻️ Refactoring

- extract minmax helper, reformat ([7c8f69e](https://github.com/thi-ng/umbrella/commit/7c8f69e))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@0.2.0) (2018-12-19)

#### 🚀 Features

- add Interval.parse(), update docs, readme, deps ([a78c6a7](https://github.com/thi-ng/umbrella/commit/a78c6a7))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/intervals@0.1.0) (2018-12-18)

#### 🚀 Features

- add new package ([b0a3142](https://github.com/thi-ng/umbrella/commit/b0a3142))
