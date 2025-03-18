# Change Log

- **Last updated**: 2025-03-18T13:24:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@4.0.0) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([235e191](https://github.com/thi-ng/umbrella/commit/235e191))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate IntersectionType, IntersectionResult
  - update imports
  - update deps

#### 🚀 Features

- add classifyPointLine2(), classifyPointSegment2() ([3bde7ba](https://github.com/thi-ng/umbrella/commit/3bde7ba))
- fix [#429](https://github.com/thi-ng/umbrella/issues/429), add classifyPointPolygon(), classifyPointPlane() ([a771c67](https://github.com/thi-ng/umbrella/commit/a771c67))

#### 🩹 Bug fixes

- update intersectRayLine() to return proper IntersectionResult ([2616f7f](https://github.com/thi-ng/umbrella/commit/2616f7f))
  - wrap result `isec` as array

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@3.1.0) (2024-05-08)

#### 🚀 Features

- add pointInSegments() for polylines/polygons ([5b57e6f](https://github.com/thi-ng/umbrella/commit/5b57e6f))
- add rdom-klist example project, update readmes ([cd458ac](https://github.com/thi-ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://github.com/thi-ng/umbrella/commit/531437f))

### [3.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@3.0.7) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([a1dbad0](https://github.com/thi-ng/umbrella/commit/a1dbad0))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@3.0.0) (2024-03-21)

#### 🛑 Breaking changes

- update pointInCircumCircle() arg order ([0a06976](https://github.com/thi-ng/umbrella/commit/0a06976))
- BREAKING CHANGE: update pointInCircumCircle() arg order to align with rest of pkg
  - swap query point `p` arg from last to first arg
  - add docs

#### 🚀 Features

- update intersectRayPolylineAll() & intersectRayCircle() ([cb18d3b](https://github.com/thi-ng/umbrella/commit/cb18d3b))
  - add alpha/beta to result
- update line-line & ray intersection fns ([a45502b](https://github.com/thi-ng/umbrella/commit/a45502b))
  - update `IntersectionResult.isec` to always return arrays (if there're intersections)
    - `intersectLineLine()`
    - `intersectRayCircle()`
    - `intersectRayPlane()`
  - update `intersectRayPolyline()` & `intersectRayPolylineAll()`
    - add/fix `.inside` result flag
    - update `.isec`

### [2.1.86](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.1.86) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-isec@2.1.22) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([0547e2c](https://github.com/thi-ng/umbrella/commit/0547e2c))
