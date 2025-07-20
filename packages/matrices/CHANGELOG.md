# Change Log

- **Last updated**: 2025-07-20T14:56:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@3.0.0) (2025-04-16)

#### 🛑 Breaking changes

- update to remove dynamic codegen ([#497](https://github.com/thi-ng/umbrella/issues/497)) ([7c6835e](https://github.com/thi-ng/umbrella/commit/7c6835e))
- BREAKING CHANGE: Refactoring & restructuring related to [#497](https://github.com/thi-ng/umbrella/issues/497)
  - replace former codegen approach with higher-order functions
  - add new`defMath()` &  `defMathN()` impls

#### 🩹 Bug fixes

- minor update `identity()` ([222aea1](https://github.com/thi-ng/umbrella/commit/222aea1))
  - use correct dispatch arg (due to change in [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/main/packages/vectors))

#### ♻️ Refactoring

- minor internal optimizations (vector ops) ([696578e](https://github.com/thi-ng/umbrella/commit/696578e))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.4.0) (2024-06-21)

#### 🚀 Features

- add AxisOrder type for quadFromEuler() ([f9722dd](https://github.com/thi-ng/umbrella/commit/f9722dd))

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.3.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.3.34) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([c3f3751](https://github.com/thi-ng/umbrella/commit/c3f3751))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.3.0) (2023-12-18)

#### 🚀 Features

- add rotationAroundPoint23() ([7b3ed38](https://github.com/thi-ng/umbrella/commit/7b3ed38))

### [2.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.2.7) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.2.0) (2023-10-23)

#### 🚀 Features

- add fit23 & fit44() matrix ops ([e2040e1](https://github.com/thi-ng/umbrella/commit/e2040e1))

### [2.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.1.22) (2022-08-16)

#### 🩹 Bug fixes

- fix [#352](https://github.com/thi-ng/umbrella/issues/352), update set() return var ([d32026c](https://github.com/thi-ng/umbrella/commit/d32026c))

### [2.1.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/matrices@2.1.19) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([39565cb](https://github.com/thi-ng/umbrella/commit/39565cb))
