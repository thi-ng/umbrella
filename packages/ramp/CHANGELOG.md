# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/ramp@2.0.3...@thi.ng/ramp@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/ramp





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/ramp@2.0.2...@thi.ng/ramp@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/ramp





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/ramp@2.0.1...@thi.ng/ramp@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/ramp





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/ramp@2.0.0...@thi.ng/ramp@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/ramp





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ramp@1.0.7...@thi.ng/ramp@2.0.0) (2021-10-12)


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/ramp@1.0.6...@thi.ng/ramp@1.0.7) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/ramp 

#  0.1.0 (2020-01-24) 

###  Features 

- **ramp:** add ARamp.bounds(), factory fns, optimize timeIndex(), add benchmarks ([83d3670](https://github.com/thi-ng/umbrella/commit/83d3670c7322fd2b47c27e0bda896b9ab83ffd7c)) 
- **ramp:** import as new pkg ([d58ba4e](https://github.com/thi-ng/umbrella/commit/d58ba4ed4d2ba76ca9c748cf23fcd86a0ff9cca7))
