# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/base-n@1.0.5...@thi.ng/base-n@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/base-n@1.0.4...@thi.ng/base-n@1.0.5) (2021-08-24) 

###  Bug Fixes 

- **base-n:** fix [#308](https://github.com/thi-ng/umbrella/issues/308), remove unintentional int cast ([27a0d7e](https://github.com/thi-ng/umbrella/commit/27a0d7e5052d6c40b247bfe4ef8c1611b9907a6a)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/base-n@0.1.8...@thi.ng/base-n@0.2.0) (2021-08-07) 

###  Features 

- **base-n:** add BASE32_CROCKFORD preset ([7d1cad9](https://github.com/thi-ng/umbrella/commit/7d1cad9430746efe80cd70482906b6f03b262d8a))

# 0.1.0 (2021-01-13)

### Features

- **base-n:** add en/decodeBytes(), add BASE16_XX ([d6205d7](https://github.com/thi-ng/umbrella/commit/d6205d72331bf038ebdc95c221763e2f794c10a9)) 
- **base-n:** import as new pkg (MBP2010) ([f5763b3](https://github.com/thi-ng/umbrella/commit/f5763b3c6be87eb0e27a9239527283323c3e774c))
