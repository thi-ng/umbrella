# Change Log

- **Last updated**: 2025-03-17T13:40:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
