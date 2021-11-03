# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dl-asset@1.0.5...@thi.ng/dl-asset@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/dl-asset@1.0.4...@thi.ng/dl-asset@1.0.5) (2021-09-03)

**Note:** Version bump only for package @thi.ng/dl-asset

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dl-asset@0.3.14...@thi.ng/dl-asset@0.4.0) (2020-07-08)

###  Features

- **dl-asset:** split src, extract `downloadWithMime()` ([d749819](https://github.com/thi-ng/umbrella/commit/d74981963ce4bfbfe3465c71085995173826329c))

#  0.3.0 (2020-02-26)

###  Features

- **dl-asset:** yet another npm forced pkg rename ([2cae33c](https://github.com/thi-ng/umbrella/commit/2cae33cabd379b3d449079edfc255d9cf56c34a5))

#  0.2.0 (2020-02-26)

###  Features

- **download-asset:** rename pkg due to npm name conflict ([b490b46](https://github.com/thi-ng/umbrella/commit/b490b46994333103f653514c96531637d903202d))

#  0.1.0 (2020-02-25)

###  Features

- **download:** import as new pkg ([26caaaa](https://github.com/thi-ng/umbrella/commit/26caaaadf6c3f7b6bb83e8a4160a91b7e2db8714))
