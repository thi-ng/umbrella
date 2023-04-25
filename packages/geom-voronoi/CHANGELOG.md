# Change Log

- **Last updated**: 2023-04-25T15:38:18Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@2.3.0) (2023-04-25)

#### 🚀 Features

- add delaunayQE/voronoiQE() methods ([c709053](https://github.com/thi-ng/umbrella/commit/c709053))

### [2.2.55](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@2.2.55) (2023-03-27)

#### ♻️ Refactoring

- update imports (TS5.0) ([aa5da46](https://github.com/thi-ng/umbrella/commit/aa5da46))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@2.2.0) (2021-11-17)

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

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@2.1.0) (2021-11-03)

#### 🚀 Features

- update visitor impls, edge ID handling ([e7b3c4c](https://github.com/thi-ng/umbrella/commit/e7b3c4c))
  - add internal edge ID generator
  - update `Visitor` type
  - update traverse impls
  - use [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/main/packages/bitfield) for visited edges/verts (MUCH smaller memory req.)

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@2.0.0) (2021-10-12)

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
- update imports ([3c655f5](https://github.com/thi-ng/umbrella/commit/3c655f5))

### [0.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@0.2.13) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@0.2.2) (2020-07-28)

#### 🩹 Bug fixes

- always computeDual() in ctor ([12e0232](https://github.com/thi-ng/umbrella/commit/12e0232))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@0.2.0) (2020-07-17)

#### 🚀 Features

- update DVMesh.add() ([caa341b](https://github.com/thi-ng/umbrella/commit/caa341b))
  - add `update` arg to auto-update mesh (default)
  - update .addKeys(), .addAll()
  - add docs

#### ⏱ Performance improvements

- optimize boundary vertex checks ([e4169bd](https://github.com/thi-ng/umbrella/commit/e4169bd))
  - use vertex IDs only
  - remove isBoundary()

### [0.1.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@0.1.31) (2020-02-25)

#### ♻️ Refactoring

- update geom-clip deps & imports ([26bc558](https://github.com/thi-ng/umbrella/commit/26bc558))
- update imports ([a957ea8](https://github.com/thi-ng/umbrella/commit/a957ea8))

### [0.1.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@0.1.18) (2019-07-07)

#### ♻️ Refactoring

- address TS strictNullChecks flag ([877a6c0](https://github.com/thi-ng/umbrella/commit/877a6c0))

### [0.1.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-voronoi@0.1.17) (2019-05-22)

#### ♻️ Refactoring

- update pointInSegment call ([af350fc](https://github.com/thi-ng/umbrella/commit/af350fc))
