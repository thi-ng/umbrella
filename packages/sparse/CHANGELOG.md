# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sparse@0.1.89...@thi.ng/sparse@0.2.0) (2021-10-12)


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






##  [0.1.89](https://github.com/thi-ng/umbrella/compare/@thi.ng/sparse@0.1.88...@thi.ng/sparse@0.1.89) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/sparse 

#  0.1.0 (2019-02-17) 

###  Features 

- **sparse:** add CSC, update all other matrix impls, remove adjacency ([cd773c9](https://github.com/thi-ng/umbrella/commit/cd773c9)) 
- **sparse:** re-import & update [@thi](https://github.com/thi).ng/sparse (MBP2010) ([a2d1cc9](https://github.com/thi-ng/umbrella/commit/a2d1cc9))
