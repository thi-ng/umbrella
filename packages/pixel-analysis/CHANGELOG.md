# Change Log

- **Last updated**: 2025-10-24T17:47:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@2.0.0) (2025-07-30)

#### 🛑 Breaking changes

- update color analysis result types, add aggregation ([8c70504](https://github.com/thi-ng/umbrella/commit/8c70504))
- BREAKING CHANGE:  update color analysis result types, add aggregation
  - add `BaseColorAnalysisResult`, `AggregatedColorAnalysisResult`
  - update `ColorAnalysisResult`, use `Metrics`
  - add `aggregateColorResults()`
  - update `analyzeColors()`, `deriveColorResults()`
  - rename `computeHueRange()` => `hueRange()`
  - update deps

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@1.1.1) (2025-07-27)

#### 🩹 Bug fixes

- update/fix weightedLuma result ([19d818c](https://github.com/thi-ng/umbrella/commit/19d818c))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@1.1.0) (2025-07-27)

#### 🚀 Features

- make temperature()/hueTemperature() parametric ([f61955e](https://github.com/thi-ng/umbrella/commit/f61955e))
  - add coefficients as optional arg
  - add `DEFAULT_TEMPERATURE_COEFFS`
- update analyzeColors() & ColorAnalysisResult ([595064d](https://github.com/thi-ng/umbrella/commit/595064d))
  - update/rename `AnalysisOpts` => `ColorAnalysisOpts`
  - add `ColorAnalysisOpts.tempCoeffs`
  - rename `AnalyzedImage` => `ColorAnalysisResult`
  - update `ColorAnalysisResult` internal structure
  - add `computeHueRange()`
- update `analyzeFeatures()`, add `FeatureAnalysisResult` ([e276eb8](https://github.com/thi-ng/umbrella/commit/e276eb8))

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-analysis@1.0.1) (2025-07-24)

#### 🩹 Bug fixes

- bail out if insufficient samples ([41ba4c3](https://github.com/thi-ng/umbrella/commit/41ba4c3))
  - update `temperature()` to return empty result if insufficient color samples
- update hue standard deviation ([9b0ea02](https://github.com/thi-ng/umbrella/commit/9b0ea02))
  - return normalized hue SD (not in radians)

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
