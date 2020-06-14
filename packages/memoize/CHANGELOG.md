# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@2.0.12...@thi.ng/memoize@2.0.13) (2020-06-14)

**Note:** Version bump only for package @thi.ng/memoize





## [2.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@2.0.11...@thi.ng/memoize@2.0.12) (2020-06-01)

**Note:** Version bump only for package @thi.ng/memoize





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.1.8...@thi.ng/memoize@2.0.0) (2020-02-25)


### Code Refactoring

* **memoize:** update imports ([d6b5614](https://github.com/thi-ng/umbrella/commit/d6b56148ec3ab36f97bc3fce94d7c49a74e81e96))


### BREAKING CHANGES

* **memoize:** replace obsolete Fn type aliases w/ @thi.ng/api types





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.9...@thi.ng/memoize@1.1.0) (2019-07-07)

### Bug Fixes

* **memoize:** return type memoize1() ([c0dafb9](https://github.com/thi-ng/umbrella/commit/c0dafb9))

### Features

* **memoize:** enable TS strict compiler flags (refactor) ([a08cc69](https://github.com/thi-ng/umbrella/commit/a08cc69))

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
