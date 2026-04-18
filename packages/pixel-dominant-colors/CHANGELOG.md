# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.0.24](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-dominant-colors@2.0.24/packages/pixel-dominant-colors) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [2.0.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-dominant-colors@2.0.8/packages/pixel-dominant-colors) (2025-07-30)

#### ♻️ Refactoring

- update arg types ([80826ff](https://codeberg.org/thi.ng/umbrella/commit/80826ff))
  - use `NumericArray` => `ReadonlyVec`

# [2.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-dominant-colors@2.0.0/packages/pixel-dominant-colors) (2025-06-24)

#### 🛑 Breaking changes

- update dominantColors() ([9cf7a48](https://codeberg.org/thi.ng/umbrella/commit/9cf7a48))
- BREAKING CHANGE: rename `dominantColors()` => `dominantColorsKmeans()`, remove `dominantColorsArray()`
  - merge `dominantColors()` & `dominantColorsArray()` => `dominantColorsKmeans()`
  - add `DominantColor` result type
  - add filterSamples helper

#### 🚀 Features

- add dominantColorsMeanCut()/dominantColorsMedianCut() ([2ab48c7](https://codeberg.org/thi.ng/umbrella/commit/2ab48c7))

### [1.1.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-dominant-colors@1.1.2/packages/pixel-dominant-colors) (2024-07-25)

#### ♻️ Refactoring

- add/extract `dominantColorsArray()` ([4aea78e](https://codeberg.org/thi.ng/umbrella/commit/4aea78e))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-dominant-colors@1.1.0/packages/pixel-dominant-colors) (2024-07-22)

#### 🚀 Features

- import as new pkg ([#486](https://codeberg.org/thi.ng/umbrella/issues/486)) ([a4174f5](https://codeberg.org/thi.ng/umbrella/commit/a4174f5))
  - migrate `dominantColors()` from [@thi.ng/pixel](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/pixel) pkg
