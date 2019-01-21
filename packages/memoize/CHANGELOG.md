# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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





## [0.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.5...@thi.ng/memoize@0.2.6) (2018-12-15)

**Note:** Version bump only for package @thi.ng/memoize





## [0.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.4...@thi.ng/memoize@0.2.5) (2018-10-21)

**Note:** Version bump only for package @thi.ng/memoize





## [0.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.3...@thi.ng/memoize@0.2.4) (2018-10-17)

**Note:** Version bump only for package @thi.ng/memoize





<a name="0.2.3"></a>
## [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.2...@thi.ng/memoize@0.2.3) (2018-09-24)

**Note:** Version bump only for package @thi.ng/memoize





<a name="0.2.2"></a>
## [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.1...@thi.ng/memoize@0.2.2) (2018-09-22)

**Note:** Version bump only for package @thi.ng/memoize





<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.0...@thi.ng/memoize@0.2.1) (2018-09-10)

**Note:** Version bump only for package @thi.ng/memoize





<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.1.2...@thi.ng/memoize@0.2.0) (2018-09-06)


### Features

* **memoize:** add defonce() ([61bed88](https://github.com/thi-ng/umbrella/commit/61bed88))




<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.1.1...@thi.ng/memoize@0.1.2) (2018-09-01)




**Note:** Version bump only for package @thi.ng/memoize

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.1.0...@thi.ng/memoize@0.1.1) (2018-08-24)




**Note:** Version bump only for package @thi.ng/memoize

<a name="0.1.0"></a>
# 0.1.0 (2018-08-08)


### Features

* **memoize:** add [@thi](https://github.com/thi).ng/memoize package ([adc4928](https://github.com/thi-ng/umbrella/commit/adc4928))
* **memoize:** add optional cache arg for memoizeJ() ([2bc092d](https://github.com/thi-ng/umbrella/commit/2bc092d))
