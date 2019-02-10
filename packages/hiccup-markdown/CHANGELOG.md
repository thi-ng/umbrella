# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.3...@thi.ng/hiccup-markdown@1.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.2...@thi.ng/hiccup-markdown@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.1...@thi.ng/hiccup-markdown@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.0...@thi.ng/hiccup-markdown@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





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
