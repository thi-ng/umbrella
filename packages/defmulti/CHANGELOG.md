# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.1.3...@thi.ng/defmulti@1.1.4) (2019-09-21)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.1.2...@thi.ng/defmulti@1.1.3) (2019-08-21)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.1.1...@thi.ng/defmulti@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.1.0...@thi.ng/defmulti@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/defmulti





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.9...@thi.ng/defmulti@1.1.0) (2019-07-07)


### Features

* **defmulti:** enable TS strict compiler flags (refactor) ([d51ecf9](https://github.com/thi-ng/umbrella/commit/d51ecf9))





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.8...@thi.ng/defmulti@1.0.9) (2019-05-22)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.7...@thi.ng/defmulti@1.0.8) (2019-04-26)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.6...@thi.ng/defmulti@1.0.7) (2019-04-24)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.5...@thi.ng/defmulti@1.0.6) (2019-04-02)

**Note:** Version bump only for package @thi.ng/defmulti





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.4...@thi.ng/defmulti@1.0.5) (2019-03-28)

**Note:** Version bump only for package @thi.ng/defmulti







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.7.0...@thi.ng/defmulti@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### Features

* **defmulti:** add callable() & implementations(), update readme ([fde2db2](https://github.com/thi-ng/umbrella/commit/fde2db2))
* **defmulti:** add relations() ([4066c80](https://github.com/thi-ng/umbrella/commit/4066c80))
* **defmulti:** add versions w/ 1 optional typed arg, add .impls() ([125c784](https://github.com/thi-ng/umbrella/commit/125c784))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.6.0...@thi.ng/defmulti@0.7.0) (2019-01-02)


### Features

* **defmulti:** add opt fallback arg for defmultiN(), update docs ([1d29153](https://github.com/thi-ng/umbrella/commit/1d29153))


# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.5.1...@thi.ng/defmulti@0.6.0) (2019-01-01)


### Features

* **defmulti:** add addAll(), add/update doc strings ([488698a](https://github.com/thi-ng/umbrella/commit/488698a))


# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.4.1...@thi.ng/defmulti@0.5.0) (2018-10-24)


### Features

* **defmulti:** add support for dispatch value relationships / hierarchy ([a8c3898](https://github.com/thi-ng/umbrella/commit/a8c3898))


# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.3.11...@thi.ng/defmulti@0.4.0) (2018-10-17)


### Features

* **defmulti:** add varargs support ([6094738](https://github.com/thi-ng/umbrella/commit/6094738))


<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.2.0...@thi.ng/defmulti@0.3.0) (2018-05-11)


### Features

* **defmulti:** add generics, update docs & readme ([eeed25e](https://github.com/thi-ng/umbrella/commit/eeed25e))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.1.0...@thi.ng/defmulti@0.2.0) (2018-05-10)


### Features

* **defmulti:** add defmultiN(), update readme, add tests ([126ecf3](https://github.com/thi-ng/umbrella/commit/126ecf3))


<a name="0.1.0"></a>
# 0.1.0 (2018-05-10)


### Features

* **defmulti:** add [@thi](https://github.com/thi).ng/defmulti package ([edc66bf](https://github.com/thi-ng/umbrella/commit/edc66bf))
