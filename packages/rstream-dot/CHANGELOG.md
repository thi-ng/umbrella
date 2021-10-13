# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@2.0.0...@thi.ng/rstream-dot@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rstream-dot





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.2.29...@thi.ng/rstream-dot@2.0.0) (2021-10-12)


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






#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.59...@thi.ng/rstream-dot@1.2.0) (2021-02-22) 

###  Features 

- **rstream-dot:** update opts, deps & value handling ([be0b146](https://github.com/thi-ng/umbrella/commit/be0b146b2daeeff560f704bc5771ce5390e2ecf3)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.26...@thi.ng/rstream-dot@1.1.0) (2019-07-07) 

###  Features 

- **rstream-dot:** enable TS strict compiler flags (refactor) ([acfe75e](https://github.com/thi-ng/umbrella/commit/acfe75e)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@0.2.64...@thi.ng/rstream-dot@1.0.0) (2019-01-21) 

###  Build System 

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84)) 

###  BREAKING CHANGES 

- enable multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@0.1.2...@thi.ng/rstream-dot@0.2.0) (2018-04-26) 

###  Features 

- **rstream-dot:** add option to include stream values in diag ([d057d95](https://github.com/thi-ng/umbrella/commit/d057d95)) 

#  0.1.0 (2018-04-24) 

###  Features 

- **rstream-dot:** add xform edge labels, extract types to api.ts ([7ffaa61](https://github.com/thi-ng/umbrella/commit/7ffaa61)) 
- **rstream-dot:** initial import [@thi](https://github.com/thi).ng/rstream-dot package ([e72478a](https://github.com/thi-ng/umbrella/commit/e72478a)) 
- **rstream-dot:** support multiple roots in walk() ([704025a](https://github.com/thi-ng/umbrella/commit/704025a))
