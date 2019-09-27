# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.4...@thi.ng/rstream-log@3.1.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.3...@thi.ng/rstream-log@3.1.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.2...@thi.ng/rstream-log@3.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.1...@thi.ng/rstream-log@3.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.0...@thi.ng/rstream-log@3.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/rstream-log





# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.14...@thi.ng/rstream-log@3.1.0) (2019-07-07)


### Features

* **rstream-log:** add maskSecrets() format xform ([481a65d](https://github.com/thi-ng/umbrella/commit/481a65d))





## [3.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.13...@thi.ng/rstream-log@3.0.14) (2019-05-22)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.12...@thi.ng/rstream-log@3.0.13) (2019-04-26)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.11...@thi.ng/rstream-log@3.0.12) (2019-04-24)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.10...@thi.ng/rstream-log@3.0.11) (2019-04-15)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.9...@thi.ng/rstream-log@3.0.10) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.8...@thi.ng/rstream-log@3.0.9) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.7...@thi.ng/rstream-log@3.0.8) (2019-04-09)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.6...@thi.ng/rstream-log@3.0.7) (2019-04-06)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.5...@thi.ng/rstream-log@3.0.6) (2019-04-03)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.4...@thi.ng/rstream-log@3.0.5) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.3...@thi.ng/rstream-log@3.0.4) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.2...@thi.ng/rstream-log@3.0.3) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.1...@thi.ng/rstream-log@3.0.2) (2019-03-28)

**Note:** Version bump only for package @thi.ng/rstream-log







# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@2.0.12...@thi.ng/rstream-log@3.0.0) (2019-03-19)


### Code Refactoring

* **rstream-log:** remove obsolete writeFile() fn ([1354171](https://github.com/thi-ng/umbrella/commit/1354171))


### BREAKING CHANGES

* **rstream-log:** migrate writeFile() to new pkg @thi.ng/rstream-log-file




# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@1.0.76...@thi.ng/rstream-log@2.0.0) (2019-01-21)


### Bug Fixes

* **rstream-log:** remove __Level reverse enum lookup, update Level (non const) ([d89f28f](https://github.com/thi-ng/umbrella/commit/d89f28f))


### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))


### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols



<a name="1.0.60"></a>
## [1.0.60](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@1.0.59...@thi.ng/rstream-log@1.0.60) (2018-09-24)


### Performance Improvements

* **rstream-log:** `Level` => const enum ([fc6a4d3](https://github.com/thi-ng/umbrella/commit/fc6a4d3))


<a name="1.0.4"></a>
## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@1.0.3...@thi.ng/rstream-log@1.0.4) (2018-04-18)


### Bug Fixes

* **rstream-log:** ID handling in Logger ctor ([3087776](https://github.com/thi-ng/umbrella/commit/3087776))


<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@0.6.9...@thi.ng/rstream-log@1.0.0) (2018-04-15)


### Code Refactoring

* **rstream-log:** update package structure & readme example ([e6c75b4](https://github.com/thi-ng/umbrella/commit/e6c75b4))


### BREAKING CHANGES

* **rstream-log:** update package structure

- rename src/transform => src/xform
- move src/format.ts => src/xform/format.ts


<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@0.5.40...@thi.ng/rstream-log@0.6.0) (2018-03-21)


### Features

* **rstream-log:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([8a3e72e](https://github.com/thi-ng/umbrella/commit/8a3e72e))




<a name="0.5.40"></a>
## [0.5.40](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@0.5.39...@thi.ng/rstream-log@0.5.40) (2018-03-21)
