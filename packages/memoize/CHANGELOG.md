# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@3.0.3...@thi.ng/memoize@3.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/memoize





## [3.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@3.0.2...@thi.ng/memoize@3.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/memoize





## [3.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@3.0.1...@thi.ng/memoize@3.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/memoize





## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@3.0.0...@thi.ng/memoize@3.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/memoize





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@2.1.21...@thi.ng/memoize@3.0.0) (2021-10-12)


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






#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@2.0.19...@thi.ng/memoize@2.1.0) (2020-08-20) 

###  Features 

- **memoize:** add doOnce(), update readme ([889e00d](https://github.com/thi-ng/umbrella/commit/889e00d0376cda39f2a7e5848780bdf26f5fc5ca)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.1.8...@thi.ng/memoize@2.0.0) (2020-02-25) 

###  Code Refactoring 

- **memoize:** update imports ([d6b5614](https://github.com/thi-ng/umbrella/commit/d6b56148ec3ab36f97bc3fce94d7c49a74e81e96)) 

###  BREAKING CHANGES 

- **memoize:** replace obsolete Fn type aliases w/ @thi.ng/api types 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@1.0.9...@thi.ng/memoize@1.1.0) (2019-07-07) 

###  Bug Fixes 

- **memoize:** return type memoize1() ([c0dafb9](https://github.com/thi-ng/umbrella/commit/c0dafb9)) 

###  Features 

- **memoize:** enable TS strict compiler flags (refactor) ([a08cc69](https://github.com/thi-ng/umbrella/commit/a08cc69)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.2.6...@thi.ng/memoize@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/memoize@0.1.2...@thi.ng/memoize@0.2.0) (2018-09-06) 

###  Features 

- **memoize:** add defonce() ([61bed88](https://github.com/thi-ng/umbrella/commit/61bed88)) 

#  0.1.0 (2018-08-08) 

###  Features 

- **memoize:** add [@thi](https://github.com/thi).ng/memoize package ([adc4928](https://github.com/thi-ng/umbrella/commit/adc4928)) 
- **memoize:** add optional cache arg for memoizeJ() ([2bc092d](https://github.com/thi-ng/umbrella/commit/2bc092d))
