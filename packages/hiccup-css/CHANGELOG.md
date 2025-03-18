# Change Log

- **Last updated**: 2025-03-18T13:24:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.7.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.7.10) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.7.0) (2024-03-21)

#### 🚀 Features

- add support for `&` parent selector ([2332cdc](https://github.com/thi-ng/umbrella/commit/2332cdc))
  - update xfSel transducer to support SASS-style `&`
    parent selector
  - add tests

#### 🩹 Bug fixes

- correct case-sensitivity in attrib selectors ([23d556f](https://github.com/thi-ng/umbrella/commit/23d556f))
  - add tests

#### ♻️ Refactoring

- minor updates ([ac9032d](https://github.com/thi-ng/umbrella/commit/ac9032d))
  - internal updates animation() & withScope()

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.6.0) (2024-02-12)

#### 🚀 Features

- add more unit formatters ([36ab478](https://github.com/thi-ng/umbrella/commit/36ab478))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.5.0) (2024-02-06)

#### 🚀 Features

- at_keyframes() vararg handling ([62df789](https://github.com/thi-ng/umbrella/commit/62df789))
  - update to support more than just from/to keyframe args
  - if given more space them equally across [0,100] interval

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.4.0) (2024-01-23)

#### 🚀 Features

- add appendStyleSheet(), update injectStyleSheet() ([1eccb38](https://github.com/thi-ng/umbrella/commit/1eccb38))

### [2.3.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.3.4) (2023-12-22)

#### 🩹 Bug fixes

- fix media query `not` operator ([f40800b](https://github.com/thi-ng/umbrella/commit/f40800b))
  - wrap sub-query in parens
  - update tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.3.0) (2023-12-18)

#### 🚀 Features

- update float value formatter, add tests ([00ee4f7](https://github.com/thi-ng/umbrella/commit/00ee4f7))

#### 🩹 Bug fixes

- update conditional formatting ([f126005](https://github.com/thi-ng/umbrella/commit/f126005))
  - add tests

### [2.2.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.2.14) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.2.0) (2023-09-02)

#### 🚀 Features

- add customizable unit formatter precision ([2db3071](https://github.com/thi-ng/umbrella/commit/2db3071))
  - set default prec to 4 fractional digits
  - add setPrecision() to customize unit formatters
  - add vmin/vmax() unit formatters
  - update all other unit formatters

#### ♻️ Refactoring

- update at_keyframes() arg types ([5de6a92](https://github.com/thi-ng/umbrella/commit/5de6a92))
  - add Keyframe type alias
- update animation() args/opts ([ba47f93](https://github.com/thi-ng/umbrella/commit/ba47f93))
  - update AnimationOpts
  - use Keyframe type for args

### [2.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.1.39) (2023-02-17)

#### 🩹 Bug fixes

- update px() & ms() units [#383](https://github.com/thi-ng/umbrella/issues/383) ([e590d3f](https://github.com/thi-ng/umbrella/commit/e590d3f))
  - remove pixel rounding
  - use signed flooring for ms()

### [2.1.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.1.37) (2023-02-10)

#### 🩹 Bug fixes

- allow negative values for px ([340d542](https://github.com/thi-ng/umbrella/commit/340d542))
  Swap use of unsigned shift for OR `0`
  Fixes issue [#383](https://github.com/thi-ng/umbrella/issues/383)
