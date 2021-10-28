# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@2.0.4...@thi.ng/iges@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/iges





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@2.0.3...@thi.ng/iges@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/iges





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@2.0.2...@thi.ng/iges@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/iges





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@2.0.1...@thi.ng/iges@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/iges





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@2.0.0...@thi.ng/iges@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/iges





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@1.1.87...@thi.ng/iges@2.0.0) (2021-10-12)


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@1.0.15...@thi.ng/iges@1.1.0) (2019-04-15) 

###  Features 

- **iges:** add boolean tree, csg box & cylinder entities ([b1db275](https://github.com/thi-ng/umbrella/commit/b1db275)) 
- **iges:** add new entities, options, extract addEntity, update enums ([43426e5](https://github.com/thi-ng/umbrella/commit/43426e5)) 

##  [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@1.0.13...@thi.ng/iges@1.0.14) (2019-04-02) 

###  Bug Fixes 

- **iges:** TS3.4 type inference ([34eab59](https://github.com/thi-ng/umbrella/commit/34eab59)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@0.2.30...@thi.ng/iges@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

##  [0.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@0.2.4...@thi.ng/iges@0.2.5) (2018-08-24) 

###  Bug Fixes 

- **iges:** regression to due transducers update ([78d0a84](https://github.com/thi-ng/umbrella/commit/78d0a84)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iges@0.1.4...@thi.ng/iges@0.2.0) (2018-08-01) 

###  Features 

- **iges:** add PolylineMode enum, update addPolyline2d() ([f7a084a](https://github.com/thi-ng/umbrella/commit/f7a084a)) 

#  0.1.0 (2018-07-12) 

###  Features 

- **iges:** re-import & update IGES exporter (via MBP2010) ([7f1b2d4](https://github.com/thi-ng/umbrella/commit/7f1b2d4))
