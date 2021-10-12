# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.2.11...@thi.ng/binary@3.0.0) (2021-10-12)


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






#  [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.1.0...@thi.ng/binary@2.2.0) (2021-03-03) 

###  Features 

- **binary:** add binary/one-hot conversions ([eeb6396](https://github.com/thi-ng/umbrella/commit/eeb6396ae1fbe700643d5a98a3923af9c1e9c51a)) 

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.0.21...@thi.ng/binary@2.1.0) (2021-02-20) 

###  Features
