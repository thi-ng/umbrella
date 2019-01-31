# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@1.1.0...@thi.ng/hdom-canvas@1.1.1) (2019-01-31)

**Note:** Version bump only for package @thi.ng/hdom-canvas





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@1.0.1...@thi.ng/hdom-canvas@1.1.0) (2019-01-22)


### Features

* **hdom-canvas:** add color dep, update color attrib handling ([1d92c8c](https://github.com/thi-ng/umbrella/commit/1d92c8c))





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-canvas@1.0.0...@thi.ng/hdom-canvas@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/hdom-canvas





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
