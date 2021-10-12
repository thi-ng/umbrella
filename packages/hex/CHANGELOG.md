# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hex@1.0.4...@thi.ng/hex@2.0.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hex@0.1.3...@thi.ng/hex@0.2.0) (2021-02-20) 

###  Features 

- **hex:** add uuid() ([c8417b4](https://github.com/thi-ng/umbrella/commit/c8417b4c2fe3eeb664b4131aabe592d612573703)) 

#  0.1.0 (2020-11-24) 

###  Features 

- **hex:** import as new package ([1c2f331](https://github.com/thi-ng/umbrella/commit/1c2f331bfbdc01fd0153e01dcecbab79307a7598))
