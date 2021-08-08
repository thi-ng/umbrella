# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.68](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.67...@thi.ng/transducers-fsm@1.1.68) (2021-08-08)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.67](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.66...@thi.ng/transducers-fsm@1.1.67) (2021-08-04)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.66](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.65...@thi.ng/transducers-fsm@1.1.66) (2021-08-04)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.65](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.64...@thi.ng/transducers-fsm@1.1.65) (2021-07-27)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.64](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.63...@thi.ng/transducers-fsm@1.1.64) (2021-07-01)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.63](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.62...@thi.ng/transducers-fsm@1.1.63) (2021-06-08)

**Note:** Version bump only for package @thi.ng/transducers-fsm





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.19...@thi.ng/transducers-fsm@1.1.0) (2019-07-07)

### Features

* **transducers-fsm:** enable TS strict compiler flags (refactor) ([734103d](https://github.com/thi-ng/umbrella/commit/734103d))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@0.2.36...@thi.ng/transducers-fsm@1.0.0) (2019-01-21)

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
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@0.1.0...@thi.ng/transducers-fsm@0.2.0) (2018-06-19)

### Features

* **transducers-fsm:** support multiple results, add tests, update readme ([a9ca135](https://github.com/thi-ng/umbrella/commit/a9ca135))

<a name="0.1.0"></a>
# 0.1.0 (2018-06-18)

### Features

* **transducers-fsm:** inital import ([7c3c290](https://github.com/thi-ng/umbrella/commit/7c3c290))
