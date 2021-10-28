# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@2.0.5...@thi.ng/geom-voronoi@2.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-voronoi





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@2.0.4...@thi.ng/geom-voronoi@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-voronoi





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@2.0.3...@thi.ng/geom-voronoi@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/geom-voronoi





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@2.0.2...@thi.ng/geom-voronoi@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-voronoi





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@2.0.1...@thi.ng/geom-voronoi@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-voronoi





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@2.0.0...@thi.ng/geom-voronoi@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-voronoi





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@1.0.5...@thi.ng/geom-voronoi@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@1.0.4...@thi.ng/geom-voronoi@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/geom-voronoi 

##  [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@0.2.1...@thi.ng/geom-voronoi@0.2.2) (2020-07-28) 

###  Bug Fixes 

- **geom-voronoi:** always computeDual() in ctor ([12e0232](https://github.com/thi-ng/umbrella/commit/12e023265c8d141e6c5f4e539541dfc017fdcfc1)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-voronoi@0.1.55...@thi.ng/geom-voronoi@0.2.0) (2020-07-17) 

###  Features 

- **geom-voronoi:** update DVMesh.add() ([caa341b](https://github.com/thi-ng/umbrella/commit/caa341b8e40630981ca71db1c7cb84e8b30f4cc6)) 

###  Performance Improvements 

- **geom-voronoi:** optimize boundary vertex checks ([e4169bd](https://github.com/thi-ng/umbrella/commit/e4169bd73107b4835c0739676bd296c0e4902b1e)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **geom-voronoi:** add support for vertex user data, tolerances, refactor QE changes ([2ff68db](https://github.com/thi-ng/umbrella/commit/2ff68db)) 
- **geom-voronoi:** re-import & update QE delaunay/voronoi pkg (MBP2010) ([c903293](https://github.com/thi-ng/umbrella/commit/c903293)) 

###  Performance Improvements 

- **geom-voronoi:** update computeDual(), update isBoundary() ([4d19aa2](https://github.com/thi-ng/umbrella/commit/4d19aa2))
