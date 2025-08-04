# Change Log

- **Last updated**: 2025-08-04T09:13:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.5.0) (2025-07-26)

#### 🚀 Features

- add branch-level support for `__convert: false` ([a51d634](https://github.com/thi-ng/umbrella/commit/a51d634))
  - update `convertTree()` to allow branch-local disabling of conversion
  - add tests

### [5.4.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.4.13) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [5.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.4.0) (2024-09-16)

#### 🚀 Features

- add pattern(), add/use Attribs type alias ([4c40840](https://github.com/thi-ng/umbrella/commit/4c40840))

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.3.0) (2024-06-21)

#### 🚀 Features

- add fillRule attrib conversion support ([9277417](https://github.com/thi-ng/umbrella/commit/9277417))

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [5.2.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.2.34) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([dc07fdd](https://github.com/thi-ng/umbrella/commit/dc07fdd))

### [5.2.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.2.11) (2024-02-16)

#### 🩹 Bug fixes

- update scale attrib ([7e797d1](https://github.com/thi-ng/umbrella/commit/7e797d1))
  handling (if zero)
- update path() attrib overrides ([7b25d0d](https://github.com/thi-ng/umbrella/commit/7b25d0d))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.2.0) (2023-12-26)

#### 🚀 Features

- include Inkscape xmlns in `<svg>` root ([997850b](https://github.com/thi-ng/umbrella/commit/997850b))
- add `__inkscapeLayer` group attrib handling ([79a3932](https://github.com/thi-ng/umbrella/commit/79a3932))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.1.0) (2023-12-18)

#### 🚀 Features

- update convertTree() rounded rect handling ([6115a50](https://github.com/thi-ng/umbrella/commit/6115a50))
  - use `r` attrib to derive rounded rect radius

### [5.0.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.0.32) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@5.0.0) (2023-04-08)

#### 🛑 Breaking changes

- update svgDoc() conversion handling ([f0e9092](https://github.com/thi-ng/umbrella/commit/f0e9092))
- BREAKING CHANGE: update svgDoc(), rename `convert` attrib => `__convert`
  - for consistency, keep all control attribs prefixed as `__xxx`

#### 🚀 Features

- add support for precision attribute ([f81d0d8](https://github.com/thi-ng/umbrella/commit/f81d0d8))
  - update convertTree() to allow dynamic floating point precision
    handling via `__prec` control attrib
  - update docs
  - add tests

#### 🩹 Bug fixes

- update ff() to always return string ([ae1d844](https://github.com/thi-ng/umbrella/commit/ae1d844))

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.3.0) (2022-06-20)

#### 🚀 Features

- update default precision to .001 ([4e62c9d](https://github.com/thi-ng/umbrella/commit/4e62c9d))

### [4.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.2.13) (2022-06-09)

#### 🩹 Bug fixes

- fix [#351](https://github.com/thi-ng/umbrella/issues/351) convertTree() ([8dc0e86](https://github.com/thi-ng/umbrella/commit/8dc0e86))
  - update gradientTreansform handling

### [4.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.2.9) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
