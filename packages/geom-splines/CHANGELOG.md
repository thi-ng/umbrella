# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@2.0.5...@thi.ng/geom-splines@2.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-splines





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@2.0.4...@thi.ng/geom-splines@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-splines





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@2.0.3...@thi.ng/geom-splines@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/geom-splines





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@2.0.2...@thi.ng/geom-splines@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-splines





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@2.0.1...@thi.ng/geom-splines@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-splines





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@2.0.0...@thi.ng/geom-splines@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-splines





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@1.0.5...@thi.ng/geom-splines@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@1.0.4...@thi.ng/geom-splines@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/geom-splines 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@0.4.5...@thi.ng/geom-splines@0.5.0) (2020-02-25) 

###  Features 

- **geom-splines:** add openCubicFromBreakPoints(), refactor, [#208](https://github.com/thi-ng/umbrella/issues/208) ([1882262](https://github.com/thi-ng/umbrella/commit/188226216099a33b6251540b497ce8fd946502d8)) 
- **geom-splines:** add openCubicFromControlPoints(), [#208](https://github.com/thi-ng/umbrella/issues/208) ([1a95d94](https://github.com/thi-ng/umbrella/commit/1a95d94df2396e14247cca84d3add7385d74a693)) 
- **geom-splines:** add sampleCubicArray(), sampleQuadraticArray(), [#208](https://github.com/thi-ng/umbrella/issues/208) ([bfc09db](https://github.com/thi-ng/umbrella/commit/bfc09db2493d50576c9f57a93273a3bd102b7ad8)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@0.3.4...@thi.ng/geom-splines@0.4.0) (2019-08-21) 

###  Features 

- **geom-splines:** add cubicTangentAt / quadraticTangentAt() ([e1cf355](https://github.com/thi-ng/umbrella/commit/e1cf355)) 

##  [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@0.3.0...@thi.ng/geom-splines@0.3.1) (2019-07-31) 

###  Bug Fixes 

- **geom-splines:** fix seg count in cubicFromArc(), minor optimizations ([e289ade](https://github.com/thi-ng/umbrella/commit/e289ade)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@0.2.1...@thi.ng/geom-splines@0.3.0) (2019-07-12) 

###  Bug Fixes 

- **geom-splines:** add full circle check for cubicFromArc() ([3e386f7](https://github.com/thi-ng/umbrella/commit/3e386f7)) 
- **geom-splines:** fix [#100](https://github.com/thi-ng/umbrella/issues/100), replace cubicBounds impl ([6c64b88](https://github.com/thi-ng/umbrella/commit/6c64b88)) 

###  Features 

- **geom-splines:** add closedCubicFromBreak/ControlPoints, update readme ([1284f37](https://github.com/thi-ng/umbrella/commit/1284f37)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-splines@0.1.17...@thi.ng/geom-splines@0.2.0) (2019-07-07) 

###  Features 

- **geom-splines:** enable TS strict compiler flags (refactor) ([748417b](https://github.com/thi-ng/umbrella/commit/748417b)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **geom-splines:** extract from geom as new package ([027150a](https://github.com/thi-ng/umbrella/commit/027150a))
