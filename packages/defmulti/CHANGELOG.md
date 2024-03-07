# Change Log

- **Last updated**: 2024-03-07T20:40:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@3.0.23) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([46bc987](https://github.com/thi-ng/umbrella/commit/46bc987))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@3.0.0) (2023-09-15)

#### 🛑 Breaking changes

- update .impls() ([db48f57](https://github.com/thi-ng/umbrella/commit/db48f57))
- BREAKING CHANGE: update .impls() to return a Map of dispatch values and
  their implementations
  - update tests

### [2.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@2.1.39) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@2.0.0) (2021-10-12)

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

- add .setDefault(), pkg restructure ([0a8641a](https://github.com/thi-ng/umbrella/commit/0a8641a))
  - dissolve constants.ts:
    - move logging to logger.ts
    - move `DEFAULT` symbol to defmulti.ts
  - update deps
- update defmulti args ([a10d36f](https://github.com/thi-ng/umbrella/commit/a10d36f))
  - add additional opt arg to allow specifying/adding impls, same effect as `.addAll()`
  - update AncestorDefs and `makeRels()` helper
  - update tests

#### 🩹 Bug fixes

- add DEFAULT handling for .addAll() ([40ba6f9](https://github.com/thi-ng/umbrella/commit/40ba6f9))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([76940d3](https://github.com/thi-ng/umbrella/commit/76940d3))

### [1.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.3.6) (2021-03-03)

#### 🩹 Bug fixes

- add missing type anno (TS4.2) ([bc74d21](https://github.com/thi-ng/umbrella/commit/bc74d21))

### [1.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.3.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.3.0) (2020-11-24)

#### 🚀 Features

- add .dependencies(), add tests ([d15a159](https://github.com/thi-ng/umbrella/commit/d15a159))

### [1.2.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.2.25) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

### [1.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.2.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([9998000](https://github.com/thi-ng/umbrella/commit/9998000))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.2.0) (2019-11-09)

#### 🚀 Features

- allow .add() to overwrite existing impl, add logger ([e387622](https://github.com/thi-ng/umbrella/commit/e387622))
  - update .add() to log warning msg when overwriting existing impl
  - add LOGGER, setLogger()
  - update tests / readme

### [1.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.1.3) (2019-08-21)

#### ♻️ Refactoring

- split into separate files ([dae6009](https://github.com/thi-ng/umbrella/commit/dae6009))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([d51ecf9](https://github.com/thi-ng/umbrella/commit/d51ecf9))

### [1.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.0.4) (2019-03-10)

#### ♻️ Refactoring

- re-use Fn type aliases ([a9b1667](https://github.com/thi-ng/umbrella/commit/a9b1667))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- update imports, fix tests (cherry picked from [cdd8659a](https://github.com/thi-ng/umbrella/commit/cdd8659a)) ([e04eb29](https://github.com/thi-ng/umbrella/commit/e04eb29))
- update imports, fix tests ([cdd8659](https://github.com/thi-ng/umbrella/commit/cdd8659))
- remove optional excess args from type sigs ([5270143](https://github.com/thi-ng/umbrella/commit/5270143))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.7.0) (2019-01-02)

#### 🚀 Features

- add opt fallback arg for defmultiN(), update docs ([1d29153](https://github.com/thi-ng/umbrella/commit/1d29153))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.6.0) (2019-01-01)

#### 🚀 Features

- add addAll(), add/update doc strings ([488698a](https://github.com/thi-ng/umbrella/commit/488698a))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.5.0) (2018-10-24)

#### 🚀 Features

- add support for dispatch value relationships / hierarchy ([a8c3898](https://github.com/thi-ng/umbrella/commit/a8c3898))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.4.0) (2018-10-17)

#### 🚀 Features

- add varargs support ([6094738](https://github.com/thi-ng/umbrella/commit/6094738))

### [0.3.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.3.7) (2018-08-01)

#### ♻️ Refactoring

- TS3.0 PropertyKey handling ([30d65d4](https://github.com/thi-ng/umbrella/commit/30d65d4))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.3.0) (2018-05-11)

#### 🚀 Features

- add generics, update docs & readme ([eeed25e](https://github.com/thi-ng/umbrella/commit/eeed25e))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.2.0) (2018-05-10)

#### 🚀 Features

- add defmultiN(), update readme, add tests ([126ecf3](https://github.com/thi-ng/umbrella/commit/126ecf3))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/defmulti@0.1.0) (2018-05-10)

#### 🚀 Features

- add [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/main/packages/defmulti) package ([edc66bf](https://github.com/thi-ng/umbrella/commit/edc66bf))
