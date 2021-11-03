# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/leb128@2.0.6...@thi.ng/leb128@2.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/leb128





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/leb128@1.0.69...@thi.ng/leb128@2.0.0) (2021-10-12)


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






##  [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/leb128@1.0.0...@thi.ng/leb128@1.0.1) (2019-11-30)

###  Bug Fixes

- **leb128:** add type hints ([18a4380](https://github.com/thi-ng/umbrella/commit/18a4380336604f4a8fc890296d5c9dce5d9c0cd2))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/leb128@0.1.5...@thi.ng/leb128@1.0.0) (2019-11-09)

###  Features

- **leb128:** no more async init, remove READY promise, update tests ([2044583](https://github.com/thi-ng/umbrella/commit/20445837f5af1891703e1c51fe8db56e69f11c86))

###  BREAKING CHANGES

- **leb128:** switch to synchronous initialization

#  0.1.0 (2019-07-07)

###  Features

- **leb128:** add READY promise to allow waiting for WASM initialization ([60c3245](https://github.com/thi-ng/umbrella/commit/60c3245))
- **leb128:** add zig tests, move binary to sep src file for auto regen ([2a89cde](https://github.com/thi-ng/umbrella/commit/2a89cde))
- **leb128:** import new hybrid TS/WASM/zig package, incl. readme & tests ([140b238](https://github.com/thi-ng/umbrella/commit/140b238))
