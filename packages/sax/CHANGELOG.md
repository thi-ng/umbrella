# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@2.0.2...@thi.ng/sax@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/sax





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@2.0.1...@thi.ng/sax@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/sax





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@2.0.0...@thi.ng/sax@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/sax





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.73...@thi.ng/sax@2.0.0) (2021-10-12)


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.0.19...@thi.ng/sax@1.1.0) (2019-07-07) 

###  Features 

- **sax:** enable TS strict compiler flags (refactor) ([eb30aaf](https://github.com/thi-ng/umbrella/commit/eb30aaf)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.5.13...@thi.ng/sax@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.4.1...@thi.ng/sax@0.5.0) (2018-09-25) 

###  Features 

- **sax:** add opt support for boolean attribs, add tests ([5119b67](https://github.com/thi-ng/umbrella/commit/5119b67)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.3.21...@thi.ng/sax@0.4.0) (2018-09-24) 

###  Features 

- **sax:** update parse() to return iterator if input given (optional) ([665564c](https://github.com/thi-ng/umbrella/commit/665564c)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.2.0...@thi.ng/sax@0.3.0) (2018-06-20) 

###  Features 

- **sax:** add children & trim opts, add CDATA support ([882f394](https://github.com/thi-ng/umbrella/commit/882f394)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.1.1...@thi.ng/sax@0.2.0) (2018-06-19) 

###  Features 

- **sax:** add support for escape seqs, minor optimizations ([e824b6b](https://github.com/thi-ng/umbrella/commit/e824b6b)) 

##  [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.1.0...@thi.ng/sax@0.1.1) (2018-06-18) 

###  Bug Fixes 

- **sax:** correct docs in readme ([0e4662d](https://github.com/thi-ng/umbrella/commit/0e4662d)) 

#  0.1.0 (2018-06-18) 

###  Features 

- **sax:** add entity support, update result format, update states ([0f2fcdf](https://github.com/thi-ng/umbrella/commit/0f2fcdf)) 
- **sax:** add support for proc & doctype elements, update `end` results ([a4766a5](https://github.com/thi-ng/umbrella/commit/a4766a5)) 
- **sax:** emit child elements with `end` results, support comments ([3dea954](https://github.com/thi-ng/umbrella/commit/3dea954)) 
- **sax:** initial import ([dce189f](https://github.com/thi-ng/umbrella/commit/dce189f)) 
- **sax:** update error handling, add parse() wrapper, add FSMOpts ([64f2378](https://github.com/thi-ng/umbrella/commit/64f2378))
