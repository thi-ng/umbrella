# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/ksuid@2.0.0...@thi.ng/ksuid@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/ksuid





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ksuid@1.0.6...@thi.ng/ksuid@2.0.0) (2021-10-12)


### Bug Fixes

* **tools:** update ksuid benchmarks ([6b3dbab](https://github.com/thi-ng/umbrella/commit/6b3dbabe41c4df6caca367037e7fc16c5441958b))


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/ksuid@1.0.4...@thi.ng/ksuid@1.0.5) (2021-08-24) 

**Note:** Version bump only for package @thi.ng/ksuid 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ksuid@0.3.0...@thi.ng/ksuid@0.4.0) (2021-08-07) 

###  Features 

- **ksuid:** add ULID impl, update IKSUID & tests ([566846b](https://github.com/thi-ng/umbrella/commit/566846b7cfa735f15d07b25e4514fa3ee540adbf)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ksuid@0.2.6...@thi.ng/ksuid@0.3.0) (2021-08-07) 

###  Code Refactoring 

- **ksuid:** extract IKSUID, update impls, docs ([1276c94](https://github.com/thi-ng/umbrella/commit/1276c940d6e7b584d90eb871261ff6a28352de4f)) 

###  Features 

- **ksuid:** pkg restructure, add 64bit version ([9c40b20](https://github.com/thi-ng/umbrella/commit/9c40b2053afb9067723bfb0377e5e3ea2a38c52a)) 

###  BREAKING CHANGES 

- **ksuid:** Rename KSUID => KSUID32 / defKSUID32() 
    - update readme 
    - update tests 
    - update pkg meta 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ksuid@0.1.10...@thi.ng/ksuid@0.2.0) (2021-03-28) 

###  Features 

- **ksuid:** add .parse() & .timeOnly() ([80a0f70](https://github.com/thi-ng/umbrella/commit/80a0f70a2593af1c4e77a33dd3f98e36d9231c1c)) 

#  0.1.0 (2021-01-13) 

###  Features 

- **ksuid:** import as new pkg ([67a2e61](https://github.com/thi-ng/umbrella/commit/67a2e611a52ecd8870b43848e95d457f63185428)) 

###  Performance Improvements 

- **ksuid:** add benchmarks ([aace41c](https://github.com/thi-ng/umbrella/commit/aace41ce8ec0864d38a27d9b0461b705e9e122dc))
