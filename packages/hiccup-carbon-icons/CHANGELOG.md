# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.4...@thi.ng/hiccup-carbon-icons@2.0.5) (2020-11-24)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.3...@thi.ng/hiccup-carbon-icons@2.0.4) (2020-09-22)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.2...@thi.ng/hiccup-carbon-icons@2.0.3) (2020-09-13)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.1...@thi.ng/hiccup-carbon-icons@2.0.2) (2020-08-28)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.0...@thi.ng/hiccup-carbon-icons@2.0.1) (2020-08-20)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.51...@thi.ng/hiccup-carbon-icons@2.0.0) (2020-08-19)


### Features

* **hiccup-carbon-icons:** add/update all icons ([22cfefc](https://github.com/thi-ng/umbrella/commit/22cfefcccaab5448e1117cb55d448cd313c48e95))


### BREAKING CHANGES

* **hiccup-carbon-icons:** update all icons to latest carbon version

- some icons have been removed/replaced or renamed
- full set now counting ~1100 icons
- add new conversion script
- update readme





## [1.0.51](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.50...@thi.ng/hiccup-carbon-icons@1.0.51) (2020-08-17)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.50](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.49...@thi.ng/hiccup-carbon-icons@1.0.50) (2020-08-16)

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
