# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@3.0.6...@thi.ng/interceptors@3.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/interceptors





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@2.2.53...@thi.ng/interceptors@3.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@2.1.3...@thi.ng/interceptors@2.2.0) (2019-08-21)

###  Features

- **interceptors:** add module logger, setLogger() ([17f050d](https://github.com/thi-ng/umbrella/commit/17f050d))

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@2.0.12...@thi.ng/interceptors@2.1.0) (2019-07-07)

###  Bug Fixes

- **interceptors:** update EventBus ctor args ([557a78f](https://github.com/thi-ng/umbrella/commit/557a78f))

###  Features

- **interceptors:** enable TS strict compiler flags (refactor) ([13bea8f](https://github.com/thi-ng/umbrella/commit/13bea8f))

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.9.2...@thi.ng/interceptors@2.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

#  [1.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.8.17...@thi.ng/interceptors@1.9.0) (2018-11-13)

###  Features

- **interceptors:** update forwardSideFx(), refactor iceps as arrow fns ([9334f83](https://github.com/thi-ng/umbrella/commit/9334f83))

##  [1.8.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.8.6...@thi.ng/interceptors@1.8.7) (2018-07-11)

###  Performance Improvements

- **interceptors:** update valueSetter()/valueUpdater() ([73c7b8a](https://github.com/thi-ng/umbrella/commit/73c7b8a))

#  [1.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.7.4...@thi.ng/interceptors@1.8.0) (2018-05-14)

###  Features

- **interceptors:** update dispatch() / dispatchNow() ([5e72970](https://github.com/thi-ng/umbrella/commit/5e72970))

#  [1.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.6.2...@thi.ng/interceptors@1.7.0) (2018-05-09)

###  Features

- **interceptors:** add dispatch/dispatchNow() helper interceptors ([6748515](https://github.com/thi-ng/umbrella/commit/6748515))

##  [1.6.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.6.0...@thi.ng/interceptors@1.6.1) (2018-04-28)

###  Bug Fixes

- **interceptors:** multiple sidefx value assignment ([c4d8851](https://github.com/thi-ng/umbrella/commit/c4d8851))

#  [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.5.3...@thi.ng/interceptors@1.6.0) (2018-04-27)

###  Features

- **interceptors:** add dispatchLater() ([f4a095a](https://github.com/thi-ng/umbrella/commit/f4a095a))

#  [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.4.1...@thi.ng/interceptors@1.5.0) (2018-04-19)

###  Features

- **interceptors:** add EV_TOGGLE_VALUE handler, update EV_UNDO/REDO ([87e3b48](https://github.com/thi-ng/umbrella/commit/87e3b48))

# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.3.3...@thi.ng/interceptors@1.4.0) (2018-04-17)

### Features

- **interceptors:** add event handler instrumentation ([1a6ac54](https://github.com/thi-ng/umbrella/commit/1a6ac54))

## [1.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.3.2...@thi.ng/interceptors@1.3.3) (2018-04-17)

### Bug Fixes

- **interceptors:** filter out undefined sidefx vals ([d7ff997](https://github.com/thi-ng/umbrella/commit/d7ff997))

## [1.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.3.0...@thi.ng/interceptors@1.3.1) (2018-04-16)

### Bug Fixes

- **interceptors:** update undo handling to support history cursors ([9a83d4e](https://github.com/thi-ng/umbrella/commit/9a83d4e))

# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.2.0...@thi.ng/interceptors@1.3.0) (2018-04-15)

### Features

- **interceptors:** add default FX_UNDO/REDO side fx ([a102eb7](https://github.com/thi-ng/umbrella/commit/a102eb7))
- **interceptors:** add undo/redo handlers/fx & snapshot() interceptor ([3c92f7e](https://github.com/thi-ng/umbrella/commit/3c92f7e))
- **interceptors:** update processQueue(), expose full ctx to handlers ([183af61](https://github.com/thi-ng/umbrella/commit/183af61))

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.1.5...@thi.ng/interceptors@1.2.0) (2018-04-13)

###  Features

- **interceptors:** add ensureStateRange() & ensureParamRange() iceps ([86883e3](https://github.com/thi-ng/umbrella/commit/86883e3))

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.0.5...@thi.ng/interceptors@1.1.0) (2018-03-21)

###  Features

- **interceptors:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([501d56f](https://github.com/thi-ng/umbrella/commit/501d56f))

##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/interceptors@1.0.4...@thi.ng/interceptors@1.0.5) (2018-03-19)

###  Bug Fixes

- **interceptors:** InterceptorPredicate args ([76c5e0a](https://github.com/thi-ng/umbrella/commit/76c5e0a))

#  1.0.0 (2018-03-17)

###  Documentation

- **interceptors:** add/extract @thi.ng/interceptors package from @th.ng/atom ([195a6ff](https://github.com/thi-ng/umbrella/commit/195a6ff))
