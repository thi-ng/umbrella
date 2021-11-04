# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy-viz@2.0.8...@thi.ng/fuzzy-viz@2.0.9) (2021-11-04)

**Note:** Version bump only for package @thi.ng/fuzzy-viz





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy-viz@2.0.7...@thi.ng/fuzzy-viz@2.0.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/fuzzy-viz





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy-viz@1.0.9...@thi.ng/fuzzy-viz@2.0.0) (2021-10-12)


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






##  [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy-viz@1.0.7...@thi.ng/fuzzy-viz@1.0.8) (2021-08-22)

**Note:** Version bump only for package @thi.ng/fuzzy-viz

##  [0.1.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy-viz@0.1.16...@thi.ng/fuzzy-viz@0.1.17) (2021-03-24)

###  Performance Improvements

- **fuzzy-viz:** update fuzzySetToAscii() ([84c6a3f](https://github.com/thi-ng/umbrella/commit/84c6a3f077c16027c9dde79618992bbe3be9d5a6))

#  0.1.0 (2020-12-22)

###  Bug Fixes

- **fuzzy-viz:** update imports ([22f37a5](https://github.com/thi-ng/umbrella/commit/22f37a526acd6911720100e77ad41029d8799004))

###  Features

- **fuzzy-viz:** add/update instrumentStrategy() & co ([131d137](https://github.com/thi-ng/umbrella/commit/131d13776735e3dd222090a6b514bfbe4878d9f2))
- **fuzzy-viz:** add/update viz options, fix zero marker ([bee9cd0](https://github.com/thi-ng/umbrella/commit/bee9cd08b32ce43cc6661146dd87f35db9516559))
- **fuzzy-viz:** import as new pkg ([8b23934](https://github.com/thi-ng/umbrella/commit/8b239347894bf8c7192890151868ecdb1ac3bf2b))
