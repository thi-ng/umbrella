# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.1.4...@thi.ng/hdom-components@3.1.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.1.3...@thi.ng/hdom-components@3.1.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.1.2...@thi.ng/hdom-components@3.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.1.1...@thi.ng/hdom-components@3.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.1.0...@thi.ng/hdom-components@3.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/hdom-components





# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.20...@thi.ng/hdom-components@3.1.0) (2019-07-07)


### Bug Fixes

* **hdom-components:** update CanvasHandler args ([080411f](https://github.com/thi-ng/umbrella/commit/080411f))


### Features

* **hdom-components:** enable TS strict compiler flags (refactor) ([6233ba2](https://github.com/thi-ng/umbrella/commit/6233ba2))





## [3.0.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.19...@thi.ng/hdom-components@3.0.20) (2019-05-22)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.18...@thi.ng/hdom-components@3.0.19) (2019-04-26)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.17...@thi.ng/hdom-components@3.0.18) (2019-04-24)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.16...@thi.ng/hdom-components@3.0.17) (2019-04-16)


### Bug Fixes

* **hdom-components:** `this` handling in CanvasHandlers ([f104b64](https://github.com/thi-ng/umbrella/commit/f104b64))





## [3.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.15...@thi.ng/hdom-components@3.0.16) (2019-04-15)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.14...@thi.ng/hdom-components@3.0.15) (2019-04-03)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.13...@thi.ng/hdom-components@3.0.14) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hdom-components





## [3.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.12...@thi.ng/hdom-components@3.0.13) (2019-03-28)

**Note:** Version bump only for package @thi.ng/hdom-components







# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.4.6...@thi.ng/hdom-components@3.0.0) (2019-01-21)


### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))


### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols


# [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.3.0...@thi.ng/hdom-components@2.4.0) (2018-12-14)


### Features

* **hdom-components:** merge button & button group attribs ([da441c1](https://github.com/thi-ng/umbrella/commit/da441c1))


# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.2.15...@thi.ng/hdom-components@2.3.0) (2018-12-13)


### Features

* **hdom-components:** add FPS counter & sparkline components, update deps ([ebd3380](https://github.com/thi-ng/umbrella/commit/ebd3380))



## [2.2.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.2.10...@thi.ng/hdom-components@2.2.11) (2018-10-17)


### Bug Fixes

* **hdom-components:** add Canvas2DContextAttributes (removed in TS3.1) ([775cc8a](https://github.com/thi-ng/umbrella/commit/775cc8a))


<a name="2.2.0"></a>
# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.1.13...@thi.ng/hdom-components@2.2.0) (2018-08-27)


### Bug Fixes

* **hdom-components:** call canvas update from init() ([b25edbe](https://github.com/thi-ng/umbrella/commit/b25edbe))


### Features

* **hdom-components:** add HDPI adaptation helper for canvas comps ([135d6f1](https://github.com/thi-ng/umbrella/commit/135d6f1))


<a name="2.1.0"></a>
# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.0.3...@thi.ng/hdom-components@2.1.0) (2018-05-09)


### Features

* **hdom-components:** add button component ([cef3c6a](https://github.com/thi-ng/umbrella/commit/cef3c6a))
* **hdom-components:** add buttonGroup ([c0950d6](https://github.com/thi-ng/umbrella/commit/c0950d6))
* **hdom-components:** add notification component ([a11803c](https://github.com/thi-ng/umbrella/commit/a11803c))
* **hdom-components:** add pager component, add [@thi](https://github.com/thi).ng/iterators dep ([efb288d](https://github.com/thi-ng/umbrella/commit/efb288d))
* **hdom-components:** add title component ([f9a2daf](https://github.com/thi-ng/umbrella/commit/f9a2daf))


<a name="2.0.0"></a>
# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@1.1.2...@thi.ng/hdom-components@2.0.0) (2018-04-08)


### Code Refactoring

* **hdom-components:** remove svg, update canvas (hdom context support) ([86d1f0d](https://github.com/thi-ng/umbrella/commit/86d1f0d))
* **hdom-components:** update dropdown components ([0873832](https://github.com/thi-ng/umbrella/commit/0873832))


### Features

* **hdom-components:** update canvas handlers, add webgl2 version ([7c88a3f](https://github.com/thi-ng/umbrella/commit/7c88a3f))


### BREAKING CHANGES

* **hdom-components:** add hdom context arg as first arg to `dropdown` and
`groupedDropdown`
* **hdom-components:** canvas user handlers passed as object and taking
different / more args
* **hdom-components:** SVG functionality has been moved to new
@thi.ng/hiccup-svg package. Canvas component user fns have new args


<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@1.0.9...@thi.ng/hdom-components@1.1.0) (2018-03-29)


### Features

* **hdom-components:** add svg line() ([6cbacec](https://github.com/thi-ng/umbrella/commit/6cbacec))


<a name="1.0.0"></a>
# 1.0.0 (2018-03-03)


### Features

* **hdom-components:** rename package hiccup-dom-component => hdom-components ([752a78b](https://github.com/thi-ng/umbrella/commit/752a78b))


### BREAKING CHANGES

* **hdom-components:** rename package hiccup-dom-component => hdom-components


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom-components@0.1.0...@thi.ng/hiccup-dom-components@0.2.0) (2018-02-24)


### Features

* **hiccup-dom-components:** add gradient, group, path SVG funcs ([214fe4d](https://github.com/thi-ng/umbrella/commit/214fe4d))
