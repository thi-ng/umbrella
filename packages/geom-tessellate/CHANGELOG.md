# Change Log

- **Last updated**: 2023-08-10T12:25:09Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@2.0.0) (2021-10-12)

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
- update imports ([69abd58](https://github.com/thi-ng/umbrella/commit/69abd58))
- update imports (transducers) ([25b674f](https://github.com/thi-ng/umbrella/commit/25b674f))

### [0.2.51](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@0.2.51) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([dc88789](https://github.com/thi-ng/umbrella/commit/dc88789))

### [0.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@0.2.13) (2020-02-25)

#### ♻️ Refactoring

- update imports ([6c5ea57](https://github.com/thi-ng/umbrella/commit/6c5ea57))

### [0.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@0.2.9) (2019-11-09)

#### ♻️ Refactoring

- update wrapSides/tween call sites in various pkgs ([ee8200c](https://github.com/thi-ng/umbrella/commit/ee8200c))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@0.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([8d610c3](https://github.com/thi-ng/umbrella/commit/8d610c3))

### [0.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@0.1.12) (2019-04-02)

#### 🩹 Bug fixes

- TS3.4 type inference ([800c1c7](https://github.com/thi-ng/umbrella/commit/800c1c7))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@0.1.0) (2019-02-05)

#### ♻️ Refactoring

- update imports (zip) ([7f4e398](https://github.com/thi-ng/umbrella/commit/7f4e398))
