# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.10...@thi.ng/heaps@1.1.0) (2019-07-07)


### Features

* **heaps:** enable TS strict compiler flags (refactor) ([86b9c9e](https://github.com/thi-ng/umbrella/commit/86b9c9e))





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.9...@thi.ng/heaps@1.0.10) (2019-05-22)

**Note:** Version bump only for package @thi.ng/heaps





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.8...@thi.ng/heaps@1.0.9) (2019-04-26)

**Note:** Version bump only for package @thi.ng/heaps





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.7...@thi.ng/heaps@1.0.8) (2019-04-24)

**Note:** Version bump only for package @thi.ng/heaps





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.6...@thi.ng/heaps@1.0.7) (2019-04-02)

**Note:** Version bump only for package @thi.ng/heaps





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.5...@thi.ng/heaps@1.0.6) (2019-03-28)

**Note:** Version bump only for package @thi.ng/heaps







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.3.1...@thi.ng/heaps@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.20...@thi.ng/heaps@0.3.0) (2018-10-21)


### Features

* **heaps:** add pushPopAll() ([1063fea](https://github.com/thi-ng/umbrella/commit/1063fea))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.1.0...@thi.ng/heaps@0.2.0) (2018-04-22)


### Bug Fixes

* **heaps:** add DHeap ICopy/IEmpty impls, fix return types ([5894572](https://github.com/thi-ng/umbrella/commit/5894572))


### Features

* **heaps:** add min/max(), update heapify() and percolate methods ([c4bbee0](https://github.com/thi-ng/umbrella/commit/c4bbee0))
* **heaps:** iterator now returns min() seq ([fccb3af](https://github.com/thi-ng/umbrella/commit/fccb3af))




<a name="0.1.0"></a>
# 0.1.0 (2018-04-22)


### Features

* **heaps:** import [@thi](https://github.com/thi).ng/heaps package ([0ea0847](https://github.com/thi-ng/umbrella/commit/0ea0847))
