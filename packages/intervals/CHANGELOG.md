# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@2.0.25...@thi.ng/intervals@2.1.0) (2020-11-24)


### Features

* **intervals:** add min/max/clamp() impls ([2747f9c](https://github.com/thi-ng/umbrella/commit/2747f9c5282c29fa39ac9d8aac1aaefbd683eb44))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/intervals@1.0.15...@thi.ng/intervals@2.0.0) (2019-11-30)

### Bug Fixes

* **intervals:** add union/intersection tests ([d301628](https://github.com/thi-ng/umbrella/commit/d301628bf0f9c3c7c09ebe2eb8e98a98b899d5c4))
* **intervals:** update compare() to consider openness, add tests ([995b32a](https://github.com/thi-ng/umbrella/commit/995b32ac5fb4c4ecfa978555dc99d7c6e1264b0f))

### Features

* **intervals:** fix [#171](https://github.com/thi-ng/umbrella/issues/171), various fixes, additions, add tests ([2d13c71](https://github.com/thi-ng/umbrella/commit/2d13c7169f978918af444d89fcd50420761a6401))

### BREAKING CHANGES

* **intervals:** inverted meaning of isBefore/isAfter() to be
more understandable

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
