# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@3.0.1...@thi.ng/bench@3.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/bench





## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@3.0.0...@thi.ng/bench@3.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/bench





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.1.6...@thi.ng/bench@3.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **bench:** add timeDiff, Timestamp type ([c612de0](https://github.com/thi-ng/umbrella/commit/c612de0574d59d9e0951443ae98b8bd14c3a0a09))


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






#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.0.31...@thi.ng/bench@2.1.0) (2021-03-12) 

###  Features 

- **bench:** add suite & formatters, update benchmark() ([5ea02bd](https://github.com/thi-ng/umbrella/commit/5ea02bd0cfe71ff388d24906b7ce2a7ce4e72ce8)) 

##  [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.0.5...@thi.ng/bench@2.0.6) (2020-04-03) 

###  Bug Fixes 

- **bench:** fallback handlingin now() ([6494851](https://github.com/thi-ng/umbrella/commit/64948518a6412cabf53664ac9f89bac2b7ef6892)) 
- **bench:** update timedResult() to always downscale to ms ([fb2c632](https://github.com/thi-ng/umbrella/commit/fb2c6327358ccaf93314d2cdbfd3f8ff04becbd1)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@1.0.11...@thi.ng/bench@2.0.0) (2020-01-24) 

###  Bug Fixes 

- **bench:** update now() to only OPTIONALLY use bigint timestamps ([7ac391b](https://github.com/thi-ng/umbrella/commit/7ac391b58b7e8b3b6fdc458d1edda6ca441d379b)) 

###  Features 

- **bench:** add types, benchmark(), bigint timestamps, restructure ([e0af94c](https://github.com/thi-ng/umbrella/commit/e0af94cfbedea46a4131ec8243f2553e49a5e644)) 

###  BREAKING CHANGES 

- **bench:** Though no public API change, this library internally uses ES BigInt timestamps now (in Node via `process.hrtime.bigint()`). 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.3.1...@thi.ng/bench@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.2.4...@thi.ng/bench@0.3.0) (2018-10-21) 

###  Features 

- **bench:** add timedResult() / benchResult() ([0cf708f](https://github.com/thi-ng/umbrella/commit/0cf708f)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.1.5...@thi.ng/bench@0.2.0) (2018-08-28) 

###  Features 

- **bench:** add opt prefix arg, update docs ([4a37367](https://github.com/thi-ng/umbrella/commit/4a37367)) 

#  0.1.0 (2018-05-10) 

###  Features 

- **bench:** add new package [@thi](https://github.com/thi).ng/bench ([9466d4b](https://github.com/thi-ng/umbrella/commit/9466d4b))
