# Change Log

- **Last updated**: 2025-09-01T16:38:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [8.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.6.1) (2025-07-31)

#### 🩹 Bug fixes

- update median() & vmedian() for even-sized vectors ([42fd75e](https://github.com/thi-ng/umbrella/commit/42fd75e))

## [8.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.6.0) (2025-07-30)

#### 🚀 Features

- add vmin()/vmax() ([c9e0fee](https://github.com/thi-ng/umbrella/commit/c9e0fee))

## [8.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.5.0) (2025-07-24)

#### 🚀 Features

- add cartesian2FromAngles() ([8c11416](https://github.com/thi-ng/umbrella/commit/8c11416))
- update variance(), sd(), sdError(), add meanAD() ([17da925](https://github.com/thi-ng/umbrella/commit/17da925))
- update circularMean(), add centerCircular(), circularVariance(), circularSD() ([4642241](https://github.com/thi-ng/umbrella/commit/4642241))
- update standardize() ([5cbb33e](https://github.com/thi-ng/umbrella/commit/5cbb33e))

#### ♻️ Refactoring

- rename src file (circular.ts), update pkg exports ([628fcfb](https://github.com/thi-ng/umbrella/commit/628fcfb))

## [8.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.4.0) (2025-07-21)

#### 🚀 Features

- add circularMean(), circularMeanFromAngles() ([384d102](https://github.com/thi-ng/umbrella/commit/384d102))

## [8.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.3.0) (2025-06-09)

#### 🚀 Features

- refactor distJaccard(), extract jaccardSimiliarity() ([fd28483](https://github.com/thi-ng/umbrella/commit/fd28483))
  - update docs, add examples

## [8.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.2.0) (2025-05-18)

#### 🚀 Features

- add acosh/asinh/atanh() ([d6601cc](https://github.com/thi-ng/umbrella/commit/d6601cc))

### [8.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.1.1) (2025-05-02)

#### 🩹 Bug fixes

- add size check in `equals2/3/4()` fns ([4f3b9a5](https://github.com/thi-ng/umbrella/commit/4f3b9a5))

## [8.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.1.0) (2025-04-30)

#### 🚀 Features

- add relu, leakyRelu, sigmoid, tanh ops ([5e99427](https://github.com/thi-ng/umbrella/commit/5e99427))
  - add various activation fns, incl. strided versions
  - update pkg exports
- add component `product()` functions, minor refactor `sum()` ([2223d9b](https://github.com/thi-ng/umbrella/commit/2223d9b))
  - add `sum()` doc strings
- add opt. value arg for `oneHot()` ([181de18](https://github.com/thi-ng/umbrella/commit/181de18))
  - update doc string

#### ♻️ Refactoring

- rename `leakyRelu()` => `reluN()` ([0206e77](https://github.com/thi-ng/umbrella/commit/0206e77))

### [8.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.0.1) (2025-04-17)

#### 🩹 Bug fixes

- update minor2/3/4() ([ed4ae3b](https://github.com/thi-ng/umbrella/commit/ed4ae3b))
  - update to use `minid2/3/4()` fns

# [8.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@8.0.0) (2025-04-16)

#### 🛑 Breaking changes

- replace 99% of vector ops with new  versions ([734c202](https://github.com/thi-ng/umbrella/commit/734c202))
- BREAKING CHANGE: Due to major refactoring & restructuring related to [#497](https://github.com/thi-ng/umbrella/issues/497), some direct imports & function names have changed
  - replace former codegen approach with higher-order functions
  - split up various operations into more granular source files
  - add doc strings for almost all functions (🎉 — lack of was a former major criticism of this pkg)
  - update/remove deps

#### 🚀 Features

- import as new pkg (temporary only, will replace vectors pkg) ([d1146ac](https://github.com/thi-ng/umbrella/commit/d1146ac))
- add/update various ops ([46ca962](https://github.com/thi-ng/umbrella/commit/46ca962))
- add randNormS() ([508f8ca](https://github.com/thi-ng/umbrella/commit/508f8ca))
- add random ops for strided vectors ([b6250ef](https://github.com/thi-ng/umbrella/commit/b6250ef))
- copy tests from old pkg ([f046945](https://github.com/thi-ng/umbrella/commit/f046945))

#### 🩹 Bug fixes

- update compare ops to use new result vectors ([9481206](https://github.com/thi-ng/umbrella/commit/9481206))
  - do not use `a` as result if `out` is null
  - update all `eq`, `gt`, `gte`, `lt`, `lte`, `neq` ops
- update signatures & default outputs ([47e6185](https://github.com/thi-ng/umbrella/commit/47e6185))
  - update args for `invert()`, `invSqrt()`
  - update `isInf()` and `isNaN()` to create new result vec if needed
    (rather than attempting to re-use input vec, which is wrong type)
- update `setNS2/3/4()` default out handling ([d4e2f25](https://github.com/thi-ng/umbrella/commit/d4e2f25))
  - use same logic as `setS()`, i.e. create new vector if `out` is null
- fix fit3/4 ([072f5c0](https://github.com/thi-ng/umbrella/commit/072f5c0))
- fix normalizeS2/3/4() ([301ecb1](https://github.com/thi-ng/umbrella/commit/301ecb1))
- update `set()` dispatch arg ([b7cf843](https://github.com/thi-ng/umbrella/commit/b7cf843))

#### ♻️ Refactoring

- minor internal update/perf `exp_2` ([976ed41](https://github.com/thi-ng/umbrella/commit/976ed41))
- add/update/fix vec op types/signatures ([2ceca38](https://github.com/thi-ng/umbrella/commit/2ceca38))
- update random fns types & impls ([d8b828a](https://github.com/thi-ng/umbrella/commit/d8b828a))

## [7.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.13.0) (2025-04-01)

#### 🚀 Features

- update `softMax()`, add temperature support ([d63a494](https://github.com/thi-ng/umbrella/commit/d63a494))

### [7.12.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.12.21) (2025-02-19)

#### ♻️ Refactoring

- update `MultiVecOp.impl()` ([5173a02](https://github.com/thi-ng/umbrella/commit/5173a02))
  - make arg optional to request default impl

### [7.12.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.12.1) (2024-09-16)

#### 🩹 Bug fixes

- update internal default out codegen handling ([4b524f6](https://github.com/thi-ng/umbrella/commit/4b524f6))
  - use `syms` (arg names only) instead of `args` (possibly with defaults)

## [7.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.12.0) (2024-09-05)

#### 🚀 Features

- add distCosine() (cosine similarity) ([2af6010](https://github.com/thi-ng/umbrella/commit/2af6010))

## [7.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.11.0) (2024-06-21)

#### 🚀 Features

- add eqDist2/3() predicates ([5bda768](https://github.com/thi-ng/umbrella/commit/5bda768))

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [7.10.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.10.23) (2024-03-27)

#### ♻️ Refactoring

- update memoizations ([aeebfc5](https://github.com/thi-ng/umbrella/commit/aeebfc5))

### [7.10.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.10.20) (2024-03-18)

#### 🩹 Bug fixes

- fix Vec4.iterator() ([63f511e](https://github.com/thi-ng/umbrella/commit/63f511e))

### [7.10.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.10.11) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

## [7.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.10.0) (2024-01-26)

#### 🚀 Features

- add linReg() and RSS/SSE functions ([9db712c](https://github.com/thi-ng/umbrella/commit/9db712c))
  - add `linReg()` (linear regression) fn
  - add `rss()`, `rssModel()` and `rssLine()` functions
    (residual sum of squares)

## [7.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.9.0) (2024-01-23)

#### 🚀 Features

- update VecAPI & impls ([3bdccf0](https://github.com/thi-ng/umbrella/commit/3bdccf0))
  - add ZERO/ONE consts
  - add zeroes()/ones()

### [7.8.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.8.10) (2023-12-12)

#### 🩹 Bug fixes

- fix [#432](https://github.com/thi-ng/umbrella/issues/432), update accessors in Vec2/3/4 ([9b5136f](https://github.com/thi-ng/umbrella/commit/9b5136f))
  - due to ES2022 syntax target, old approach does not work anymore
  - solution: add accessors directly as part of class def

### [7.8.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.8.3) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

## [7.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.8.0) (2023-10-27)

#### 🚀 Features

- add mag2/3/4() ([3a4063a](https://github.com/thi-ng/umbrella/commit/3a4063a))
- add VecAPI interface  & VEC2/3/4 impls ([f06b900](https://github.com/thi-ng/umbrella/commit/f06b900))
- update VecAPI & presets ([0d9f62b](https://github.com/thi-ng/umbrella/commit/0d9f62b))

#### ♻️ Refactoring

- split up random fns into separate files ([5c0e4ec](https://github.com/thi-ng/umbrella/commit/5c0e4ec))
  - rename randomDistrib() => randDistrib()
  - deprecate old name
  - update imports
  - update pkg exports

### [7.7.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.20) (2023-10-23)

#### 🩹 Bug fixes

- fix polar3() for 0-vectors (related [#421](https://github.com/thi-ng/umbrella/issues/421)) ([89db88f](https://github.com/thi-ng/umbrella/commit/89db88f))
  - fix NaN in result if input is [0,0,0]

### [7.7.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.19) (2023-10-18)

#### ♻️ Refactoring

- update distJaccard(), add docs ([a5a6256](https://github.com/thi-ng/umbrella/commit/a5a6256))

### [7.7.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.16) (2023-10-05)

#### 🩹 Bug fixes

- update minor()/major() ([88b3008](https://github.com/thi-ng/umbrella/commit/88b3008))
  - update iteration order of default impls of both fns

### [7.7.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.7) (2023-08-14)

#### 🩹 Bug fixes

- fix `FromBVecOpV` result arg type ([2ca2856](https://github.com/thi-ng/umbrella/commit/2ca2856))

## [7.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.0) (2023-06-16)

#### 🚀 Features

- add limit2/3/4() ([46bbf23](https://github.com/thi-ng/umbrella/commit/46bbf23))

#### ⏱ Performance improvements

- avoid/delay sqrt in limit() ([c677a54](https://github.com/thi-ng/umbrella/commit/c677a54))

### [7.6.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.6.12) (2023-04-19)

#### 🩹 Bug fixes

- update addmNS/submNS() signatures ([00470d1](https://github.com/thi-ng/umbrella/commit/00470d1))

## [7.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.6.0) (2023-02-05)

#### 🚀 Features

- add hash2/3 fns ([30383fe](https://github.com/thi-ng/umbrella/commit/30383fe))

### [7.5.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.24) (2022-11-23)

#### 🩹 Bug fixes

- update randNormDistrib() args/types ([7b419c0](https://github.com/thi-ng/umbrella/commit/7b419c0))
  - add VecOpFNO/VecOpNFO fn type aliases
  - update all randNormDistrib() versions
    - swap 2nd & 3rd args and make both optional

### [7.5.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.11) (2022-08-06)

#### ⏱ Performance improvements

- add normalize2/3/4 fixed versions ([acd4a14](https://github.com/thi-ng/umbrella/commit/acd4a14))
- add direction2/3, update callsites ([f3dcda8](https://github.com/thi-ng/umbrella/commit/f3dcda8))

### [7.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.2) (2022-05-03)

#### 🩹 Bug fixes

- fix clamp01/11 signatures ([10bc32e](https://github.com/thi-ng/umbrella/commit/10bc32e))

### [7.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.1) (2022-04-07)

#### ⏱ Performance improvements

- update cartesian2 impl ([03722d9](https://github.com/thi-ng/umbrella/commit/03722d9))
  - avoid extraneous multiplies

## [7.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.0) (2022-03-11)

#### 🚀 Features

- add select() fn ([b7f9df1](https://github.com/thi-ng/umbrella/commit/b7f9df1))

#### 🩹 Bug fixes

- centered handling in standardize() ([8a5a81f](https://github.com/thi-ng/umbrella/commit/8a5a81f))
