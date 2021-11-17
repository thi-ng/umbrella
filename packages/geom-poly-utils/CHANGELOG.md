# Change Log

- **Last updated**: 2021-11-17T23:56:32Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.1.0) (2021-11-17)

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

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.0.0) (2021-10-12)

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

- update imports ([e1fcd8a](https://github.com/thi-ng/umbrella/commit/e1fcd8a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.3.0) (2020-12-22)

#### 🚀 Features

- add tangents(), smoothTangents() ([12a9d8a](https://github.com/thi-ng/umbrella/commit/12a9d8a))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.2.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.2.0) (2020-11-24)

#### 🚀 Features

- add circumCenter3() ([342b4a3](https://github.com/thi-ng/umbrella/commit/342b4a3))

### [0.1.65](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.1.65) (2020-09-22)

#### ♻️ Refactoring

- update convexity() ([3167a3d](https://github.com/thi-ng/umbrella/commit/3167a3d))

### [0.1.64](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.1.64) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([4eb9248](https://github.com/thi-ng/umbrella/commit/4eb9248))

### [0.1.56](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.1.56) (2020-07-17)

#### ♻️ Refactoring

- simplify circumCenter2() ([ad72de3](https://github.com/thi-ng/umbrella/commit/ad72de3))

### [0.1.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.1.31) (2020-02-25)

#### ♻️ Refactoring

- update imports ([3a1abc7](https://github.com/thi-ng/umbrella/commit/3a1abc7))

### [0.1.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@0.1.18) (2019-07-07)

#### 🩹 Bug fixes

- update madd call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([3250c82](https://github.com/thi-ng/umbrella/commit/3250c82))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([a10c307](https://github.com/thi-ng/umbrella/commit/a10c307))
