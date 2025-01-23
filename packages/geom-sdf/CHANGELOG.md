# Change Log

- **Last updated**: 2025-01-23T13:39:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.4.2) (2024-06-21)

#### ♻️ Refactoring

- remove geom-api dep, update imports ([9b6464d](https://github.com/thi-ng/umbrella/commit/9b6464d))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.4.0) (2024-05-08)

#### 🚀 Features

- add rdom-klist example project, update readmes ([cd458ac](https://github.com/thi-ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://github.com/thi-ng/umbrella/commit/531437f))
- support path & complexpoly sub-shapes in asSDF() ([e924dc2](https://github.com/thi-ng/umbrella/commit/e924dc2))

#### ♻️ Refactoring

- update internal polyline handling ([f758425](https://github.com/thi-ng/umbrella/commit/f758425))
- add/update asSDF() impls for ComplexPoly & Path ([3337a0e](https://github.com/thi-ng/umbrella/commit/3337a0e))
  - update docs

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.3.0) (2024-01-23)

#### 🚀 Features

- update SDFAttribs/SDFModifiers ([e1e51ff](https://github.com/thi-ng/umbrella/commit/e1e51ff))
  - extract/update SDFModifiers
  - add min/max/clamp() mods
  - add withSDFModifiers()
  - update withSDFAttribs()
  - add/update docstrings

### [0.2.81](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.2.81) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.2.69](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.2.69) (2023-09-25)

#### 🩹 Bug fixes

- internal __sdfAttribs handling ([a86c25e](https://github.com/thi-ng/umbrella/commit/a86c25e))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.2.0) (2022-06-23)

#### 🚀 Features

- add bounds pre-checks, update SDFAttribs, ops ([ddf0a6e](https://github.com/thi-ng/umbrella/commit/ddf0a6e))
  - update `SDFn` signature, add opt. min dist param
  - add `withBoundingCircle/Rect()` SDF wrappers
  - update shape fns (points2, polygon2, polyline2)
  - update SDF combinators (union, isec, diff etc.)
  - update `asSDF()` group impl
  - update `SDFAttribs`, allow `round` & `smooth` opts to be field based
  - add docstrings
- major update: combinators, modifiers, shape support ([4ffbc86](https://github.com/thi-ng/umbrella/commit/4ffbc86))
  - support more shapes (and conversions) in asSDF()
  - update/extend SDFAttribs
  - add new SDF combinators (chamfer, round, step)
  - add higher order combinators defOp(), defParamOp()
  - add support for combinator params to be spatial
  - update asSDF() to support more shape types and auto-convert to poly/line
  - add domain modifiers, update `sample2d()` to support domain mods
  - update various distance functions (incl. uniform arg order, minimize allocs)
  - add docstrings

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.1.1) (2022-06-20)

#### 🩹 Bug fixes

- fix rect size handling ([cc72bab](https://github.com/thi-ng/umbrella/commit/cc72bab))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.1.0) (2022-06-20)

#### 🚀 Features

- import as new pkg ([06dcca2](https://github.com/thi-ng/umbrella/commit/06dcca2))
