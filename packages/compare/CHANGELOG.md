# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.12...@thi.ng/compare@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.





## [0.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.11...@thi.ng/compare@0.1.12) (2018-12-15)

**Note:** Version bump only for package @thi.ng/compare





## [0.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.10...@thi.ng/compare@0.1.11) (2018-10-21)

**Note:** Version bump only for package @thi.ng/compare





## [0.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.9...@thi.ng/compare@0.1.10) (2018-10-17)

**Note:** Version bump only for package @thi.ng/compare





<a name="0.1.9"></a>
## [0.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.8...@thi.ng/compare@0.1.9) (2018-09-24)

**Note:** Version bump only for package @thi.ng/compare





<a name="0.1.8"></a>
## [0.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.7...@thi.ng/compare@0.1.8) (2018-09-22)

**Note:** Version bump only for package @thi.ng/compare





<a name="0.1.7"></a>
## [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.6...@thi.ng/compare@0.1.7) (2018-09-10)

**Note:** Version bump only for package @thi.ng/compare





<a name="0.1.6"></a>
## [0.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.5...@thi.ng/compare@0.1.6) (2018-08-01)




**Note:** Version bump only for package @thi.ng/compare

<a name="0.1.5"></a>
## [0.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.4...@thi.ng/compare@0.1.5) (2018-07-20)




**Note:** Version bump only for package @thi.ng/compare

<a name="0.1.4"></a>
## [0.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.3...@thi.ng/compare@0.1.4) (2018-06-21)




**Note:** Version bump only for package @thi.ng/compare

<a name="0.1.3"></a>
## [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.2...@thi.ng/compare@0.1.3) (2018-05-14)




**Note:** Version bump only for package @thi.ng/compare

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.1...@thi.ng/compare@0.1.2) (2018-05-14)




**Note:** Version bump only for package @thi.ng/compare

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.0...@thi.ng/compare@0.1.1) (2018-05-13)




**Note:** Version bump only for package @thi.ng/compare

<a name="0.1.0"></a>
# 0.1.0 (2018-05-10)


### Features

* **compare:** add new package [@thi](https://github.com/thi).ng/compare ([e4a87c4](https://github.com/thi-ng/umbrella/commit/e4a87c4))
