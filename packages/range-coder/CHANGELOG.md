# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.88](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.87...@thi.ng/range-coder@1.0.88) (2021-08-08)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.87](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.86...@thi.ng/range-coder@1.0.87) (2021-08-04)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.86](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.85...@thi.ng/range-coder@1.0.86) (2021-08-04)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.85](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.84...@thi.ng/range-coder@1.0.85) (2021-07-27)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.84](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.83...@thi.ng/range-coder@1.0.84) (2021-07-01)

**Note:** Version bump only for package @thi.ng/range-coder





## [1.0.83](https://github.com/thi-ng/umbrella/compare/@thi.ng/range-coder@1.0.82...@thi.ng/range-coder@1.0.83) (2021-06-08)

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
