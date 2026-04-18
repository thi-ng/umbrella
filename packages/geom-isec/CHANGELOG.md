# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.0.41](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@4.0.41/packages/geom-isec) (2025-04-16)

#### 🩹 Bug fixes

- undo previous change in `intersectLinePolylineAll()` ([5454694](https://codeberg.org/thi.ng/umbrella/commit/5454694))
  - fix magnitude calc order (blame [dd1a57f](https://codeberg.org/thi.ng/umbrella/commit/dd1a57f))

#### ♻️ Refactoring

- minor internal optimizations (vector ops) ([dd1a57f](https://codeberg.org/thi.ng/umbrella/commit/dd1a57f))

# [4.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@4.0.0/packages/geom-isec) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/geom-api) ([235e191](https://codeberg.org/thi.ng/umbrella/commit/235e191))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/geom-api)
  - add/migrate IntersectionType, IntersectionResult
  - update imports
  - update deps

#### 🚀 Features

- add classifyPointLine2(), classifyPointSegment2() ([3bde7ba](https://codeberg.org/thi.ng/umbrella/commit/3bde7ba))
- fix [#429](https://codeberg.org/thi.ng/umbrella/issues/429), add classifyPointPolygon(), classifyPointPlane() ([a771c67](https://codeberg.org/thi.ng/umbrella/commit/a771c67))

#### 🩹 Bug fixes

- update intersectRayLine() to return proper IntersectionResult ([2616f7f](https://codeberg.org/thi.ng/umbrella/commit/2616f7f))
  - wrap result `isec` as array

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@3.1.0/packages/geom-isec) (2024-05-08)

#### 🚀 Features

- add pointInSegments() for polylines/polygons ([5b57e6f](https://codeberg.org/thi.ng/umbrella/commit/5b57e6f))
- add rdom-klist example project, update readmes ([cd458ac](https://codeberg.org/thi.ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://codeberg.org/thi.ng/umbrella/commit/531437f))

### [3.0.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@3.0.7/packages/geom-isec) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([a1dbad0](https://codeberg.org/thi.ng/umbrella/commit/a1dbad0))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@3.0.0/packages/geom-isec) (2024-03-21)

#### 🛑 Breaking changes

- update pointInCircumCircle() arg order ([0a06976](https://codeberg.org/thi.ng/umbrella/commit/0a06976))
- BREAKING CHANGE: update pointInCircumCircle() arg order to align with rest of pkg
  - swap query point `p` arg from last to first arg
  - add docs

#### 🚀 Features

- update intersectRayPolylineAll() & intersectRayCircle() ([cb18d3b](https://codeberg.org/thi.ng/umbrella/commit/cb18d3b))
  - add alpha/beta to result
- update line-line & ray intersection fns ([a45502b](https://codeberg.org/thi.ng/umbrella/commit/a45502b))
  - update `IntersectionResult.isec` to always return arrays (if there're intersections)
    - `intersectLineLine()`
    - `intersectRayCircle()`
    - `intersectRayPlane()`
  - update `intersectRayPolyline()` & `intersectRayPolylineAll()`
    - add/fix `.inside` result flag
    - update `.isec`

#### 🧪 Tests

- update tests (add alpha/beta) ([48647be](https://codeberg.org/thi.ng/umbrella/commit/48647be))
- update tests ([beb2dcd](https://codeberg.org/thi.ng/umbrella/commit/beb2dcd))

### [2.1.86](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@2.1.86/packages/geom-isec) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [2.1.54](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-isec@2.1.54/packages/geom-isec) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
