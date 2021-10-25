# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@2.0.3...@thi.ng/idgen@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/idgen





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@2.0.2...@thi.ng/idgen@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/idgen





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@2.0.1...@thi.ng/idgen@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/idgen





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@2.0.0...@thi.ng/idgen@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/idgen





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@1.0.5...@thi.ng/idgen@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@1.0.4...@thi.ng/idgen@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/idgen 

##  [0.2.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@0.2.28...@thi.ng/idgen@0.2.29) (2021-01-02) 

###  Performance Improvements 

- **idgen:** minor updates IDGen, add doc strings ([1c0e284](https://github.com/thi-ng/umbrella/commit/1c0e284e9f48d4a37a55f74db0fb2b6eade9dc89)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/idgen@0.1.0...@thi.ng/idgen@0.2.0) (2020-01-24) 

###  Features 

- **idgen:** add IClear impl, fix available() getter, add tests ([e467978](https://github.com/thi-ng/umbrella/commit/e467978f7cd3e82b188ce40631f7367d8e9cebdd)) 
- **idgen:** support increasing ID range capacity ([f040eb5](https://github.com/thi-ng/umbrella/commit/f040eb5cb04e458e753fb37fa4dc2fc32a3e0e8c)) 

#  0.1.0 (2019-11-30) 

###  Features 

- **idgen:** add INotify impl, add tests ([7aec9b7](https://github.com/thi-ng/umbrella/commit/7aec9b7e7cd0d335e90bd50f5fb47c7b72188fbf)) 
- **idgen:** import as new pkg ([bff5f5b](https://github.com/thi-ng/umbrella/commit/bff5f5b66d05449c79e5087385bdecc43594a700))
