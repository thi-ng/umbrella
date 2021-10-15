# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@2.0.2...@thi.ng/geom-clip-line@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-clip-line





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@2.0.1...@thi.ng/geom-clip-line@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-clip-line





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@2.0.0...@thi.ng/geom-clip-line@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-clip-line





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@1.2.45...@thi.ng/geom-clip-line@2.0.0) (2021-10-12)


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






##  [1.2.42](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@1.2.41...@thi.ng/geom-clip-line@1.2.42) (2021-08-17) 

###  Bug Fixes 

- **geom-clip-line:** off-by-one error in clipLinePoly() ([7898810](https://github.com/thi-ng/umbrella/commit/7898810244a7a4e4cba43c7ec0bedc095e1f4be4)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@1.1.4...@thi.ng/geom-clip-line@1.2.0) (2020-07-17) 

###  Features 

- **geom-clip-line:** add clipLineSegmentPoly() ([bec7b93](https://github.com/thi-ng/umbrella/commit/bec7b93f13450a02ca62995992d1f488d2ff24be)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-line@1.0.19...@thi.ng/geom-clip-line@1.1.0) (2020-06-20) 

###  Features 

- **geom-clip-line:** add clipLinePoly(), update deps ([e096efd](https://github.com/thi-ng/umbrella/commit/e096efdbe71549a781daa5b154c47e5e0eea33d1)) 

#  1.0.0 (2020-02-25) 

###  Bug Fixes 

- **geom-clip-line:** fix internal clip edge classifier ([c0cc9af](https://github.com/thi-ng/umbrella/commit/c0cc9af93293b3e68e9d5724874039e16bd6835e)) 

###  Documentation 

- **geom-clip-line:** update readme ([f78374b](https://github.com/thi-ng/umbrella/commit/f78374bec7dfe6227faaf699ab51e9a129ade922)) 

###  Features 

- **geom-clip-line:** extract as own pkg (from [@thi](https://github.com/thi).ng/geom-clip) ([34e3262](https://github.com/thi-ng/umbrella/commit/34e3262f8784df44f4adb729110d37513fccdfb3)) 

###  BREAKING CHANGES 

- **geom-clip-line:** extract as own pkg (formerly @thi.ng/geom-clip)
