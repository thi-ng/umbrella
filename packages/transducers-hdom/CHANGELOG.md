# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@3.0.5...@thi.ng/transducers-hdom@3.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@3.0.4...@thi.ng/transducers-hdom@3.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [3.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@3.0.3...@thi.ng/transducers-hdom@3.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [3.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@3.0.2...@thi.ng/transducers-hdom@3.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [3.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@3.0.1...@thi.ng/transducers-hdom@3.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/transducers-hdom





## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@3.0.0...@thi.ng/transducers-hdom@3.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/transducers-hdom





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@2.0.105...@thi.ng/transducers-hdom@3.0.0) (2021-10-12)


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






#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.16...@thi.ng/transducers-hdom@2.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 
- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84)) 

###  BREAKING CHANGES 

- enable multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols 
- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

##  [1.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.2.5...@thi.ng/transducers-hdom@1.2.6) (2018-12-13) 

###  Bug Fixes 

- **transducers-hdom:** integrate recent hdom updates ([6db3170](https://github.com/thi-ng/umbrella/commit/6db3170)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.9...@thi.ng/transducers-hdom@1.2.0) (2018-11-06) 

###  Features 

- **transducers-hdom:** add support for dynamic user context vals ([e91dbbc](https://github.com/thi-ng/umbrella/commit/e91dbbc)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@1.1.0-alpha.2...@thi.ng/transducers-hdom@1.1.0) (2018-09-22) 

###  Bug Fixes 

- **transducers-hdom:** add missing type annotation ([78b1f4a](https://github.com/thi-ng/umbrella/commit/78b1f4a)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.5...@thi.ng/transducers-hdom@1.0.0) (2018-08-31) 

###  Features 

- **transducers-hdom:** add DOM hydration support, rename ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([0f39694](https://github.com/thi-ng/umbrella/commit/0f39694)) 

###  BREAKING CHANGES 

- **transducers-hdom:** rename transducer: `updateUI` => `updateDOM`, new API 

##  [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-hdom@0.1.0...@thi.ng/transducers-hdom@0.1.1) (2018-08-02) 

###  Bug Fixes 

- **transducers-hdom:** support hdom user context ([949a5d4](https://github.com/thi-ng/umbrella/commit/949a5d4)) 

#  0.1.0 (2018-08-02) 

###  Features 

- **transducers-hdom:** add new package [@thi](https://github.com/thi).ng/transducers-hdom ([7efce7a](https://github.com/thi-ng/umbrella/commit/7efce7a))
