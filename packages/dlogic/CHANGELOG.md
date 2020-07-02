# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.25...@thi.ng/dlogic@1.0.26) (2020-07-02)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.24...@thi.ng/dlogic@1.0.25) (2020-06-20)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.23...@thi.ng/dlogic@1.0.24) (2020-06-14)

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
