# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@2.0.8...@thi.ng/distance@2.0.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/distance





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@2.0.7...@thi.ng/distance@2.0.8) (2021-11-04)

**Note:** Version bump only for package @thi.ng/distance





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@2.0.6...@thi.ng/distance@2.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/distance





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@1.0.7...@thi.ng/distance@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **distance:** add/update argmin fns/params ([9c0f003](https://github.com/thi-ng/umbrella/commit/9c0f0032d8fbce3634971a36497ef22a7343edbb))


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@1.0.6...@thi.ng/distance@1.0.7) (2021-09-03)

**Note:** Version bump only for package @thi.ng/distance

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@0.2.2...@thi.ng/distance@0.3.0) (2021-04-19)

###  Features

- **distance:** add argmin*() fns ([72ed376](https://github.com/thi-ng/umbrella/commit/72ed3760c7a6982bcab7d94666957cad90f4f0ef))
- **distance:** replace HAVERSINE w/ alts ([3a9a77a](https://github.com/thi-ng/umbrella/commit/3a9a77ab0fd06484f2fda5d67c7b151645436a32))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@0.1.11...@thi.ng/distance@0.2.0) (2021-03-30)

###  Features

- **distance:** add HAVERSINE preset, update readme ([cfc771e](https://github.com/thi-ng/umbrella/commit/cfc771eb21cf2574eaa2476eaee7920674cae9c3))

##  [0.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/distance@0.1.8...@thi.ng/distance@0.1.9) (2021-03-17)

###  Bug Fixes

- **distance:** update KNearest ctor & heap handling ([#283](https://github.com/thi-ng/umbrella/issues/283)) ([e7cd6f1](https://github.com/thi-ng/umbrella/commit/e7cd6f134bb05d5d5e37e7e7ba241f984d94d98c))

#  0.1.0 (2021-01-21)

###  Features

- **distance:** add Manhattan metric, rename types, add docs ([4f0b199](https://github.com/thi-ng/umbrella/commit/4f0b1992ccd3ee76fce7d9c7a5433adb80b029a2))
- **distance:** add new package ([1b41aa4](https://github.com/thi-ng/umbrella/commit/1b41aa46a8e2228f69df400195a08d05d2a9f235))
- **distance:** clamp search radius, minor other changes ([4a09a0f](https://github.com/thi-ng/umbrella/commit/4a09a0f6e7ab8f2276daca58758f86b68a050caf))
- **distance:** update INeighborhood, KNearest ([be3e43d](https://github.com/thi-ng/umbrella/commit/be3e43dcaf6a25f6de0f6ffb9f241d2f09362ecb))
