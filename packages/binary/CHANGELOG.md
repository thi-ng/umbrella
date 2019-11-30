# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.1.1...@thi.ng/binary@1.2.0) (2019-11-30)


### Features

* **binary:** add bitSize() ([f085bfb](https://github.com/thi-ng/umbrella/commit/f085bfbaf1e6cb77c9a8eec8d488d716165b93dc))





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.1.0...@thi.ng/binary@1.1.1) (2019-11-09)

**Note:** Version bump only for package @thi.ng/binary





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.8...@thi.ng/binary@1.1.0) (2019-07-31)


### Features

* **binary:** add setLane8/4/2 fns ([7e24f5e](https://github.com/thi-ng/umbrella/commit/7e24f5e))





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.7...@thi.ng/binary@1.0.8) (2019-07-12)

**Note:** Version bump only for package @thi.ng/binary





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.6...@thi.ng/binary@1.0.7) (2019-07-07)

**Note:** Version bump only for package @thi.ng/binary





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.5...@thi.ng/binary@1.0.6) (2019-04-24)

**Note:** Version bump only for package @thi.ng/binary





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.4...@thi.ng/binary@1.0.5) (2019-04-02)

**Note:** Version bump only for package @thi.ng/binary





## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.3...@thi.ng/binary@1.0.4) (2019-03-28)

**Note:** Version bump only for package @thi.ng/binary







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@0.1.2...@thi.ng/binary@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# 0.1.0 (2018-10-17)


### Features

* **binary:** add [@thi](https://github.com/thi).ng/binary package ([458d4a0](https://github.com/thi-ng/umbrella/commit/458d4a0))
