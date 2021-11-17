# Change Log

- **Last updated**: 2021-11-17T23:56:32Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@2.0.0) (2021-10-12)

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

### [0.2.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@0.2.29) (2021-01-02)

#### ⏱ Performance improvements

- minor updates IDGen, add doc strings ([1c0e284](https://github.com/thi-ng/umbrella/commit/1c0e284))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@0.2.0) (2020-01-24)

#### 🚀 Features

- add IClear impl, fix available() getter, add tests ([e467978](https://github.com/thi-ng/umbrella/commit/e467978))
  - available() now takes start offset into account
- support increasing ID range capacity ([f040eb5](https://github.com/thi-ng/umbrella/commit/f040eb5))
  - add `capacity` getter / setter
  - increasing capacity only supported if unversioned

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/idgen@0.1.0) (2019-11-30)

#### 🚀 Features

- add INotify impl, add tests ([7aec9b7](https://github.com/thi-ng/umbrella/commit/7aec9b7))
- import as new pkg ([bff5f5b](https://github.com/thi-ng/umbrella/commit/bff5f5b))

#### ♻️ Refactoring

- add readonly acces to `ids`, `freeID` getter ([9a2637c](https://github.com/thi-ng/umbrella/commit/9a2637c))
- expose capacity,  available, used getters ([70d0dc9](https://github.com/thi-ng/umbrella/commit/70d0dc9))
