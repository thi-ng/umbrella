# Change Log

- **Last updated**: 2024-01-23T15:58:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@2.4.0) (2023-06-09)

#### 🚀 Features

- add INeighborhood.includesPosition() ([2018e41](https://github.com/thi-ng/umbrella/commit/2018e41))
  - update all impls: Nearest/KNearest/Radial

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@2.3.0) (2023-05-28)

#### 🚀 Features

- add Radial neighborhood impls ([667fed9](https://github.com/thi-ng/umbrella/commit/667fed9))
  - add radial/2/3/N() factories

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@2.2.0) (2023-02-05)

#### 🚀 Features

- update KNearest, add setters ([6b185f4](https://github.com/thi-ng/umbrella/commit/6b185f4))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### 🚀 Features

- add/update argmin fns/params ([9c0f003](https://github.com/thi-ng/umbrella/commit/9c0f003))
  - add argminN() for numeric inputs
  - updata argmin fn to accept metric functions OR IDistance impls
  - add [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks) as direct dependency (already was transitive)

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([df599da](https://github.com/thi-ng/umbrella/commit/df599da))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@0.3.0) (2021-04-19)

#### 🚀 Features

- add argmin*() fns ([72ed376](https://github.com/thi-ng/umbrella/commit/72ed376))
- replace HAVERSINE w/ alts ([3a9a77a](https://github.com/thi-ng/umbrella/commit/3a9a77a))
  - add HAVERSINE_LATLON,  HAVERSINE_LONLAT
  - update readme

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@0.2.0) (2021-03-30)

#### 🚀 Features

- add HAVERSINE preset, update readme ([cfc771e](https://github.com/thi-ng/umbrella/commit/cfc771e))

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@0.1.9) (2021-03-17)

#### 🩹 Bug fixes

- update KNearest ctor & heap handling ([#283](https://github.com/thi-ng/umbrella/issues/283)) ([e7cd6f1](https://github.com/thi-ng/umbrella/commit/e7cd6f1))
  - add k>0 assertion in ctor

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@0.1.2) (2021-02-20)

#### ♻️ Refactoring

- use clamp0() ([8987946](https://github.com/thi-ng/umbrella/commit/8987946))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/distance@0.1.0) (2021-01-21)

#### 🚀 Features

- add new package ([1b41aa4](https://github.com/thi-ng/umbrella/commit/1b41aa4))
- update INeighborhood, KNearest ([be3e43d](https://github.com/thi-ng/umbrella/commit/be3e43d))
  - expose `dist` impl in INeighborhood
  - disable sort-by-default in KNearest
  - fix Knearest.reset dist metric
  - add docs
  - update tests
- clamp search radius, minor other changes ([4a09a0f](https://github.com/thi-ng/umbrella/commit/4a09a0f))
- add Manhattan metric, rename types, add docs ([4f0b199](https://github.com/thi-ng/umbrella/commit/4f0b199))
