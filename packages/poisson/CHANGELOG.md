# Change Log

- **Last updated**: 2023-11-09T10:28:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.43) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.3) (2023-02-17)

#### 🩹 Bug fixes

- actually use squared distance in stratifiedGrid2/3 ([59f20f5](https://github.com/thi-ng/umbrella/commit/59f20f5))
  - update separation default value

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.0) (2023-02-05)

#### 🚀 Features

- add scale option for stratifiedGrid2/3 ([0f828a7](https://github.com/thi-ng/umbrella/commit/0f828a7))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.0.0) (2022-12-22)

#### 🛑 Breaking changes

- update/fix/replace stratifiedGrid() ([e84f920](https://github.com/thi-ng/umbrella/commit/e84f920))
- BREAKING CHANGE: replace stratifiedGrid() w/ new fns
  - add stratifiedGrid2/3() fns
  - update StratifiedGridOpts
  - remove old stratifiedGrid() fn

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@2.0.0) (2021-10-12)

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

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (transducers) ([1a111e1](https://github.com/thi-ng/umbrella/commit/1a111e1))

### [1.1.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@1.1.21) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [1.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@1.1.16) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([fe03bcc](https://github.com/thi-ng/umbrella/commit/fe03bcc))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@1.1.0) (2020-05-29)

#### 🚀 Features

- add stratifiedGrid(), restructure pkg ([62cd31a](https://github.com/thi-ng/umbrella/commit/62cd31a))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@1.0.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([601f716](https://github.com/thi-ng/umbrella/commit/601f716))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@1.0.0) (2020-01-24)

#### 🛑 Breaking changes

- update to use ISpatialSet ([32a20fe](https://github.com/thi-ng/umbrella/commit/32a20fe))
- BREAKING CHANGE: update to use latest geom-accel API

### [0.2.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@0.2.17) (2019-07-07)

#### ♻️ Refactoring

- TS strictNullChecks ([09b42da](https://github.com/thi-ng/umbrella/commit/09b42da))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@0.1.2) (2019-01-31)

#### 🚀 Features

- add geom-api dep, optimize search ([bee1c89](https://github.com/thi-ng/umbrella/commit/bee1c89))
  - use ISpatialAccel instead of direct KdTree dependency
  - use ISpatialAccel.has() for faster nearest point search

#### ♻️ Refactoring

- minor optimizations, update PoissonOpts & defaults ([598fca5](https://github.com/thi-ng/umbrella/commit/598fca5))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@0.1.0) (2019-01-21)

#### 🚀 Features

- re-import & update poisson package (MBP2010) ([193f9d4](https://github.com/thi-ng/umbrella/commit/193f9d4))
