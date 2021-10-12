# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bencode@1.0.5...@thi.ng/bencode@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/bencode@1.0.4...@thi.ng/bencode@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/bencode 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bencode@0.2.17...@thi.ng/bencode@0.3.0) (2019-07-07) 

###  Features 

- **bencode:** enable TS strict compiler flags (refactor) ([1be1a14](https://github.com/thi-ng/umbrella/commit/1be1a14)) 

##  [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/bencode@0.2.0...@thi.ng/bencode@0.2.1) (2019-02-20) 

###  Bug Fixes 

- **bencode:** string list val decoding, add tests, update readme ([9f2b8ae](https://github.com/thi-ng/umbrella/commit/9f2b8ae)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bencode@0.1.1...@thi.ng/bencode@0.2.0) (2019-02-15) 

###  Features 

- **bencode:** add decode(), fix string length handling ([c1bbc6f](https://github.com/thi-ng/umbrella/commit/c1bbc6f)) 

#  0.1.0 (2019-02-05) 

###  Features 

- **bencode:** re-import updated bencode pkg ([cf7dc3a](https://github.com/thi-ng/umbrella/commit/cf7dc3a))
