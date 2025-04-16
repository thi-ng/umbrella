# Change Log

- **Last updated**: 2025-04-16T11:11:14Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.4.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-optimize@0.4.16) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [0.4.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-optimize@0.4.12) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([8504f58](https://github.com/thi-ng/umbrella/commit/8504f58))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-optimize@0.4.0) (2024-03-07)

#### 🚀 Features

- add defOptimized(), rename source file ([b1dc3c0](https://github.com/thi-ng/umbrella/commit/b1dc3c0))
  - add defOptimized() wrapper fn
  - fix spelling in file name
  - update example in docs
- expand constantFolding() features, bug fixes ([1350bf7](https://github.com/thi-ng/umbrella/commit/1350bf7))
  - add support scalar comparisons
  - div-by-zero checks
  - fix non-scalar mul & sub handling
  - add support for exp2(), pow()
  - add tests

### [0.3.27](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-optimize@0.3.27) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-optimize@0.3.0) (2023-05-24)

#### 🚀 Features

- update constant folding ([1bd5fef](https://github.com/thi-ng/umbrella/commit/1bd5fef))
  - add simplifications for 0/1 cases
