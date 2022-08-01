# Change Log

- **Last updated**: 2022-08-01T14:53:59Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.2.0) (2022-06-23)

#### 🚀 Features

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
- add bounds pre-checks, update SDFAttribs, ops ([ddf0a6e](https://github.com/thi-ng/umbrella/commit/ddf0a6e))
  - update `SDFn` signature, add opt. min dist param
  - add `withBoundingCircle/Rect()` SDF wrappers
  - update shape fns (points2, polygon2, polyline2)
  - update SDF combinators (union, isec, diff etc.)
  - update `asSDF()` group impl
  - update `SDFAttribs`, allow `round` & `smooth` opts to be field based
  - add docstrings

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.1.1) (2022-06-20)

#### 🩹 Bug fixes

- fix rect size handling ([cc72bab](https://github.com/thi-ng/umbrella/commit/cc72bab))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-sdf@0.1.0) (2022-06-20)

#### 🚀 Features

- import as new pkg ([06dcca2](https://github.com/thi-ng/umbrella/commit/06dcca2))
