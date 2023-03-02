# Change Log

- **Last updated**: 2023-03-02T18:09:03Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.3.0) (2022-05-22)

#### 🚀 Features

- update IRandom, add SFC32 impl ([970d7f4](https://github.com/thi-ng/umbrella/commit/970d7f4))
- add pickRandomKey(), weightedRandomKey() ([9b8ed07](https://github.com/thi-ng/umbrella/commit/9b8ed07))

### [3.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.2.2) (2021-11-21)

#### 🩹 Bug fixes

- off-by-one error in ARandom ([0bf9828](https://github.com/thi-ng/umbrella/commit/0bf9828))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.2.0) (2021-11-17)

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

### [3.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.1.4) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.1.0) (2021-10-25)

#### 🚀 Features

- add pickRandom() ([0899aed](https://github.com/thi-ng/umbrella/commit/0899aed))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [2.4.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.4.4) (2021-08-04)

#### 🩹 Bug fixes

- update weightedRandom() ([70afa70](https://github.com/thi-ng/umbrella/commit/70afa70))
  - assume missing weights as zero

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.4.0) (2021-04-19)

#### 🚀 Features

- add uniqueValuesFrom/uniqueIndices() ([3b3b5d8](https://github.com/thi-ng/umbrella/commit/3b3b5d8))

#### 🩹 Bug fixes

- HOF issue w/ exponential() ([12586b9](https://github.com/thi-ng/umbrella/commit/12586b9))

#### ♻️ Refactoring

- minor updates weightedRandom() ([c6741bc](https://github.com/thi-ng/umbrella/commit/c6741bc))

### [2.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.3.1) (2021-02-24)

#### 🩹 Bug fixes

- update weightedRandom() ([b1cf4d8](https://github.com/thi-ng/umbrella/commit/b1cf4d8))
  - don't throw error if total weights <= 0 (only print warning)

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.3.0) (2021-02-20)

#### 🚀 Features

- add coin()/fairCoin() ([ed66a64](https://github.com/thi-ng/umbrella/commit/ed66a64))

#### ♻️ Refactoring

- update uuid() ([91372d9](https://github.com/thi-ng/umbrella/commit/91372d9))
  - reuse fn from [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/main/packages/hex)

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.2.0) (2021-01-13)

#### 🚀 Features

- add opt start/end for randomBytes() ([4d095da](https://github.com/thi-ng/umbrella/commit/4d095da))
- add CRYPTO IRandom impl ([94e69c1](https://github.com/thi-ng/umbrella/commit/94e69c1))

#### 🩹 Bug fixes

- add opt start index arg for uuid() ([268ec3f](https://github.com/thi-ng/umbrella/commit/268ec3f))

#### ⏱ Performance improvements

- minor update weightedRandom() ([258fd7b](https://github.com/thi-ng/umbrella/commit/258fd7b))
  - avoid sorting if no weights are given

#### ♻️ Refactoring

- minor update randomID() ([9d278ad](https://github.com/thi-ng/umbrella/commit/9d278ad))

### [2.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.1.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.1.1) (2020-11-26)

#### 🩹 Bug fixes

- add missing subdir to pkg "files" ([916dbe7](https://github.com/thi-ng/umbrella/commit/916dbe7))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.1.0) (2020-11-24)

#### 🚀 Features

- add randomBytesFrom(), update UUID fns ([b31c872](https://github.com/thi-ng/umbrella/commit/b31c872))
  - add [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/main/packages/hex) dependency
  - update uuidv4Bytes() to take opt IRandom arg
  - refactor/optimize uuid()
  - add tests
- add distribution HOFs, move gaussian() ([9328821](https://github.com/thi-ng/umbrella/commit/9328821))
  - add exponential(), geometric(), normal(), uniform() HOFs
  - migrate gaussian() to /distributions

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@2.0.0) (2020-08-28)

#### 🛑 Breaking changes

- add INorm, extract gaussianCLT() ([c687598](https://github.com/thi-ng/umbrella/commit/c687598))
- BREAKING CHANGE: remove gaussian() from IRandom,
  extract as standalone gaussianCLT()
  - update gaussianCLT() default args to be more meaningful

#### 🩹 Bug fixes

- off-by-one error in SYSTEM.int() ([ca0492d](https://github.com/thi-ng/umbrella/commit/ca0492d))

#### ♻️ Refactoring

- update imports/docstrings ([ecb2a36](https://github.com/thi-ng/umbrella/commit/ecb2a36))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.4.0) (2020-03-01)

#### 🚀 Features

- add Xoshiro128, refactor default seeds ([b535628](https://github.com/thi-ng/umbrella/commit/b535628))

#### 🩹 Bug fixes

- use correct 160bit default seed for XorWow ([38d511b](https://github.com/thi-ng/umbrella/commit/38d511b))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.3.0) (2020-02-25)

#### 🚀 Features

- add uuidv4Bytes() ([e9ea10f](https://github.com/thi-ng/umbrella/commit/e9ea10f))

#### ♻️ Refactoring

- update imports, internal restruct ([8548a80](https://github.com/thi-ng/umbrella/commit/8548a80))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.2.0) (2020-01-26)

#### 🚀 Features

- add randomBytes() wrapper ([c536bcd](https://github.com/thi-ng/umbrella/commit/c536bcd))

### [1.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.1.15) (2020-01-24)

#### ⏱ Performance improvements

- minor update ARandom.norm() ([babbbaa](https://github.com/thi-ng/umbrella/commit/babbbaa))

### [1.1.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.1.14) (2019-11-30)

#### ♻️ Refactoring

- update weightedRandom ([d609182](https://github.com/thi-ng/umbrella/commit/d609182))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.1.0) (2019-02-15)

#### 🚀 Features

- add randomID() & weightedRandom() ([f719724](https://github.com/thi-ng/umbrella/commit/f719724))

#### 🩹 Bug fixes

- add opt scale arg to IRandom.float() ([5a7e448](https://github.com/thi-ng/umbrella/commit/5a7e448))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@0.1.0) (2018-11-24)

#### 🚀 Features

- re-import, extend & refactor random package (MBP2010) ([4aea85d](https://github.com/thi-ng/umbrella/commit/4aea85d))
