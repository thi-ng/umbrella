# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.7...@thi.ng/transducers-fsm@1.1.8) (2020-01-24)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.6...@thi.ng/transducers-fsm@1.1.7) (2019-11-30)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.5...@thi.ng/transducers-fsm@1.1.6) (2019-11-09)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.4...@thi.ng/transducers-fsm@1.1.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.3...@thi.ng/transducers-fsm@1.1.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.2...@thi.ng/transducers-fsm@1.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.1...@thi.ng/transducers-fsm@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.1.0...@thi.ng/transducers-fsm@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/transducers-fsm





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.19...@thi.ng/transducers-fsm@1.1.0) (2019-07-07)


### Features

* **transducers-fsm:** enable TS strict compiler flags (refactor) ([734103d](https://github.com/thi-ng/umbrella/commit/734103d))





## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.18...@thi.ng/transducers-fsm@1.0.19) (2019-05-22)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.17...@thi.ng/transducers-fsm@1.0.18) (2019-04-26)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.16...@thi.ng/transducers-fsm@1.0.17) (2019-04-24)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.15...@thi.ng/transducers-fsm@1.0.16) (2019-04-15)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.14...@thi.ng/transducers-fsm@1.0.15) (2019-04-03)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.13...@thi.ng/transducers-fsm@1.0.14) (2019-04-02)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.12...@thi.ng/transducers-fsm@1.0.13) (2019-03-28)

**Note:** Version bump only for package @thi.ng/transducers-fsm







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
