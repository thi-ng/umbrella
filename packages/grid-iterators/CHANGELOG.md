# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.0.144](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.144/packages/grid-iterators) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [4.0.75](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.75/packages/grid-iterators) (2024-06-21)

#### ♻️ Refactoring

- dedupe interleave logic/iteration, add tests ([7bc9f7f](https://codeberg.org/thi.ng/umbrella/commit/7bc9f7f))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))
- internal update floodFill() ([3af4715](https://codeberg.org/thi.ng/umbrella/commit/3af4715))

### [4.0.71](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.71/packages/grid-iterators) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([a3afff7](https://codeberg.org/thi.ng/umbrella/commit/a3afff7))

### [4.0.54](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.54/packages/grid-iterators) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

### [4.0.30](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.30/packages/grid-iterators) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [4.0.21](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.21/packages/grid-iterators) (2023-10-11)

#### ♻️ Refactoring

- minor update columns2d() ([7ecb207](https://codeberg.org/thi.ng/umbrella/commit/7ecb207))

# [4.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@4.0.0/packages/grid-iterators) (2023-04-08)

#### 🛑 Breaking changes

- add/rename types/opts ([bc3ea21](https://codeberg.org/thi.ng/umbrella/commit/bc3ea21))
- BREAKING CHANGE: rename various option types (add 2D/3D suffixes)

#### 🚀 Features

- add filter predicates ([81abf60](https://codeberg.org/thi.ng/umbrella/commit/81abf60))
  - add isDiagonal/Alt() filters

#### 🩹 Bug fixes

- fix imports ([353bc3d](https://codeberg.org/thi.ng/umbrella/commit/353bc3d))

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/grid-iterators@3.1.0/packages/grid-iterators) (2023-03-25)

#### 🚀 Features

- add diagonalSlopeX/Y() ([f63dc6e](https://codeberg.org/thi.ng/umbrella/commit/f63dc6e))
  - add diagonal iterators with configurable slope (X & Y versions)
  - update pkg deps

#### ♻️ Refactoring

- update diagonalEnds2d() ([e20bf7b](https://codeberg.org/thi.ng/umbrella/commit/e20bf7b))
  - add `all` option to include first & last points
- extract DiagonalSlopeOpts ([e08857d](https://codeberg.org/thi.ng/umbrella/commit/e08857d))
- update diagonalEnds2d() opts ([d14458a](https://codeberg.org/thi.ng/umbrella/commit/d14458a))
  - make `all` optional
