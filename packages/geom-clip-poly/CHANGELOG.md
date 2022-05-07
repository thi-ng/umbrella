# Change Log

- **Last updated**: 2022-05-07T11:33:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-poly@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-poly@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-poly@2.0.0) (2021-10-12)

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

- update imports ([869a773](https://github.com/thi-ng/umbrella/commit/869a773))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [1.0.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-poly@1.0.38) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-clip-poly@1.0.0) (2020-02-25)

#### 🛑 Breaking changes

- update readme ([c7ca79b](https://github.com/thi-ng/umbrella/commit/c7ca79b))
- BREAKING CHANGE: extract as own pkg (formerly [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/main/packages/geom-clip))

#### 🚀 Features

- extract sutherland-hodgeman as own pkg (formerly [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/main/packages/geom-clip)) ([782193f](https://github.com/thi-ng/umbrella/commit/782193f))
- extract as own pkg (from [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/main/packages/geom-clip)) ([34e3262](https://github.com/thi-ng/umbrella/commit/34e3262))
  - add liangBarsky2Raw
