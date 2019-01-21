# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.16...@thi.ng/transducers-hdom@2.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))


### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols
* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.





## [1.2.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.15...@thi.ng/transducers-hdom@1.2.16) (2019-01-02)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.14...@thi.ng/transducers-hdom@1.2.15) (2018-12-29)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.13...@thi.ng/transducers-hdom@1.2.14) (2018-12-28)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.12...@thi.ng/transducers-hdom@1.2.13) (2018-12-27)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.11...@thi.ng/transducers-hdom@1.2.12) (2018-12-21)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.10...@thi.ng/transducers-hdom@1.2.11) (2018-12-21)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.9...@thi.ng/transducers-hdom@1.2.10) (2018-12-20)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.8...@thi.ng/transducers-hdom@1.2.9) (2018-12-17)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.7...@thi.ng/transducers-hdom@1.2.8) (2018-12-16)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.6...@thi.ng/transducers-hdom@1.2.7) (2018-12-15)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.5...@thi.ng/transducers-hdom@1.2.6) (2018-12-13)


### Bug Fixes

* **transducers-hdom:** integrate recent hdom updates ([6db3170](https://github.com/thi-ng/umbrella/commit/6db3170))





## [1.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.4...@thi.ng/transducers-hdom@1.2.5) (2018-12-09)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.3...@thi.ng/transducers-hdom@1.2.4) (2018-12-08)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.2...@thi.ng/transducers-hdom@1.2.3) (2018-12-01)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.1...@thi.ng/transducers-hdom@1.2.2) (2018-11-08)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.0...@thi.ng/transducers-hdom@1.2.1) (2018-11-07)

**Note:** Version bump only for package @thi.ng/transducers-hdom





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.9...@thi.ng/transducers-hdom@1.2.0) (2018-11-06)


### Features

* **transducers-hdom:** add support for dynamic user context vals ([e91dbbc](https://github.com/thi-ng/umbrella/commit/e91dbbc))





## [1.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.8...@thi.ng/transducers-hdom@1.1.9) (2018-10-21)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [1.1.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.7...@thi.ng/transducers-hdom@1.1.8) (2018-10-17)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.7"></a>
## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.6...@thi.ng/transducers-hdom@1.1.7) (2018-09-28)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.6"></a>
## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.5...@thi.ng/transducers-hdom@1.1.6) (2018-09-26)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.5"></a>
## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.4...@thi.ng/transducers-hdom@1.1.5) (2018-09-25)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.4"></a>
## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.3...@thi.ng/transducers-hdom@1.1.4) (2018-09-24)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.3"></a>
## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.2...@thi.ng/transducers-hdom@1.1.3) (2018-09-24)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.2"></a>
## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.1...@thi.ng/transducers-hdom@1.1.2) (2018-09-24)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.1"></a>
## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0...@thi.ng/transducers-hdom@1.1.1) (2018-09-23)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0-alpha.2...@thi.ng/transducers-hdom@1.1.0) (2018-09-22)


### Bug Fixes

* **transducers-hdom:** add missing type annotation ([78b1f4a](https://github.com/thi-ng/umbrella/commit/78b1f4a))





<a name="1.1.0-alpha.2"></a>
# [1.1.0-alpha.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0-alpha.1...@thi.ng/transducers-hdom@1.1.0-alpha.2) (2018-09-17)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.0-alpha.1"></a>
# [1.1.0-alpha.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0-alpha.0...@thi.ng/transducers-hdom@1.1.0-alpha.1) (2018-09-17)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.1.0-alpha.0"></a>
# [1.1.0-alpha.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0-alpha...@thi.ng/transducers-hdom@1.1.0-alpha.0) (2018-09-17)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.0.7"></a>
## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.6...@thi.ng/transducers-hdom@1.0.7) (2018-09-10)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.0.6"></a>
## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.5...@thi.ng/transducers-hdom@1.0.6) (2018-09-08)

**Note:** Version bump only for package @thi.ng/transducers-hdom





<a name="1.0.5"></a>
## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.4...@thi.ng/transducers-hdom@1.0.5) (2018-09-06)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="1.0.4"></a>
## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.3...@thi.ng/transducers-hdom@1.0.4) (2018-09-03)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="1.0.3"></a>
## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.2...@thi.ng/transducers-hdom@1.0.3) (2018-09-01)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="1.0.2"></a>
## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.1...@thi.ng/transducers-hdom@1.0.2) (2018-09-01)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="1.0.1"></a>
## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.0.0...@thi.ng/transducers-hdom@1.0.1) (2018-09-01)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.5...@thi.ng/transducers-hdom@1.0.0) (2018-08-31)


### Features

* **transducers-hdom:** add DOM hydration support, rename ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([0f39694](https://github.com/thi-ng/umbrella/commit/0f39694))


### BREAKING CHANGES

* **transducers-hdom:** rename transducer: `updateUI` => `updateDOM`, new API




<a name="0.1.5"></a>
## [0.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.4...@thi.ng/transducers-hdom@0.1.5) (2018-08-27)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="0.1.4"></a>
## [0.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.3...@thi.ng/transducers-hdom@0.1.4) (2018-08-24)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="0.1.3"></a>
## [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.2...@thi.ng/transducers-hdom@0.1.3) (2018-08-24)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.1...@thi.ng/transducers-hdom@0.1.2) (2018-08-08)




**Note:** Version bump only for package @thi.ng/transducers-hdom

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.0...@thi.ng/transducers-hdom@0.1.1) (2018-08-02)


### Bug Fixes

* **transducers-hdom:** support hdom user context ([949a5d4](https://github.com/thi-ng/umbrella/commit/949a5d4))




<a name="0.1.0"></a>
# 0.1.0 (2018-08-02)


### Features

* **transducers-hdom:** add new package [@thi](https://github.com/thi).ng/transducers-hdom ([7efce7a](https://github.com/thi-ng/umbrella/commit/7efce7a))
