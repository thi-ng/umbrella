# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.18...@thi.ng/hiccup-markdown@1.0.19) (2019-04-15)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.17...@thi.ng/hiccup-markdown@1.0.18) (2019-04-03)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.16...@thi.ng/hiccup-markdown@1.0.17) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hiccup-markdown





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-markdown@1.0.15...@thi.ng/hiccup-markdown@1.0.16) (2019-03-28)

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
