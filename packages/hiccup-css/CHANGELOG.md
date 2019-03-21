# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.11...@thi.ng/hiccup-css@1.0.12) (2019-03-21)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.10...@thi.ng/hiccup-css@1.0.11) (2019-03-18)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.9...@thi.ng/hiccup-css@1.0.10) (2019-03-12)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.8...@thi.ng/hiccup-css@1.0.9) (2019-03-10)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.7...@thi.ng/hiccup-css@1.0.8) (2019-03-03)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.6...@thi.ng/hiccup-css@1.0.7) (2019-03-01)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.5...@thi.ng/hiccup-css@1.0.6) (2019-02-26)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.4...@thi.ng/hiccup-css@1.0.5) (2019-02-15)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.3...@thi.ng/hiccup-css@1.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.2...@thi.ng/hiccup-css@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.1...@thi.ng/hiccup-css@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/hiccup-css





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-css@1.0.0...@thi.ng/hiccup-css@1.0.1) (2019-01-21)

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
