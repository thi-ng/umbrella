# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.13...@thi.ng/intervals@1.0.14) (2019-09-21)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.12...@thi.ng/intervals@1.0.13) (2019-08-21)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.11...@thi.ng/intervals@1.0.12) (2019-07-31)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.10...@thi.ng/intervals@1.0.11) (2019-07-12)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.9...@thi.ng/intervals@1.0.10) (2019-07-07)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.8...@thi.ng/intervals@1.0.9) (2019-05-22)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.7...@thi.ng/intervals@1.0.8) (2019-04-26)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.6...@thi.ng/intervals@1.0.7) (2019-04-24)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.5...@thi.ng/intervals@1.0.6) (2019-04-02)

**Note:** Version bump only for package @thi.ng/intervals





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.4...@thi.ng/intervals@1.0.5) (2019-03-28)

**Note:** Version bump only for package @thi.ng/intervals







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@0.2.0...@thi.ng/intervals@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@0.1.0...@thi.ng/intervals@0.2.0) (2018-12-19)


### Features

* **intervals:** add Interval.parse(), update docs, readme, deps ([a78c6a7](https://github.com/thi-ng/umbrella/commit/a78c6a7))





# 0.1.0 (2018-12-18)


### Features

* **intervals:** add new package ([b0a3142](https://github.com/thi-ng/umbrella/commit/b0a3142))
