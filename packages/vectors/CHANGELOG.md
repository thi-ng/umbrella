# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [8.6.20](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.6.20/packages/vectors) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

### [8.6.15](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.6.15/packages/vectors) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [8.6.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.6.1/packages/vectors) (2025-07-31)

#### 🩹 Bug fixes

- update median() & vmedian() for even-sized vectors ([42fd75e](https://codeberg.org/thi.ng/umbrella/commit/42fd75e))

## [8.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.6.0/packages/vectors) (2025-07-30)

#### 🚀 Features

- add vmin()/vmax() ([c9e0fee](https://codeberg.org/thi.ng/umbrella/commit/c9e0fee))

## [8.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.5.0/packages/vectors) (2025-07-24)

#### 🚀 Features

- add cartesian2FromAngles() ([8c11416](https://codeberg.org/thi.ng/umbrella/commit/8c11416))
- update variance(), sd(), sdError(), add meanAD() ([17da925](https://codeberg.org/thi.ng/umbrella/commit/17da925))
- update circularMean(), add centerCircular(), circularVariance(), circularSD() ([4642241](https://codeberg.org/thi.ng/umbrella/commit/4642241))
- update standardize() ([5cbb33e](https://codeberg.org/thi.ng/umbrella/commit/5cbb33e))

#### ♻️ Refactoring

- rename src file (circular.ts), update pkg exports ([628fcfb](https://codeberg.org/thi.ng/umbrella/commit/628fcfb))

#### 🧪 Tests

- add tests ([56369c5](https://codeberg.org/thi.ng/umbrella/commit/56369c5))
- update tests ([adde088](https://codeberg.org/thi.ng/umbrella/commit/adde088))

## [8.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.4.0/packages/vectors) (2025-07-21)

#### 🚀 Features

- add circularMean(), circularMeanFromAngles() ([384d102](https://codeberg.org/thi.ng/umbrella/commit/384d102))

## [8.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.3.0/packages/vectors) (2025-06-09)

#### 🚀 Features

- refactor distJaccard(), extract jaccardSimiliarity() ([fd28483](https://codeberg.org/thi.ng/umbrella/commit/fd28483))
  - update docs, add examples

## [8.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.2.0/packages/vectors) (2025-05-18)

#### 🚀 Features

- add acosh/asinh/atanh() ([d6601cc](https://codeberg.org/thi.ng/umbrella/commit/d6601cc))

### [8.1.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.1.1/packages/vectors) (2025-05-02)

#### 🩹 Bug fixes

- add size check in `equals2/3/4()` fns ([4f3b9a5](https://codeberg.org/thi.ng/umbrella/commit/4f3b9a5))

## [8.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.1.0/packages/vectors) (2025-04-30)

#### 🚀 Features

- add relu, leakyRelu, sigmoid, tanh ops ([5e99427](https://codeberg.org/thi.ng/umbrella/commit/5e99427))
  - add various activation fns, incl. strided versions
  - update pkg exports
- add component `product()` functions, minor refactor `sum()` ([2223d9b](https://codeberg.org/thi.ng/umbrella/commit/2223d9b))
  - add `sum()` doc strings
- add opt. value arg for `oneHot()` ([181de18](https://codeberg.org/thi.ng/umbrella/commit/181de18))
  - update doc string

#### ♻️ Refactoring

- rename `leakyRelu()` => `reluN()` ([0206e77](https://codeberg.org/thi.ng/umbrella/commit/0206e77))

### [8.0.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.0.1/packages/vectors) (2025-04-17)

#### 🩹 Bug fixes

- update minor2/3/4() ([ed4ae3b](https://codeberg.org/thi.ng/umbrella/commit/ed4ae3b))
  - update to use `minid2/3/4()` fns

# [8.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@8.0.0/packages/vectors) (2025-04-16)

#### 🛑 Breaking changes

- replace 99% of vector ops with new  versions ([734c202](https://codeberg.org/thi.ng/umbrella/commit/734c202))
- BREAKING CHANGE: Due to major refactoring & restructuring related to [#497](https://codeberg.org/thi.ng/umbrella/issues/497), some direct imports & function names have changed
  - replace former codegen approach with higher-order functions
  - split up various operations into more granular source files
  - add doc strings for almost all functions (🎉 — lack of was a former major criticism of this pkg)
  - update/remove deps

#### 🚀 Features

- import as new pkg (temporary only, will replace vectors pkg) ([d1146ac](https://codeberg.org/thi.ng/umbrella/commit/d1146ac))
- add/update various ops ([46ca962](https://codeberg.org/thi.ng/umbrella/commit/46ca962))
- add randNormS() ([508f8ca](https://codeberg.org/thi.ng/umbrella/commit/508f8ca))
- add random ops for strided vectors ([b6250ef](https://codeberg.org/thi.ng/umbrella/commit/b6250ef))
- copy tests from old pkg ([f046945](https://codeberg.org/thi.ng/umbrella/commit/f046945))

#### 🩹 Bug fixes

- update compare ops to use new result vectors ([9481206](https://codeberg.org/thi.ng/umbrella/commit/9481206))
  - do not use `a` as result if `out` is null
  - update all `eq`, `gt`, `gte`, `lt`, `lte`, `neq` ops
- update signatures & default outputs ([47e6185](https://codeberg.org/thi.ng/umbrella/commit/47e6185))
  - update args for `invert()`, `invSqrt()`
  - update `isInf()` and `isNaN()` to create new result vec if needed
    (rather than attempting to re-use input vec, which is wrong type)
- update `setNS2/3/4()` default out handling ([d4e2f25](https://codeberg.org/thi.ng/umbrella/commit/d4e2f25))
  - use same logic as `setS()`, i.e. create new vector if `out` is null
- fix fit3/4 ([072f5c0](https://codeberg.org/thi.ng/umbrella/commit/072f5c0))
- fix normalizeS2/3/4() ([301ecb1](https://codeberg.org/thi.ng/umbrella/commit/301ecb1))
- update `set()` dispatch arg ([b7cf843](https://codeberg.org/thi.ng/umbrella/commit/b7cf843))

#### ♻️ Refactoring

- minor internal update/perf `exp_2` ([976ed41](https://codeberg.org/thi.ng/umbrella/commit/976ed41))
- add/update/fix vec op types/signatures ([2ceca38](https://codeberg.org/thi.ng/umbrella/commit/2ceca38))
- update random fns types & impls ([d8b828a](https://codeberg.org/thi.ng/umbrella/commit/d8b828a))

## [7.13.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.13.0/packages/vectors) (2025-04-01)

#### 🚀 Features

- update `softMax()`, add temperature support ([d63a494](https://codeberg.org/thi.ng/umbrella/commit/d63a494))

### [7.12.21](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.12.21/packages/vectors) (2025-02-19)

#### ♻️ Refactoring

- update `MultiVecOp.impl()` ([5173a02](https://codeberg.org/thi.ng/umbrella/commit/5173a02))
  - make arg optional to request default impl

### [7.12.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.12.1/packages/vectors) (2024-09-16)

#### 🩹 Bug fixes

- update internal default out codegen handling ([4b524f6](https://codeberg.org/thi.ng/umbrella/commit/4b524f6))
  - use `syms` (arg names only) instead of `args` (possibly with defaults)

## [7.12.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.12.0/packages/vectors) (2024-09-05)

#### 🚀 Features

- add distCosine() (cosine similarity) ([2af6010](https://codeberg.org/thi.ng/umbrella/commit/2af6010))

## [7.11.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.11.0/packages/vectors) (2024-06-21)

#### 🚀 Features

- add eqDist2/3() predicates ([5bda768](https://codeberg.org/thi.ng/umbrella/commit/5bda768))

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [7.10.23](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.10.23/packages/vectors) (2024-03-27)

#### ♻️ Refactoring

- update memoizations ([aeebfc5](https://codeberg.org/thi.ng/umbrella/commit/aeebfc5))

### [7.10.20](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.10.20/packages/vectors) (2024-03-18)

#### 🩹 Bug fixes

- fix Vec4.iterator() ([63f511e](https://codeberg.org/thi.ng/umbrella/commit/63f511e))

### [7.10.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.10.11/packages/vectors) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

## [7.10.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.10.0/packages/vectors) (2024-01-26)

#### 🚀 Features

- add linReg() and RSS/SSE functions ([9db712c](https://codeberg.org/thi.ng/umbrella/commit/9db712c))
  - add `linReg()` (linear regression) fn
  - add `rss()`, `rssModel()` and `rssLine()` functions
    (residual sum of squares)

## [7.9.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.9.0/packages/vectors) (2024-01-23)

#### 🚀 Features

- update VecAPI & impls ([3bdccf0](https://codeberg.org/thi.ng/umbrella/commit/3bdccf0))
  - add ZERO/ONE consts
  - add zeroes()/ones()

### [7.8.10](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.8.10/packages/vectors) (2023-12-12)

#### 🩹 Bug fixes

- fix [#432](https://codeberg.org/thi.ng/umbrella/issues/432), update accessors in Vec2/3/4 ([9b5136f](https://codeberg.org/thi.ng/umbrella/commit/9b5136f))
  - due to ES2022 syntax target, old approach does not work anymore
  - solution: add accessors directly as part of class def

### [7.8.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.8.3/packages/vectors) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://codeberg.org/thi.ng/umbrella/commit/020ef6c))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [7.8.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.8.0/packages/vectors) (2023-10-27)

#### 🚀 Features

- add mag2/3/4() ([3a4063a](https://codeberg.org/thi.ng/umbrella/commit/3a4063a))
- add VecAPI interface  & VEC2/3/4 impls ([f06b900](https://codeberg.org/thi.ng/umbrella/commit/f06b900))
- update VecAPI & presets ([0d9f62b](https://codeberg.org/thi.ng/umbrella/commit/0d9f62b))

#### ♻️ Refactoring

- split up random fns into separate files ([5c0e4ec](https://codeberg.org/thi.ng/umbrella/commit/5c0e4ec))
  - rename randomDistrib() => randDistrib()
  - deprecate old name
  - update imports
  - update pkg exports

### [7.7.20](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.7.20/packages/vectors) (2023-10-23)

#### 🩹 Bug fixes

- fix polar3() for 0-vectors (related [#421](https://codeberg.org/thi.ng/umbrella/issues/421)) ([89db88f](https://codeberg.org/thi.ng/umbrella/commit/89db88f))
  - fix NaN in result if input is [0,0,0]

### [7.7.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.7.19/packages/vectors) (2023-10-18)

#### ♻️ Refactoring

- update distJaccard(), add docs ([a5a6256](https://codeberg.org/thi.ng/umbrella/commit/a5a6256))

### [7.7.16](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.7.16/packages/vectors) (2023-10-05)

#### 🩹 Bug fixes

- update minor()/major() ([88b3008](https://codeberg.org/thi.ng/umbrella/commit/88b3008))
  - update iteration order of default impls of both fns

### [7.7.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.7.7/packages/vectors) (2023-08-14)

#### 🩹 Bug fixes

- fix `FromBVecOpV` result arg type ([2ca2856](https://codeberg.org/thi.ng/umbrella/commit/2ca2856))

## [7.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.7.0/packages/vectors) (2023-06-16)

#### 🚀 Features

- add limit2/3/4() ([46bbf23](https://codeberg.org/thi.ng/umbrella/commit/46bbf23))

#### ⏱ Performance improvements

- avoid/delay sqrt in limit() ([c677a54](https://codeberg.org/thi.ng/umbrella/commit/c677a54))

### [7.6.12](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.6.12/packages/vectors) (2023-04-19)

#### 🩹 Bug fixes

- update addmNS/submNS() signatures ([00470d1](https://codeberg.org/thi.ng/umbrella/commit/00470d1))

## [7.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/vectors@7.6.0/packages/vectors) (2023-02-05)

#### 🚀 Features

- add hash2/3 fns ([30383fe](https://codeberg.org/thi.ng/umbrella/commit/30383fe))
