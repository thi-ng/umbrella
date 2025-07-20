# Change Log

- **Last updated**: 2025-07-20T14:56:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.0.75](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@4.0.75) (2024-06-21)

#### ♻️ Refactoring

- dedupe interleave logic/iteration, add tests ([7bc9f7f](https://github.com/thi-ng/umbrella/commit/7bc9f7f))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))
- internal update floodFill() ([3af4715](https://github.com/thi-ng/umbrella/commit/3af4715))

### [4.0.71](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@4.0.71) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([a3afff7](https://github.com/thi-ng/umbrella/commit/a3afff7))

### [4.0.54](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@4.0.54) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [4.0.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@4.0.30) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [4.0.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/grid-iterators@4.0.21) (2023-10-11)

#### ♻️ Refactoring

- minor update columns2d() ([7ecb207](https://github.com/thi-ng/umbrella/commit/7ecb207))

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
