# Change Log

- **Last updated**: 2023-08-12T13:14:08Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
