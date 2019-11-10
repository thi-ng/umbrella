# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.12...@thi.ng/random@1.1.13) (2019-11-09)

**Note:** Version bump only for package @thi.ng/random





## [1.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.11...@thi.ng/random@1.1.12) (2019-09-21)

**Note:** Version bump only for package @thi.ng/random





## [1.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.10...@thi.ng/random@1.1.11) (2019-08-21)

**Note:** Version bump only for package @thi.ng/random





## [1.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.9...@thi.ng/random@1.1.10) (2019-07-31)

**Note:** Version bump only for package @thi.ng/random





## [1.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.8...@thi.ng/random@1.1.9) (2019-07-12)

**Note:** Version bump only for package @thi.ng/random





## [1.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.7...@thi.ng/random@1.1.8) (2019-07-07)

**Note:** Version bump only for package @thi.ng/random





## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.6...@thi.ng/random@1.1.7) (2019-05-22)

**Note:** Version bump only for package @thi.ng/random





## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.5...@thi.ng/random@1.1.6) (2019-04-26)

**Note:** Version bump only for package @thi.ng/random





## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.4...@thi.ng/random@1.1.5) (2019-04-24)

**Note:** Version bump only for package @thi.ng/random





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.3...@thi.ng/random@1.1.4) (2019-04-02)

**Note:** Version bump only for package @thi.ng/random





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.2...@thi.ng/random@1.1.3) (2019-03-28)

**Note:** Version bump only for package @thi.ng/random







# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.0.2...@thi.ng/random@1.1.0) (2019-02-15)


### Bug Fixes

* **random:** add opt scale arg to IRandom.float() ([5a7e448](https://github.com/thi-ng/umbrella/commit/5a7e448))


### Features

* **random:** add randomID() & weightedRandom() ([f719724](https://github.com/thi-ng/umbrella/commit/f719724))



# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@0.1.1...@thi.ng/random@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# 0.1.0 (2018-11-24)


### Features

* **random:** re-import, extend & refactor random package (MBP2010) ([4aea85d](https://github.com/thi-ng/umbrella/commit/4aea85d))
