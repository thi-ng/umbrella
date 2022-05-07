# Change Log

- **Last updated**: 2022-05-07T11:33:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@3.1.0) (2021-11-17)

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

### [3.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@3.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@3.0.0) (2021-10-12)

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

- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [2.2.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.2.35) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.2.31) (2020-09-13)

#### ♻️ Refactoring

- update imports ([eebc4b4](https://github.com/thi-ng/umbrella/commit/eebc4b4))

### [2.2.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.2.10) (2020-03-28)

#### ♻️ Refactoring

- update to new [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) API ([4fce623](https://github.com/thi-ng/umbrella/commit/4fce623))

### [2.2.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.2.6) (2020-02-25)

#### ♻️ Refactoring

- update imports ([04b054b](https://github.com/thi-ng/umbrella/commit/04b054b))

### [2.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.2.3) (2019-11-30)

#### ♻️ Refactoring

- re-use `Path` from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([9f66693](https://github.com/thi-ng/umbrella/commit/9f66693))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.2.0) (2019-08-21)

#### 🚀 Features

- add module logger, setLogger() ([17f050d](https://github.com/thi-ng/umbrella/commit/17f050d))

#### ♻️ Refactoring

- update ensureStateXXX() iceps (re-use) ([80ea335](https://github.com/thi-ng/umbrella/commit/80ea335))
- simplify addHandler, split processXXX, add logger ([b7455ab](https://github.com/thi-ng/umbrella/commit/b7455ab))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([13bea8f](https://github.com/thi-ng/umbrella/commit/13bea8f))

#### 🩹 Bug fixes

- update EventBus ctor args ([557a78f](https://github.com/thi-ng/umbrella/commit/557a78f))

#### ♻️ Refactoring

- address TS strictNullChecks flag, minor update types ([105b5e9](https://github.com/thi-ng/umbrella/commit/105b5e9))

### [2.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.0.5) (2019-03-10)

#### ♻️ Refactoring

- re-use Fn type aliases ([9ebe677](https://github.com/thi-ng/umbrella/commit/9ebe677))
- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [1.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.9.0) (2018-11-13)

#### 🚀 Features

- update forwardSideFx(), refactor iceps as arrow fns ([9334f83](https://github.com/thi-ng/umbrella/commit/9334f83))
  - assign `true` to target side fx if no event body

### [1.8.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.8.9) (2018-08-01)

#### ♻️ Refactoring

- TS3.0 PropertyKey handling ([38372cc](https://github.com/thi-ng/umbrella/commit/38372cc))

### [1.8.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.8.7) (2018-07-11)

#### ⏱ Performance improvements

- update valueSetter()/valueUpdater() ([73c7b8a](https://github.com/thi-ng/umbrella/commit/73c7b8a))
  - both functions now use pre-built setters/updaters

## [1.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.8.0) (2018-05-14)

#### 🚀 Features

- update dispatch() / dispatchNow() ([5e72970](https://github.com/thi-ng/umbrella/commit/5e72970))
  - add support for mutliple events to be dispatched
  - update doc strings

### [1.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.7.1) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [1.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.7.0) (2018-05-09)

#### 🚀 Features

- add dispatch/dispatchNow() helper interceptors ([6748515](https://github.com/thi-ng/umbrella/commit/6748515))

### [1.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.6.1) (2018-04-28)

#### 🩹 Bug fixes

- multiple sidefx value assignment ([c4d8851](https://github.com/thi-ng/umbrella/commit/c4d8851))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.6.0) (2018-04-27)

#### 🚀 Features

- add dispatchLater() ([f4a095a](https://github.com/thi-ng/umbrella/commit/f4a095a))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.5.0) (2018-04-19)

#### 🚀 Features

- add EV_TOGGLE_VALUE handler, update EV_UNDO/REDO ([87e3b48](https://github.com/thi-ng/umbrella/commit/87e3b48))
  - add EV_TOGGLE_VALUE handler for boolean switches
  - extend EV_UNDO/REDO to trigger success/fail events post action
  - extract undoHelper() as shared impl

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.4.0) (2018-04-17)

#### 🚀 Features

- add event handler instrumentation ([1a6ac54](https://github.com/thi-ng/umbrella/commit/1a6ac54))

### [1.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.3.3) (2018-04-17)

#### 🩹 Bug fixes

- filter out undefined sidefx vals ([d7ff997](https://github.com/thi-ng/umbrella/commit/d7ff997))
  - only when assigning array of multiple vals to a single side fx

### [1.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.3.1) (2018-04-16)

#### 🩹 Bug fixes

- update undo handling to support history cursors ([9a83d4e](https://github.com/thi-ng/umbrella/commit/9a83d4e))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.3.0) (2018-04-15)

#### 🚀 Features

- add undo/redo handlers/fx & snapshot() interceptor ([3c92f7e](https://github.com/thi-ng/umbrella/commit/3c92f7e))
- add default FX_UNDO/REDO side fx ([a102eb7](https://github.com/thi-ng/umbrella/commit/a102eb7))
- update processQueue(), expose full ctx to handlers ([183af61](https://github.com/thi-ng/umbrella/commit/183af61))
  - update InterceptorFn / InterceptorPredicate to pass ctx as opt last arg

#### ♻️ Refactoring

- refactor undo handling ([a1d9ae6](https://github.com/thi-ng/umbrella/commit/a1d9ae6))
  - update EV_UNDO/REDO handlers & docs
  - remove FX_UNDO/REDO
- also pass ctx to sidefx handlers ([ba0c876](https://github.com/thi-ng/umbrella/commit/ba0c876))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.2.0) (2018-04-13)

#### 🚀 Features

- add ensureStateRange() & ensureParamRange() iceps ([86883e3](https://github.com/thi-ng/umbrella/commit/86883e3))
  - rename existing ensureXXX() interceptors:
    - ensureLessThan => ensureStateLessThan
    - ensureGreaterThan => ensureStateGreaterThan

### [1.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.1.4) (2018-04-08)

#### ♻️ Refactoring

- update Event id type (string => PropertyKey) ([c1c81bd](https://github.com/thi-ng/umbrella/commit/c1c81bd))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.1.0) (2018-03-21)

#### 🚀 Features

- update error handling, add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep ([501d56f](https://github.com/thi-ng/umbrella/commit/501d56f))

### [1.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.0.5) (2018-03-19)

#### 🩹 Bug fixes

- InterceptorPredicate args ([76c5e0a](https://github.com/thi-ng/umbrella/commit/76c5e0a))
  - last arg is bus, same as w/ InterceptorFn

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/interceptors@1.0.1) (2018-03-17)

#### 🚀 Features

- add/extract [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/main/packages/interceptors) package from [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/main/packages/atom) ([195a6ff](https://github.com/thi-ng/umbrella/commit/195a6ff))
