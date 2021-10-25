# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@2.0.3...@thi.ng/system@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/system





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@2.0.2...@thi.ng/system@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/system





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@2.0.1...@thi.ng/system@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/system





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@2.0.0...@thi.ng/system@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/system





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@1.0.8...@thi.ng/system@2.0.0) (2021-10-12)


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@1.0.6...@thi.ng/system@1.0.7) (2021-08-22) 

**Note:** Version bump only for package @thi.ng/system 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@0.2.48...@thi.ng/system@0.3.0) (2021-03-30) 

###  Features 

- **system:** add package LOGGER ([f67364c](https://github.com/thi-ng/umbrella/commit/f67364cb12f7a868e005a8f6ea7759d9fc03c216)) 

##  [0.2.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@0.2.25...@thi.ng/system@0.2.26) (2020-09-13) 

###  Bug Fixes 

- **system:** fix [#247](https://github.com/thi-ng/umbrella/issues/247), allow custom keys in ILifecycle ([a7b8680](https://github.com/thi-ng/umbrella/commit/a7b86804255f22cbdbcaf128854ba615fb5cf20f)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/system@0.1.0...@thi.ng/system@0.2.0) (2020-04-03) 

###  Features 

- **system:** update ILifecycle, keep graph, add/update docs ([791c67d](https://github.com/thi-ng/umbrella/commit/791c67d446c5fae041831a16b250b5cfd62312d0)) 

#  0.1.0 (2020-04-02) 

###  Features 

- **system:** import as new pkg, add tests, readme ([709d896](https://github.com/thi-ng/umbrella/commit/709d896cee964dc876e1e53c95a3b77a00d8c433))
