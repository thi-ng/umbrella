# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.47](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@2.0.46...@thi.ng/morton@2.0.47) (2021-09-03)

**Note:** Version bump only for package @thi.ng/morton





## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@2.0.8...@thi.ng/morton@2.0.9) (2020-04-11)


### Bug Fixes

* **morton:** fix tree coord conversion fns, add tests ([9a23fa2](https://github.com/thi-ng/umbrella/commit/9a23fa2a56e22c52c24bc214e251291928e3da25))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.1.5...@thi.ng/morton@2.0.0) (2020-01-24)

### Features

* **morton:** add ZCurve class, restructure package, update build target ([2ee4b68](https://github.com/thi-ng/umbrella/commit/2ee4b683783f7041fbaf965416698566ee63ff3f))
* **morton:** add ZCurve range iterator and bigMin() impl ([a78d07a](https://github.com/thi-ng/umbrella/commit/a78d07a3bc4f185e2ba8757d409368b217c59e49))

### Performance Improvements

* **morton:** add optimized ZCurve2/3 class impls ([d61c717](https://github.com/thi-ng/umbrella/commit/d61c717918b0d154b64613e8527e4bf3afb42615))
* **morton:** precompute wipe masks, minor other refactoring ([4b79950](https://github.com/thi-ng/umbrella/commit/4b799505928ed00f685bc8f692c34bfc147073ce))

### BREAKING CHANGES

* **morton:** module uses bigint and now uses ESNext build target

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.0.9...@thi.ng/morton@1.1.0) (2019-07-07)

### Features

* **morton:** enable TS strict compiler flags (refactor) ([1fc2e9a](https://github.com/thi-ng/umbrella/commit/1fc2e9a))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@0.2.2...@thi.ng/morton@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@0.1.0...@thi.ng/morton@0.2.0) (2018-10-21)

### Features

* **morton:** update/add muxScaled2/3 versions, add error handling ([ac2f3e8](https://github.com/thi-ng/umbrella/commit/ac2f3e8))

# 0.1.0 (2018-10-17)

### Features

* **morton:** import & update [@thi](https://github.com/thi).ng/morton package (MBP2010) ([501536b](https://github.com/thi-ng/umbrella/commit/501536b))
