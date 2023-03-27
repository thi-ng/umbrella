# Change Log

- **Last updated**: 2023-03-27T19:05:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.4.0) (2021-11-17)

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

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.3.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports ([4ca18e4](https://github.com/thi-ng/umbrella/commit/4ca18e4))

### [0.2.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.2.30) (2021-06-08)

#### ♻️ Refactoring

- dedupe line/scatter plot fns ([3440f1f](https://github.com/thi-ng/umbrella/commit/3440f1f))
  - extract internal defSimplePlotFn() helper

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.2.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([2f82a4f](https://github.com/thi-ng/umbrella/commit/2f82a4f))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.2.0) (2020-11-24)

#### 🚀 Features

- add barPlot() & interleave opts ([8f3d4e1](https://github.com/thi-ng/umbrella/commit/8f3d4e1))
- update grid opts (add major flags) ([4fac849](https://github.com/thi-ng/umbrella/commit/4fac849))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.1.1) (2020-09-22)

#### ♻️ Refactoring

- update stackedIntervals() ([19396cf](https://github.com/thi-ng/umbrella/commit/19396cf))
  - use mapcatIndexed() to simplify composed xform

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/viz@0.1.0) (2020-09-13)

#### 🚀 Features

- import as new package (ongoing port from geom-viz) ([900db82](https://github.com/thi-ng/umbrella/commit/900db82))
- add lensAxis(), lensScale(), InitialAxisSpec ([b423600](https://github.com/thi-ng/umbrella/commit/b423600))
- redo log scale & ticks, restructure all files ([2f51668](https://github.com/thi-ng/umbrella/commit/2f51668))
  - add dataMinLog/dataMaxLog/dataBounds2Log()
- improve domain data value handling ([ab89655](https://github.com/thi-ng/umbrella/commit/ab89655))
  - add DomainValues, DomainValueFn types
  - update plot fns & processedPoints() to accept new types
  - convert uniformDomain() to HOF form
  - update deps & tests
- update candlePlot(), add candle() shape fn ([fbb63d3](https://github.com/thi-ng/umbrella/commit/fbb63d3))
- add background grid support ([ca51cba](https://github.com/thi-ng/umbrella/commit/ca51cba))
  - add GridSpec
  - extract gridAxis(), update axisCommon()
  - add gridCartesian()
  - update plotCartesian()

#### 🩹 Bug fixes

- fix/simplify months()/days() iterators ([de6616c](https://github.com/thi-ng/umbrella/commit/de6616c))
- update areaPlot(), linePlot() ([ac20370](https://github.com/thi-ng/umbrella/commit/ac20370))
- flip Y axis tick direction ([72a3200](https://github.com/thi-ng/umbrella/commit/72a3200))

#### ♻️ Refactoring

- update imports, use new Fn types ([a3a2d7b](https://github.com/thi-ng/umbrella/commit/a3a2d7b))
- remove obsolete date/time fns, update call sites, pkg ([5fb5d60](https://github.com/thi-ng/umbrella/commit/5fb5d60))
  - date fns migrated/extended into new [@thi.ng/date](https://github.com/thi-ng/umbrella/tree/main/packages/date) pkg
