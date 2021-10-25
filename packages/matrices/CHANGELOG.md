# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@2.0.3...@thi.ng/matrices@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/matrices





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@2.0.2...@thi.ng/matrices@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/matrices





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@2.0.1...@thi.ng/matrices@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/matrices





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@2.0.0...@thi.ng/matrices@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/matrices





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@1.0.5...@thi.ng/matrices@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@1.0.4...@thi.ng/matrices@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/matrices 

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.5.12...@thi.ng/matrices@0.6.0) (2020-02-25) 

###  Bug Fixes 

- **matrices:** ([#205](https://github.com/thi-ng/umbrella/issues/205)) fix `w` calc in mulV344() ([46c1061](https://github.com/thi-ng/umbrella/commit/46c1061078d394d5b6ec2885f1025741893fe452)) 

###  Features 

- **matrices:** add project3(), refactor unproject(), mulV344() ([61c36fc](https://github.com/thi-ng/umbrella/commit/61c36fcc532d78b21d78dddeee5523155b0798b2)) 

##  [0.5.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.5.0...@thi.ng/matrices@0.5.1) (2019-07-08) 

###  Bug Fixes 

- **matrices:** mixQ result handling ([cc9ab35](https://github.com/thi-ng/umbrella/commit/cc9ab35)) 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.4.0...@thi.ng/matrices@0.5.0) (2019-07-07) 

###  Bug Fixes 

- **matrices:** update maddN call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([4a985c5](https://github.com/thi-ng/umbrella/commit/4a985c5)) 

###  Features 

- **matrices:** add isOrthagonal() ([d75305b](https://github.com/thi-ng/umbrella/commit/d75305b)) 
- **matrices:** add matXXn & matXXv fns ([7a2ef82](https://github.com/thi-ng/umbrella/commit/7a2ef82)) 
- **matrices:** add matXXn, matXXv, mulXXvm fns ([9359bbc](https://github.com/thi-ng/umbrella/commit/9359bbc)) 
- **matrices:** enable TS strict compiler flags (refactor) ([7b1c81a](https://github.com/thi-ng/umbrella/commit/7b1c81a)) 
- **matrices:** rename normal44 => normal33, add new normal44 (w/ M44 result) ([d54f746](https://github.com/thi-ng/umbrella/commit/d54f746)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.3.4...@thi.ng/matrices@0.4.0) (2019-05-22) 

###  Features 

- **matrices:** add outerProduct for vec 2/3/4 ([2a9d076](https://github.com/thi-ng/umbrella/commit/2a9d076)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.2.2...@thi.ng/matrices@0.3.0) (2019-04-07) 

###  Features 

- **matrices:** add transform23/44 fns ([dab6839](https://github.com/thi-ng/umbrella/commit/dab6839)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.1.14...@thi.ng/matrices@0.2.0) (2019-04-02) 

###  Features 

- **matrices:** add MatXXLike type aliases ([a2ace9f](https://github.com/thi-ng/umbrella/commit/a2ace9f)) 

##  [0.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/matrices@0.1.5...@thi.ng/matrices@0.1.6) (2019-02-19) 

###  Bug Fixes 

- **matrices:** Fix identity44 dispatch ([6812b2b](https://github.com/thi-ng/umbrella/commit/6812b2b)) 

#  0.1.0 (2019-01-21) 

###  Bug Fixes 

- **matrices:** inject default output handling code ([0b07ac8](https://github.com/thi-ng/umbrella/commit/0b07ac8)) 
- **matrices:** re-add persp divide in mulV344() ([4c6fe06](https://github.com/thi-ng/umbrella/commit/4c6fe06)) 
- **matrices:** scaleWithCenter* (add missing concat() arg) ([4f02491](https://github.com/thi-ng/umbrella/commit/4f02491)) 

###  Features 

- **matrices:** add cwise matrix multiply, rename mul* => mulM*, move mulQ ([ae7a039](https://github.com/thi-ng/umbrella/commit/ae7a039)) 
- **matrices:** add m22 & m23 matrix converters ([2aceab9](https://github.com/thi-ng/umbrella/commit/2aceab9)) 
- **matrices:** add M44 factories ([f1a5cf1](https://github.com/thi-ng/umbrella/commit/f1a5cf1)) 
- **matrices:** add more matrix ops ([35babfc](https://github.com/thi-ng/umbrella/commit/35babfc)) 
- **matrices:** add more matrix ops, optimize & simplify ([f04e79e](https://github.com/thi-ng/umbrella/commit/f04e79e)) 
- **matrices:** add quaternion fns ([b03b919](https://github.com/thi-ng/umbrella/commit/b03b919)) 
- **matrices:** add quatToMat33, update readme ([52fb939](https://github.com/thi-ng/umbrella/commit/52fb939)) 
- **matrices:** add rotationAroundAxis33/44() ([27f65f9](https://github.com/thi-ng/umbrella/commit/27f65f9)) 
- **matrices:** add trace() ([16d56a3](https://github.com/thi-ng/umbrella/commit/16d56a3)) 
- **matrices:** add viewport(), project/unproject(), update invert() ([d9e1b2e](https://github.com/thi-ng/umbrella/commit/d9e1b2e)) 
- **matrices:** extract matrix ops to own package ([f940672](https://github.com/thi-ng/umbrella/commit/f940672)) 

###  Performance Improvements 

- **matrices:** use setC6() for M23 ops ([d462ae0](https://github.com/thi-ng/umbrella/commit/d462ae0))
