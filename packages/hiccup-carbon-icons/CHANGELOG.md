# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.19...@thi.ng/hiccup-carbon-icons@1.0.20) (2019-09-21)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.18...@thi.ng/hiccup-carbon-icons@1.0.19) (2019-08-21)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.17...@thi.ng/hiccup-carbon-icons@1.0.18) (2019-08-16)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.16...@thi.ng/hiccup-carbon-icons@1.0.17) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.15...@thi.ng/hiccup-carbon-icons@1.0.16) (2019-07-12)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.14...@thi.ng/hiccup-carbon-icons@1.0.15) (2019-07-07)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.13...@thi.ng/hiccup-carbon-icons@1.0.14) (2019-05-22)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.12...@thi.ng/hiccup-carbon-icons@1.0.13) (2019-04-26)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.11...@thi.ng/hiccup-carbon-icons@1.0.12) (2019-04-24)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.10...@thi.ng/hiccup-carbon-icons@1.0.11) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.9...@thi.ng/hiccup-carbon-icons@1.0.10) (2019-03-28)

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
