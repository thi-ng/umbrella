# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.11...@thi.ng/dgraph@1.1.12) (2019-07-31)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.10...@thi.ng/dgraph@1.1.11) (2019-07-12)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.9...@thi.ng/dgraph@1.1.10) (2019-07-07)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.8...@thi.ng/dgraph@1.1.9) (2019-05-22)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.7...@thi.ng/dgraph@1.1.8) (2019-04-26)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.6...@thi.ng/dgraph@1.1.7) (2019-04-24)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.5...@thi.ng/dgraph@1.1.6) (2019-04-15)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.4...@thi.ng/dgraph@1.1.5) (2019-04-09)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.3...@thi.ng/dgraph@1.1.4) (2019-04-06)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.2...@thi.ng/dgraph@1.1.3) (2019-04-03)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.1...@thi.ng/dgraph@1.1.2) (2019-04-02)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.0...@thi.ng/dgraph@1.1.1) (2019-04-02)

**Note:** Version bump only for package @thi.ng/dgraph





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.0.13...@thi.ng/dgraph@1.1.0) (2019-04-02)


### Features

* **dgraph:** add addNode(), refactor to use ArraySet, add tests ([ab7650f](https://github.com/thi-ng/umbrella/commit/ab7650f))





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.0.12...@thi.ng/dgraph@1.0.13) (2019-03-28)

**Note:** Version bump only for package @thi.ng/dgraph







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.2.35...@thi.ng/dgraph@1.0.0) (2019-01-21)


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
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.1.10...@thi.ng/dgraph@0.2.0) (2018-05-09)


### Features

* **dgraph:** add leaves() & roots() iterators, update sort() ([68ca46d](https://github.com/thi-ng/umbrella/commit/68ca46d))


<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.1.0...@thi.ng/dgraph@0.1.1) (2018-04-10)


### Bug Fixes

* **dgraph:** update corrupted deps ([675847b](https://github.com/thi-ng/umbrella/commit/675847b))


<a name="0.1.0"></a>
# [0.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.0.3...@thi.ng/dgraph@0.1.0) (2018-04-10)


### Features

* **dgraph:** re-import DGraph impl & tests, update readme ([e086be6](https://github.com/thi-ng/umbrella/commit/e086be6))
