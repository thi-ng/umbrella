# Change Log

- **Last updated**: 2021-11-19T07:59:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.6.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root
- add new themes, update swatch gen ([69f269a](https://github.com/thi-ng/umbrella/commit/69f269a))
  - update readme, add table w/ recent additions

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.5.0) (2021-10-25)

#### 🚀 Features

- add 30+ new palettes ([a33ea48](https://github.com/thi-ng/umbrella/commit/a33ea48))

### [0.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.4.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.4.0) (2021-10-12)

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

- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.3.0) (2021-08-24)

#### 🚀 Features

- add new palettes, update readme ([14f2952](https://github.com/thi-ng/umbrella/commit/14f2952))
- update/simplify swatch gen ([3187949](https://github.com/thi-ng/umbrella/commit/3187949))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.2.0) (2021-08-22)

#### 🚀 Features

- add more palettes, update gen ([ba4057c](https://github.com/thi-ng/umbrella/commit/ba4057c))
  - add more themes from various collections
  - sort all themes by their KSUID
  - minor refactor swatch gen

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.1.0) (2021-08-21)

#### 🚀 Features

- add as new pkg, add assets & swatch gen ([9d1bb17](https://github.com/thi-ng/umbrella/commit/9d1bb17))
