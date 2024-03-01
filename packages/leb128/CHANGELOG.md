# Change Log

- **Last updated**: 2024-03-01T15:22:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.47](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.0.47) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.0.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.0.21) (2023-06-29)

#### ♻️ Refactoring

- Zig v0.11-dev syntax & build updates ([cae6541](https://github.com/thi-ng/umbrella/commit/cae6541))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.0.0) (2022-12-02)

#### 🛑 Breaking changes

- add bigint support ([0440c34](https://github.com/thi-ng/umbrella/commit/0440c34))
- BREAKING CHANGE: update decode return type
  - update all encode to accept bigint or number, cast to correct u64/i64 range
  - update decode result to [bigint, number] tuple
  - rebuild binary (~400 bytes smaller)
  - move zig source to /zig
  - update tests
  - update readme

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@2.0.0) (2021-10-12)

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
- update b64 WASM init ([2cff5b0](https://github.com/thi-ng/umbrella/commit/2cff5b0))

### [1.0.68](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@1.0.68) (2021-08-24)

#### ♻️ Refactoring

- fix zig syntax changes ([ec42d5c](https://github.com/thi-ng/umbrella/commit/ec42d5c))
  - orig code was for zig ~0.4.0, syntax has changed meanwhile

### [1.0.58](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@1.0.58) (2021-06-08)

#### ♻️ Refactoring

- dedupe wrapper fns ([b949e1b](https://github.com/thi-ng/umbrella/commit/b949e1b))

### [1.0.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@1.0.37) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@1.0.1) (2019-11-30)

#### 🩹 Bug fixes

- add type hints ([18a4380](https://github.com/thi-ng/umbrella/commit/18a4380))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@1.0.0) (2019-11-09)

#### 🛑 Breaking changes

- no more async init, remove READY promise, update tests ([2044583](https://github.com/thi-ng/umbrella/commit/2044583))
- BREAKING CHANGE: switch to synchronous initialization

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@0.1.0) (2019-07-07)

#### 🚀 Features

- import new hybrid TS/WASM/zig package, incl. readme & tests ([140b238](https://github.com/thi-ng/umbrella/commit/140b238))
- add zig tests, move binary to sep src file for auto regen ([2a89cde](https://github.com/thi-ng/umbrella/commit/2a89cde))
- add READY promise to allow waiting for WASM initialization ([60c3245](https://github.com/thi-ng/umbrella/commit/60c3245))
  - update tests & readme
