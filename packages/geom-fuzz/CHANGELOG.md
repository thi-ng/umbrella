# Change Log

- **Last updated**: 2023-08-10T12:16:43Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@2.2.19) (2023-04-08)

#### ♻️ Refactoring

- update imports ([363deb4](https://github.com/thi-ng/umbrella/commit/363deb4))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@2.2.0) (2022-12-22)

#### 🚀 Features

- add hatch flip/mirror options ([f19c5d4](https://github.com/thi-ng/umbrella/commit/f19c5d4))
- add HatchOpts.tx point transform support ([c665406](https://github.com/thi-ng/umbrella/commit/c665406))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@2.0.0) (2021-10-12)

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
- update imports ([2a28996](https://github.com/thi-ng/umbrella/commit/2a28996))
- update imports ([a502f4e](https://github.com/thi-ng/umbrella/commit/a502f4e))
- update imports (transducers) ([25b674f](https://github.com/thi-ng/umbrella/commit/25b674f))
- update imports ([73dcb84](https://github.com/thi-ng/umbrella/commit/73dcb84))
- update imports ([11d68ac](https://github.com/thi-ng/umbrella/commit/11d68ac))

### [0.1.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@0.1.24) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([69eb928](https://github.com/thi-ng/umbrella/commit/69eb928))

### [0.1.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@0.1.18) (2020-09-13)

#### ♻️ Refactoring

- update imports ([1746889](https://github.com/thi-ng/umbrella/commit/1746889))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-fuzz@0.1.0) (2020-06-20)

#### 🚀 Features

- import as new pkg ([3ff1484](https://github.com/thi-ng/umbrella/commit/3ff1484))
- add geom-fuzz-basics example ([8b82723](https://github.com/thi-ng/umbrella/commit/8b82723))
