# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.34...@thi.ng/router@2.0.35) (2020-11-26)

**Note:** Version bump only for package @thi.ng/router





## [2.0.34](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.33...@thi.ng/router@2.0.34) (2020-11-24)

**Note:** Version bump only for package @thi.ng/router





## [2.0.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.32...@thi.ng/router@2.0.33) (2020-09-22)

**Note:** Version bump only for package @thi.ng/router





## [2.0.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.31...@thi.ng/router@2.0.32) (2020-09-22)

**Note:** Version bump only for package @thi.ng/router





## [2.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.30...@thi.ng/router@2.0.31) (2020-09-13)

**Note:** Version bump only for package @thi.ng/router





## [2.0.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.29...@thi.ng/router@2.0.30) (2020-08-28)

**Note:** Version bump only for package @thi.ng/router





## [2.0.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.28...@thi.ng/router@2.0.29) (2020-08-17)

**Note:** Version bump only for package @thi.ng/router





## [2.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.27...@thi.ng/router@2.0.28) (2020-08-16)

**Note:** Version bump only for package @thi.ng/router





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.12...@thi.ng/router@2.0.0) (2019-07-07)

### Code Refactoring

* **router:** address TS strictNullChecks, update types, add checks ([c7ff9a4](https://github.com/thi-ng/umbrella/commit/c7ff9a4))

### Features

* **router:** enable TS strict compiler flags (refactor) ([d3ecae3](https://github.com/thi-ng/umbrella/commit/d3ecae3))

### BREAKING CHANGES

* **router:** Route & RouteMatch IDs MUST be strings now

- update config fields from PropertyKey => string
- add initial & default route checks in ctor

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@0.1.30...@thi.ng/router@1.0.0) (2019-01-21)

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
# 0.1.0 (2018-03-11)

### Features

* **router:** re-import router package (MBP2010), minor refactor & fixes ([07b4e06](https://github.com/thi-ng/umbrella/commit/07b4e06))
