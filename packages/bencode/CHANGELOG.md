# Change Log

- **Last updated**: 2023-02-10T14:03:10Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.1.6) (2022-04-07)

#### 🩹 Bug fixes

- fix [#342](https://github.com/thi-ng/umbrella/issues/342), support signed ints ([66615be](https://github.com/thi-ng/umbrella/commit/66615be))
  - add inf/NaN checks
  - add tests

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.0.0) (2021-10-12)

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
- update imports ([7b00120](https://github.com/thi-ng/umbrella/commit/7b00120))
- update imports (transducers) ([e2db0dd](https://github.com/thi-ng/umbrella/commit/e2db0dd))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- restructure/split source files ([fa3b4b6](https://github.com/thi-ng/umbrella/commit/fa3b4b6))
- update defmulti impls ([c807c38](https://github.com/thi-ng/umbrella/commit/c807c38))

### [0.3.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@0.3.43) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([ad267a2](https://github.com/thi-ng/umbrella/commit/ad267a2))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@0.3.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([1be1a14](https://github.com/thi-ng/umbrella/commit/1be1a14))

#### ♻️ Refactoring

- TS strictNullChecks ([9d0b1f1](https://github.com/thi-ng/umbrella/commit/9d0b1f1))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@0.2.1) (2019-02-20)

#### 🩹 Bug fixes

- string list val decoding, add tests, update readme ([9f2b8ae](https://github.com/thi-ng/umbrella/commit/9f2b8ae))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@0.2.0) (2019-02-15)

#### 🚀 Features

- add decode(), fix string length handling ([c1bbc6f](https://github.com/thi-ng/umbrella/commit/c1bbc6f))
  - add decode() w/ opt utf8 string decoding
  - use utf8Length() for string encoding

#### ♻️ Refactoring

- update to use [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) ([83260ed](https://github.com/thi-ng/umbrella/commit/83260ed))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@0.1.0) (2019-02-05)

#### 🚀 Features

- re-import updated bencode pkg ([cf7dc3a](https://github.com/thi-ng/umbrella/commit/cf7dc3a))
- re-import updated bencode pkg ([f2612a6](https://github.com/thi-ng/umbrella/commit/f2612a6))
