# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.1.2...@thi.ng/memoize@1.1.3) (2019-08-21)

**Note:** Version bump only for package @thi.ng/memoize





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.1.1...@thi.ng/memoize@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/memoize





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.1.0...@thi.ng/memoize@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/memoize





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.9...@thi.ng/memoize@1.1.0) (2019-07-07)


### Bug Fixes

* **memoize:** return type memoize1() ([c0dafb9](https://github.com/thi-ng/umbrella/commit/c0dafb9))


### Features

* **memoize:** enable TS strict compiler flags (refactor) ([a08cc69](https://github.com/thi-ng/umbrella/commit/a08cc69))





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.8...@thi.ng/memoize@1.0.9) (2019-05-22)

**Note:** Version bump only for package @thi.ng/memoize





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.7...@thi.ng/memoize@1.0.8) (2019-04-26)

**Note:** Version bump only for package @thi.ng/memoize





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.6...@thi.ng/memoize@1.0.7) (2019-04-24)

**Note:** Version bump only for package @thi.ng/memoize





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.5...@thi.ng/memoize@1.0.6) (2019-04-02)

**Note:** Version bump only for package @thi.ng/memoize





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.4...@thi.ng/memoize@1.0.5) (2019-03-28)

**Note:** Version bump only for package @thi.ng/memoize







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.6...@thi.ng/memoize@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.1.2...@thi.ng/memoize@0.2.0) (2018-09-06)


### Features

* **memoize:** add defonce() ([61bed88](https://github.com/thi-ng/umbrella/commit/61bed88))


<a name="0.1.0"></a>
# 0.1.0 (2018-08-08)


### Features

* **memoize:** add [@thi](https://github.com/thi).ng/memoize package ([adc4928](https://github.com/thi-ng/umbrella/commit/adc4928))
* **memoize:** add optional cache arg for memoizeJ() ([2bc092d](https://github.com/thi-ng/umbrella/commit/2bc092d))
