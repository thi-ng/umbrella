# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/csv@2.0.0...@thi.ng/csv@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/csv





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/csv@1.0.7...@thi.ng/csv@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **csv:** add formatCSV(), types, tests ([a2ca1b6](https://github.com/thi-ng/umbrella/commit/a2ca1b6d5cd491692a7867ad9a550767e8340588))


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/csv@1.0.6...@thi.ng/csv@1.0.7) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/csv 

#  0.1.0 (2020-11-24) 

###  Bug Fixes 

- **csv:** add quoting/newline support in header fields ([28cac18](https://github.com/thi-ng/umbrella/commit/28cac1884b074d125fee747c76d3abc423cfe7ea)) 

###  Features 

- **csv:** add coercions, restructure ([93d79ec](https://github.com/thi-ng/umbrella/commit/93d79ec0b9b81ab209046bd460b5f7993359e547)) 
- **csv:** add/update CSVOpts, cell transforms, docs ([282e85c](https://github.com/thi-ng/umbrella/commit/282e85cf9c1a9aae704d918218f8c143b51a88df)) 
- **csv:** import as new package ([2b07100](https://github.com/thi-ng/umbrella/commit/2b07100f27bb9fb1f934901aec7c9fc1fab67fbf))
