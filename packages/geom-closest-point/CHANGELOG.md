# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@2.0.4...@thi.ng/geom-closest-point@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-closest-point





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@2.0.3...@thi.ng/geom-closest-point@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/geom-closest-point





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@2.0.2...@thi.ng/geom-closest-point@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-closest-point





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@2.0.1...@thi.ng/geom-closest-point@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-closest-point





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@2.0.0...@thi.ng/geom-closest-point@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-closest-point





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@1.0.5...@thi.ng/geom-closest-point@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@1.0.4...@thi.ng/geom-closest-point@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/geom-closest-point 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@0.4.0...@thi.ng/geom-closest-point@0.5.0) (2020-09-22) 

###  Bug Fixes 

- **geom-closest-point:** update closestPointPolyline() ([1358bac](https://github.com/thi-ng/umbrella/commit/1358bac1a95359340b19adb91b1813edf3e1645a)) 

###  Features 

- **geom-closest-point:** add support for custom dist fn ([95557f6](https://github.com/thi-ng/umbrella/commit/95557f6716071a92433868ce8536ca1c38a54073)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@0.3.44...@thi.ng/geom-closest-point@0.4.0) (2020-09-13) 

###  Bug Fixes 

- **geom-closest-point:** use alt algorithm closestPointEllipse() ([6b3d00f](https://github.com/thi-ng/umbrella/commit/6b3d00ff84aba9a430e50e2a0a9d7e0e15e95d02)) 

###  Features 

- **geom-closest-point:** add ellipse support, restructure pkg ([d331b26](https://github.com/thi-ng/umbrella/commit/d331b26fc0a0d16ed2775a784ab709ab3b6dcf60)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@0.2.3...@thi.ng/geom-closest-point@0.3.0) (2019-07-07) 

###  Bug Fixes 

- **geom-closest-point:** type hints (TS 3.5.2) ([fa146d7](https://github.com/thi-ng/umbrella/commit/fa146d7)) 
- **geom-closest-point:** update polyline & point array fns ([c5b4757](https://github.com/thi-ng/umbrella/commit/c5b4757)) 

###  Features 

- **geom-clostest-point:** enable TS strict compiler flags (refactor) ([b6b69e6](https://github.com/thi-ng/umbrella/commit/b6b69e6)) 

##  [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@0.2.2...@thi.ng/geom-closest-point@0.2.3) (2019-05-22) 

###  Bug Fixes 

- **geom-closest-point:** flip sign of plane W component, extract distToPlane() ([74dbcb0](https://github.com/thi-ng/umbrella/commit/74dbcb0)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-closest-point@0.1.13...@thi.ng/geom-closest-point@0.2.0) (2019-04-15) 

###  Features 

- **geom-closest-point:** add fns for more shape types ([5ae2887](https://github.com/thi-ng/umbrella/commit/5ae2887)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **geom-closest-point:** add more fns, update pkg ([798de06](https://github.com/thi-ng/umbrella/commit/798de06)) 
- **geom-closest-point:** extract from geom as new package ([4ff5005](https://github.com/thi-ng/umbrella/commit/4ff5005))
