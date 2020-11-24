# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.22...@thi.ng/errors@1.2.23) (2020-11-24)

**Note:** Version bump only for package @thi.ng/errors





## [1.2.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.21...@thi.ng/errors@1.2.22) (2020-09-22)

**Note:** Version bump only for package @thi.ng/errors





## [1.2.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.20...@thi.ng/errors@1.2.21) (2020-09-13)

**Note:** Version bump only for package @thi.ng/errors





## [1.2.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.19...@thi.ng/errors@1.2.20) (2020-08-28)

**Note:** Version bump only for package @thi.ng/errors





## [1.2.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.18...@thi.ng/errors@1.2.19) (2020-08-17)

**Note:** Version bump only for package @thi.ng/errors





## [1.2.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.17...@thi.ng/errors@1.2.18) (2020-08-16)

**Note:** Version bump only for package @thi.ng/errors





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.1.2...@thi.ng/errors@1.2.0) (2019-08-21)

### Features

* **errors:** add defError(), refactor all existing, update readme ([ded89c2](https://github.com/thi-ng/umbrella/commit/ded89c2))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.0.6...@thi.ng/errors@1.1.0) (2019-07-07)

### Features

* **errors:** enable TS strict compiler flags (refactor) ([8460aea](https://github.com/thi-ng/umbrella/commit/8460aea))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@0.1.12...@thi.ng/errors@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="0.1.0"></a>
# 0.1.0 (2018-05-10)

### Features

* **errors:** add new package [@thi](https://github.com/thi).ng/errors ([1e97856](https://github.com/thi-ng/umbrella/commit/1e97856))
