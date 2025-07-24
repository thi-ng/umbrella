# Change Log

- **Last updated**: 2025-07-24T19:45:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@1.0.0) (2025-07-24)

#### 🛑 Breaking changes

- major update/rewrite hue range analysis fns ([5730fea](https://github.com/thi-ng/umbrella/commit/5730fea))
- BREAKING CHANGE: replace/update hue range analysis fns
- major update/rewrite hue range analysis fns ([9b12898](https://github.com/thi-ng/umbrella/commit/9b12898))
- BREAKING CHANGE: update AnalyzedImage result, update color analysis fns
  - update structure & details of `AnalyzedImage` result type
  - update `derivedColorsResults()`
  - update/split `analyzeColors()`
- replace temperature calculation ([2a23cfa](https://github.com/thi-ng/umbrella/commit/2a23cfa))
- BREAKING CHANGE: replace temperature calculation with whole new approach
  - replace existing `temperature()` with new method/approach
  - add `TemperatureResult`
  - update `analyzeColors()`, `derivedColorsResult()`

### [0.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@0.4.1) (2025-07-15)

#### ♻️ Refactoring

- extract `derivedColorsResults()` ([c8fb4ed](https://github.com/thi-ng/umbrella/commit/c8fb4ed))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@0.4.0) (2025-07-14)

#### 🚀 Features

- add color channel precision ([beb2c21](https://github.com/thi-ng/umbrella/commit/beb2c21))
  - add `AnalysisOpts.prec`
  - update `analyzeColors()`

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@0.3.0) (2025-06-24)

#### 🚀 Features

- update dominant color extraction ([58c7ea5](https://github.com/thi-ng/umbrella/commit/58c7ea5))
  - add `AnalysisOpts.dominantFn`

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@0.2.0) (2025-06-02)

#### 🚀 Features

- update hue range fns ([27d43aa](https://github.com/thi-ng/umbrella/commit/27d43aa))
  - simplify/optimize warmIntensityHsv()
  - update args to accept int buffers
  - add tests

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@0.1.0) (2025-05-28)

#### 🚀 Features

- import as new pkg ([587b4da](https://github.com/thi-ng/umbrella/commit/587b4da))
