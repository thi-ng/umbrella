# Change Log

- **Last updated**: 2025-04-30T12:52:32Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@3.1.31) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@3.1.0) (2024-06-21)

#### 🚀 Features

- add fillRule attrib support ([9acb563](https://github.com/thi-ng/umbrella/commit/9acb563))

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@3.0.1) (2024-05-09)

#### ♻️ Refactoring

- minor update `draw()` arc handling ([e82077e](https://github.com/thi-ng/umbrella/commit/e82077e))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@3.0.0) (2024-05-08)

#### 🛑 Breaking changes

- fix [#69](https://github.com/thi-ng/umbrella/issues/69) add elliptic arc path segment support, rename circular arc segments ([7f82cb2](https://github.com/thi-ng/umbrella/commit/7f82cb2))
- BREAKING CHANGE: add elliptic arc path segment support, rename circular arc segments
  - update `path()` arc segment handling
    - use standard `A` and `a` path segment types for SVG-compatible elliptic arc segments
    - use `R` and `r` for canvas-only circular arc segments
  - update deps

#### ⏱ Performance improvements

- update rect(), use native rounded rect drawing ([5540510](https://github.com/thi-ng/umbrella/commit/5540510))

### [2.5.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.36) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([33ffebf](https://github.com/thi-ng/umbrella/commit/33ffebf))

### [2.5.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.17) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [2.5.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.14) (2024-02-19)

#### 🩹 Bug fixes

- fix [#448](https://github.com/thi-ng/umbrella/issues/448), pass vertex layout opts to packedPolyline()/packedPolygon() ([eb2bdc0](https://github.com/thi-ng/umbrella/commit/eb2bdc0))
  - update args for packedPolyline()/packedPolygon()
  - update draw() delegation call sites

### [2.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.2) (2023-12-19)

#### 🩹 Bug fixes

- fix rounded rect attrib handling ([ee79d01](https://github.com/thi-ng/umbrella/commit/ee79d01))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.5.0) (2023-12-18)

#### 🚀 Features

- fix [#433](https://github.com/thi-ng/umbrella/issues/433), support rounded rects via `r` attrib ([573245e](https://github.com/thi-ng/umbrella/commit/573245e))
  - update draw() to update rect handling

### [2.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.4.6) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.4.0) (2023-10-23)

#### 🚀 Features

- add/update packed shape support ([14ce2f8](https://github.com/thi-ng/umbrella/commit/14ce2f8))
  - add packedPolyline() / packedPolygon() fns
  - update draw() to add support for new shape types

### [2.3.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.3.24) (2023-10-11)

#### 🩹 Bug fixes

- fix "ellipse" shape handling (off-by-one error) ([d1985c4](https://github.com/thi-ng/umbrella/commit/d1985c4))
  - update draw() to include last (CCW flag) shape arg
  - also related to [#418](https://github.com/thi-ng/umbrella/issues/418)
- update circular arc handling in draw() ([18173c5](https://github.com/thi-ng/umbrella/commit/18173c5))
  - actually use CCW shape arg
  - add issue references for upcoming fixes

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.3.0) (2023-04-08)

#### 🚀 Features

- add support for __clear ctrl attrib ([2f3de82](https://github.com/thi-ng/umbrella/commit/2f3de82))

### [2.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.2.1) (2023-02-05)

#### 🩹 Bug fixes

- add null check for __skip attrib ([416b7bb](https://github.com/thi-ng/umbrella/commit/416b7bb))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.2.0) (2023-01-10)

#### 🚀 Features

- add __background attrib support ([a33a58d](https://github.com/thi-ng/umbrella/commit/a33a58d))
  - update __mergeState() to fill bg if attrib given
  - refactor attrib handling in main draw() fn

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-canvas@2.1.9) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
