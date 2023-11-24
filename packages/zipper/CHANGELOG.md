# Change Log

- **Last updated**: 2023-11-24T09:35:46Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.64](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@2.1.64) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@2.0.0) (2021-10-12)

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

### [0.1.46](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@0.1.46) (2021-06-08)

#### ♻️ Refactoring

- add missing type hints (TS4.3) ([030055d](https://github.com/thi-ng/umbrella/commit/030055d))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@0.1.3) (2020-02-25)

#### ♻️ Refactoring

- update imports ([1fb1915](https://github.com/thi-ng/umbrella/commit/1fb1915))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/zipper@0.1.0) (2019-11-30)

#### 🚀 Features

- import new package (ported from clojure) ([5562fe4](https://github.com/thi-ng/umbrella/commit/5562fe4))
- major refactor, add tests, update readme ([b91d8a6](https://github.com/thi-ng/umbrella/commit/b91d8a6))
- add update() & tests ([defdf76](https://github.com/thi-ng/umbrella/commit/defdf76))
- add .depth getter & tests ([65c5ec3](https://github.com/thi-ng/umbrella/commit/65c5ec3))
