# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/zipper@2.0.3...@thi.ng/zipper@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/zipper





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/zipper@2.0.2...@thi.ng/zipper@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/zipper





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/zipper@2.0.1...@thi.ng/zipper@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/zipper





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/zipper@2.0.0...@thi.ng/zipper@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/zipper





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/zipper@1.0.3...@thi.ng/zipper@2.0.0) (2021-10-12)


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






##  [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/zipper@1.0.2...@thi.ng/zipper@1.0.3) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/zipper 

#  0.1.0 (2019-11-30) 

###  Features 

- **zipper:** add .depth getter & tests ([65c5ec3](https://github.com/thi-ng/umbrella/commit/65c5ec30601b0229d6760854a8f1d817f4236b1d)) 
- **zipper:** add update() & tests ([defdf76](https://github.com/thi-ng/umbrella/commit/defdf762b10350f0ce3e2b7d81f097c44f4e0223)) 
- **zipper:** import new package (ported from clojure) ([5562fe4](https://github.com/thi-ng/umbrella/commit/5562fe47927e046e419e7c96ad9b2ef43e2eb818)) 
- **zipper:** major refactor, add tests, update readme ([b91d8a6](https://github.com/thi-ng/umbrella/commit/b91d8a6047d30e4cddf10d1bfb0e929881ebfe34))
