# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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





## [2.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.9...@thi.ng/hiccup-svg@2.0.10) (2018-12-20)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.8...@thi.ng/hiccup-svg@2.0.9) (2018-12-15)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.7...@thi.ng/hiccup-svg@2.0.8) (2018-12-13)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.6...@thi.ng/hiccup-svg@2.0.7) (2018-12-08)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.5...@thi.ng/hiccup-svg@2.0.6) (2018-11-07)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.4...@thi.ng/hiccup-svg@2.0.5) (2018-11-06)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.3...@thi.ng/hiccup-svg@2.0.4) (2018-10-21)


### Bug Fixes

* **hiccup-svg:** fix arc segment handling ([85426d9](https://github.com/thi-ng/umbrella/commit/85426d9))





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.2...@thi.ng/hiccup-svg@2.0.3) (2018-10-17)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="2.0.2"></a>
## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.1...@thi.ng/hiccup-svg@2.0.2) (2018-09-24)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="2.0.1"></a>
## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.0...@thi.ng/hiccup-svg@2.0.1) (2018-09-23)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="2.0.0"></a>
# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.0-alpha.1...@thi.ng/hiccup-svg@2.0.0) (2018-09-22)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="2.0.0-alpha.1"></a>
# [2.0.0-alpha.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.0-alpha.0...@thi.ng/hiccup-svg@2.0.0-alpha.1) (2018-09-17)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="2.0.0-alpha.0"></a>
# [2.0.0-alpha.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.0-alpha...@thi.ng/hiccup-svg@2.0.0-alpha.0) (2018-09-17)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="1.0.14"></a>
## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.13...@thi.ng/hiccup-svg@1.0.14) (2018-09-10)

**Note:** Version bump only for package @thi.ng/hiccup-svg





<a name="1.0.13"></a>
## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.12...@thi.ng/hiccup-svg@1.0.13) (2018-09-01)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.12"></a>
## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.11...@thi.ng/hiccup-svg@1.0.12) (2018-08-31)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.11"></a>
## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.10...@thi.ng/hiccup-svg@1.0.11) (2018-08-27)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.10"></a>
## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.9...@thi.ng/hiccup-svg@1.0.10) (2018-08-24)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.9"></a>
## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.8...@thi.ng/hiccup-svg@1.0.9) (2018-08-01)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.8"></a>
## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.7...@thi.ng/hiccup-svg@1.0.8) (2018-07-20)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.7"></a>
## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.6...@thi.ng/hiccup-svg@1.0.7) (2018-07-11)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.6"></a>
## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.5...@thi.ng/hiccup-svg@1.0.6) (2018-07-04)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.5"></a>
## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.4...@thi.ng/hiccup-svg@1.0.5) (2018-06-21)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.4"></a>
## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.3...@thi.ng/hiccup-svg@1.0.4) (2018-06-18)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.3"></a>
## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.2...@thi.ng/hiccup-svg@1.0.3) (2018-05-30)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.2"></a>
## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.1...@thi.ng/hiccup-svg@1.0.2) (2018-05-14)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="1.0.1"></a>
## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@1.0.0...@thi.ng/hiccup-svg@1.0.1) (2018-05-14)




**Note:** Version bump only for package @thi.ng/hiccup-svg

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




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.12"></a>
## [0.2.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.11...@thi.ng/hiccup-svg@0.2.12) (2018-05-10)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.11"></a>
## [0.2.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.10...@thi.ng/hiccup-svg@0.2.11) (2018-05-10)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.10"></a>
## [0.2.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.9...@thi.ng/hiccup-svg@0.2.10) (2018-05-09)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.9"></a>
## [0.2.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.8...@thi.ng/hiccup-svg@0.2.9) (2018-04-29)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.8"></a>
## [0.2.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.7...@thi.ng/hiccup-svg@0.2.8) (2018-04-26)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.7"></a>
## [0.2.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.6...@thi.ng/hiccup-svg@0.2.7) (2018-04-26)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.6"></a>
## [0.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.5...@thi.ng/hiccup-svg@0.2.6) (2018-04-19)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.5"></a>
## [0.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.4...@thi.ng/hiccup-svg@0.2.5) (2018-04-17)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.4"></a>
## [0.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.3...@thi.ng/hiccup-svg@0.2.4) (2018-04-16)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.3"></a>
## [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.2...@thi.ng/hiccup-svg@0.2.3) (2018-04-15)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.2"></a>
## [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.1...@thi.ng/hiccup-svg@0.2.2) (2018-04-13)




**Note:** Version bump only for package @thi.ng/hiccup-svg

<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.0...@thi.ng/hiccup-svg@0.2.1) (2018-04-09)


### Bug Fixes

* **hiccup-svg:** path(), update add null check for points() ([b9d9a49](https://github.com/thi-ng/umbrella/commit/b9d9a49))




<a name="0.2.0"></a>
# 0.2.0 (2018-04-08)


### Features

* **hiccup-svg:** re-add svg fns as new [@thi](https://github.com/thi).ng/hiccup-svg package ([afccabd](https://github.com/thi-ng/umbrella/commit/afccabd))
