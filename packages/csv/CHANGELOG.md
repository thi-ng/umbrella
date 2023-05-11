# Change Log

- **Last updated**: 2023-05-11T12:16:33Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@2.3.0) (2023-02-05)

#### 🚀 Features

- add oneOff() cell transform for enum like values ([7c297db](https://github.com/thi-ng/umbrella/commit/7c297db))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@2.2.0) (2021-12-02)

#### 🚀 Features

- add currency formatters ([52b7340](https://github.com/thi-ng/umbrella/commit/52b7340))
- add more cell transforms, add docs ([23646bf](https://github.com/thi-ng/umbrella/commit/23646bf))
  - add epoch(), date(), url() transforms
  - add formatPercent()
  - update readme

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@2.0.0) (2021-10-12)

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

- add formatCSV(), types, tests ([a2ca1b6](https://github.com/thi-ng/umbrella/commit/a2ca1b6))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([6b102d0](https://github.com/thi-ng/umbrella/commit/6b102d0))
- update imports (transducers) ([4bdecc9](https://github.com/thi-ng/umbrella/commit/4bdecc9))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@0.1.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([32cfc25](https://github.com/thi-ng/umbrella/commit/32cfc25))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csv@0.1.0) (2020-11-24)

#### 🚀 Features

- import as new package ([2b07100](https://github.com/thi-ng/umbrella/commit/2b07100))
- add coercions, restructure ([93d79ec](https://github.com/thi-ng/umbrella/commit/93d79ec))
- add/update CSVOpts, cell transforms, docs ([282e85c](https://github.com/thi-ng/umbrella/commit/282e85c))
  - allow arrays for `cols` option
  - update initIndex(), add column autonaming fallback
  - refactor parseCSV()
  - rename CoercionFn => CellTransform
  - add upper/lower() transforms
  - add/update tests

#### 🩹 Bug fixes

- add quoting/newline support in header fields ([28cac18](https://github.com/thi-ng/umbrella/commit/28cac18))
  - add tests

#### ♻️ Refactoring

- update parseLine() ([4ae49e6](https://github.com/thi-ng/umbrella/commit/4ae49e6))
