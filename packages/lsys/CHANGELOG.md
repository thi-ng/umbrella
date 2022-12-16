# Change Log

- **Last updated**: 2022-12-16T12:52:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@2.0.0) (2021-10-12)

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
- update imports (transducers) ([5a20982](https://github.com/thi-ng/umbrella/commit/5a20982))

### [0.2.60](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@0.2.60) (2020-09-13)

#### ♻️ Refactoring

- update imports ([f3dfd46](https://github.com/thi-ng/umbrella/commit/f3dfd46))

### [0.2.59](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@0.2.59) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([ef8ab4d](https://github.com/thi-ng/umbrella/commit/ef8ab4d))

### [0.2.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@0.2.28) (2020-02-25)

#### ♻️ Refactoring

- update imports ([55eb4cb](https://github.com/thi-ng/umbrella/commit/55eb4cb))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@0.2.0) (2019-02-26)

#### 🚀 Features

- add probabilistic features & example, update readme ([318a576](https://github.com/thi-ng/umbrella/commit/318a576))
- add `g` turtle command, update readme ([4d06992](https://github.com/thi-ng/umbrella/commit/4d06992))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/lsys@0.1.0) (2019-02-21)

#### 🚀 Features

- import new package, update readme ([98251cd](https://github.com/thi-ng/umbrella/commit/98251cd))
