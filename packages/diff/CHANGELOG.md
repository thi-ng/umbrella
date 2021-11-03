# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@4.0.13...@thi.ng/diff@5.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.2.35...@thi.ng/diff@4.0.0) (2020-12-22)

###  Code Refactoring

- **diff:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace DiffMode enum ([cc77c71](https://github.com/thi-ng/umbrella/commit/cc77c711746eabebb4af58421282c50830613915))

###  BREAKING CHANGES

- **diff:** replace DiffMode enum w/ type alias
    - rename DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES => "minimal"
    - update diffObject() mode arg to only allow: "full" or "only-distance"

##  [3.2.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.2.19...@thi.ng/diff@3.2.20) (2020-05-05)

###  Performance Improvements

- **diff:** diffArray() main loop, add clearCache() ([fa2f692](https://github.com/thi-ng/umbrella/commit/fa2f692ad1c469aa3e5f62857db746341b5fdac7))

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.1.3...@thi.ng/diff@3.2.0) (2019-07-07)

###  Features

- **diff:** enable TS strict compiler flags (refactor) ([5a7d90b](https://github.com/thi-ng/umbrella/commit/5a7d90b))

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.0.6...@thi.ng/diff@3.1.0) (2019-04-11)

###  Features

- **diff:** add DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES, add tests ([9a2087d](https://github.com/thi-ng/umbrella/commit/9a2087d))

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@2.0.2...@thi.ng/diff@3.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

##  [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@2.0.0...@thi.ng/diff@2.0.1) (2018-12-09)

###  Performance Improvements

- **diff:** further array caching/reuse ([19b0a55](https://github.com/thi-ng/umbrella/commit/19b0a55))

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@1.1.4...@thi.ng/diff@2.0.0) (2018-12-08)

###  Code Refactoring

- **diff:** flatten linear edit logs, update readme & arg order ([64feacf](https://github.com/thi-ng/umbrella/commit/64feacf))

###  Features

- **diff:** add fast paths for simple cases, add tests, refactor as arrow fns ([6c6da82](https://github.com/thi-ng/umbrella/commit/6c6da82))

###  Performance Improvements

- **diff:** flatten linear edit logs, rewrite diffObject(), add DiffMode ([e8356cd](https://github.com/thi-ng/umbrella/commit/e8356cd))
- **diff:** reduce amount of temp/internal array allocs (diffArray) ([d1ee6d9](https://github.com/thi-ng/umbrella/commit/d1ee6d9))

###  BREAKING CHANGES

- **diff:** `ArrayDiff.linear` & `ObjectDiff.edits` now flat arrays
    - see commit e8356cd296c12462ad9b126f966b55545b6ef70d
    - this change drastically reduces the number of array allocations
    - each ArrayDiff.linear entry consists of 3 successive items
    - each ObjectDiff.edits entry constist of 2 successive items
    - add `DiffMode` enum to control level of detail & internal fast paths
    - update `ArrayDiff` & `ObjectDiff` types
    - remove obsolete `DiffLogEntry`
    - replace `diffObject` with 2.5x faster version

##  [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@1.0.9...@thi.ng/diff@1.0.10) (2018-04-30)

###  Performance Improvements

- **diff:** add option to only build linear edit log ([431527a](https://github.com/thi-ng/umbrella/commit/431527a))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@0.1.3...@thi.ng/diff@1.0.0) (2018-02-27)

###  Features

- **diff:** update diffArray, generic types ([6e0dfa1](https://github.com/thi-ng/umbrella/commit/6e0dfa1))

###  BREAKING CHANGES

- **diff:** update DiffLogEntry structure

##  [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@0.1.0...@thi.ng/diff@0.1.1) (2018-02-02)

###  Performance Improvements

- **diff:** add fail fasts ([448e839](https://github.com/thi-ng/umbrella/commit/448e839))

#  0.1.0 (2018-02-01)

###  Features

- **diff:** re-import diff package (MBP2010) ([4d0d437](https://github.com/thi-ng/umbrella/commit/4d0d437))
