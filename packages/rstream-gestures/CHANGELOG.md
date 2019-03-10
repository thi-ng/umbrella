# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.9...@thi.ng/rstream-gestures@1.0.10) (2019-03-10)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.8...@thi.ng/rstream-gestures@1.0.9) (2019-03-05)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.7...@thi.ng/rstream-gestures@1.0.8) (2019-03-03)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.6...@thi.ng/rstream-gestures@1.0.7) (2019-03-01)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.5...@thi.ng/rstream-gestures@1.0.6) (2019-02-26)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.4...@thi.ng/rstream-gestures@1.0.5) (2019-02-15)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.3...@thi.ng/rstream-gestures@1.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.2...@thi.ng/rstream-gestures@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.1...@thi.ng/rstream-gestures@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.0...@thi.ng/rstream-gestures@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/rstream-gestures





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.6.9...@thi.ng/rstream-gestures@1.0.0) (2019-01-21)


### Bug Fixes

* **rstream-gestures:** disable __GestureType reverse enum export ([19449e8](https://github.com/thi-ng/umbrella/commit/19449e8))


### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))


### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols


# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.5.18...@thi.ng/rstream-gestures@0.6.0) (2018-11-24)


### Features

* **rstream-gestures:** add absZoom option (abs vs. relative) ([bab55c3](https://github.com/thi-ng/umbrella/commit/bab55c3))


## [0.5.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.5.15...@thi.ng/rstream-gestures@0.5.16) (2018-10-24)


### Bug Fixes

* **rstream-gestures:** fix incorrect local position when scrolled ([f1f6af4](https://github.com/thi-ng/umbrella/commit/f1f6af4))


<a name="0.5.10"></a>
## [0.5.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.5.9...@thi.ng/rstream-gestures@0.5.10) (2018-09-24)


### Performance Improvements

* **rstream-gestures:** `GestureType` => const enum ([8e4fc90](https://github.com/thi-ng/umbrella/commit/8e4fc90))


<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.4.18...@thi.ng/rstream-gestures@0.5.0) (2018-08-27)


### Features

* **rstream-gestures:** add options for local & scaled positions ([ccc40a9](https://github.com/thi-ng/umbrella/commit/ccc40a9))


<a name="0.4.6"></a>
## [0.4.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.4.5...@thi.ng/rstream-gestures@0.4.6) (2018-07-13)


### Bug Fixes

* **rstream-gestures:** touchevent check in safari ([ee48a94](https://github.com/thi-ng/umbrella/commit/ee48a94))


<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.3.16...@thi.ng/rstream-gestures@0.4.0) (2018-07-04)


### Features

* **rstream-gestures:** add event & preventDefault opts, update docs ([de17340](https://github.com/thi-ng/umbrella/commit/de17340))




<a name="0.3.16"></a>
## [0.3.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.3.15...@thi.ng/rstream-gestures@0.3.16) (2018-07-03)


<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.2.5...@thi.ng/rstream-gestures@0.3.0) (2018-05-09)


### Features

* **rstream-gestures:** add zoom smooth config option, update readme ([053c8c6](https://github.com/thi-ng/umbrella/commit/053c8c6))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.1.9...@thi.ng/rstream-gestures@0.2.0) (2018-04-24)


### Features

* **rstream-gestures:** allows partial opts, add ID option ([3408c13](https://github.com/thi-ng/umbrella/commit/3408c13))


<a name="0.1.0"></a>
# 0.1.0 (2018-04-14)


### Features

* **rstream-gestures:** initial import [@thi](https://github.com/thi).ng/rstream-gestures ([de1ac7b](https://github.com/thi-ng/umbrella/commit/de1ac7b))
