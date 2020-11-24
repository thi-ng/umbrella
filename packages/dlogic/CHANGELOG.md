# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.32...@thi.ng/dlogic@1.0.33) (2020-11-24)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.31...@thi.ng/dlogic@1.0.32) (2020-09-22)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.30...@thi.ng/dlogic@1.0.31) (2020-09-13)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.29...@thi.ng/dlogic@1.0.30) (2020-08-28)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.28...@thi.ng/dlogic@1.0.29) (2020-08-17)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.27...@thi.ng/dlogic@1.0.28) (2020-08-16)

**Note:** Version bump only for package @thi.ng/dlogic





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@0.1.2...@thi.ng/dlogic@1.0.0) (2019-01-21)

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

* **dlogic:** add [@thi](https://github.com/thi).ng/dlogic package ([405cf51](https://github.com/thi-ng/umbrella/commit/405cf51))
