# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.7.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.7.10...@thi.ng/math@1.7.11) (2020-06-14)

**Note:** Version bump only for package @thi.ng/math





# [1.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.6.0...@thi.ng/math@1.7.0) (2020-02-25)


### Features

* **math:** add minNonZero2/3() ([49c88d9](https://github.com/thi-ng/umbrella/commit/49c88d917ca7089841f5c26ca92293582d80f148))
* **math:** add safeDiv() (from [@nkint](https://github.com/nkint) PR [#206](https://github.com/thi-ng/umbrella/issues/206)) ([0567b93](https://github.com/thi-ng/umbrella/commit/0567b93b881467c634fc4723cad986432faecd83))





# [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.5.1...@thi.ng/math@1.6.0) (2020-01-24)

### Features

* **math:** add clamp05, update wrapOnce, wrap01, wrap11 ([19af252](https://github.com/thi-ng/umbrella/commit/19af2527a3c7afee4f829e36bf06acaeaf045be7))
* **math:** add expFactor(), update wrap/wrapOnce() ([bb07348](https://github.com/thi-ng/umbrella/commit/bb07348da2e252641c1bc4de1e577451ead3607b))

# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.4.2...@thi.ng/math@1.5.0) (2019-11-09)

### Features

* **math:** add mixCubicHermite & tangent fns ([d6b4b37](https://github.com/thi-ng/umbrella/commit/d6b4b3710b80fa1366cb40c193ad745bc63d4253))

# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.3.0...@thi.ng/math@1.4.0) (2019-07-07)

### Features

* **math:** add signed/unsigned int math ops ([518d79a](https://github.com/thi-ng/umbrella/commit/518d79a))

# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.2.3...@thi.ng/math@1.3.0) (2019-05-22)

### Features

* **math:** add extrema & crossing fns and Crossing enum ([e102f39](https://github.com/thi-ng/umbrella/commit/e102f39))
* **math:** add sigmoid / sigmoid11 fns ([3f085a3](https://github.com/thi-ng/umbrella/commit/3f085a3))

# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.1.1...@thi.ng/math@1.2.0) (2019-03-18)

### Features

* **math:** add consts ([28e9898](https://github.com/thi-ng/umbrella/commit/28e9898))
* **math:** add cos/sin approximations, loc(), add docstrings ([78ed751](https://github.com/thi-ng/umbrella/commit/78ed751))
* **math:** more trigonometry ([b5e1c02](https://github.com/thi-ng/umbrella/commit/b5e1c02))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.0.1...@thi.ng/math@1.1.0) (2019-02-05)

### Features

* **math:** add minError() search ([cae8394](https://github.com/thi-ng/umbrella/commit/cae8394))
* **math:** add PHI const ([57d4488](https://github.com/thi-ng/umbrella/commit/57d4488))
* **math:** add simplifyRatio() ([31e369b](https://github.com/thi-ng/umbrella/commit/31e369b))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@0.2.2...@thi.ng/math@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### Features

* **math:** add absInnerAngle() ([a78bd87](https://github.com/thi-ng/umbrella/commit/a78bd87))
* **math:** add constants ([8fa05c3](https://github.com/thi-ng/umbrella/commit/8fa05c3))
* **math:** add cossin(), add opt scale arg for sincos() ([0043fb5](https://github.com/thi-ng/umbrella/commit/0043fb5))
* **math:** update eqDelta w/ adaptive eps, rename old => eqDeltaFixed ([5018009](https://github.com/thi-ng/umbrella/commit/5018009))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@0.2.0...@thi.ng/math@0.2.1) (2018-11-20)

### Bug Fixes

* **math:** fix [#60](https://github.com/thi-ng/umbrella/issues/60), add range check for norm() ([143c47c](https://github.com/thi-ng/umbrella/commit/143c47c))

# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@0.1.0...@thi.ng/math@0.2.0) (2018-10-21)

### Features

* **math:** add sincos() & roundEps() ([f891c41](https://github.com/thi-ng/umbrella/commit/f891c41))
* **math:** migrate mixCubic()/mixQuadratic() from geom package ([4a47daa](https://github.com/thi-ng/umbrella/commit/4a47daa))

# 0.1.0 (2018-10-17)

### Features

* **math:** extract maths fns from [@thi](https://github.com/thi).ng/vectors as new package ([4af1fba](https://github.com/thi-ng/umbrella/commit/4af1fba))
