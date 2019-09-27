# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.1.4...@thi.ng/hiccup-css@1.1.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.1.3...@thi.ng/hiccup-css@1.1.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.1.2...@thi.ng/hiccup-css@1.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.1.1...@thi.ng/hiccup-css@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.1.0...@thi.ng/hiccup-css@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/hiccup-css





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.19...@thi.ng/hiccup-css@1.1.0) (2019-07-07)


### Features

* **hiccup-css:** enable TS strict compiler flags (refactor) ([1e81385](https://github.com/thi-ng/umbrella/commit/1e81385))





## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.18...@thi.ng/hiccup-css@1.0.19) (2019-05-22)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.17...@thi.ng/hiccup-css@1.0.18) (2019-04-26)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.16...@thi.ng/hiccup-css@1.0.17) (2019-04-24)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.15...@thi.ng/hiccup-css@1.0.16) (2019-04-15)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.14...@thi.ng/hiccup-css@1.0.15) (2019-04-03)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.13...@thi.ng/hiccup-css@1.0.14) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.12...@thi.ng/hiccup-css@1.0.13) (2019-03-28)

**Note:** Version bump only for package @thi.ng/hiccup-css







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@0.3.5...@thi.ng/hiccup-css@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@0.2.32...@thi.ng/hiccup-css@0.3.0) (2018-12-15)


### Features

* **hiccup-css:** add animation(), add test & update readme ([aac8b6f](https://github.com/thi-ng/umbrella/commit/aac8b6f))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@0.1.24...@thi.ng/hiccup-css@0.2.0) (2018-06-08)


### Features

* **hiccup-css:** add class scoping support ([244bf21](https://github.com/thi-ng/umbrella/commit/244bf21))
* **hiccup-css:** add injectStyleSheet() ([8d6e6c8](https://github.com/thi-ng/umbrella/commit/8d6e6c8))


<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@0.1.0...@thi.ng/hiccup-css@0.1.1) (2018-03-05)


### Performance Improvements

* **hiccup-css:** no empty Set() creation, change type check order in css() ([105bbf4](https://github.com/thi-ng/umbrella/commit/105bbf4))
