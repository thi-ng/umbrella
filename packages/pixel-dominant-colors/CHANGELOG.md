# Change Log

- **Last updated**: 2025-11-21T15:55:41Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dominant-colors@2.0.8) (2025-07-30)

#### ♻️ Refactoring

- update arg types ([80826ff](https://github.com/thi-ng/umbrella/commit/80826ff))
  - use `NumericArray` => `ReadonlyVec`

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dominant-colors@2.0.0) (2025-06-24)

#### 🛑 Breaking changes

- update dominantColors() ([9cf7a48](https://github.com/thi-ng/umbrella/commit/9cf7a48))
- BREAKING CHANGE: rename `dominantColors()` => `dominantColorsKmeans()`, remove `dominantColorsArray()`
  - merge `dominantColors()` & `dominantColorsArray()` => `dominantColorsKmeans()`
  - add `DominantColor` result type
  - add filterSamples helper

#### 🚀 Features

- add dominantColorsMeanCut()/dominantColorsMedianCut() ([2ab48c7](https://github.com/thi-ng/umbrella/commit/2ab48c7))

### [1.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dominant-colors@1.1.2) (2024-07-25)

#### ♻️ Refactoring

- add/extract `dominantColorsArray()` ([4aea78e](https://github.com/thi-ng/umbrella/commit/4aea78e))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dominant-colors@1.1.0) (2024-07-22)

#### 🚀 Features

- import as new pkg ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([a4174f5](https://github.com/thi-ng/umbrella/commit/a4174f5))
  - migrate `dominantColors()` from [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/main/packages/pixel) pkg
