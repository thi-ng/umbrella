# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.7...@thi.ng/geom-fuzz@2.0.8) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.6...@thi.ng/geom-fuzz@2.0.7) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.5...@thi.ng/geom-fuzz@2.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.4...@thi.ng/geom-fuzz@2.0.5) (2021-10-27)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.3...@thi.ng/geom-fuzz@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.2...@thi.ng/geom-fuzz@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.1...@thi.ng/geom-fuzz@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/geom-fuzz





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@2.0.0...@thi.ng/geom-fuzz@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/geom-fuzz





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@1.0.8...@thi.ng/geom-fuzz@2.0.0) (2021-10-12)


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-fuzz@1.0.6...@thi.ng/geom-fuzz@1.0.7) (2021-08-22) 

**Note:** Version bump only for package @thi.ng/geom-fuzz 

#  0.1.0 (2020-06-20) 

###  Features 

- **examples:** add geom-fuzz-basics example ([8b82723](https://github.com/thi-ng/umbrella/commit/8b82723c3708c78d5a67376036b661baec8e4ce0)) 
- **geom-fuzz:** import as new pkg ([3ff1484](https://github.com/thi-ng/umbrella/commit/3ff14848f277bd9dc7b2a009aa0a98d6e1d3df6c))
