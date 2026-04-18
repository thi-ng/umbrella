# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-convolve@1.1.19/packages/pixel-convolve) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-convolve@1.1.0/packages/pixel-convolve) (2025-05-28)

#### 🚀 Features

- add/update kernels ([24051c3](https://codeberg.org/thi.ng/umbrella/commit/24051c3))
  - add `EDGE3`, `EDGE5`

#### 🩹 Bug fixes

- swap `SOBEL_X`/`SOBEL_Y` to correct axis ([7bef58a](https://codeberg.org/thi.ng/umbrella/commit/7bef58a))

## [0.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/pixel-convolve@0.1.0/packages/pixel-convolve) (2024-07-22)

#### 🚀 Features

- import as new pkg ([#486](https://codeberg.org/thi.ng/umbrella/issues/486)) ([5c3f4be](https://codeberg.org/thi.ng/umbrella/commit/5c3f4be))
  - migrate convolve, normalMap and imagePyramid functions
    from [@thi.ng/pixel](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/pixel) pkg
