# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.1.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.27...@thi.ng/rstream-log@3.1.28) (2020-05-16)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.26...@thi.ng/rstream-log@3.1.27) (2020-05-16)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.25...@thi.ng/rstream-log@3.1.26) (2020-05-16)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.24...@thi.ng/rstream-log@3.1.25) (2020-05-15)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.23...@thi.ng/rstream-log@3.1.24) (2020-05-14)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.22...@thi.ng/rstream-log@3.1.23) (2020-05-03)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.21...@thi.ng/rstream-log@3.1.22) (2020-04-28)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.20...@thi.ng/rstream-log@3.1.21) (2020-04-27)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.19...@thi.ng/rstream-log@3.1.20) (2020-04-20)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.18...@thi.ng/rstream-log@3.1.19) (2020-04-11)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.17...@thi.ng/rstream-log@3.1.18) (2020-04-06)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.16...@thi.ng/rstream-log@3.1.17) (2020-04-05)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.15...@thi.ng/rstream-log@3.1.16) (2020-04-01)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.14...@thi.ng/rstream-log@3.1.15) (2020-03-28)

**Note:** Version bump only for package @thi.ng/rstream-log





# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.14...@thi.ng/rstream-log@3.1.0) (2019-07-07)

### Features

* **rstream-log:** add maskSecrets() format xform ([481a65d](https://github.com/thi-ng/umbrella/commit/481a65d))

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
