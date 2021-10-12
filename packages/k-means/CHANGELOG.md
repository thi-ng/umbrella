# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/k-means@0.3.6...@thi.ng/k-means@0.4.0) (2021-10-12)


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






#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/k-means@0.2.5...@thi.ng/k-means@0.3.0) (2021-08-04) 

###  Features 

- **k-means:** auto-correct `k` if needed ([d3c3ffa](https://github.com/thi-ng/umbrella/commit/d3c3ffa768bdebe67843c8094af1fe7a9bc524ed)) 

##  [0.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/k-means@0.2.4...@thi.ng/k-means@0.2.5) (2021-08-04) 

###  Bug Fixes 

- **k-means:** update initKmeanspp() ([dd0d965](https://github.com/thi-ng/umbrella/commit/dd0d9654b1aacce8a4bbbd921f2ce44d0eaa276a)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/k-means@0.1.0...@thi.ng/k-means@0.2.0) (2021-04-20) 

###  Features 

- **k-means:** add meansLatLon centroid strategy, docstrings ([269c11c](https://github.com/thi-ng/umbrella/commit/269c11c10907351d98acfb929af5036a23a2e5c3)) 

#  0.1.0 (2021-04-19) 

###  Bug Fixes 

- **k-means:** use dist metric in initKmeanspp() ([37bd6c6](https://github.com/thi-ng/umbrella/commit/37bd6c6ae062f903cea05bd6ce9d42e97aa5dbd9)) 

###  Features 

- **k-means:** add k-medians support ([6bc450b](https://github.com/thi-ng/umbrella/commit/6bc450b95e1ed93ab18a9045ce1d4ba324a61eb3)) 
- **k-means:** add kmeans++ initialization, update opts ([fcc2dcc](https://github.com/thi-ng/umbrella/commit/fcc2dcc9624dc77e99dc69bd54c466ea0d1f3988)) 
- **k-means:** import as new pkg ([a32aaf6](https://github.com/thi-ng/umbrella/commit/a32aaf63b703993adfb61766e36f9817aae1ed62))
