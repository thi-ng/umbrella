# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/quad-edge@1.0.1...@thi.ng/quad-edge@2.0.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/quad-edge@0.1.4...@thi.ng/quad-edge@0.2.0) (2019-07-07) 

###  Features 

- **quad-edge:** enable TS strict compiler flags (refactor) ([5a6cec1](https://github.com/thi-ng/umbrella/commit/5a6cec1)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **quad-edge:** re-import & update quad edge impl (MBP2010) ([ee76797](https://github.com/thi-ng/umbrella/commit/ee76797))
