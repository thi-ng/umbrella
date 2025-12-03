# Change Log

- **Last updated**: 2025-12-03T22:43:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.78](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@3.0.78) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@3.0.0) (2024-06-21)

#### 🛑 Breaking changes

- update/rewrite tessellate() & all tessellator impls ([97f1f66](https://github.com/thi-ng/umbrella/commit/97f1f66))
- BREAKING CHANGE: update tessellate() & all tessellator implementations
  - `Tessellator`s now collect/append results to a `Tessellation` object, consisting of
    a single point array and an array of face vertex IDs
  - add `tessellatedPoints()` and `indexedPoints()` to produce face/point arrays from a result `Tessellation`
  - remove again `edgeSplitWithThreshold()` & `triFanSplitWithThreshold()`,
    to be replaced with a more general alternative approach
- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([72cff99](https://github.com/thi-ng/umbrella/commit/72cff99))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate Tessellator, Tessellation
  - update imports
  - update deps
- add/update tessellation types & handling ([c0fb454](https://github.com/thi-ng/umbrella/commit/c0fb454))
- BREAKING CHANGE: add `ITessellation` interface & impls, update tessellators & `tessellate()`
  - rename/expand `Tessellation` => `ITessellation`
  - add `BasicTessellation` class
  - add `MeshTessellation` class
  - update `Tessellator` signature/return type, now returning list of new faces only
  - update all existing tessellators
  - add `tessellateWith()`
  - rename `tessellateQueue()` => `tessellateFaces()`
  - update `tessellate()`, now only syntax sugar for `tessellateWith()`
- update `Tessellator` signature ([c2ec98b](https://github.com/thi-ng/umbrella/commit/c2ec98b))
- BREAKING CHANGE: update `Tessellator` signature, add array arg for collecting tessellated faces
  - update `tessellateFaces()` to avoid concatenating
  - update all tessellators

#### 🚀 Features

- add edgeSplitWithThreshold() tessellator ([91480c7](https://github.com/thi-ng/umbrella/commit/91480c7))
  - add docstrings
- add triFanSplit/triFanSplitWithThreshold() tessellators ([417123c](https://github.com/thi-ng/umbrella/commit/417123c))
  - add doc strings
- initial integration of earCutComplex ([307cb3d](https://github.com/thi-ng/umbrella/commit/307cb3d))
- add triFanBoundary() tessellator ([a8fc397](https://github.com/thi-ng/umbrella/commit/a8fc397))

#### ♻️ Refactoring

- update/simplify earCutComplex() internals, add docs ([0b479eb](https://github.com/thi-ng/umbrella/commit/0b479eb))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))
- minor updates earCutComplex() ([a2d5ec4](https://github.com/thi-ng/umbrella/commit/a2d5ec4))

### [2.1.87](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-tessellate@2.1.87) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))
