# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.29...@thi.ng/dgraph@1.3.30) (2021-08-08)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.3.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.28...@thi.ng/dgraph@1.3.29) (2021-08-08)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.3.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.27...@thi.ng/dgraph@1.3.28) (2021-08-04)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.3.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.26...@thi.ng/dgraph@1.3.27) (2021-08-04)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.3.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.25...@thi.ng/dgraph@1.3.26) (2021-07-27)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.3.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.24...@thi.ng/dgraph@1.3.25) (2021-07-01)

**Note:** Version bump only for package @thi.ng/dgraph





## [1.3.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.23...@thi.ng/dgraph@1.3.24) (2021-06-08)

**Note:** Version bump only for package @thi.ng/dgraph





# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.2.28...@thi.ng/dgraph@1.3.0) (2020-11-24)


### Features

* **dgraph:** update defDGraph, DGraph ctor ([8aee78a](https://github.com/thi-ng/umbrella/commit/8aee78ab370cc21b250ec1db07153a1ed7305b59))





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.25...@thi.ng/dgraph@1.2.0) (2020-04-03)


### Features

* **dgraph:** add defDGraph(), update ctor to accept edge pairs ([b45a6da](https://github.com/thi-ng/umbrella/commit/b45a6da939348bd49134d499259889332d0e950f))





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.0.13...@thi.ng/dgraph@1.1.0) (2019-04-02)

### Features

* **dgraph:** add addNode(), refactor to use ArraySet, add tests ([ab7650f](https://github.com/thi-ng/umbrella/commit/ab7650f))

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
