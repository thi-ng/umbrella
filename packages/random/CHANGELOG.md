# Change Log

- **Last updated**: 2025-02-13T16:03:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@4.1.1) (2024-10-07)

#### 🩹 Bug fixes

- add missing pkg export (WrappedRandom) ([8e4f7d5](https://github.com/thi-ng/umbrella/commit/8e4f7d5))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@4.1.0) (2024-10-05)

#### 🚀 Features

- add WrappedRandom, refactor SYSTEM ([73c863f](https://github.com/thi-ng/umbrella/commit/73c863f))
  - replace `SystemRandom` with `WrappedRandom` class
  - refactor `SYSTEM`

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@4.0.0) (2024-07-22)

#### 🛑 Breaking changes

- migrate/remove UUID functions ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([2ec753e](https://github.com/thi-ng/umbrella/commit/2ec753e))
- BREAKING CHANGE: migrate UUID functions to [@thi.ng/uuid](https://github.com/thi-ng/umbrella/tree/main/packages/uuid) pkg
  - remove obsolete files
  - update deps/pkg
  - update readme

## [3.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.8.0) (2024-05-08)

#### 🚀 Features

- add rdom-klist example project, update readmes ([cd458ac](https://github.com/thi-ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://github.com/thi-ng/umbrella/commit/531437f))

## [3.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.7.0) (2024-03-21)

#### 🚀 Features

- add weightedProbability() ([393dcaa](https://github.com/thi-ng/umbrella/commit/393dcaa))

### [3.6.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.6.13) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.6.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.6.6) (2023-10-05)

#### 🩹 Bug fixes

- update ARandom.minmaxInt/Uint() ([33c35b4](https://github.com/thi-ng/umbrella/commit/33c35b4))
  - fix NaN bug iff min == max

### [3.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.6.1) (2023-08-12)

#### ⏱ Performance improvements

- add/re-use internal buf for uuid() ([6bf7f1d](https://github.com/thi-ng/umbrella/commit/6bf7f1d))
  - avoid temp allocations (10% faster)

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.6.0) (2023-08-12)

#### 🚀 Features

- add IRandom.minmaxUint() ([6558eb1](https://github.com/thi-ng/umbrella/commit/6558eb1))
  - clarify .minmaxInt() is for signed (i32)
  - new .minmaxUint() is for unsigned (u32)
  - add ARandom.minmaxUint()
- add IRandom.probability() ([efdd49c](https://github.com/thi-ng/umbrella/commit/efdd49c))
  - add impl for ARandom base class

#### ⏱ Performance improvements

- increase Crypto default size to 1KB ([a30075a](https://github.com/thi-ng/umbrella/commit/a30075a))
- minor update randomBytesFrom() ([770dbe5](https://github.com/thi-ng/umbrella/commit/770dbe5))
  - switch loop direction

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.5.0) (2023-07-14)

#### 🚀 Features

- add pickRandomUnique() ([a70c951](https://github.com/thi-ng/umbrella/commit/a70c951))
  - add generics for uniqueValuesFrom()

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.4.0) (2023-04-19)

#### 🚀 Features

- add INorm.normMinMax(), update ARandom ([89c6b76](https://github.com/thi-ng/umbrella/commit/89c6b76))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/random@3.3.0) (2022-05-22)

#### 🚀 Features

- update IRandom, add SFC32 impl ([970d7f4](https://github.com/thi-ng/umbrella/commit/970d7f4))
- add pickRandomKey(), weightedRandomKey() ([9b8ed07](https://github.com/thi-ng/umbrella/commit/9b8ed07))
