# Change Log

- **Last updated**: 2025-12-03T22:43:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.8.0) (2025-12-03)

#### 🚀 Features

- add integer predicates ([ea6f8f8](https://github.com/thi-ng/umbrella/commit/ea6f8f8))
  - add `isNegativeInt()` / `isNonPositiveInt()`
  - add `isPositiveInt()` / `isNonNegativeInt()`
- add more granular typed array checks ([43388f3](https://github.com/thi-ng/umbrella/commit/43388f3))
  - add `isIntArray()`, `isUintArray()`, `isFloatArray()`

### [3.7.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.7.16) (2025-08-07)

#### 🩹 Bug fixes

- fix [#540](https://github.com/thi-ng/umbrella/issues/540), update hasCrypto() & hasWASM() checks ([a626425](https://github.com/thi-ng/umbrella/commit/a626425))
  - use `self` vs `window` to include worker support

## [3.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.7.0) (2025-02-21)

#### 🚀 Features

- add `isDarkMode()` ([c42a738](https://github.com/thi-ng/umbrella/commit/c42a738))

### [3.6.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.6.19) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.6.0) (2024-04-08)

#### 🚀 Features

- add optional generics for collection checks ([8d55530](https://github.com/thi-ng/umbrella/commit/8d55530))

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.5.0) (2024-02-22)

#### 🚀 Features

- add isArrayBufferLike(), isArrayBufferView() ([652a1d2](https://github.com/thi-ng/umbrella/commit/652a1d2))

### [3.4.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.4.7) (2023-11-09)

#### 🩹 Bug fixes

- update isTypedArray() to return boolean ([2c0f72f](https://github.com/thi-ng/umbrella/commit/2c0f72f))

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.4.0) (2023-08-04)

#### 🚀 Features

- add isGenerator() ([af8ffb3](https://github.com/thi-ng/umbrella/commit/af8ffb3))

### [3.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.3.5) (2022-12-16)

#### ♻️ Refactoring

- add generics for isFunction() ([2850048](https://github.com/thi-ng/umbrella/commit/2850048))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.3.0) (2022-10-17)

#### 🚀 Features

- add isTouchEvent() ([7ef2acc](https://github.com/thi-ng/umbrella/commit/7ef2acc))

### [3.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.2.1) (2022-06-11)

#### 🩹 Bug fixes

- update export map (add missing isBigInt()) ([9270de0](https://github.com/thi-ng/umbrella/commit/9270de0))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.2.0) (2022-06-09)

#### 🚀 Features

- add isBigInt(), update pkg/readme ([bb6d833](https://github.com/thi-ng/umbrella/commit/bb6d833))
