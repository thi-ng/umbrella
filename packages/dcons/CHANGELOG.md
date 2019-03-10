# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.8...@thi.ng/dcons@2.0.9) (2019-03-10)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.7...@thi.ng/dcons@2.0.8) (2019-03-03)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.6...@thi.ng/dcons@2.0.7) (2019-03-01)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.5...@thi.ng/dcons@2.0.6) (2019-02-26)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.4...@thi.ng/dcons@2.0.5) (2019-02-15)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.3...@thi.ng/dcons@2.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.2...@thi.ng/dcons@2.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.1...@thi.ng/dcons@2.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/dcons





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.0...@thi.ng/dcons@2.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/dcons





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@1.1.23...@thi.ng/dcons@2.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@1.0.7...@thi.ng/dcons@1.1.0) (2018-08-24)


### Features

* **dcons:** add IReducible impl, update deps & imports ([1280cfd](https://github.com/thi-ng/umbrella/commit/1280cfd))


<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.3.6...@thi.ng/dcons@1.0.0) (2018-05-12)


### Code Refactoring

* **dcons:** update pop() ([67f0e54](https://github.com/thi-ng/umbrella/commit/67f0e54))


### BREAKING CHANGES

* **dcons:** due to @thi.ng/api/IStack update, pop() now returns
popped value instead of the list itself

- minor other refactoring


<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.2.0...@thi.ng/dcons@0.3.0) (2018-04-22)


### Features

* **dcons:** add asHead()/asTail() ([19f7e76](https://github.com/thi-ng/umbrella/commit/19f7e76))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.1.19...@thi.ng/dcons@0.2.0) (2018-04-10)


### Features

* **dcons:** add IEmpty impl, minor refactoring ([10c089a](https://github.com/thi-ng/umbrella/commit/10c089a))
