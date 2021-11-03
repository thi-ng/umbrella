# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@4.0.7...@thi.ng/rstream-log@4.0.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/rstream-log





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.2.33...@thi.ng/rstream-log@4.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.1.55...@thi.ng/rstream-log@3.2.0) (2021-01-13)

###  Features

- **rstream-log:** update default body format for formatString() ([841b062](https://github.com/thi-ng/umbrella/commit/841b06271362c6941176b057d1bfab363c07d104))

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@3.0.14...@thi.ng/rstream-log@3.1.0) (2019-07-07)

###  Features

- **rstream-log:** add maskSecrets() format xform ([481a65d](https://github.com/thi-ng/umbrella/commit/481a65d))

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@2.0.12...@thi.ng/rstream-log@3.0.0) (2019-03-19)

###  Code Refactoring

- **rstream-log:** remove obsolete writeFile() fn ([1354171](https://github.com/thi-ng/umbrella/commit/1354171))

###  BREAKING CHANGES

- **rstream-log:** migrate writeFile() to new pkg @thi.ng/rstream-log-file

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@1.0.76...@thi.ng/rstream-log@2.0.0) (2019-01-21)

###  Bug Fixes

- **rstream-log:** remove __Level reverse enum lookup, update Level (non const) ([d89f28f](https://github.com/thi-ng/umbrella/commit/d89f28f))

###  Build System

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

###  BREAKING CHANGES

- enable multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols

##  [1.0.60](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@1.0.59...@thi.ng/rstream-log@1.0.60) (2018-09-24)

###  Performance Improvements

- **rstream-log:** `Level` => const enum ([fc6a4d3](https://github.com/thi-ng/umbrella/commit/fc6a4d3))

##  [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@1.0.3...@thi.ng/rstream-log@1.0.4) (2018-04-18)

###  Bug Fixes

- **rstream-log:** ID handling in Logger ctor ([3087776](https://github.com/thi-ng/umbrella/commit/3087776))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@0.6.9...@thi.ng/rstream-log@1.0.0) (2018-04-15)

###  Code Refactoring

- **rstream-log:** update package structure & readme example ([e6c75b4](https://github.com/thi-ng/umbrella/commit/e6c75b4))

###  BREAKING CHANGES

- **rstream-log:** update package structure
    - rename src/transform => src/xform
    - move src/format.ts => src/xform/format.ts

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@0.5.40...@thi.ng/rstream-log@0.6.0) (2018-03-21)

###  Features

- **rstream-log:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([8a3e72e](https://github.com/thi-ng/umbrella/commit/8a3e72e))

##  [0.5.40](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log@0.5.39...@thi.ng/rstream-log@0.5.40) (2018-03-21)
