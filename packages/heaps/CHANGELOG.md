# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.3.0...@thi.ng/heaps@0.3.1) (2018-12-15)

**Note:** Version bump only for package @thi.ng/heaps





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.20...@thi.ng/heaps@0.3.0) (2018-10-21)


### Features

* **heaps:** add pushPopAll() ([1063fea](https://github.com/thi-ng/umbrella/commit/1063fea))





## [0.2.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.19...@thi.ng/heaps@0.2.20) (2018-10-17)

**Note:** Version bump only for package @thi.ng/heaps





<a name="0.2.19"></a>
## [0.2.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.18...@thi.ng/heaps@0.2.19) (2018-09-24)

**Note:** Version bump only for package @thi.ng/heaps





<a name="0.2.18"></a>
## [0.2.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.17...@thi.ng/heaps@0.2.18) (2018-09-22)

**Note:** Version bump only for package @thi.ng/heaps





<a name="0.2.17"></a>
## [0.2.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.16...@thi.ng/heaps@0.2.17) (2018-09-10)

**Note:** Version bump only for package @thi.ng/heaps





<a name="0.2.16"></a>
## [0.2.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.15...@thi.ng/heaps@0.2.16) (2018-08-24)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.15"></a>
## [0.2.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.14...@thi.ng/heaps@0.2.15) (2018-08-01)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.14"></a>
## [0.2.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.13...@thi.ng/heaps@0.2.14) (2018-07-20)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.13"></a>
## [0.2.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.12...@thi.ng/heaps@0.2.13) (2018-06-21)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.12"></a>
## [0.2.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.11...@thi.ng/heaps@0.2.12) (2018-05-14)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.11"></a>
## [0.2.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.10...@thi.ng/heaps@0.2.11) (2018-05-14)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.10"></a>
## [0.2.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.9...@thi.ng/heaps@0.2.10) (2018-05-13)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.9"></a>
## [0.2.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.8...@thi.ng/heaps@0.2.9) (2018-05-12)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.8"></a>
## [0.2.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.7...@thi.ng/heaps@0.2.8) (2018-05-10)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.7"></a>
## [0.2.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.6...@thi.ng/heaps@0.2.7) (2018-05-10)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.6"></a>
## [0.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.5...@thi.ng/heaps@0.2.6) (2018-05-09)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.5"></a>
## [0.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.4...@thi.ng/heaps@0.2.5) (2018-04-29)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.4"></a>
## [0.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.3...@thi.ng/heaps@0.2.4) (2018-04-26)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.3"></a>
## [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.2...@thi.ng/heaps@0.2.3) (2018-04-26)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.2"></a>
## [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.1...@thi.ng/heaps@0.2.2) (2018-04-24)




**Note:** Version bump only for package @thi.ng/heaps

<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.0...@thi.ng/heaps@0.2.1) (2018-04-22)




**Note:** Version bump only for package @thi.ng/heaps

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
