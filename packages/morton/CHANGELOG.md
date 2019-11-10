# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.1.3...@thi.ng/morton@1.1.4) (2019-11-09)

**Note:** Version bump only for package @thi.ng/morton





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.1.2...@thi.ng/morton@1.1.3) (2019-08-21)

**Note:** Version bump only for package @thi.ng/morton





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.1.1...@thi.ng/morton@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/morton





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.1.0...@thi.ng/morton@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/morton





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.0.9...@thi.ng/morton@1.1.0) (2019-07-07)


### Features

* **morton:** enable TS strict compiler flags (refactor) ([1fc2e9a](https://github.com/thi-ng/umbrella/commit/1fc2e9a))





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.0.8...@thi.ng/morton@1.0.9) (2019-05-22)

**Note:** Version bump only for package @thi.ng/morton





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.0.7...@thi.ng/morton@1.0.8) (2019-04-24)

**Note:** Version bump only for package @thi.ng/morton





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.0.6...@thi.ng/morton@1.0.7) (2019-04-02)

**Note:** Version bump only for package @thi.ng/morton





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/morton@1.0.5...@thi.ng/morton@1.0.6) (2019-03-28)

**Note:** Version bump only for package @thi.ng/morton







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
