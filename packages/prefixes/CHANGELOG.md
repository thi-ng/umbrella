# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/prefixes@1.0.2...@thi.ng/prefixes@2.0.0) (2021-10-12)


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






#  0.1.0 (2020-07-02)

###  Features

- **prefixes:** add/update prefixes ([9051342](https://github.com/thi-ng/umbrella/commit/905134278b6a9d832669f2007b48142718ee964c))
- **prefixes:** import as new pkg ([0fbab43](https://github.com/thi-ng/umbrella/commit/0fbab43c9acbd89f01615672cadd964df7f9a5a3))
