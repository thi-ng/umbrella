# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.1.2...@thi.ng/bench@2.1.3) (2021-08-04)

**Note:** Version bump only for package @thi.ng/bench





## [2.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.1.1...@thi.ng/bench@2.1.2) (2021-07-01)

**Note:** Version bump only for package @thi.ng/bench





## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.1.0...@thi.ng/bench@2.1.1) (2021-06-08)

**Note:** Version bump only for package @thi.ng/bench





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.0.31...@thi.ng/bench@2.1.0) (2021-03-12)


### Features

* **bench:** add suite & formatters, update benchmark() ([5ea02bd](https://github.com/thi-ng/umbrella/commit/5ea02bd0cfe71ff388d24906b7ce2a7ce4e72ce8))





## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@2.0.5...@thi.ng/bench@2.0.6) (2020-04-03)


### Bug Fixes

* **bench:** fallback handlingin now() ([6494851](https://github.com/thi-ng/umbrella/commit/64948518a6412cabf53664ac9f89bac2b7ef6892))
* **bench:** update timedResult() to always downscale to ms ([fb2c632](https://github.com/thi-ng/umbrella/commit/fb2c6327358ccaf93314d2cdbfd3f8ff04becbd1))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@1.0.11...@thi.ng/bench@2.0.0) (2020-01-24)

### Bug Fixes

* **bench:** update now() to only OPTIONALLY use bigint timestamps ([7ac391b](https://github.com/thi-ng/umbrella/commit/7ac391b58b7e8b3b6fdc458d1edda6ca441d379b))

### Features

* **bench:** add types, benchmark(), bigint timestamps, restructure ([e0af94c](https://github.com/thi-ng/umbrella/commit/e0af94cfbedea46a4131ec8243f2553e49a5e644))

### BREAKING CHANGES

* **bench:** Though no public API change, this library internally
uses ES BigInt timestamps now (in Node via `process.hrtime.bigint()`).

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.3.1...@thi.ng/bench@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.2.4...@thi.ng/bench@0.3.0) (2018-10-21)

### Features

* **bench:** add timedResult() / benchResult() ([0cf708f](https://github.com/thi-ng/umbrella/commit/0cf708f))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.1.5...@thi.ng/bench@0.2.0) (2018-08-28)

### Features

* **bench:** add opt prefix arg, update docs ([4a37367](https://github.com/thi-ng/umbrella/commit/4a37367))

<a name="0.1.0"></a>
# 0.1.0 (2018-05-10)

### Features

* **bench:** add new package [@thi](https://github.com/thi).ng/bench ([9466d4b](https://github.com/thi-ng/umbrella/commit/9466d4b))
