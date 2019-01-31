# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
