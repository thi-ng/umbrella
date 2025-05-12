# Change Log

- **Last updated**: 2025-05-12T07:03:24Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tensors@0.4.0) (2025-05-12)

#### 🚀 Features

- add release() handling for tensors ([da06312](https://github.com/thi-ng/umbrella/commit/da06312))
- add data type support for range() options ([90d02bc](https://github.com/thi-ng/umbrella/commit/90d02bc))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tensors@0.3.0) (2025-05-08)

#### 🚀 Features

- add swap(), update defOpRT/TT() fns ([5d2dd2a](https://github.com/thi-ng/umbrella/commit/5d2dd2a))
- add range() tensor factory ([a8a6365](https://github.com/thi-ng/umbrella/commit/a8a6365))
- add ITensor.position() & impls ([595764d](https://github.com/thi-ng/umbrella/commit/595764d))
- add filteredIndices() & presets ([edd8983](https://github.com/thi-ng/umbrella/commit/edd8983))
  - add nonZeroIndices()
  - add negativeIndices(), positiveIndices()

#### 🩹 Bug fixes

- update ITensor.broadcast() return type ([f7b2e7a](https://github.com/thi-ng/umbrella/commit/f7b2e7a))

#### ♻️ Refactoring

- update range() impl (w/o dependencies) ([ce89d71](https://github.com/thi-ng/umbrella/commit/ce89d71))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tensors@0.2.0) (2025-05-02)

#### 🚀 Features

- add `zeroes()`/`ones()` ([eb6f82d](https://github.com/thi-ng/umbrella/commit/eb6f82d))
- add singular value decomp `svd()` ([8902157](https://github.com/thi-ng/umbrella/commit/8902157))
- add `diagonal()` and `trace()` fns ([47a0e73](https://github.com/thi-ng/umbrella/commit/47a0e73))
- add broadcast(), add ITensor.broadcast() ([b9b2dfc](https://github.com/thi-ng/umbrella/commit/b9b2dfc))
- update all tensor ops & op generators ([47b3e4e](https://github.com/thi-ng/umbrella/commit/47b3e4e))
  - add broadcasting support where possible
  - update all `defOpXXX` HOF generators
  - replace & remove various `TensorOpXXX` function types
  - update all tensor ops, only keep one version per op
  - update doc strings

#### 🩹 Bug fixes

- add missing `randDistrib4()` ([eb2ded2](https://github.com/thi-ng/umbrella/commit/eb2ded2))

#### ♻️ Refactoring

- update internal local var handling in various tensor ops ([c02c2a6](https://github.com/thi-ng/umbrella/commit/c02c2a6))
- internal updates dot(), identity(), select() ([c0ed334](https://github.com/thi-ng/umbrella/commit/c0ed334))
- update top() return type ([dcab223](https://github.com/thi-ng/umbrella/commit/dcab223))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tensors@0.1.0) (2025-04-30)

#### 🚀 Features

- initial import (old code, needs update) ([dc4f2b4](https://github.com/thi-ng/umbrella/commit/dc4f2b4))
- major updates & refactoring/cleanup ([49249a9](https://github.com/thi-ng/umbrella/commit/49249a9))
- update & restructure defOpXX() fns ([a96ecf8](https://github.com/thi-ng/umbrella/commit/a96ecf8))
- update TensorOpts and tensor factory fn, add docs ([21b8d48](https://github.com/thi-ng/umbrella/commit/21b8d48))
- update/replace tensor op generators, add op types ([2a00949](https://github.com/thi-ng/umbrella/commit/2a00949))
- add first set of common math ops ([00c02c1](https://github.com/thi-ng/umbrella/commit/00c02c1))
- add matrix-vector multiply, add custom error type ([a005276](https://github.com/thi-ng/umbrella/commit/a005276))
- add `identity()` factory fn ([1f2e914](https://github.com/thi-ng/umbrella/commit/1f2e914))
- add defOpRT(), add product/sum reducers ([19b6a9a](https://github.com/thi-ng/umbrella/commit/19b6a9a))
- add exp, log, softMax ops, update pkg exports ([465b0d2](https://github.com/thi-ng/umbrella/commit/465b0d2))
- add various math ops ([9e385ad](https://github.com/thi-ng/umbrella/commit/9e385ad))
- add/update various math ops, types, op factories ([a64468e](https://github.com/thi-ng/umbrella/commit/a64468e))
- add select(), argMin, argMax() fns ([fa508e1](https://github.com/thi-ng/umbrella/commit/fa508e1))
- add `print()` helper ([6c2e347](https://github.com/thi-ng/umbrella/commit/6c2e347))
  - rename existing fn => `debug()`
- add softPlus() op ([1d85630](https://github.com/thi-ng/umbrella/commit/1d85630))
- add 4D tensor support & ops ([e3c9a0f](https://github.com/thi-ng/umbrella/commit/e3c9a0f))
- add exp2(), log2() ops ([18544a4](https://github.com/thi-ng/umbrella/commit/18544a4))
- update tensor(), add tensorFromArray(), add types/generics ([204734d](https://github.com/thi-ng/umbrella/commit/204734d))

#### 🩹 Bug fixes

- fix tensor scalar ops ([a26309d](https://github.com/thi-ng/umbrella/commit/a26309d))

#### ♻️ Refactoring

- minor update mulM() ([8bec8d1](https://github.com/thi-ng/umbrella/commit/8bec8d1))
- deduplicate tensor impls ([5fac485](https://github.com/thi-ng/umbrella/commit/5fac485))
- minor internal update arg types ([be56f5a](https://github.com/thi-ng/umbrella/commit/be56f5a))
