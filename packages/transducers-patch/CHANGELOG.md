# Change Log

- **Last updated**: 2021-11-17T23:56:32Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.4.0) (2021-11-17)

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

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.3.0) (2021-10-12)

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

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.2.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum ([5086a33](https://github.com/thi-ng/umbrella/commit/5086a33))
- BREAKING CHANGE: replace Patch enum w/ type alias,
  update PatchArrayOp/PatchObjOp

### [0.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.1.6) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([be42b21](https://github.com/thi-ng/umbrella/commit/be42b21))

### [0.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.1.5) (2020-03-28)

#### 🩹 Bug fixes

- update deps & imports ([71d73c3](https://github.com/thi-ng/umbrella/commit/71d73c3))

#### ♻️ Refactoring

- update to new [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) API ([dcf929d](https://github.com/thi-ng/umbrella/commit/dcf929d))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-patch@0.1.0) (2020-02-25)

#### 🚀 Features

- add transaction support ([77fbb77](https://github.com/thi-ng/umbrella/commit/77fbb77))
- import as new pkg ([274fde1](https://github.com/thi-ng/umbrella/commit/274fde1))

#### ♻️ Refactoring

- update imports ([03f6ee8](https://github.com/thi-ng/umbrella/commit/03f6ee8))
- update PatchObjOp, update readme ([63328d6](https://github.com/thi-ng/umbrella/commit/63328d6))
