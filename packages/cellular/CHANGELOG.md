# Change Log

- **Last updated**: 2025-10-24T13:42:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@1.0.2) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [0.2.92](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@0.2.92) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [0.2.68](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@0.2.68) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.2.65](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@0.2.65) (2023-10-27)

#### ♻️ Refactoring

- update MultiCA1D.rotate() ([f8fbac6](https://github.com/thi-ng/umbrella/commit/f8fbac6))
  - re-use impl from [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays)
  - update deps, readme

### [0.2.47](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@0.2.47) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@0.2.0) (2022-06-11)

#### 🚀 Features

- add probabilities, update options ([97e6b4d](https://github.com/thi-ng/umbrella/commit/97e6b4d))
  - add cell update probabilities
  - add `updateProbabilistic()`
  - extract `computeCell()`
  - add `UpdateImageOpts1D`, update `updateImage()`
  - replace `clearCurrent()` => `clearTarget()`

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cellular@0.1.0) (2022-06-09)

#### 🚀 Features

- import as new pkg ([aaec2ed](https://github.com/thi-ng/umbrella/commit/aaec2ed))
- update setPattern/setNoise() ([2ef2013](https://github.com/thi-ng/umbrella/commit/2ef2013))
  - add support to operate on diff target buffers (cells/mask)
- add kernel presets, simplify CASpec1D ([3ee4a25](https://github.com/thi-ng/umbrella/commit/3ee4a25))
