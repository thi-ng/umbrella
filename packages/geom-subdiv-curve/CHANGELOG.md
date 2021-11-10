# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-subdiv-curve@2.0.8...@thi.ng/geom-subdiv-curve@2.0.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/geom-subdiv-curve





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-subdiv-curve@2.0.7...@thi.ng/geom-subdiv-curve@2.0.8) (2021-11-04)

**Note:** Version bump only for package @thi.ng/geom-subdiv-curve





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-subdiv-curve@2.0.6...@thi.ng/geom-subdiv-curve@2.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/geom-subdiv-curve





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-subdiv-curve@1.0.5...@thi.ng/geom-subdiv-curve@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-subdiv-curve@1.0.4...@thi.ng/geom-subdiv-curve@1.0.5) (2021-09-03)

**Note:** Version bump only for package @thi.ng/geom-subdiv-curve

#  0.1.0 (2019-02-05)

###  Features

- **geom-subdiv-curve:** extract from geom as new package ([324a516](https://github.com/thi-ng/umbrella/commit/324a516))
