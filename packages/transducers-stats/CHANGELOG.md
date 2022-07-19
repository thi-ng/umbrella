# Change Log

- **Last updated**: 2022-07-19T15:36:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@2.0.0) (2021-10-12)

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

- update imports ([924aa26](https://github.com/thi-ng/umbrella/commit/924aa26))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [1.1.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@1.1.43) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([33daa7f](https://github.com/thi-ng/umbrella/commit/33daa7f))

#### ♻️ Refactoring

- TS strictNullChecks ([01210fe](https://github.com/thi-ng/umbrella/commit/01210fe))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@0.4.0) (2018-08-24)

#### 🚀 Features

- make xforms iterable if input given ([c9ac981](https://github.com/thi-ng/umbrella/commit/c9ac981))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@0.3.1) (2018-07-25)

#### 🩹 Bug fixes

- fix naming of MACD results ([#31](https://github.com/thi-ng/umbrella/issues/31)) ([a322e00](https://github.com/thi-ng/umbrella/commit/a322e00))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@0.3.0) (2018-07-25)

#### 🚀 Features

- add BollingerBand value interface ([c97cb75](https://github.com/thi-ng/umbrella/commit/c97cb75))
- add MACD (fixes [#31](https://github.com/thi-ng/umbrella/issues/31)) ([b92aaa5](https://github.com/thi-ng/umbrella/commit/b92aaa5))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@0.2.0) (2018-07-21)

#### 🚀 Features

- add stochastic oscillator, refactor ([0b0a7ca](https://github.com/thi-ng/umbrella/commit/0b0a7ca))
  - refactor donchian()
  - add bounds() helper fn

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-stats@0.1.0) (2018-07-20)

#### 🚀 Features

- add other xforms ([7df3ce0](https://github.com/thi-ng/umbrella/commit/7df3ce0))
  - bollinger()
  - donchian()
  - hma()
  - rsi()
  - sd()
- add [@thi.ng/transducers-stats](https://github.com/thi-ng/umbrella/tree/main/packages/transducers-stats) package ([7a5812f](https://github.com/thi-ng/umbrella/commit/7a5812f))
