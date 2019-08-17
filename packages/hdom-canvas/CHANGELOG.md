# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.2.2...@thi.ng/hdom-canvas@2.2.3) (2019-08-17)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.2.1...@thi.ng/hdom-canvas@2.2.2) (2019-08-16)


### Bug Fixes

* **hdom-canvas:** fix attrib default vals, add missing weight val ([f09677f](https://github.com/thi-ng/umbrella/commit/f09677f))





## [2.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.2.0...@thi.ng/hdom-canvas@2.2.1) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hdom-canvas





# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.1.2...@thi.ng/hdom-canvas@2.2.0) (2019-07-31)


### Features

* **hdom-cnavas:** add setTransform attrib, update docs/readme ([eed3de2](https://github.com/thi-ng/umbrella/commit/eed3de2))





## [2.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.1.1...@thi.ng/hdom-canvas@2.1.2) (2019-07-12)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.1.0...@thi.ng/hdom-canvas@2.1.1) (2019-07-08)

**Note:** Version bump only for package @thi.ng/hdom-canvas





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.18...@thi.ng/hdom-canvas@2.1.0) (2019-07-07)


### Features

* **hdom-canvas:** enable TS strict compiler flags (refactor) ([998f5a1](https://github.com/thi-ng/umbrella/commit/998f5a1))





## [2.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.17...@thi.ng/hdom-canvas@2.0.18) (2019-05-22)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.16...@thi.ng/hdom-canvas@2.0.17) (2019-04-26)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.15...@thi.ng/hdom-canvas@2.0.16) (2019-04-24)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.14...@thi.ng/hdom-canvas@2.0.15) (2019-04-17)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.13...@thi.ng/hdom-canvas@2.0.14) (2019-04-15)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.12...@thi.ng/hdom-canvas@2.0.13) (2019-04-11)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.11...@thi.ng/hdom-canvas@2.0.12) (2019-04-05)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.10...@thi.ng/hdom-canvas@2.0.11) (2019-04-03)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.9...@thi.ng/hdom-canvas@2.0.10) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hdom-canvas





## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@2.0.8...@thi.ng/hdom-canvas@2.0.9) (2019-03-28)

**Note:** Version bump only for package @thi.ng/hdom-canvas







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
