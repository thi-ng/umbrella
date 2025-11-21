# Change Log

- **Last updated**: 2025-11-21T15:55:41Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@3.0.24) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [3.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@3.0.3) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@3.0.0) (2024-02-19)

#### 🛑 Breaking changes

- add plotting, additive blending/blitting, refactor bar chart fns ([7cd6d41](https://github.com/thi-ng/umbrella/commit/7cd6d41))
- BREAKING CHANGE: swap naming of barChartH/V fns, update args for blit()/blitMask()
  - swap naming of barChartH/V fns:
    - barChartHLines/Str() <=> barChartVLines/Str()
  - add plotBarsV() multi-plot function
  - add blitBarsV() fn w/ support for custom blending fns
    - add blendBarsVAdd() additive blending fn
    - add BLEND_ADD lookup table for additive blending using ANSI16 colors
  - update arg order of blit()/blitMask() fns
  - add Canvas.empty(), Canvas.clear() fns

#### ♻️ Refactoring

- unify plotting function naming ([cb275ae](https://github.com/thi-ng/umbrella/commit/cb275ae))
  - plotBarsV() => plotBarChartV()
  - lineChart() => plotLineChart()
  - migrate line chart fns to plot.ts

### [2.6.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.6.17) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.6.0) (2023-08-24)

#### 🚀 Features

- add lineChart() & lineChartStr() ([097e00c](https://github.com/thi-ng/umbrella/commit/097e00c))

#### ♻️ Refactoring

- update bar chart min/max handling ([e45247d](https://github.com/thi-ng/umbrella/commit/e45247d))
  - auto-compute value range if not specified

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.5.0) (2023-08-14)

#### 🚀 Features

- add imageRawFmtOnly() ([1042a40](https://github.com/thi-ng/umbrella/commit/1042a40))

### [2.4.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.4.40) (2023-03-27)

#### ♻️ Refactoring

- update remaining type imports (TS5.0) in various pkgs ([e0edf26](https://github.com/thi-ng/umbrella/commit/e0edf26))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.4.0) (2022-07-08)

#### 🚀 Features

- add blitMask() & docs ([a6cf74a](https://github.com/thi-ng/umbrella/commit/a6cf74a))
- add clearFormat() ([83f04cc](https://github.com/thi-ng/umbrella/commit/83f04cc))
- add canvasFromText(), update Canvas ([e8baa0b](https://github.com/thi-ng/umbrella/commit/e8baa0b))
  - update deps
  - add canvasFromText() factory fn
  - add ICopy impl for Canvas

### [2.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.3.8) (2022-06-28)

#### ♻️ Refactoring

- update/simplify formatCanvas() ([e2f3ab9](https://github.com/thi-ng/umbrella/commit/e2f3ab9))
  - re-use new single-line formatting fns from [@thi.ng/text-format](https://github.com/thi-ng/umbrella/tree/main/packages/text-format)

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-canvas@2.3.0) (2022-04-07)

#### 🚀 Features

- update Canvas.setAt() ([7df033f](https://github.com/thi-ng/umbrella/commit/7df033f))
  - allow pixel value to be number or string
