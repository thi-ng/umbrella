# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.6...@thi.ng/rstream-csp@2.0.7) (2020-03-06)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.5...@thi.ng/rstream-csp@2.0.6) (2020-03-01)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.4...@thi.ng/rstream-csp@2.0.5) (2020-02-26)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.3...@thi.ng/rstream-csp@2.0.4) (2020-02-26)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.2...@thi.ng/rstream-csp@2.0.3) (2020-02-25)

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
