# Change Log

- **Last updated**: 2023-12-09T19:12:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.79](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.1.79) (2023-11-24)

#### ♻️ Refactoring

- update utf8 fns ([9e8cf2d](https://github.com/thi-ng/umbrella/commit/9e8cf2d))
  - deprecate utf8Length() (migrated to [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings))

### [2.1.76](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.1.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))
- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

### [2.1.55](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.1.55) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.1.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@2.0.0) (2021-10-12)

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

#### 🚀 Features

- update return types ([70217e8](https://github.com/thi-ng/umbrella/commit/70217e8))
  - return Uint8Array if input given for base64Decode() or utf8Encode()
  - update asBytes() return type (if input given)

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports ([924aa26](https://github.com/thi-ng/umbrella/commit/924aa26))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.6.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([50cc52a](https://github.com/thi-ng/umbrella/commit/50cc52a))
- BREAKING CHANGE: replace Type enum w/ type alias, update BinStructItem

### [0.5.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.5.33) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.5.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.5.31) (2020-11-24)

#### ♻️ Refactoring

- replace dependency for hexDump() ([7af7a92](https://github.com/thi-ng/umbrella/commit/7af7a92))
  - use formatters from [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/main/packages/hex) instead of [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings)

### [0.5.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.5.6) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([acc1fbf](https://github.com/thi-ng/umbrella/commit/acc1fbf))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.5.0) (2020-02-25)

#### 🚀 Features

- update bytes(), add i24/u24 support ([6d658d0](https://github.com/thi-ng/umbrella/commit/6d658d0))
  - also fix stride for u16
- add hexDumpString() syntax sugar ([a3ad805](https://github.com/thi-ng/umbrella/commit/a3ad805))
- add asBytes() transducer ([b8589d4](https://github.com/thi-ng/umbrella/commit/b8589d4))
- add missing type impls to asBytes() ([6514292](https://github.com/thi-ng/umbrella/commit/6514292))

#### ♻️ Refactoring

- minor update bits() ([b78f166](https://github.com/thi-ng/umbrella/commit/b78f166))
- update imports ([f4b4698](https://github.com/thi-ng/umbrella/commit/f4b4698))

### [0.4.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.4.4) (2019-08-21)

#### ♻️ Refactoring

- remove duplicate code in bytes(), update ut8Length ([021fd6f](https://github.com/thi-ng/umbrella/commit/021fd6f))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.4.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([8d86ac6](https://github.com/thi-ng/umbrella/commit/8d86ac6))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([4769638](https://github.com/thi-ng/umbrella/commit/4769638))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.3.1) (2019-03-05)

#### 🩹 Bug fixes

- add randomBits() return type ([d79481f](https://github.com/thi-ng/umbrella/commit/d79481f))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.3.0) (2019-03-04)

#### 🚀 Features

- add randomBits(), update readme ([36ca046](https://github.com/thi-ng/umbrella/commit/36ca046))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.2.0) (2019-02-15)

#### 🚀 Features

- add utf8Length() ([7cf98ef](https://github.com/thi-ng/umbrella/commit/7cf98ef))

#### 🩹 Bug fixes

- update juxt import ([77ed4c5](https://github.com/thi-ng/umbrella/commit/77ed4c5))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-binary@0.1.0) (2019-02-05)

#### 🚀 Features

- extract as new pkg from [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/main/packages/transducers) ([02877c7](https://github.com/thi-ng/umbrella/commit/02877c7))
