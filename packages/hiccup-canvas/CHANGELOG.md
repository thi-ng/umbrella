# Change Log

- **Last updated**: 2024-01-23T15:58:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.2) (2023-12-19)

#### 🩹 Bug fixes

- fix rounded rect attrib handling ([ee79d01](https://github.com/thi-ng/umbrella/commit/ee79d01))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.0) (2023-12-18)

#### 🚀 Features

- fix [#433](https://github.com/thi-ng/umbrella/issues/433), support rounded rects via `r` attrib ([573245e](https://github.com/thi-ng/umbrella/commit/573245e))
  - update draw() to update rect handling

### [2.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.4.6) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.4.0) (2023-10-23)

#### 🚀 Features

- add/update packed shape support ([14ce2f8](https://github.com/thi-ng/umbrella/commit/14ce2f8))
  - add packedPolyline() / packedPolygon() fns
  - update draw() to add support for new shape types

### [2.3.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.3.24) (2023-10-11)

#### 🩹 Bug fixes

- fix "ellipse" shape handling (off-by-one error) ([d1985c4](https://github.com/thi-ng/umbrella/commit/d1985c4))
  - update draw() to include last (CCW flag) shape arg
  - also related to [#418](https://github.com/thi-ng/umbrella/issues/418)
- update circular arc handling in draw() ([18173c5](https://github.com/thi-ng/umbrella/commit/18173c5))
  - actually use CCW shape arg
  - add issue references for upcoming fixes

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.3.0) (2023-04-08)

#### 🚀 Features

- add support for __clear ctrl attrib ([2f3de82](https://github.com/thi-ng/umbrella/commit/2f3de82))

### [2.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.2.1) (2023-02-05)

#### 🩹 Bug fixes

- add null check for __skip attrib ([416b7bb](https://github.com/thi-ng/umbrella/commit/416b7bb))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.2.0) (2023-01-10)

#### 🚀 Features

- add __background attrib support ([a33a58d](https://github.com/thi-ng/umbrella/commit/a33a58d))
  - update __mergeState() to fill bg if attrib given
  - refactor attrib handling in main draw() fn

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.1.9) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.1.0) (2021-11-17)

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

### [2.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.0.10) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- minor pkg restructure ([459596c](https://github.com/thi-ng/umbrella/commit/459596c))
- rename internals ([043e3eb](https://github.com/thi-ng/umbrella/commit/043e3eb))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@1.2.0) (2021-04-03)

#### 🚀 Features

- add IToImageData support ([7cc4709](https://github.com/thi-ng/umbrella/commit/7cc4709))
  - update image() to accept ImageData & IToImageData
  - add [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/main/packages/pixel) as dev dependency

### [1.1.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@1.1.21) (2021-02-20)

#### ♻️ Refactoring

- update resolveColor() ([66e9a40](https://github.com/thi-ng/umbrella/commit/66e9a40))
- update color attrib resolution/conversion ([a9ca280](https://github.com/thi-ng/umbrella/commit/a9ca280))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@1.1.0) (2020-07-17)

#### 🚀 Features

- add lines() ([817b54d](https://github.com/thi-ng/umbrella/commit/817b54d))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@1.0.0) (2020-06-05)

#### 🛑 Breaking changes

- extract as new package ([4b3c516](https://github.com/thi-ng/umbrella/commit/4b3c516))
- BREAKING CHANGE: extract as new package from former [@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/main/packages/hdom-canvas)

#### 🚀 Features

- add IToHiccup support in draw ([a59bb09](https://github.com/thi-ng/umbrella/commit/a59bb09))
