# Change Log

- **Last updated**: 2023-08-04T10:58:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-axidraw@0.5.0) (2023-03-22)

#### 🚀 Features

- add support for new draw commands ([e5e994c](https://github.com/thi-ng/umbrella/commit/e5e994c))
  - update asGeometry() to handle new move commands

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-axidraw@0.4.0) (2023-03-19)

#### 🚀 Features

- add InterleaveOpts for point clouds ([78012a0](https://github.com/thi-ng/umbrella/commit/78012a0))
  - add InterleaveOpts & docs
  - update AxiDrawAttribs
  - update point cloud processing to support command sequence interleaving
- add interleave opts support for shape groups ([57783ff](https://github.com/thi-ng/umbrella/commit/57783ff))
  - update asAxiDraw() impl for shape groups

#### ♻️ Refactoring

- update draw command handling ([18cd5bc](https://github.com/thi-ng/umbrella/commit/18cd5bc))
- update InterleaveOpts ([0866f9f](https://github.com/thi-ng/umbrella/commit/0866f9f))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-axidraw@0.3.0) (2023-01-10)

#### 🚀 Features

- add asGeometry() command visualization ([78199ba](https://github.com/thi-ng/umbrella/commit/78199ba))

#### 🩹 Bug fixes

- update group attrib handling ([7f5d9a3](https://github.com/thi-ng/umbrella/commit/7f5d9a3))
  - ensure `__samples` attrib is being properly merged

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
