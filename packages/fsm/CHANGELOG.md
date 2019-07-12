# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.2.0...@thi.ng/fsm@2.2.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/fsm





# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.15...@thi.ng/fsm@2.2.0) (2019-07-07)


### Bug Fixes

* **fsm:** callback return types ([09b047b](https://github.com/thi-ng/umbrella/commit/09b047b))


### Features

* **color:** TS strictNullChecks, update color conversion fns ([04dc356](https://github.com/thi-ng/umbrella/commit/04dc356))
* **fsm:** enable TS strict compiler flags (refactor) ([135b838](https://github.com/thi-ng/umbrella/commit/135b838))





## [2.1.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.14...@thi.ng/fsm@2.1.15) (2019-05-22)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.13...@thi.ng/fsm@2.1.14) (2019-04-26)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.12...@thi.ng/fsm@2.1.13) (2019-04-24)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.11...@thi.ng/fsm@2.1.12) (2019-04-15)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.10...@thi.ng/fsm@2.1.11) (2019-04-03)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.9...@thi.ng/fsm@2.1.10) (2019-04-02)

**Note:** Version bump only for package @thi.ng/fsm





## [2.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/fsm@2.1.8...@thi.ng/fsm@2.1.9) (2019-03-28)

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
