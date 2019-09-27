# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.4...@thi.ng/router@2.0.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/router





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.3...@thi.ng/router@2.0.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/router





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.2...@thi.ng/router@2.0.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/router





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.1...@thi.ng/router@2.0.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/router





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@2.0.0...@thi.ng/router@2.0.1) (2019-07-12)

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





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.11...@thi.ng/router@1.0.12) (2019-05-22)

**Note:** Version bump only for package @thi.ng/router





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.10...@thi.ng/router@1.0.11) (2019-04-26)

**Note:** Version bump only for package @thi.ng/router





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.9...@thi.ng/router@1.0.10) (2019-04-24)

**Note:** Version bump only for package @thi.ng/router





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.8...@thi.ng/router@1.0.9) (2019-04-02)

**Note:** Version bump only for package @thi.ng/router





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.7...@thi.ng/router@1.0.8) (2019-03-28)

**Note:** Version bump only for package @thi.ng/router







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
