# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@3.0.0...@thi.ng/geom-api@3.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-api





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@2.0.31...@thi.ng/geom-api@3.0.0) (2021-10-12)


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






#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@1.1.4...@thi.ng/geom-api@2.0.0) (2020-12-22) 

###  Code Refactoring 

- **geom-api:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) remove Type enum ([e2cd24a](https://github.com/thi-ng/umbrella/commit/e2cd24a7fc24af4c2541cd426e5b03431cc8fe86)) 
- **geom-api:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([c079a2a](https://github.com/thi-ng/umbrella/commit/c079a2ac620ef731429501d88580b4baada98ab6)) 

###  BREAKING CHANGES 

- **geom-api:** remove obsolete shape Type enum 
- **geom-api:** replace SegmentType enum w/ type alias 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@1.0.34...@thi.ng/geom-api@1.1.0) (2020-09-22) 

###  Features 

- **geom-api:** add Type.TEXT/3 ([0a45ef8](https://github.com/thi-ng/umbrella/commit/0a45ef8aa99d3dab1bb98c503cf87d1bef0ab8e2)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@0.3.8...@thi.ng/geom-api@1.0.0) (2020-01-24) 

###  Features 

- **geom-api:** replace ISpatialAccel w/ new interfaces ([baa05d1](https://github.com/thi-ng/umbrella/commit/baa05d1908a940115690cb3d1dd403173061d63a)) 

###  BREAKING CHANGES 

- **geom-api:** replace ISpatialAccel with new interfaces: ISpatialMap, ISpatialSet, IRegionQuery 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@0.2.5...@thi.ng/geom-api@0.3.0) (2019-07-12) 

###  Features 

- **geom-api:** add CubicOpts ([81ac728](https://github.com/thi-ng/umbrella/commit/81ac728)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-api@0.1.12...@thi.ng/geom-api@0.2.0) (2019-04-15) 

###  Features 

- **geom-api:** add more Type enums ([90e8b50](https://github.com/thi-ng/umbrella/commit/90e8b50)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **geom-api:** add ISpatialAccel.selectVals() ([4bde37e](https://github.com/thi-ng/umbrella/commit/4bde37e)) 
- **geom-api:** extract from geom as new package ([4e53293](https://github.com/thi-ng/umbrella/commit/4e53293)) 
- **geom-api:** re-add Convexity enum ([6ee03eb](https://github.com/thi-ng/umbrella/commit/6ee03eb))
