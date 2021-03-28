# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.13...@thi.ng/hiccup-markdown@1.3.14) (2021-03-28)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.12...@thi.ng/hiccup-markdown@1.3.13) (2021-03-27)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.11...@thi.ng/hiccup-markdown@1.3.12) (2021-03-26)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.10...@thi.ng/hiccup-markdown@1.3.11) (2021-03-24)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.9...@thi.ng/hiccup-markdown@1.3.10) (2021-03-24)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.8...@thi.ng/hiccup-markdown@1.3.9) (2021-03-24)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.7...@thi.ng/hiccup-markdown@1.3.8) (2021-03-17)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.3.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.3.6...@thi.ng/hiccup-markdown@1.3.7) (2021-03-12)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.2.44...@thi.ng/hiccup-markdown@1.3.0) (2021-01-22)


### Features

* **hiccup-markdown:** update DEFAULT_TAGS ([8f7f9d4](https://github.com/thi-ng/umbrella/commit/8f7f9d4b9b040799a5a981bfe00b82f233ce87bb))





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.1.14...@thi.ng/hiccup-markdown@1.2.0) (2020-03-28)


### Features

* **hiccup-markdown:** add table caption support ([4b72b92](https://github.com/thi-ng/umbrella/commit/4b72b92da8c832e2593a56554243e477c6bb0741))
* **hiccup-markdown:** add table serializer & test, update deps ([7cecf24](https://github.com/thi-ng/umbrella/commit/7cecf2440754a25b0b1a4ca967f49171fe83fed7))





## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.1.5...@thi.ng/hiccup-markdown@1.1.6) (2019-11-09)

### Bug Fixes

* **hiccup-markdown:** [#156](https://github.com/thi-ng/umbrella/issues/156) fix blockquote default tag factory args, add test ([12e445a](https://github.com/thi-ng/umbrella/commit/12e445ac27960d3498d8b57ed6daa1520a60158e))
* **hiccup-markdown:** [#156](https://github.com/thi-ng/umbrella/issues/156) undo trimming of element children ([ccc9d40](https://github.com/thi-ng/umbrella/commit/ccc9d40723df1f898fba70be2e15352b8dfcb909))
* **hiccup-markdown:** [#156](https://github.com/thi-ng/umbrella/issues/156) update parse(), remove CR chars, add initial test ([602510c](https://github.com/thi-ng/umbrella/commit/602510c5150dbf26d43a1c9e7ca8afd7c5230f28))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.22...@thi.ng/hiccup-markdown@1.1.0) (2019-07-07)

### Features

* **hiccup-markdown:** enable TS strict compiler flags (refactor) ([36c8109](https://github.com/thi-ng/umbrella/commit/36c8109))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@0.2.0...@thi.ng/hiccup-markdown@1.0.0) (2019-01-21)

### Bug Fixes

* **hiccup-markdown:** re-export TagFactories interface ([b198c19](https://github.com/thi-ng/umbrella/commit/b198c19))

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@0.1.2...@thi.ng/hiccup-markdown@0.2.0) (2019-01-04)

### Features

* **hiccup-markdown:** add & refactor markdown parser (from example), update docs ([35db07f](https://github.com/thi-ng/umbrella/commit/35db07f))

# 0.1.0 (2018-12-20)

### Features

* **hiccup-markdown:** add new package ([58f591e](https://github.com/thi-ng/umbrella/commit/58f591e))
