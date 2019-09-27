# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.2.3...@thi.ng/diff@3.2.4) (2019-09-21)

**Note:** Version bump only for package @thi.ng/diff





## [3.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.2.2...@thi.ng/diff@3.2.3) (2019-08-21)

**Note:** Version bump only for package @thi.ng/diff





## [3.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.2.1...@thi.ng/diff@3.2.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/diff





## [3.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.2.0...@thi.ng/diff@3.2.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/diff





# [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.1.3...@thi.ng/diff@3.2.0) (2019-07-07)


### Features

* **diff:** enable TS strict compiler flags (refactor) ([5a7d90b](https://github.com/thi-ng/umbrella/commit/5a7d90b))





## [3.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.1.2...@thi.ng/diff@3.1.3) (2019-05-22)

**Note:** Version bump only for package @thi.ng/diff





## [3.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.1.1...@thi.ng/diff@3.1.2) (2019-04-26)

**Note:** Version bump only for package @thi.ng/diff





## [3.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.1.0...@thi.ng/diff@3.1.1) (2019-04-24)

**Note:** Version bump only for package @thi.ng/diff





# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.0.6...@thi.ng/diff@3.1.0) (2019-04-11)


### Features

* **diff:** add DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES, add tests ([9a2087d](https://github.com/thi-ng/umbrella/commit/9a2087d))





## [3.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.0.5...@thi.ng/diff@3.0.6) (2019-04-02)

**Note:** Version bump only for package @thi.ng/diff





## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@3.0.4...@thi.ng/diff@3.0.5) (2019-03-28)

**Note:** Version bump only for package @thi.ng/diff







# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@2.0.2...@thi.ng/diff@3.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@2.0.0...@thi.ng/diff@2.0.1) (2018-12-09)


### Performance Improvements

* **diff:** further array caching/reuse ([19b0a55](https://github.com/thi-ng/umbrella/commit/19b0a55))


# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@1.1.4...@thi.ng/diff@2.0.0) (2018-12-08)


### Code Refactoring

* **diff:** flatten linear edit logs, update readme & arg order ([64feacf](https://github.com/thi-ng/umbrella/commit/64feacf))


### Features

* **diff:** add fast paths for simple cases, add tests, refactor as arrow fns ([6c6da82](https://github.com/thi-ng/umbrella/commit/6c6da82))


### Performance Improvements

* **diff:** flatten linear edit logs, rewrite diffObject(), add DiffMode ([e8356cd](https://github.com/thi-ng/umbrella/commit/e8356cd))
* **diff:** reduce amount of temp/internal array allocs (diffArray) ([d1ee6d9](https://github.com/thi-ng/umbrella/commit/d1ee6d9))


### BREAKING CHANGES

* **diff:** `ArrayDiff.linear` & `ObjectDiff.edits` now flat arrays

- see commit e8356cd296c12462ad9b126f966b55545b6ef70d
- this change drastically reduces the number of array allocations
- each ArrayDiff.linear entry consists of 3 successive items
- each ObjectDiff.edits entry constist of 2 successive items
- add `DiffMode` enum to control level of detail & internal fast paths
- update `ArrayDiff` & `ObjectDiff` types
- remove obsolete `DiffLogEntry`
- replace `diffObject` with 2.5x faster version

<a name="1.0.10"></a>
## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@1.0.9...@thi.ng/diff@1.0.10) (2018-04-30)


### Performance Improvements

* **diff:** add option to only build linear edit log ([431527a](https://github.com/thi-ng/umbrella/commit/431527a))


<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@0.1.3...@thi.ng/diff@1.0.0) (2018-02-27)


### Features

* **diff:** update diffArray, generic types ([6e0dfa1](https://github.com/thi-ng/umbrella/commit/6e0dfa1))


### BREAKING CHANGES

* **diff:** update DiffLogEntry structure


<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/diff@0.1.0...@thi.ng/diff@0.1.1) (2018-02-02)


### Performance Improvements

* **diff:** add fail fasts ([448e839](https://github.com/thi-ng/umbrella/commit/448e839))


<a name="0.1.0"></a>
# 0.1.0 (2018-02-01)


### Features

* **diff:** re-import diff package (MBP2010) ([4d0d437](https://github.com/thi-ng/umbrella/commit/4d0d437))
