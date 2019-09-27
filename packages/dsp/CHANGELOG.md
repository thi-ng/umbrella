# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.15...@thi.ng/dsp@1.0.16) (2019-09-21)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.14...@thi.ng/dsp@1.0.15) (2019-08-21)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.13...@thi.ng/dsp@1.0.14) (2019-07-31)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.12...@thi.ng/dsp@1.0.13) (2019-07-12)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.11...@thi.ng/dsp@1.0.12) (2019-07-07)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.10...@thi.ng/dsp@1.0.11) (2019-05-22)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.9...@thi.ng/dsp@1.0.10) (2019-04-26)


### Bug Fixes

* **dsp:** fix tri() oscillator for negative phases ([c67c733](https://github.com/thi-ng/umbrella/commit/c67c733))





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.8...@thi.ng/dsp@1.0.9) (2019-04-26)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.7...@thi.ng/dsp@1.0.8) (2019-04-24)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.6...@thi.ng/dsp@1.0.7) (2019-04-02)

**Note:** Version bump only for package @thi.ng/dsp





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.5...@thi.ng/dsp@1.0.6) (2019-03-28)

**Note:** Version bump only for package @thi.ng/dsp







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@0.1.3...@thi.ng/dsp@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# 0.1.0 (2018-10-17)


### Features

* **dsp:** add oscillators as [@thi](https://github.com/thi).ng/dsp package (from synstack / VEX) ([889730f](https://github.com/thi-ng/umbrella/commit/889730f))
