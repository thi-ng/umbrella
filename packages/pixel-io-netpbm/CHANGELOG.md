# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@2.0.5...@thi.ng/pixel-io-netpbm@2.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@2.0.4...@thi.ng/pixel-io-netpbm@2.0.5) (2021-10-25)

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@2.0.3...@thi.ng/pixel-io-netpbm@2.0.4) (2021-10-15)

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@2.0.2...@thi.ng/pixel-io-netpbm@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@2.0.1...@thi.ng/pixel-io-netpbm@2.0.2) (2021-10-13)

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@2.0.0...@thi.ng/pixel-io-netpbm@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@1.0.7...@thi.ng/pixel-io-netpbm@2.0.0) (2021-10-12)


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel-io-netpbm@1.0.6...@thi.ng/pixel-io-netpbm@1.0.7) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/pixel-io-netpbm 

#  0.1.0 (2021-02-20) 

###  Features 

- **pixel-io-netpbm:** add opt comment support ([2659031](https://github.com/thi-ng/umbrella/commit/265903115d4ca0ac71f1811b22afa016b685832e)) 
- **pixel-io-netpbm:** add/update readers/writers ([a62ef0b](https://github.com/thi-ng/umbrella/commit/a62ef0b88218f87e17bd16b0cec3dd561d73669f)) 
- **pixel-io-netpbm:** import as new pkg ([697b842](https://github.com/thi-ng/umbrella/commit/697b842bf5d3754bee88954cc84367d65734019d))
