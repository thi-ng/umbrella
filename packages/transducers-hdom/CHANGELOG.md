# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.89](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@2.0.88...@thi.ng/transducers-hdom@2.0.89) (2021-03-27)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [2.0.88](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@2.0.87...@thi.ng/transducers-hdom@2.0.88) (2021-03-17)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [2.0.87](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@2.0.86...@thi.ng/transducers-hdom@2.0.87) (2021-03-12)

**Note:** Version bump only for package @thi.ng/transducers-hdom





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

## [1.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.5...@thi.ng/transducers-hdom@1.2.6) (2018-12-13)

### Bug Fixes

* **transducers-hdom:** integrate recent hdom updates ([6db3170](https://github.com/thi-ng/umbrella/commit/6db3170))

# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.9...@thi.ng/transducers-hdom@1.2.0) (2018-11-06)

### Features

* **transducers-hdom:** add support for dynamic user context vals ([e91dbbc](https://github.com/thi-ng/umbrella/commit/e91dbbc))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0-alpha.2...@thi.ng/transducers-hdom@1.1.0) (2018-09-22)

### Bug Fixes

* **transducers-hdom:** add missing type annotation ([78b1f4a](https://github.com/thi-ng/umbrella/commit/78b1f4a))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.5...@thi.ng/transducers-hdom@1.0.0) (2018-08-31)

### Features

* **transducers-hdom:** add DOM hydration support, rename ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([0f39694](https://github.com/thi-ng/umbrella/commit/0f39694))

### BREAKING CHANGES

* **transducers-hdom:** rename transducer: `updateUI` => `updateDOM`, new API

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.0...@thi.ng/transducers-hdom@0.1.1) (2018-08-02)

### Bug Fixes

* **transducers-hdom:** support hdom user context ([949a5d4](https://github.com/thi-ng/umbrella/commit/949a5d4))

<a name="0.1.0"></a>
# 0.1.0 (2018-08-02)

### Features

* **transducers-hdom:** add new package [@thi](https://github.com/thi).ng/transducers-hdom ([7efce7a](https://github.com/thi-ng/umbrella/commit/7efce7a))
