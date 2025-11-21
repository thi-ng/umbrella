# Change Log

- **Last updated**: 2025-11-21T15:55:41Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.18.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.18.16) (2024-06-21)

#### ♻️ Refactoring

- dedupe polynomial easing fns ([1c0b095](https://github.com/thi-ng/umbrella/commit/1c0b095))
- redefine hash fns via HOF templates ([d143855](https://github.com/thi-ng/umbrella/commit/d143855))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [0.18.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.18.0) (2024-03-07)

#### 🚀 Features

- add packFloat()/unpackFloat() ([23a6d7f](https://github.com/thi-ng/umbrella/commit/23a6d7f))
- add packedNormal2(), refactor normal2() ([6f6dc1d](https://github.com/thi-ng/umbrella/commit/6f6dc1d))
- add branches() n-ary helper fn & docs ([74f32ba](https://github.com/thi-ng/umbrella/commit/74f32ba))

## [0.17.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.17.0) (2024-03-06)

#### 🚀 Features

- add fbmNoiseVec34() ([40ea58d](https://github.com/thi-ng/umbrella/commit/40ea58d))
- add cosineGradient() ([7a20ae9](https://github.com/thi-ng/umbrella/commit/7a20ae9))
- update cossin(), sincos(), add opt. scale factor arg ([e3e8979](https://github.com/thi-ng/umbrella/commit/e3e8979))
- add normal2() ([f6d6e33](https://github.com/thi-ng/umbrella/commit/f6d6e33))

#### 🩹 Bug fixes

- update generics for clamp01(), clamp11() and various fitXX() fns ([41d2882](https://github.com/thi-ng/umbrella/commit/41d2882))

#### ♻️ Refactoring

- simplify callsites of addSelf/mulSelf etc. ([efa1f8d](https://github.com/thi-ng/umbrella/commit/efa1f8d))

### [0.16.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.16.28) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [0.16.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.16.22) (2024-02-06)

#### ♻️ Refactoring

- use shader type consts ([039a0bf](https://github.com/thi-ng/umbrella/commit/039a0bf))

### [0.16.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.16.4) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.16.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.16.1) (2023-10-27)

#### 🩹 Bug fixes

- fix pkg exports ([20d5d2d](https://github.com/thi-ng/umbrella/commit/20d5d2d))

## [0.16.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.16.0) (2023-10-27)

#### 🚀 Features

- add trunc(), modulo(), foldback01() ([d3ab3e6](https://github.com/thi-ng/umbrella/commit/d3ab3e6))

## [0.15.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.15.0) (2023-10-25)

#### 🚀 Features

- add sdfPolyline2() ([4b6c6b7](https://github.com/thi-ng/umbrella/commit/4b6c6b7))
- add fitNorm() ([d5f21c5](https://github.com/thi-ng/umbrella/commit/d5f21c5))
- add isPointInCircle(), isPointInRect() ([de4b1ab](https://github.com/thi-ng/umbrella/commit/de4b1ab))
- add functionSampler() HOF plotting ([c6140b4](https://github.com/thi-ng/umbrella/commit/c6140b4))

#### ⏱ Performance improvements

- optimize aspectCorrectedUV2() ([733331a](https://github.com/thi-ng/umbrella/commit/733331a))

### [0.14.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.14.20) (2023-10-24)

#### ♻️ Refactoring

- use hoc function to define easing functions ([2b2c451](https://github.com/thi-ng/umbrella/commit/2b2c451))

## [0.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.14.0) (2023-07-14)

#### 🚀 Features

- add smootherStep() ([859fa5d](https://github.com/thi-ng/umbrella/commit/859fa5d))

### [0.13.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.13.15) (2023-05-11)

#### ♻️ Refactoring

- re-use interned type constants ([f6fcbc5](https://github.com/thi-ng/umbrella/commit/f6fcbc5))

### [0.13.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.13.14) (2023-05-05)

#### 🩹 Bug fixes

- fix [#399](https://github.com/thi-ng/umbrella/issues/399) update HOF function naming ([f4b62d7](https://github.com/thi-ng/umbrella/commit/f4b62d7))
  - ensure generated HOFs are using unique names to allow multiple instances

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.13.0) (2023-01-10)

#### 🚀 Features

- add pre/postmultiplyAlpha() fns ([367ebbd](https://github.com/thi-ng/umbrella/commit/367ebbd))

#### 🩹 Bug fixes

- fix porterDuff() ops ([f5bbcc8](https://github.com/thi-ng/umbrella/commit/f5bbcc8))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.12.0) (2022-05-07)

#### 🚀 Features

- add 2D SDF arc/bezier fns ([07bd445](https://github.com/thi-ng/umbrella/commit/07bd445))
- add more 2D SDF prims ([2672e75](https://github.com/thi-ng/umbrella/commit/2672e75))

#### ♻️ Refactoring

- update cross2() as non-inline fn ([59d631a](https://github.com/thi-ng/umbrella/commit/59d631a))
