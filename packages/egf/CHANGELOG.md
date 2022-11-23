# Change Log

- **Last updated**: 2022-11-23T22:46:54Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.6.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.6.7) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.6.0) (2021-11-17)

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

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.5.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.5.0) (2021-10-12)

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
- update imports ([629e169](https://github.com/thi-ng/umbrella/commit/629e169))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update base64 tag handler ([768492f](https://github.com/thi-ng/umbrella/commit/768492f))
- minor pkg restructure ([98c05d8](https://github.com/thi-ng/umbrella/commit/98c05d8))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.4.0) (2021-03-27)

#### 🚀 Features

- update readme ([8a36395](https://github.com/thi-ng/umbrella/commit/8a36395))
  - add note about GPG security issue fix

#### 🩹 Bug fixes

- update GPG invocation to avoid arb code exec ([3e14765](https://github.com/thi-ng/umbrella/commit/3e14765))
  - use `execFileSync()` to avoid shell and pass encrypted body

### [0.3.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.3.4) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/egf@0.3.0) (2020-09-22)

#### 🚀 Features

- add escape seq support in parser ([c7fe807](https://github.com/thi-ng/umbrella/commit/c7fe807))
  - escape sequences supported in:
    - subjects/node and property IDs
    - tags names
    - string values
    - @include paths
    - @prefix IDs and values
    - tagged #file values
    - tagged #list values
