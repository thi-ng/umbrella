# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/seq@0.3.0...@thi.ng/seq@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/seq





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/seq@0.2.43...@thi.ng/seq@0.3.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/seq@0.1.0...@thi.ng/seq@0.2.0) (2020-01-24) 

###  Features 

- **seq:** add lazyseq() & cons(), tests, update readme ([d25584e](https://github.com/thi-ng/umbrella/commit/d25584ed9b9600629d13f8f59217a3777372bb16)) 

#  0.1.0 (2019-11-30) 

###  Features 

- **seq:** import as new pkg ([25ebbb0](https://github.com/thi-ng/umbrella/commit/25ebbb00d8f992beaf4eaa0c855337c5932d6c1c)) 

###  Performance Improvements 

- **seq:** update most functions, add docs/tests, update readme ([552ed64](https://github.com/thi-ng/umbrella/commit/552ed646b5527569777500d0235de8e6d19ec67a))
