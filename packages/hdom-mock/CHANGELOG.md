# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.1...@thi.ng/hdom-mock@1.0.2) (2019-02-05)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.0...@thi.ng/hdom-mock@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/hdom-mock





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
