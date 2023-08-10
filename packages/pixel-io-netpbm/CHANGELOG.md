# Change Log

- **Last updated**: 2023-08-10T12:16:43Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@2.1.9) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@2.1.0) (2021-11-17)

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

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@2.0.9) (2021-11-04)

#### ♻️ Refactoring

- minor changes (rename types) ([7bd491d](https://github.com/thi-ng/umbrella/commit/7bd491d))

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@2.0.8) (2021-11-03)

#### ♻️ Refactoring

- minor update ([b8f1714](https://github.com/thi-ng/umbrella/commit/b8f1714))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@2.0.0) (2021-10-12)

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
- update imports ([9a97d74](https://github.com/thi-ng/umbrella/commit/9a97d74))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-io-netpbm@0.1.0) (2021-02-20)

#### 🚀 Features

- import as new pkg ([697b842](https://github.com/thi-ng/umbrella/commit/697b842))
- add/update readers/writers ([a62ef0b](https://github.com/thi-ng/umbrella/commit/a62ef0b))
  - extract parseHeader()
  - update readComments() to collect comment lines
    (e.g. useful for meta data)
  - add 16bit grayscale support for read/write
  - add support for channel rescaling
  - fix readPBM() bit twiddling
  - update asPGM(), add asPGM16()
- add opt comment support ([2659031](https://github.com/thi-ng/umbrella/commit/2659031))
  - add extra arg for all asPXM() functions to include
    arbitrary comments in file header

#### ♻️ Refactoring

- update PBM R&W, comment handling ([ed495e9](https://github.com/thi-ng/umbrella/commit/ed495e9))
  - remove [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/main/packages/binary) dep
  - update bitops in readPBM()/asPBM()
  - update initHeader() to avoid double newlines if no comments
