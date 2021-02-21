# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@3.0.30...@thi.ng/hdom-canvas@3.0.31) (2021-02-20)

**Note:** Version bump only for package @thi.ng/hdom-canvas





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.4.26...@thi.ng/hdom-canvas@3.0.0) (2020-06-05)


### Features

* **hdom-canvas:** remove obsolete files ([41c8a9d](https://github.com/thi-ng/umbrella/commit/41c8a9d696211b13bde358dae431f110ab7b4be5))


### BREAKING CHANGES

* **hdom-canvas:** tree traversal & rendering parts extracted to new
package @thi.ng/hiccup-canvas

From now on, this package only contains the canvas component wrapper & hdom related interface implementations, allowing canvas rendering parts to be used separately.





## [2.4.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.4.1...@thi.ng/hdom-canvas@2.4.2) (2020-01-24)

### Bug Fixes

* **hdom-canvas:** update points() to draw centered rects ([43d0aef](https://github.com/thi-ng/umbrella/commit/43d0aef0db1e536fe9a13c757f05ce3b93fd0aba))

# [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.3.1...@thi.ng/hdom-canvas@2.4.0) (2019-11-09)

### Features

* **hdom-canvas:** add `packedPoints` shape type, update readme ([292611a](https://github.com/thi-ng/umbrella/commit/292611a44d1a661dcad4c293863517cac3791f28))

# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.2.4...@thi.ng/hdom-canvas@2.3.0) (2019-09-21)

### Features

* **hdom-canvas:** add clip attrib support for paths ([2c2909d](https://github.com/thi-ng/umbrella/commit/2c2909d))

## [2.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.2.1...@thi.ng/hdom-canvas@2.2.2) (2019-08-16)

### Bug Fixes

* **hdom-canvas:** fix attrib default vals, add missing weight val ([f09677f](https://github.com/thi-ng/umbrella/commit/f09677f))

# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.1.2...@thi.ng/hdom-canvas@2.2.0) (2019-07-31)

### Features

* **hdom-cnavas:** add setTransform attrib, update docs/readme ([eed3de2](https://github.com/thi-ng/umbrella/commit/eed3de2))

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.18...@thi.ng/hdom-canvas@2.1.0) (2019-07-07)

### Features

* **hdom-canvas:** enable TS strict compiler flags (refactor) ([998f5a1](https://github.com/thi-ng/umbrella/commit/998f5a1))

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@1.1.6...@thi.ng/hdom-canvas@2.0.0) (2019-02-27)

### Features

* **hdom-canvas:** update image handling, add image/atlas blitting support ([bc59d30](https://github.com/thi-ng/umbrella/commit/bc59d30))

### BREAKING CHANGES

* **hdom-canvas:** new image args/attribs & arg order, see readme

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@1.0.1...@thi.ng/hdom-canvas@1.1.0) (2019-01-22)

### Features

* **hdom-canvas:** add color dep, update color attrib handling ([1d92c8c](https://github.com/thi-ng/umbrella/commit/1d92c8c))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@0.1.20...@thi.ng/hdom-canvas@1.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### Features

* **hdom-canvas:** add ellipse() / ellipticArc(), update readme ([9a50769](https://github.com/thi-ng/umbrella/commit/9a50769))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

## [0.1.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@0.1.12...@thi.ng/hdom-canvas@0.1.13) (2018-12-08)

### Performance Improvements

* **hdom-canvas:** update diffTree() to compute edit dist only ([899941f](https://github.com/thi-ng/umbrella/commit/899941f))

## [0.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@0.1.11...@thi.ng/hdom-canvas@0.1.12) (2018-11-26)

### Bug Fixes

* **hdom-canvas:** actually pass maxWidth argument to text function ([97965d8](https://github.com/thi-ng/umbrella/commit/97965d8))
