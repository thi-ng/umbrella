# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@2.0.4...@thi.ng/geom-isoline@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-isoline





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@2.0.3...@thi.ng/geom-isoline@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/geom-isoline





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@2.0.2...@thi.ng/geom-isoline@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-isoline





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@2.0.1...@thi.ng/geom-isoline@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-isoline





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@2.0.0...@thi.ng/geom-isoline@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-isoline





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@1.1.4...@thi.ng/geom-isoline@2.0.0) (2021-10-12)


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@1.0.1...@thi.ng/geom-isoline@1.1.0) (2021-08-09) 

###  Bug Fixes 

- **geom-isoline:** add half-pixel offset to result coords ([9b90370](https://github.com/thi-ng/umbrella/commit/9b9037048a7664eca20fda50df44e3018323d475)) 

###  Features 

- **geom-isoline:** add scale factor support ([b3f93d2](https://github.com/thi-ng/umbrella/commit/b3f93d20ff56464d2bec86d2de721344872d0cbc)) 

##  [0.1.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@0.1.24...@thi.ng/geom-isoline@0.1.25) (2019-08-21) 

###  Performance Improvements 

- **geom-isoline:** refactor contourVertex as jump table, minor updates ([d25827e](https://github.com/thi-ng/umbrella/commit/d25827e)) 

##  [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@0.1.1...@thi.ng/geom-isoline@0.1.2) (2019-02-11) 

###  Performance Improvements 

- **geom-isoline:** flatten LUTs, manual destructure ([763d7b9](https://github.com/thi-ng/umbrella/commit/763d7b9)) 

##  [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isoline@0.1.0...@thi.ng/geom-isoline@0.1.1) (2019-02-10) 

###  Performance Improvements 

- **geom-isoline:** minor optimizations ([d990c3c](https://github.com/thi-ng/umbrella/commit/d990c3c)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **geom-isoline:** import package (ported from clojure) ([e30b211](https://github.com/thi-ng/umbrella/commit/e30b211))
