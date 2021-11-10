# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/colored-noise@0.2.8...@thi.ng/colored-noise@0.2.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/colored-noise





## [0.2.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/colored-noise@0.2.7...@thi.ng/colored-noise@0.2.8) (2021-11-04)

**Note:** Version bump only for package @thi.ng/colored-noise





## [0.2.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/colored-noise@0.2.6...@thi.ng/colored-noise@0.2.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/colored-noise





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/colored-noise@0.1.47...@thi.ng/colored-noise@0.2.0) (2021-10-12)


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






##  [0.1.47](https://github.com/thi-ng/umbrella/compare/@thi.ng/colored-noise@0.1.46...@thi.ng/colored-noise@0.1.47) (2021-09-03)

**Note:** Version bump only for package @thi.ng/colored-noise

#  0.1.0 (2020-08-28)

###  Features

- **colored-noise:** import as new pkg (MBP2010) ([6459256](https://github.com/thi-ng/umbrella/commit/64592562ee4e4374011edc596e28f41b94218b44))
