# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.4...@thi.ng/hiccup-svg@3.2.5) (2019-08-16)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.3...@thi.ng/hiccup-svg@3.2.4) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.2...@thi.ng/hiccup-svg@3.2.3) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.1...@thi.ng/hiccup-svg@3.2.2) (2019-07-12)


### Bug Fixes

* **hiccup-svg:** update points(), use centered rects ([c7d6aaa](https://github.com/thi-ng/umbrella/commit/c7d6aaa))





## [3.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.0...@thi.ng/hiccup-svg@3.2.1) (2019-07-08)

**Note:** Version bump only for package @thi.ng/hiccup-svg





# [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.22...@thi.ng/hiccup-svg@3.2.0) (2019-07-07)


### Features

* **hiccup-svg:** enable TS strict compiler flags (refactor) ([3143141](https://github.com/thi-ng/umbrella/commit/3143141))





## [3.1.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.21...@thi.ng/hiccup-svg@3.1.22) (2019-05-22)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.1.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.20...@thi.ng/hiccup-svg@3.1.21) (2019-04-26)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.1.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.19...@thi.ng/hiccup-svg@3.1.20) (2019-04-24)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.1.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.18...@thi.ng/hiccup-svg@3.1.19) (2019-04-15)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.17...@thi.ng/hiccup-svg@3.1.18) (2019-04-03)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.1.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.16...@thi.ng/hiccup-svg@3.1.17) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [3.1.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.15...@thi.ng/hiccup-svg@3.1.16) (2019-03-28)

**Note:** Version bump only for package @thi.ng/hiccup-svg







## [3.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.6...@thi.ng/hiccup-svg@3.1.7) (2019-02-27)


### Bug Fixes

* **hiccup-svg:** update convert() image (new arg order in hdom-canvas) ([b206cff](https://github.com/thi-ng/umbrella/commit/b206cff))



# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.0.1...@thi.ng/hiccup-svg@3.1.0) (2019-01-22)


### Features

* **hiccup-svg:** add color dep, add attrib conversion for all elements ([7f6011e](https://github.com/thi-ng/umbrella/commit/7f6011e))




# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.10...@thi.ng/hiccup-svg@3.0.0) (2019-01-21)


### Bug Fixes

* **hiccup-svg:** convert path arc segment axis theta to degrees ([370f928](https://github.com/thi-ng/umbrella/commit/370f928))


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### Features

* **hiccup-svg:** add ellipse shape type, update convert() ([a39811c](https://github.com/thi-ng/umbrella/commit/a39811c))
* **hiccup-svg:** add toHiccup() support in convertTree() ([e197f90](https://github.com/thi-ng/umbrella/commit/e197f90))


### Reverts

* **hiccup-svg:** undo merge mistake in convert.ts ([82f8ef2](https://github.com/thi-ng/umbrella/commit/82f8ef2))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.3...@thi.ng/hiccup-svg@2.0.4) (2018-10-21)


### Bug Fixes

* **hiccup-svg:** fix arc segment handling ([85426d9](https://github.com/thi-ng/umbrella/commit/85426d9))


<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.13...@thi.ng/hiccup-svg@1.0.0) (2018-05-13)


### Code Refactoring

* **hiccup-svg:** rename svgdoc => svg ([396faec](https://github.com/thi-ng/umbrella/commit/396faec))


### Documentation

* **hiccup-svg:** resolve [#19](https://github.com/thi-ng/umbrella/issues/19), update readme, add invocation notes ([dc77540](https://github.com/thi-ng/umbrella/commit/dc77540))


### BREAKING CHANGES

* **hiccup-svg:** technically identical to previous version, however
due to breaking changes and new context support in @thi.ng/hiccup,
SVG functions MUST be invoked directly now and do not support lazy
evaluation anymore. see notice in readme.
* **hiccup-svg:** rename svgdoc => svg




<a name="0.2.13"></a>
## [0.2.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.12...@thi.ng/hiccup-svg@0.2.13) (2018-05-12)


<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.0...@thi.ng/hiccup-svg@0.2.1) (2018-04-09)


### Bug Fixes

* **hiccup-svg:** path(), update add null check for points() ([b9d9a49](https://github.com/thi-ng/umbrella/commit/b9d9a49))




<a name="0.2.0"></a>
# 0.2.0 (2018-04-08)


### Features

* **hiccup-svg:** re-add svg fns as new [@thi](https://github.com/thi).ng/hiccup-svg package ([afccabd](https://github.com/thi-ng/umbrella/commit/afccabd))
