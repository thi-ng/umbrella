# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.48](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.47...@thi.ng/transducers-fsm@1.1.48) (2021-01-22)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.47](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.46...@thi.ng/transducers-fsm@1.1.47) (2021-01-21)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.46](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.45...@thi.ng/transducers-fsm@1.1.46) (2021-01-13)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.45](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.44...@thi.ng/transducers-fsm@1.1.45) (2021-01-10)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.44](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.43...@thi.ng/transducers-fsm@1.1.44) (2021-01-02)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.43](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.42...@thi.ng/transducers-fsm@1.1.43) (2020-12-22)

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
