# Change Log

- **Last updated**: 2025-10-24T14:17:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@3.1.0) (2025-10-24)

#### 🚀 Features

- add `offsetConvex()` ([195ae11](https://github.com/thi-ng/umbrella/commit/195ae11))

### [3.0.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@3.0.41) (2025-04-16)

#### ♻️ Refactoring

- minor internal optimizations (vector ops) ([c5ff1ae](https://github.com/thi-ng/umbrella/commit/c5ff1ae))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@3.0.0) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([0776820](https://github.com/thi-ng/umbrella/commit/0776820))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate Convexity
  - update imports
  - update deps

#### 🚀 Features

- add convolveClosed/Open() functions, incl. kernels ([4e1d53f](https://github.com/thi-ng/umbrella/commit/4e1d53f))
  - add convolveClosed() & convolveOpen()
  - add convolution kernel factories:
    - KERNEL_BOX()
    - KERNEL_TRIANGLE()
    - KERNEL_GAUSSIAN()

#### ⏱ Performance improvements

- rewrite bounds2() / bounds3() ([00953e3](https://github.com/thi-ng/umbrella/commit/00953e3))
  - use scalars vs. vector ops
  - add optional args to only process a subset of given points

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.4.0) (2024-05-08)

#### 🚀 Features

- add complexCenterOfWeight2() ([9b38f31](https://github.com/thi-ng/umbrella/commit/9b38f31))

### [2.3.112](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.3.112) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([7f59e91](https://github.com/thi-ng/umbrella/commit/7f59e91))

### [2.3.70](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.3.70) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.3.6) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([1ac507f](https://github.com/thi-ng/umbrella/commit/1ac507f))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.3.0) (2022-06-23)

#### 🚀 Features

- add boundingCircle/Sphere() ([2f9ff9a](https://github.com/thi-ng/umbrella/commit/2f9ff9a))

#### ⏱ Performance improvements

- avoid destructuring in boundingCircle/Sphere() ([c46836c](https://github.com/thi-ng/umbrella/commit/c46836c))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-poly-utils@2.2.0) (2022-03-11)

#### 🚀 Features

- add bounds2/3() fns ([2385eb0](https://github.com/thi-ng/umbrella/commit/2385eb0))

#### 🩹 Bug fixes

- fix equilateralTriangle2() ([c37c27e](https://github.com/thi-ng/umbrella/commit/c37c27e))
