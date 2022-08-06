# Change Log

- **Last updated**: 2022-08-06T15:22:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.1.22) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([0547e2c](https://github.com/thi-ng/umbrella/commit/0547e2c))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.1.0) (2021-11-17)

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

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.0.0) (2021-10-12)

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

- update imports ([198a149](https://github.com/thi-ng/umbrella/commit/198a149))
- update imports ([b01387a](https://github.com/thi-ng/umbrella/commit/b01387a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [0.7.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.7.9) (2021-02-20)

#### ♻️ Refactoring

- update to use new Range type ([9e1ed2e](https://github.com/thi-ng/umbrella/commit/9e1ed2e))

### [0.7.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.7.4) (2021-01-02)

#### 🩹 Bug fixes

- fix [#269](https://github.com/thi-ng/umbrella/issues/269) update rayBox() ([441cddb](https://github.com/thi-ng/umbrella/commit/441cddb))
  - fix Y/Z-axis handling
  - add tests

### [0.7.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.7.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.7.0) (2020-11-24)

#### 🚀 Features

- add pointIn3Circle/4Sphere() checks ([76d44bf](https://github.com/thi-ng/umbrella/commit/76d44bf))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.6.0) (2020-09-22)

#### 🚀 Features

- update ray-line/polyline fns ([b3775b0](https://github.com/thi-ng/umbrella/commit/b3775b0))
  - add minD/maxD params for:
    - intersectRayLine()
    - intersectRayPolyline/All()
  - refactor/dedupe intersectLinePolylineAll()
  - add tests

#### 🩹 Bug fixes

- testCenteredAABBSphere() ([95a29b1](https://github.com/thi-ng/umbrella/commit/95a29b1))

### [0.5.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.5.8) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([d58a562](https://github.com/thi-ng/umbrella/commit/d58a562))
  - update eqDelta imports
  - add api.ts to pkg re-exports

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.5.0) (2020-07-17)

#### 🚀 Features

- add intersectLinePolylineAll() ([1f38d92](https://github.com/thi-ng/umbrella/commit/1f38d92))

### [0.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.4.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([fc5f392](https://github.com/thi-ng/umbrella/commit/fc5f392))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.4.0) (2020-01-24)

#### 🚀 Features

- add testBoxSphere nD version, minor optimizations ([122c187](https://github.com/thi-ng/umbrella/commit/122c187))
- add testCenteredBoxSphere() & pointInCenteredBox() tests (nD) ([6c5af97](https://github.com/thi-ng/umbrella/commit/6c5af97))

#### ♻️ Refactoring

- replace MultiISecOp type w/ MultiVecOpImpl ([40c384c](https://github.com/thi-ng/umbrella/commit/40c384c))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.3.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([4cdbd31](https://github.com/thi-ng/umbrella/commit/4cdbd31))

#### 🩹 Bug fixes

- update madd & perpendicular call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([d2e9969](https://github.com/thi-ng/umbrella/commit/d2e9969))
- add missing return type for intersectRayCircle() ([eaceb1a](https://github.com/thi-ng/umbrella/commit/eaceb1a))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.2.0) (2019-05-22)

#### 🚀 Features

- add ray-plane, plane-plane fns, update readme ([40a8bff](https://github.com/thi-ng/umbrella/commit/40a8bff))

#### 🩹 Bug fixes

- fix [#84](https://github.com/thi-ng/umbrella/issues/84), update pointInSegment, add tests ([2bef312](https://github.com/thi-ng/umbrella/commit/2bef312))

### [0.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@0.1.7) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))
