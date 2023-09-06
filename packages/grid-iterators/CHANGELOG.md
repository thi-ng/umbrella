# Change Log

- **Last updated**: 2023-09-06T13:36:28Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@4.0.0) (2023-04-08)

#### 🛑 Breaking changes

- add/rename types/opts ([bc3ea21](https://github.com/thi-ng/umbrella/commit/bc3ea21))
- BREAKING CHANGE: rename various option types (add 2D/3D suffixes)

#### 🚀 Features

- add filter predicates ([81abf60](https://github.com/thi-ng/umbrella/commit/81abf60))
  - add isDiagonal/Alt() filters

#### 🩹 Bug fixes

- fix imports ([353bc3d](https://github.com/thi-ng/umbrella/commit/353bc3d))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@3.1.0) (2023-03-25)

#### 🚀 Features

- add diagonalSlopeX/Y() ([f63dc6e](https://github.com/thi-ng/umbrella/commit/f63dc6e))
  - add diagonal iterators with configurable slope (X & Y versions)
  - update pkg deps

#### ♻️ Refactoring

- update diagonalEnds2d() ([e20bf7b](https://github.com/thi-ng/umbrella/commit/e20bf7b))
  - add `all` option to include first & last points
- extract DiagonalSlopeOpts ([e08857d](https://github.com/thi-ng/umbrella/commit/e08857d))
- update diagonalEnds2d() opts ([d14458a](https://github.com/thi-ng/umbrella/commit/d14458a))
  - make `all` optional

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@3.0.1) (2022-12-29)

#### 🩹 Bug fixes

- add missing type exports ([879c11c](https://github.com/thi-ng/umbrella/commit/879c11c))

#### ♻️ Refactoring

- add GridIterator2D/3D type aliases ([610ad0e](https://github.com/thi-ng/umbrella/commit/610ad0e))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@3.0.0) (2022-12-22)

#### 🛑 Breaking changes

- add point transforms & global options ([1861154](https://github.com/thi-ng/umbrella/commit/1861154))
- BREAKING CHANGE: update function signatures, switch to using options object as arg
  - add `GridIterOpts` interface
  - add `PointTransform` and implementations:
  - add flipX/Y/XY, swapXY transforms
  - update most iterators to use new options

#### 🩹 Bug fixes

- fix imports ([d4cede6](https://github.com/thi-ng/umbrella/commit/d4cede6))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@2.3.0) (2022-04-07)

#### 🚀 Features

- add diamondSquare() ([4fabaad](https://github.com/thi-ng/umbrella/commit/4fabaad))

### [2.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@2.2.4) (2021-12-13)

#### 🩹 Bug fixes

- off-by-one error in lineClipped() ([537b17a](https://github.com/thi-ng/umbrella/commit/537b17a))
  - update right/bottom clip coords

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@2.2.0) (2021-11-17)

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

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@2.1.0) (2021-11-03)

#### 🚀 Features

- add floodFill(), update deps ([4634cf1](https://github.com/thi-ng/umbrella/commit/4634cf1))
- add flood fill functions ([65796b9](https://github.com/thi-ng/umbrella/commit/65796b9))
- add clipped shape iterators ([611f0da](https://github.com/thi-ng/umbrella/commit/611f0da))
  - add generic clipped() filter iterator
  - add circleClipped()
  - add [hv]lineClipped()

#### 🩹 Bug fixes

- fix imports, readme ([adff976](https://github.com/thi-ng/umbrella/commit/adff976))

#### ♻️ Refactoring

- replace/re-use asInt() helper ([1b80de4](https://github.com/thi-ng/umbrella/commit/1b80de4))
- update clipped shape iters ([dc065ed](https://github.com/thi-ng/umbrella/commit/dc065ed))
  - better pre-clipping for circle/line
  - intern intersection/clipping helpers
- update floodFill() predicate type ([dec44e0](https://github.com/thi-ng/umbrella/commit/dec44e0))
  - update docs

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@2.0.0) (2021-10-12)

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
- update imports (transducers) ([cab1ea8](https://github.com/thi-ng/umbrella/commit/cab1ea8))
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

### [0.4.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@0.4.24) (2021-03-03)

#### 🩹 Bug fixes

- enforce int coords ([e8e570f](https://github.com/thi-ng/umbrella/commit/e8e570f))

### [0.4.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@0.4.15) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@0.4.0) (2020-06-20)

#### 🚀 Features

- add new iterators ([e08985e](https://github.com/thi-ng/umbrella/commit/e08985e))
  - add columns, rows
  - add columnEnds, diagonalEnds, rowEnds

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@0.3.0) (2020-02-25)

#### 🚀 Features

- add line & circle iterators ([a6b757d](https://github.com/thi-ng/umbrella/commit/a6b757d))
  - add line(), hline(), vline()
  - add circle()

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@0.2.0) (2019-11-09)

#### 🚀 Features

- make row args optional ([60dccfc](https://github.com/thi-ng/umbrella/commit/60dccfc))
- add z-curve & random iterators, add deps ([ba8ed18](https://github.com/thi-ng/umbrella/commit/ba8ed18))
- add interleave fns ([c883ea0](https://github.com/thi-ng/umbrella/commit/c883ea0))
- add zigzagDiagonal(), update readme, rename files ([5630055](https://github.com/thi-ng/umbrella/commit/5630055))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@0.1.0) (2019-09-21)

#### 🚀 Features

- import as new package, incl. assets ([fe4ee00](https://github.com/thi-ng/umbrella/commit/fe4ee00))
