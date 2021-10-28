# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.3.5...@thi.ng/dual-algebra@0.3.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/dual-algebra





## [0.3.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.3.4...@thi.ng/dual-algebra@0.3.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/dual-algebra





## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.3.3...@thi.ng/dual-algebra@0.3.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/dual-algebra





## [0.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.3.2...@thi.ng/dual-algebra@0.3.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/dual-algebra





## [0.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.3.1...@thi.ng/dual-algebra@0.3.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/dual-algebra





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.3.0...@thi.ng/dual-algebra@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/dual-algebra





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.2.0...@thi.ng/dual-algebra@0.3.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dual-algebra@0.1.18...@thi.ng/dual-algebra@0.2.0) (2021-09-03) 

###  Features 

- **dual-algebra:** add mix(), add vector ops ([091f872](https://github.com/thi-ng/umbrella/commit/091f872e12dd6ba404a22be8b33bfa97ff345557)) 

#  0.1.0 (2020-09-13) 

###  Features 

- **dual-algebra:** import as new package ([eec4f1c](https://github.com/thi-ng/umbrella/commit/eec4f1c588b194711477e5b992206840657d140f))
