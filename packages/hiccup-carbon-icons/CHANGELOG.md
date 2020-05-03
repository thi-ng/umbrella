# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.36](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.35...@thi.ng/hiccup-carbon-icons@1.0.36) (2020-05-03)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.34...@thi.ng/hiccup-carbon-icons@1.0.35) (2020-04-28)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.34](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.33...@thi.ng/hiccup-carbon-icons@1.0.34) (2020-04-27)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.32...@thi.ng/hiccup-carbon-icons@1.0.33) (2020-04-11)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.31...@thi.ng/hiccup-carbon-icons@1.0.32) (2020-04-06)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.30...@thi.ng/hiccup-carbon-icons@1.0.31) (2020-04-05)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.29...@thi.ng/hiccup-carbon-icons@1.0.30) (2020-04-01)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.28...@thi.ng/hiccup-carbon-icons@1.0.29) (2020-03-28)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@0.1.2...@thi.ng/hiccup-carbon-icons@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# 0.1.0 (2018-12-14)

### Features

* **hiccup-carbon-icons:** add new package ([6b04e16](https://github.com/thi-ng/umbrella/commit/6b04e16))
