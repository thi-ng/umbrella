# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp-io-wav@2.0.2...@thi.ng/dsp-io-wav@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/dsp-io-wav





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp-io-wav@2.0.1...@thi.ng/dsp-io-wav@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/dsp-io-wav





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp-io-wav@2.0.0...@thi.ng/dsp-io-wav@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/dsp-io-wav





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp-io-wav@1.0.7...@thi.ng/dsp-io-wav@2.0.0) (2021-10-12)


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp-io-wav@1.0.6...@thi.ng/dsp-io-wav@1.0.7) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/dsp-io-wav 

#  0.1.0 (2020-02-25) 

###  Features 

- **dsp-io-wav:** add waveBytes() iterator ([bde667f](https://github.com/thi-ng/umbrella/commit/bde667fe4b08f03a7bbf4fa95d8e71c296d5bfb7)) 
- **dsp-io-wav:** initial import ([e9fb42e](https://github.com/thi-ng/umbrella/commit/e9fb42e5cb260997ff38055e713aebd82aaf3843))
