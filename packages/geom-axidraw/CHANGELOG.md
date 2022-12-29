# Change Log

- **Last updated**: 2022-12-29T20:56:59Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-axidraw@0.2.0) (2022-12-29)

#### 🚀 Features

- add shapesByNearestNeighbor() ([0059766](https://github.com/thi-ng/umbrella/commit/0059766))
- add skip attrib ([4675151](https://github.com/thi-ng/umbrella/commit/4675151))
  - update group & points conversion fns
  - update deps

#### ♻️ Refactoring

- update pointsByNearestNeighbor() ([8a171e0](https://github.com/thi-ng/umbrella/commit/8a171e0))
  - lift `accel` spatial index impl as arg
  - update doc strings

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-axidraw@0.1.0) (2022-12-10)

#### 🚀 Features

- import as new pkg ([87e4945](https://github.com/thi-ng/umbrella/commit/87e4945))
- add shape/point ordering support ([58b3b5d](https://github.com/thi-ng/umbrella/commit/58b3b5d))
  - add Point/ShapeOrdering types
  - add pointsByProximity()/shapesByProximity() HOF ordering fns
  - add AxiDrawAttribs.sort attrib
  - add/update doc strings
  - update deps
- add/update AsAxiDrawOpts ([24f8abe](https://github.com/thi-ng/umbrella/commit/24f8abe))
  - update points & polyline handling
- add pointsByNearestNeighbor() ordering ([d1ebd21](https://github.com/thi-ng/umbrella/commit/d1ebd21))
  - use pointsByNearestNeighbor() as default for point clouds
    - new method is 25%-30% faster than pointsByProximity()
  - update PointOrdering/ShapeOrdering return types
  - update doc strings
  - update deps

#### ♻️ Refactoring

- internal restructure, add docs ([443c12c](https://github.com/thi-ng/umbrella/commit/443c12c))
