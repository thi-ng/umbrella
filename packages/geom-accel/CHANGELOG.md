# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.11...@thi.ng/geom-accel@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.





## [0.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.10...@thi.ng/geom-accel@0.1.11) (2019-01-02)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.9...@thi.ng/geom-accel@0.1.10) (2018-12-29)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.8...@thi.ng/geom-accel@0.1.9) (2018-12-28)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.7...@thi.ng/geom-accel@0.1.8) (2018-12-27)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.6...@thi.ng/geom-accel@0.1.7) (2018-12-17)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.5...@thi.ng/geom-accel@0.1.6) (2018-12-15)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.4...@thi.ng/geom-accel@0.1.5) (2018-12-13)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.3...@thi.ng/geom-accel@0.1.4) (2018-12-08)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.2...@thi.ng/geom-accel@0.1.3) (2018-12-01)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.1...@thi.ng/geom-accel@0.1.2) (2018-11-20)

**Note:** Version bump only for package @thi.ng/geom-accel





## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.0...@thi.ng/geom-accel@0.1.1) (2018-11-08)

**Note:** Version bump only for package @thi.ng/geom-accel





# 0.1.0 (2018-10-21)


### Features

* **geom-accel:** add KV support, update select/selectKeys() ([b47e641](https://github.com/thi-ng/umbrella/commit/b47e641))
* **geom-accel:** re-import geom-accel skeleton (MBP2010) ([e14ac8b](https://github.com/thi-ng/umbrella/commit/e14ac8b))
