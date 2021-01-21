# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.67](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.66...@thi.ng/range-coder@1.0.67) (2021-01-21)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.66](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.65...@thi.ng/range-coder@1.0.66) (2021-01-13)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.65](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.64...@thi.ng/range-coder@1.0.65) (2021-01-10)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.64](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.63...@thi.ng/range-coder@1.0.64) (2021-01-02)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.63](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.62...@thi.ng/range-coder@1.0.63) (2020-12-22)

**Note:** Version bump only for package @thi.ng/range-coder





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@0.1.28...@thi.ng/range-coder@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="0.1.0"></a>
# 0.1.0 (2018-07-21)

### Features

* **range-coder:** re-import [@thi](https://github.com/thi).ng/range-coder package from MB2010 ([76dc450](https://github.com/thi-ng/umbrella/commit/76dc450))
