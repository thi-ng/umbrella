# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.11...@thi.ng/geom-accel@1.1.12) (2019-04-02)

**Note:** Version bump only for package @thi.ng/geom-accel





## [1.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.10...@thi.ng/geom-accel@1.1.11) (2019-03-28)

**Note:** Version bump only for package @thi.ng/geom-accel







## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.6...@thi.ng/geom-accel@1.1.7) (2019-03-10)


### Bug Fixes

* **geom-accel:** fix/update existing point search in add()/select*() ([8186f12](https://github.com/thi-ng/umbrella/commit/8186f12))



## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.1...@thi.ng/geom-accel@1.1.2) (2019-02-15)


### Bug Fixes

* **geom-accel:** fix addAll(), addKeys() ([51959b7](https://github.com/thi-ng/umbrella/commit/51959b7))



# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.0.2...@thi.ng/geom-accel@1.1.0) (2019-02-05)


### Features

* **geom-accel:** add selectVals() impl ([bd1754d](https://github.com/thi-ng/umbrella/commit/bd1754d))


### Performance Improvements

* **geom-accel:** optimize single nearest point search, fix select() ([9022d5b](https://github.com/thi-ng/umbrella/commit/9022d5b))



## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.0.0...@thi.ng/geom-accel@1.0.1) (2019-01-21)


### Bug Fixes

* **geom-accel:** add root null check for select/selectKeys() ([8fd5728](https://github.com/thi-ng/umbrella/commit/8fd5728))



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


# 0.1.0 (2018-10-21)


### Features

* **geom-accel:** add KV support, update select/selectKeys() ([b47e641](https://github.com/thi-ng/umbrella/commit/b47e641))
* **geom-accel:** re-import geom-accel skeleton (MBP2010) ([e14ac8b](https://github.com/thi-ng/umbrella/commit/e14ac8b))
