# Change Log

- **Last updated**: 2022-10-03T16:07:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@3.3.0) (2022-07-19)

#### 🚀 Features

- add popCountArray() ([d59e0c4](https://github.com/thi-ng/umbrella/commit/d59e0c4))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@3.2.0) (2022-03-11)

#### 🚀 Features

- add shiftRL() ([804565e](https://github.com/thi-ng/umbrella/commit/804565e))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@3.0.0) (2021-10-12)

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
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@2.2.0) (2021-03-03)

#### 🚀 Features

- add binary/one-hot conversions ([eeb6396](https://github.com/thi-ng/umbrella/commit/eeb6396))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@2.1.0) (2021-02-20)

#### 🚀 Features

- add MSB_BITS8/16/32 LUTs ([e0eb47b](https://github.com/thi-ng/umbrella/commit/e0eb47b))
- add swapLane02/13 ([2e45f48](https://github.com/thi-ng/umbrella/commit/2e45f48))
- add interleave4_12_24/4_16_32() ([89044d2](https://github.com/thi-ng/umbrella/commit/89044d2))

### [2.0.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@2.0.19) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([7eaab0a](https://github.com/thi-ng/umbrella/commit/7eaab0a))

### [2.0.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@2.0.15) (2020-09-13)

#### ♻️ Refactoring

- update deps, use new Fn types ([424f516](https://github.com/thi-ng/umbrella/commit/424f516))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@2.0.0) (2020-03-06)

#### 🛑 Breaking changes

- make binary logic ops unmasked, rename masked versions ([c07cf04](https://github.com/thi-ng/umbrella/commit/c07cf04))
- BREAKING CHANGE: make binary logic ops unmasked, rename masked versions
  - existing names used for unmasked versions (returning signed ints)
  - masked versions of bitOr/bitAnd/bitXor etc. now suffixed with `M`, e.g. `bitAndM()`

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@1.3.0) (2020-02-25)

#### 🚀 Features

- add lane16/setLane16, flip8/16, mux ([1aa0a5e](https://github.com/thi-ng/umbrella/commit/1aa0a5e))
- add float & 64bit byte conversions ([9882196](https://github.com/thi-ng/umbrella/commit/9882196))
- add endianess detection, 64bit float/int/uint conv ([856e035](https://github.com/thi-ng/umbrella/commit/856e035))
- add byte conversions ([564310b](https://github.com/thi-ng/umbrella/commit/564310b))
- add float/int conversions ([2e02d34](https://github.com/thi-ng/umbrella/commit/2e02d34))

#### ♻️ Refactoring

- update imports, internal restruct ([aea5e6b](https://github.com/thi-ng/umbrella/commit/aea5e6b))

### [1.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@1.2.1) (2020-01-24)

#### ♻️ Refactoring

- update bitSize() ([b94d682](https://github.com/thi-ng/umbrella/commit/b94d682))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@1.2.0) (2019-11-30)

#### 🚀 Features

- add bitSize() ([f085bfb](https://github.com/thi-ng/umbrella/commit/f085bfb))

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@1.1.1) (2019-11-09)

#### ♻️ Refactoring

- add return assertion for isPow2() ([e0b5b83](https://github.com/thi-ng/umbrella/commit/e0b5b83))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@1.1.0) (2019-07-31)

#### 🚀 Features

- add setLane8/4/2 fns ([7e24f5e](https://github.com/thi-ng/umbrella/commit/7e24f5e))

#### ♻️ Refactoring

- update splat4_24/32 ([82caa13](https://github.com/thi-ng/umbrella/commit/82caa13))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/binary@0.1.0) (2018-10-17)

#### 🚀 Features

- add [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/main/packages/binary) package ([458d4a0](https://github.com/thi-ng/umbrella/commit/458d4a0))
