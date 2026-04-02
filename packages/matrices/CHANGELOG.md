# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/matrices@3.0.0/packages/matrices) (2025-04-16)

#### 🛑 Breaking changes

- update to remove dynamic codegen ([#497](https://codeberg.org/thi.ng/umbrella/issues/497)) ([7c6835e](https://codeberg.org/thi.ng/umbrella/commit/7c6835e))
- BREAKING CHANGE: Refactoring & restructuring related to [#497](https://codeberg.org/thi.ng/umbrella/issues/497)
  - replace former codegen approach with higher-order functions
  - add new`defMath()` &  `defMathN()` impls

#### 🩹 Bug fixes

- minor update `identity()` ([222aea1](https://codeberg.org/thi.ng/umbrella/commit/222aea1))
  - use correct dispatch arg (due to change in [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/vectors))

#### ♻️ Refactoring

- minor internal optimizations (vector ops) ([696578e](https://codeberg.org/thi.ng/umbrella/commit/696578e))

## [2.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/matrices@2.4.0/packages/matrices) (2024-06-21)

#### 🚀 Features

- add AxisOrder type for quadFromEuler() ([f9722dd](https://codeberg.org/thi.ng/umbrella/commit/f9722dd))

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [2.3.34](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/matrices@2.3.34/packages/matrices) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([c3f3751](https://codeberg.org/thi.ng/umbrella/commit/c3f3751))

## [2.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/matrices@2.3.0/packages/matrices) (2023-12-18)

#### 🚀 Features

- add rotationAroundPoint23() ([7b3ed38](https://codeberg.org/thi.ng/umbrella/commit/7b3ed38))

### [2.2.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/matrices@2.2.7/packages/matrices) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [2.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/matrices@2.2.0/packages/matrices) (2023-10-23)

#### 🚀 Features

- add fit23 & fit44() matrix ops ([e2040e1](https://codeberg.org/thi.ng/umbrella/commit/e2040e1))
