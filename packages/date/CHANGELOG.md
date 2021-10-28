# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@2.0.4...@thi.ng/date@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/date





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@2.0.3...@thi.ng/date@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/date





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@2.0.2...@thi.ng/date@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/date





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@2.0.1...@thi.ng/date@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/date





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@2.0.0...@thi.ng/date@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/date





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@1.0.6...@thi.ng/date@2.0.0) (2021-10-12)


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






##  [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@1.0.3...@thi.ng/date@1.0.4) (2021-08-09) 

###  Bug Fixes 

- **date:** update i18n init, withLocale() err handling ([9f68bdf](https://github.com/thi-ng/umbrella/commit/9f68bdf3048b109c16750abec0c1af2de307970d)) 

#  [0.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@0.8.0...@thi.ng/date@0.9.0) (2021-08-04) 

###  Features 

- **date:** add/update i18n functions, rel. format ([144a02d](https://github.com/thi-ng/umbrella/commit/144a02d960e0de3ec10bddf97cd069e39ad1f41d)) 

#  [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/date@0.7.0...@thi.ng/date@0.8.0) (2021-07-27) 

###  Bug Fixes
