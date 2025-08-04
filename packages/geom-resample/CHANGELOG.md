# Change Log

- **Last updated**: 2025-08-04T09:13:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@3.0.0) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([2a61784](https://github.com/thi-ng/umbrella/commit/2a61784))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate SamplingOpts, DEFAULT_SAMPLES, setDefaultSamples()
  - update imports
  - update deps

### [2.3.50](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.3.50) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([28c96bb](https://github.com/thi-ng/umbrella/commit/28c96bb))

### [2.3.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.3.43) (2024-03-21)

#### ♻️ Refactoring

- minor internal updates ([843788f](https://github.com/thi-ng/umbrella/commit/843788f))

### [2.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.3.8) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.3.0) (2023-10-12)

#### 🚀 Features

- add Sampler.extractRange() ([f3b0fbc](https://github.com/thi-ng/umbrella/commit/f3b0fbc))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.2.0) (2023-01-10)

#### 🚀 Features

- add sampleUniformX/Y() fns ([88f9ec5](https://github.com/thi-ng/umbrella/commit/88f9ec5))
  - update deps (add [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/main/packages/geom-isec))
  - update pkg

### [2.1.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-resample@2.1.38) (2022-12-10)

#### 🩹 Bug fixes

- avoid unnecessary resampling ([f2b0ef2](https://github.com/thi-ng/umbrella/commit/f2b0ef2))
  - update resample(), check if given `opts` are actually usable
    if not, just use orig points (or copies)
