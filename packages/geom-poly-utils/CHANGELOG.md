# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@2.0.4...@thi.ng/geom-poly-utils@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-poly-utils





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@2.0.3...@thi.ng/geom-poly-utils@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/geom-poly-utils





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@2.0.2...@thi.ng/geom-poly-utils@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-poly-utils





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@2.0.1...@thi.ng/geom-poly-utils@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-poly-utils





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@2.0.0...@thi.ng/geom-poly-utils@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-poly-utils





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@1.0.5...@thi.ng/geom-poly-utils@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@1.0.4...@thi.ng/geom-poly-utils@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/geom-poly-utils 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@0.2.2...@thi.ng/geom-poly-utils@0.3.0) (2020-12-22) 

###  Features 

- **geom-poly-utils:** add tangents(), smoothTangents() ([12a9d8a](https://github.com/thi-ng/umbrella/commit/12a9d8a641672f4c3e007a80dd08cfe9b54ce650)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@0.1.66...@thi.ng/geom-poly-utils@0.2.0) (2020-11-24) 

###  Features 

- **geom-poly-utils:** add circumCenter3() ([342b4a3](https://github.com/thi-ng/umbrella/commit/342b4a36f634966c52d92b5beb22e41f79db1451)) 

##  [0.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-poly-utils@0.1.17...@thi.ng/geom-poly-utils@0.1.18) (2019-07-07) 

###  Bug Fixes 

- **geom-poly-utils:** update madd call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([3250c82](https://github.com/thi-ng/umbrella/commit/3250c82)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **geom-poly-utils:** add convexity(), remove obsolete/migrated point checks ([895102d](https://github.com/thi-ng/umbrella/commit/895102d)) 
- **geom-poly-utils:** extract from geom as new package ([5ef4c56](https://github.com/thi-ng/umbrella/commit/5ef4c56)) 
- **geom-poly-utils:** move barycentric fns from main geom pkg ([68a26f4](https://github.com/thi-ng/umbrella/commit/68a26f4))
