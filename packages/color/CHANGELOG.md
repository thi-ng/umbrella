# Change Log

- **Last updated**: 2025-07-20T14:56:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [5.7.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.7.33) (2025-04-16)

#### ♻️ Refactoring

- minor internal updates (imports) ([269c8ae](https://github.com/thi-ng/umbrella/commit/269c8ae))

### [5.7.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.7.4) (2024-09-16)

#### 🩹 Bug fixes

- update pkg exports ([f5f733f](https://github.com/thi-ng/umbrella/commit/f5f733f))

## [5.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.7.0) (2024-08-19)

#### 🚀 Features

- add setDefaultCSSConversions(), update css() ([2d9e505](https://github.com/thi-ng/umbrella/commit/2d9e505))
  - add setDefaultCSSConversions() to set default CSS color conversion rules
  - update css() to use current configured default instead of CSS_LEVEL3
  - add/update docs

### [5.6.47](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.6.47) (2024-06-29)

#### 🩹 Bug fixes

- update color ctor handling for single ARGB int args ([8ab6083](https://github.com/thi-ng/umbrella/commit/8ab6083))
  - interpret sole int arg as sRGB, **not** as linear RGB
  - add tests

### [5.6.46](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.6.46) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))
- dedupe types for isBlack/Gray/White() fns ([a00705d](https://github.com/thi-ng/umbrella/commit/a00705d))
- minor dedupe lab/lch CSS serialization ([19df487](https://github.com/thi-ng/umbrella/commit/19df487))

### [5.6.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.6.42) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([39494f2](https://github.com/thi-ng/umbrella/commit/39494f2))

### [5.6.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.6.40) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling ([5b445a7](https://github.com/thi-ng/umbrella/commit/5b445a7))

### [5.6.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.6.24) (2024-02-23)

#### 🩹 Bug fixes

- allow base color opt in colorFromRange() ([4e7e7fe](https://github.com/thi-ng/umbrella/commit/4e7e7fe))
- fix/update readme code examples, tangle all ([6eb48ac](https://github.com/thi-ng/umbrella/commit/6eb48ac))

## [5.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.6.0) (2023-11-12)

#### 🚀 Features

- update temperatureMat() ([eaacfa0](https://github.com/thi-ng/umbrella/commit/eaacfa0))
  - add (optional) 2nd green/magenta axis to existing blue/yellow

### [5.5.27](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.27) (2023-10-27)

#### ♻️ Refactoring

- update vector imports ([95f1d64](https://github.com/thi-ng/umbrella/commit/95f1d64))

### [5.5.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.19) (2023-09-19)

#### ♻️ Refactoring

- update hiccup/SVG generators ([37c532f](https://github.com/thi-ng/umbrella/commit/37c532f))

### [5.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.5) (2023-07-14)

#### ♻️ Refactoring

- update swatches() return type ([ba73557](https://github.com/thi-ng/umbrella/commit/ba73557))

## [5.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.5.0) (2023-04-19)

#### 🚀 Features

- add TypedColor.xyz 3-channel accessor, update all impls ([c62e0ee](https://github.com/thi-ng/umbrella/commit/c62e0ee))
- add mostSimilar() ([8cfc36d](https://github.com/thi-ng/umbrella/commit/8cfc36d))

## [5.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.4.0) (2023-03-02)

#### 🚀 Features

- add oklch mode impl/support ([3e77420](https://github.com/thi-ng/umbrella/commit/3e77420))
  - add oklch() factory & class decl
  - add oklab<>oklch conversions
  - update analog() & rotate()
- add CSS Level4 oklab/oklch support ([137d322](https://github.com/thi-ng/umbrella/commit/137d322))
  - update parseCss() to support oklab/oklch colors
  - add oklab/oklch CSS serializers
  - update css() to optionally support CSS Color Module L4
  - add CSS_LEVEL3 / CSS_LEVEL4 conversions
- update color() to accept CSS color strings ([0d5b3e9](https://github.com/thi-ng/umbrella/commit/0d5b3e9))

#### 🩹 Bug fixes

- update oklab LMS matrices ([6e2cb75](https://github.com/thi-ng/umbrella/commit/6e2cb75))
  - according to @bottosson they were already updated in 01/2021
- update parseCss()/parseHex() ([dbbdc7d](https://github.com/thi-ng/umbrella/commit/dbbdc7d))
  - fix support for percentages
  - fix channel scale factors
  - fix alpha-channel handling in parseHex()
  - rename internal helpers
  - add/update tests

#### ⏱ Performance improvements

- refactor distLch() ([fa2d4e0](https://github.com/thi-ng/umbrella/commit/fa2d4e0))
  - use Law of Cosines impl to avoid 1x cos and 2x sin ops

#### ♻️ Refactoring

- update oklab/oklch channel ranges, add docs ([d87b30d](https://github.com/thi-ng/umbrella/commit/d87b30d))
- update (ok)lab/lch CSS serializers ([8492f5e](https://github.com/thi-ng/umbrella/commit/8492f5e))
  - extract internal helpers
  - update/fix channel scale factors

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.3.0) (2023-02-10)

#### 🚀 Features

- add hue() function ([c5c3dd5](https://github.com/thi-ng/umbrella/commit/c5c3dd5))
- add distLch() ([f1b509d](https://github.com/thi-ng/umbrella/commit/f1b509d))

#### 🩹 Bug fixes

- fix invert() for HSL ([84d0640](https://github.com/thi-ng/umbrella/commit/84d0640))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.2.0) (2022-09-21)

#### 🚀 Features

- add WCAG2 contrast() fn ([a132107](https://github.com/thi-ng/umbrella/commit/a132107))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.1.0) (2022-06-09)

#### 🚀 Features

- update multiColorGradient() ([f47a59d](https://github.com/thi-ng/umbrella/commit/f47a59d))
  - add support for automatic conversion to packed ARGB/ABGR ints
    (for use with indexed color models in [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/main/packages/pixel))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color@5.0.0) (2022-03-11)

#### 🛑 Breaking changes

- rename color matrix fns ([00fdc31](https://github.com/thi-ng/umbrella/commit/00fdc31))
- BREAKING CHANGE: rename color matrix fns
  - add `Mat` suffix, e.g. `grayscale()` => `grayscaleMat()`

#### 🚀 Features

- update ChannelSpec and hue-based modes ([01d93dc](https://github.com/thi-ng/umbrella/commit/01d93dc))
  - add `hue` flag for channel spec
  - update `.clamp()` impl to wrap hue in [0..1] interval
  - add/update LCH conversion paths
- add/update color ops ([33cb4a1](https://github.com/thi-ng/umbrella/commit/33cb4a1))
  - add `invert()`, `isRgbGamut()`, `lighten()`, `rotate()` ops
  - add `tint()`, `tone()`, `shade()` ops
  - update impls for `isBlack/Gray/White()`
  - add/re-use internal multimethod dispatch fns
- add max chroma LCH fns ([ab4e67a](https://github.com/thi-ng/umbrella/commit/ab4e67a))
- add variations() generator ([91d760f](https://github.com/thi-ng/umbrella/commit/91d760f))
- add color theme strategies ([22057e5](https://github.com/thi-ng/umbrella/commit/22057e5))
  - add strategy fns:
    - `complementaryStrategy()`
    - `splitComplementaryStrategy()`
    - `monochromeStrategy()`
    - `triadicStrategy()`
    - `tetradicStrategy()`
    - `squareStrategy()`
