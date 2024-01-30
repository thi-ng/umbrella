# Change Log

- **Last updated**: 2024-01-30T15:21:30Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.3.0) (2023-10-18)

#### 🚀 Features

- add BitField.similarity() ([58428c0](https://github.com/thi-ng/umbrella/commit/58428c0))

#### ⏱ Performance improvements

- optimize BitField.positions() ([17058b7](https://github.com/thi-ng/umbrella/commit/17058b7))
- update BitField ctor, BitMatrix.row() ([e1c2f73](https://github.com/thi-ng/umbrella/commit/e1c2f73))
  - add opt BitField ctor arg for pre-existing backing buffer
  - update BitMatrix.row() to add `viewOnly` arg allowing to re-use storage

### [2.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.2.9) (2022-10-26)

#### ♻️ Refactoring

- update backing array types from u32 -> u8 ([aaa0ecb](https://github.com/thi-ng/umbrella/commit/aaa0ecb))
  - update BitField & BitMatrix to use Uint8Array

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.2.0) (2022-07-19)

#### 🚀 Features

- add BitField iterators ([3d415ef](https://github.com/thi-ng/umbrella/commit/3d415ef))
- add ILength impl, add .density() ([2f6e654](https://github.com/thi-ng/umbrella/commit/2f6e654))
  - refactor popCount() impls to use fn from [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/main/packages/binary) pkg

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.0.0) (2021-10-12)

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
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([7b5ed67](https://github.com/thi-ng/umbrella/commit/7b5ed67))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

### [0.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.4.6) (2021-03-17)

#### ♻️ Refactoring

- dedupe OOB error handling ([a6d9731](https://github.com/thi-ng/umbrella/commit/a6d9731))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.4.0) (2021-02-20)

#### 🛑 Breaking changes

- add row/column extracts, popcounts, rename factories ([0c4c112](https://github.com/thi-ng/umbrella/commit/0c4c112))
- BREAKING CHANGE: rename factory fns to follow umbrella-wide naming conventions
  - rename bitField() => defBitField()
  - rename bitMatrix() => defBitMatrix()
  - add BitMatrix.row()/column() bitfield extraction
  - add BitMatrix.popCountRow/Column()
  - add BitField.popCount()
  - update masks in bit accessors
  - update BitField ctor & accessors to allow numbers (not just booleans)

### [0.3.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.3.25) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([d5c5bd5](https://github.com/thi-ng/umbrella/commit/d5c5bd5))

### [0.3.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.3.21) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))
- update imports ([b09f1a6](https://github.com/thi-ng/umbrella/commit/b09f1a6))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.3.0) (2020-03-06)

#### 🚀 Features

- add toggleAt(), setRange(), update ctor ([6ed20c1](https://github.com/thi-ng/umbrella/commit/6ed20c1))
  - update BitField ctor to accept bit string or bool array
  - add size check in resize(), bail if not different
  - add setRange() for BitField
  - add toggleAt() for BitField & BitMatrix
  - add bitField() and bitMatrix() factory fns
  - extract common toString()
- add and/or/xor/not() methods, add IClear, ICopy impls ([52d3005](https://github.com/thi-ng/umbrella/commit/52d3005))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.2.0) (2019-09-21)

#### 🚀 Features

- update BitMatrix to support non-squared sizes, update docstrings ([0fd8620](https://github.com/thi-ng/umbrella/commit/0fd8620))

#### ♻️ Refactoring

- re-use B32 from strings pkg ([d7abea6](https://github.com/thi-ng/umbrella/commit/d7abea6))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@0.1.0) (2019-02-17)

#### 🚀 Features

- add new package ([5e17fd1](https://github.com/thi-ng/umbrella/commit/5e17fd1))
- add/update resize() & setAt(), add doc strings ([f227107](https://github.com/thi-ng/umbrella/commit/f227107))
