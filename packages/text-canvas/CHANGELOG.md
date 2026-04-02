# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.101](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@3.0.101/packages/text-canvas) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [3.0.24](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@3.0.24/packages/text-canvas) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [3.0.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@3.0.3/packages/text-canvas) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@3.0.0/packages/text-canvas) (2024-02-19)

#### 🛑 Breaking changes

- add plotting, additive blending/blitting, refactor bar chart fns ([7cd6d41](https://codeberg.org/thi.ng/umbrella/commit/7cd6d41))
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

- unify plotting function naming ([cb275ae](https://codeberg.org/thi.ng/umbrella/commit/cb275ae))
  - plotBarsV() => plotBarChartV()
  - lineChart() => plotLineChart()
  - migrate line chart fns to plot.ts

### [2.6.17](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@2.6.17/packages/text-canvas) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [2.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@2.6.0/packages/text-canvas) (2023-08-24)

#### 🚀 Features

- add lineChart() & lineChartStr() ([097e00c](https://codeberg.org/thi.ng/umbrella/commit/097e00c))

#### ♻️ Refactoring

- update bar chart min/max handling ([e45247d](https://codeberg.org/thi.ng/umbrella/commit/e45247d))
  - auto-compute value range if not specified

## [2.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@2.5.0/packages/text-canvas) (2023-08-14)

#### 🚀 Features

- add imageRawFmtOnly() ([1042a40](https://codeberg.org/thi.ng/umbrella/commit/1042a40))

### [2.4.40](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/text-canvas@2.4.40/packages/text-canvas) (2023-03-27)

#### ♻️ Refactoring

- update remaining type imports (TS5.0) in various pkgs ([e0edf26](https://codeberg.org/thi.ng/umbrella/commit/e0edf26))
