# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/poisson@1.1.53...@thi.ng/poisson@2.0.0) (2021-10-12)


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/poisson@1.0.17...@thi.ng/poisson@1.1.0) (2020-05-29) 

###  Features 

- **poisson:** add stratifiedGrid(), restructure pkg ([62cd31a](https://github.com/thi-ng/umbrella/commit/62cd31a87236daaf4089543aa49e847827bb8b55)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/poisson@0.2.27...@thi.ng/poisson@1.0.0) (2020-01-24) 

###  Features 

- **poisson:** update to use ISpatialSet ([32a20fe](https://github.com/thi-ng/umbrella/commit/32a20fee6dadeed62610ef7d83c1824775cb28af)) 

###  BREAKING CHANGES 

- **poisson:** update to use latest geom-accel API 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/poisson@0.1.2...@thi.ng/poisson@0.2.0) (2019-02-05) 

###  Features 

- **poisson:** add geom-api dep, optimize search ([bee1c89](https://github.com/thi-ng/umbrella/commit/bee1c89)) 

#  0.1.0 (2019-01-21) 

###  Features 

- **poisson:** re-import & update poisson package (MBP2010) ([193f9d4](https://github.com/thi-ng/umbrella/commit/193f9d4))
