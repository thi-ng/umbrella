# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.1.54](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.53...@thi.ng/rstream-log@3.1.54) (2021-01-02)

**Note:** Version bump only for package @thi.ng/rstream-log





## [3.1.53](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.52...@thi.ng/rstream-log@3.1.53) (2020-12-22)

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
