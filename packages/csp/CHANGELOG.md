# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.7...@thi.ng/csp@1.0.8) (2019-03-03)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.6...@thi.ng/csp@1.0.7) (2019-03-01)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.5...@thi.ng/csp@1.0.6) (2019-02-26)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.4...@thi.ng/csp@1.0.5) (2019-02-15)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.3...@thi.ng/csp@1.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.2...@thi.ng/csp@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.1...@thi.ng/csp@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/csp





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.0...@thi.ng/csp@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/csp





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@0.3.79...@thi.ng/csp@1.0.0) (2019-01-21)


### Bug Fixes

* **csp:** disable __State reverse enum lookup ([3b8576f](https://github.com/thi-ng/umbrella/commit/3b8576f))


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.3.64"></a>
## [0.3.64](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@0.3.63...@thi.ng/csp@0.3.64) (2018-09-24)


### Performance Improvements

* **csp:** `State` => const enum ([c3e8d68](https://github.com/thi-ng/umbrella/commit/c3e8d68))


<a name="0.3.11"></a>
## [0.3.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@0.3.10...@thi.ng/csp@0.3.11) (2018-02-08)


### Bug Fixes

* **csp:** fix [#5](https://github.com/thi-ng/umbrella/issues/5), example in readme ([a10a487](https://github.com/thi-ng/umbrella/commit/a10a487))
* **csp:** fix [#5](https://github.com/thi-ng/umbrella/issues/5), more example fixes (rfn calls) ([080c2ee](https://github.com/thi-ng/umbrella/commit/080c2ee))
