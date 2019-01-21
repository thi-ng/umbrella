# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.0.0...@thi.ng/math@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/math





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
