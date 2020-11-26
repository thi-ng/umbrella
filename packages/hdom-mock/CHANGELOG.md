# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.44](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.43...@thi.ng/hdom-mock@1.1.44) (2020-11-26)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.43](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.42...@thi.ng/hdom-mock@1.1.43) (2020-11-24)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.42](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.41...@thi.ng/hdom-mock@1.1.42) (2020-09-22)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.41](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.40...@thi.ng/hdom-mock@1.1.41) (2020-09-13)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.40](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.39...@thi.ng/hdom-mock@1.1.40) (2020-08-28)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.39](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.38...@thi.ng/hdom-mock@1.1.39) (2020-08-17)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.38](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.37...@thi.ng/hdom-mock@1.1.38) (2020-08-16)

**Note:** Version bump only for package @thi.ng/hdom-mock





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.16...@thi.ng/hdom-mock@1.1.0) (2019-07-07)

### Features

* **hdom-mock:** enable TS strict compiler flags (refactor) ([787e2d4](https://github.com/thi-ng/umbrella/commit/787e2d4))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@0.1.5...@thi.ng/hdom-mock@1.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

# 0.1.0 (2018-12-13)

### Features

* **hdom-mock:** add hdom-mock package and implementation, add initial tests ([5609d24](https://github.com/thi-ng/umbrella/commit/5609d24))
