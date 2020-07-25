# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.32...@thi.ng/rstream-csp@2.0.33) (2020-07-25)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.31...@thi.ng/rstream-csp@2.0.32) (2020-07-17)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.30...@thi.ng/rstream-csp@2.0.31) (2020-07-17)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.29...@thi.ng/rstream-csp@2.0.30) (2020-07-08)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.28...@thi.ng/rstream-csp@2.0.29) (2020-07-08)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.27...@thi.ng/rstream-csp@2.0.28) (2020-07-04)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.26...@thi.ng/rstream-csp@2.0.27) (2020-07-02)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.25...@thi.ng/rstream-csp@2.0.26) (2020-06-20)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.24...@thi.ng/rstream-csp@2.0.25) (2020-06-14)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.23...@thi.ng/rstream-csp@2.0.24) (2020-06-01)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.22...@thi.ng/rstream-csp@2.0.23) (2020-06-01)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.21...@thi.ng/rstream-csp@2.0.22) (2020-05-29)

**Note:** Version bump only for package @thi.ng/rstream-csp





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.33...@thi.ng/rstream-csp@2.0.0) (2019-11-30)

### Code Refactoring

* **rstream-csp:** use options object arg ([b39f4d0](https://github.com/thi-ng/umbrella/commit/b39f4d023fdb90d5ad095b2e50d76e69c2b50843))

### BREAKING CHANGES

* **rstream-csp:** use options object arg for fromChannel()

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@0.1.125...@thi.ng/rstream-csp@1.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

<a name="0.1.0"></a>
# 0.1.0 (2018-01-28)

### Features

* **rstream-csp:** add new package, remove CSP dep from rstream ([e37f6a1](https://github.com/thi-ng/umbrella/commit/e37f6a1))
