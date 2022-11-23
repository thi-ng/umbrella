# Change Log

- **Last updated**: 2022-11-23T22:46:54Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@3.0.0) (2021-10-12)

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
- update imports ([b2f0a9f](https://github.com/thi-ng/umbrella/commit/b2f0a9f))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- minor pkg restructure ([b27b79c](https://github.com/thi-ng/umbrella/commit/b27b79c))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@2.0.0) (2021-02-20)

#### 🛑 Breaking changes

- update attrib type handling ([0ebd889](https://github.com/thi-ng/umbrella/commit/0ebd889))
- BREAKING CHANGE: update attrib types to use string consts
  - part of umbrella-wide changes to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) Type aliases
    (see [a333d4182](https://github.com/thi-ng/umbrella/commit/a333d4182))
  - remove obsolete asNativeType()/asGLType() fns
    (moved to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) for better re-use)

#### 🚀 Features

- export asNativeType/asGLType() ([d4b397b](https://github.com/thi-ng/umbrella/commit/d4b397b))

#### 🩹 Bug fixes

- fix regression/update buffer arg types ([27a3614](https://github.com/thi-ng/umbrella/commit/27a3614))
  - switch from Vec => NumericArray for backing buffers

### [1.0.51](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.51) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([ea97879](https://github.com/thi-ng/umbrella/commit/ea97879))

### [1.0.49](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.49) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([eacf9cf](https://github.com/thi-ng/umbrella/commit/eacf9cf))

### [1.0.45](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.45) (2020-09-13)

#### ♻️ Refactoring

- update imports ([d9699be](https://github.com/thi-ng/umbrella/commit/d9699be))

### [1.0.44](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.44) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([f6865f2](https://github.com/thi-ng/umbrella/commit/f6865f2))

### [1.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.13) (2020-02-25)

#### ♻️ Refactoring

- update imports ([4077f78](https://github.com/thi-ng/umbrella/commit/4077f78))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.9) (2019-11-09)

#### ♻️ Refactoring

- update imports ([6537610](https://github.com/thi-ng/umbrella/commit/6537610))
- update type enum conversions ([9d3b2c3](https://github.com/thi-ng/umbrella/commit/9d3b2c3))
  (due to type migration & updates in [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api))
- update AttribPool imports ([88c952d](https://github.com/thi-ng/umbrella/commit/88c952d))
  - replace malloc's wrap() w/ typedArray()

### [1.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.7) (2019-08-21)

#### ♻️ Refactoring

- simplify AttribPool, extract asserts ([c281f17](https://github.com/thi-ng/umbrella/commit/c281f17))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@1.0.0) (2019-07-07)

#### 🛑 Breaking changes

- address TS strictNullChecks flag ([981b5ce](https://github.com/thi-ng/umbrella/commit/981b5ce))
- BREAKING CHANGE: update return types of various class methods
  - some AList, ArrayList, LinkedList, VecPool methods now return
    `undefined` if operation failed

#### 🚀 Features

- add AttribPool.attribArray(), add tests ([285022a](https://github.com/thi-ng/umbrella/commit/285022a))
- enable TS strict compiler flags (refactor) ([1af6f78](https://github.com/thi-ng/umbrella/commit/1af6f78))
  - add missing type hints/return types

### [0.2.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@0.2.16) (2019-05-22)

#### ♻️ Refactoring

- update Type imports ([a0fab41](https://github.com/thi-ng/umbrella/commit/a0fab41))
  - Type enum now defined in [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) pkg
  - update tests & readme

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@0.2.0) (2019-02-05)

#### 🚀 Features

- update & fix AttribPool resize logic ([b7d162f](https://github.com/thi-ng/umbrella/commit/b7d162f))
  - use MemPool.realloc()
  - update ensure()

#### ♻️ Refactoring

- update AttribPool & VecPool ctors ([d7ccc88](https://github.com/thi-ng/umbrella/commit/d7ccc88))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vector-pools@0.1.2) (2019-01-31)

#### 🩹 Bug fixes

- AttribPool opts & default handling ([16b48b3](https://github.com/thi-ng/umbrella/commit/16b48b3))
