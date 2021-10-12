# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph-dot@1.0.8...@thi.ng/dgraph-dot@2.0.0) (2021-10-12)


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph-dot@1.0.6...@thi.ng/dgraph-dot@1.0.7) (2021-08-22) 

**Note:** Version bump only for package @thi.ng/dgraph-dot 

#  0.1.0 (2020-04-03) 

###  Features 

- **dgraph-dot:** import as new pkg ([9671ced](https://github.com/thi-ng/umbrella/commit/9671ceda29b0cd0ebbedce449943eec5abeff882))
