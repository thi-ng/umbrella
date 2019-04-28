# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.17...@thi.ng/transducers-stats@1.0.18) (2019-04-26)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.16...@thi.ng/transducers-stats@1.0.17) (2019-04-24)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.15...@thi.ng/transducers-stats@1.0.16) (2019-04-15)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.14...@thi.ng/transducers-stats@1.0.15) (2019-04-03)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.13...@thi.ng/transducers-stats@1.0.14) (2019-04-02)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.12...@thi.ng/transducers-stats@1.0.13) (2019-03-28)

**Note:** Version bump only for package @thi.ng/transducers-stats







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.4.23...@thi.ng/transducers-stats@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.3.4...@thi.ng/transducers-stats@0.4.0) (2018-08-24)


### Features

* **transducers-stats:** make xforms iterable if input given ([c9ac981](https://github.com/thi-ng/umbrella/commit/c9ac981))




<a name="0.3.4"></a>
## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.3.3...@thi.ng/transducers-stats@0.3.4) (2018-08-08)


<a name="0.3.1"></a>
## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.3.0...@thi.ng/transducers-stats@0.3.1) (2018-07-25)


### Bug Fixes

* **transducers-stats:** fix naming of MACD results ([#31](https://github.com/thi-ng/umbrella/issues/31)) ([a322e00](https://github.com/thi-ng/umbrella/commit/a322e00))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.2.0...@thi.ng/transducers-stats@0.3.0) (2018-07-25)


### Features

* **transducers-stats:** add BollingerBand value interface ([c97cb75](https://github.com/thi-ng/umbrella/commit/c97cb75))
* **transducers-stats:** add MACD (fixes [#31](https://github.com/thi-ng/umbrella/issues/31)) ([b92aaa5](https://github.com/thi-ng/umbrella/commit/b92aaa5))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.1.0...@thi.ng/transducers-stats@0.2.0) (2018-07-21)


### Features

* **transducers-stats:** add stochastic oscillator, refactor ([0b0a7ca](https://github.com/thi-ng/umbrella/commit/0b0a7ca))




<a name="0.1.0"></a>
# 0.1.0 (2018-07-20)


### Features

* **transducers-stats:** add [@thi](https://github.com/thi).ng/transducers-stats package ([7a5812f](https://github.com/thi-ng/umbrella/commit/7a5812f))
* **transducers-stats:** add other xforms ([7df3ce0](https://github.com/thi-ng/umbrella/commit/7df3ce0))
