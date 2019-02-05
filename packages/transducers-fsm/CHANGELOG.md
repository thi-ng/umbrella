# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.2...@thi.ng/transducers-fsm@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.1...@thi.ng/transducers-fsm@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/transducers-fsm





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-fsm@1.0.0...@thi.ng/transducers-fsm@1.0.1) (2019-01-21)

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
