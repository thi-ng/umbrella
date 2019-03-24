# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.7...@thi.ng/fsm@2.1.8) (2019-03-21)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.6...@thi.ng/fsm@2.1.7) (2019-03-18)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.5...@thi.ng/fsm@2.1.6) (2019-03-12)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.4...@thi.ng/fsm@2.1.5) (2019-03-10)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.3...@thi.ng/fsm@2.1.4) (2019-03-03)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.2...@thi.ng/fsm@2.1.3) (2019-03-01)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.1...@thi.ng/fsm@2.1.2) (2019-02-26)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.0...@thi.ng/fsm@2.1.1) (2019-02-21)

**Note:** Version bump only for package @thi.ng/fsm





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.0.0...@thi.ng/fsm@2.1.0) (2019-02-20)


### Features

* **fsm:** add altsLit() matcher, optimize whitespace() ([5243241](https://github.com/thi-ng/umbrella/commit/5243241))
* **fsm:** add optional failure callbacks in all matchers & fsm ([4b51c9a](https://github.com/thi-ng/umbrella/commit/4b51c9a))
* **fsm:** add optional FSM ctx update handler, add iterator support ([da9ff03](https://github.com/thi-ng/umbrella/commit/da9ff03))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@1.0.4...@thi.ng/fsm@2.0.0) (2019-02-15)


### Features

* **fsm:** update / split until() ([aeb05f8](https://github.com/thi-ng/umbrella/commit/aeb05f8))


### BREAKING CHANGES

* **fsm:** make until() array based, add untilStr()

- rename existing `until()` => `untilStr()`





## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@1.0.3...@thi.ng/fsm@1.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/fsm





## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@1.0.2...@thi.ng/fsm@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/fsm





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@1.0.1...@thi.ng/fsm@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/fsm





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@1.0.0...@thi.ng/fsm@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/fsm





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@0.1.0...@thi.ng/fsm@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.





# 0.1.0 (2019-01-04)


### Features

* **fsm:** add always(), lit(), not(), cleanup imports ([992f31a](https://github.com/thi-ng/umbrella/commit/992f31a))
* **fsm:** add never(), optimize alts(), add docs for all matchers ([81e3fc7](https://github.com/thi-ng/umbrella/commit/81e3fc7))
* **fsm:** add repeat(), success(), refactor all matchers ([55671fc](https://github.com/thi-ng/umbrella/commit/55671fc))
* **fsm:** add support for lookahead-1, add docs ([4a9bb3d](https://github.com/thi-ng/umbrella/commit/4a9bb3d))
* **fsm:** import fsm package ([e03390b](https://github.com/thi-ng/umbrella/commit/e03390b))
* **fsm:** update not() ([a933607](https://github.com/thi-ng/umbrella/commit/a933607))
