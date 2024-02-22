# Change Log

- **Last updated**: 2024-02-22T11:59:16Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.3.44](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.3.44) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.3.0) (2023-01-10)

#### 🚀 Features

- add clipPolylineWith() ([372db85](https://github.com/thi-ng/umbrella/commit/372db85))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.2.0) (2022-12-10)

#### 🚀 Features

- add clipPolylinePoly() ([445ccd6](https://github.com/thi-ng/umbrella/commit/445ccd6))

### [2.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.1.22) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([8dc7918](https://github.com/thi-ng/umbrella/commit/8dc7918))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@2.0.0) (2021-10-12)

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
- update imports ([f0e437c](https://github.com/thi-ng/umbrella/commit/f0e437c))

### [1.2.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@1.2.42) (2021-08-17)

#### 🩹 Bug fixes

- off-by-one error in clipLinePoly() ([7898810](https://github.com/thi-ng/umbrella/commit/7898810))

#### ♻️ Refactoring

- dedupe segment collection ([8ce66b4](https://github.com/thi-ng/umbrella/commit/8ce66b4))

### [1.2.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@1.2.8) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([bbcffb8](https://github.com/thi-ng/umbrella/commit/bbcffb8))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@1.2.0) (2020-07-17)

#### 🚀 Features

- add clipLineSegmentPoly() ([bec7b93](https://github.com/thi-ng/umbrella/commit/bec7b93))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@1.1.0) (2020-06-20)

#### 🚀 Features

- add clipLinePoly(), update deps ([e096efd](https://github.com/thi-ng/umbrella/commit/e096efd))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-line@1.0.0) (2020-02-25)

#### 🛑 Breaking changes

- update readme ([f78374b](https://github.com/thi-ng/umbrella/commit/f78374b))
- BREAKING CHANGE: extract as own pkg (formerly [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/main/packages/geom-clip))

#### 🚀 Features

- extract as own pkg (from [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/main/packages/geom-clip)) ([34e3262](https://github.com/thi-ng/umbrella/commit/34e3262))
  - add liangBarsky2Raw

#### 🩹 Bug fixes

- fix internal clip edge classifier ([c0cc9af](https://github.com/thi-ng/umbrella/commit/c0cc9af))

#### ♻️ Refactoring

- update imports ([fe7ac81](https://github.com/thi-ng/umbrella/commit/fe7ac81))
