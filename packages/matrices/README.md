<!-- This file is generated - DO NOT EDIT! -->

# ![matrices](https://media.thi.ng/umbrella/banners/thing-matrices.svg?42559f4d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/matrices.svg)](https://www.npmjs.com/package/@thi.ng/matrices)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/matrices.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Constants](#constants)
  - [Matrix creation](#matrix-creation)
    - [WebGL related](#webgl-related)
  - [Matrix conversion](#matrix-conversion)
  - [Setters](#setters)
  - [Row & column accessors](#row--column-accessors)
  - [Componentwise matrix - matrix](#componentwise-matrix---matrix)
  - [Componentwise matrix - scalar](#componentwise-matrix---scalar)
  - [Matrix multiplication](#matrix-multiplication)
  - [Matrix - vector multiplication](#matrix---vector-multiplication)
  - [Determinant & inversion](#determinant--inversion)
  - [Matrix transposition](#matrix-transposition)
  - [Quaternion](#quaternion)
- [Authors](#authors)
- [License](#license)

## About

Matrix & quaternion operations for 2D/3D geometry processing.

This package provides 160+ matrix & quaternion operations for 2D/3D
geometry processing and acts as companion package for
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors).
Like with the vectors package, most functions are defined as
multi-method dispatching to optimized implementations based on matrix
size (which themselves are exposed for direct use too).

Any `ArrayLike` type can be used as matrix containers (e.g. JS arrays,
typed arrays, custom impls) and hence many other functions provided by
the vectors package can also be used directly with matrices (where
sensible).

### Status

**STABLE** - used in production

### Related packages

- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) - Array-based color ops, conversions, multi-color gradients, presets
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations

## Installation

```bash
yarn add @thi.ng/matrices
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/matrices?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/matrices/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 4.75 KB / CJS: 5.31 KB / UMD: 4.83 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                           | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>       | 2D scenegraph & shape picking                         | [Demo](https://demo.thi.ng/umbrella/scenegraph/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/> | 2D scenegraph & image map based geometry manipulation | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-graph.jpg" width="240"/>     | Minimal shader graph developed during livestream #2   | [Demo](https://demo.thi.ng/umbrella/shader-graph/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-graph)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/>     | Entity Component System w/ 100k 3D particles          | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>      | 3D wireframe textmode demo                            | [Demo](https://demo.thi.ng/umbrella/text-canvas/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/>       | WebGL multi-colored cube mesh                         | [Demo](https://demo.thi.ng/umbrella/webgl-cube/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cube)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cubemap.jpg" width="240"/>    | WebGL cube maps with async texture loading            | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cubemap)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-grid.jpg" width="240"/>       | WebGL instancing, animated grid                       | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-grid)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/>       | WebGL MSDF text rendering & particle system           | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/matrices/)

### Constants

- `IDENT22` / `IDENT23` / `IDENT33` / `IDENT44`

### Matrix creation

- `rotation22` / `rotation23`
- `rotationAroundAxis33` / `rotationAroundAxis44`
- `rotationX33` / `rotationX44`
- `rotationY33` / `rotationY44`
- `rotationZ33` / `rotationZ44`
- `scale22` / `scale23` / `scale33` / `scale44`
- `scaleWithCenter23` / `scaleWithCenter44`
- `shearX22` / `shearY22`
- `shearX23` / `shearY23`
- `shearXY33` / `shearXZ33` / `shearYX33` / `shearYZ33` / `shearZX33` / `shearZY33`
- `shearXY44` / `shearXZ44` / `shearYX44` / `shearYZ44` / `shearZX44` / `shearZY44`
- `skewX22` / `skewY22`
- `skewX23` / `skewY23`
- `skewXY33` / `skewXZ33` / `skewYX33` / `skewYZ33` / `skewZX33` / `skewZY33`
- `skewXY44` / `skewXZ44` / `skewYX44` / `skewYZ44` / `skewZX44` / `skewZY44`
- `translation23` / `translation44`
- `transform23` / `transform44`

#### WebGL related

- `frustum` / `frustumBounds`
- `lookAt`
- `ortho`
- `perspective`
- `viewport`

### Matrix conversion

- `mat22to23`
- `mat23to22` / `mat23to44`
- `mat33to44` / `mat44to33`
- `normal44`

### Setters

- `set` / `set22` / `set23` / `set33` / `set44`
- `identity` / `identity22` / `identity23` / `identity33` / `identity44`

### Row & column accessors

- `column` / `column22` / `column23` / `column33` / `column44`
- `row` / `row22` / `row23` / `row33` / `row44`

### Componentwise matrix - matrix

- `add` / `add22` / `add23` / `add33` / `add44`
- `div` / `div22` / `div23` / `div33` / `div44`
- `mul` / `mul22` / `mul23` / `mul33` / `mul44`
- `sub` / `sub22` / `sub23` / `sub33` / `sub44`

### Componentwise matrix - scalar

- `addN` / `addN22` / `addN23` / `addN33` / `addN44`
- `divN` / `divN22` / `divN23` / `divN33` / `divN44`
- `mulN` / `mulN22` / `mulN23` / `mulN33` / `mulN44`
- `subN` / `subN22` / `subN23` / `subN33` / `subN44`

### Matrix multiplication

- `mulM` / `mulM22` / `mulM23` / `mulM33` / `mulM44`
- `concat`

### Matrix - vector multiplication

- `mulV` / `mulV22` / `mulV23` / `mulV33` / `mulV344` / `mulV44`
- `project`
- `unproject`

### Determinant & inversion

- `det22` / `det23` / `det33` / `det44`
- `det44FromCoeffs` / `detCoeffs44`
- `diag` / `diag22` / `diag23` / `diag33` / `diag44`
- `invert` / `invert22` / `invert23` / `invert33` / `invert44`
- `trace`

### Matrix transposition

- `transpose22` / `transpose33` / `transpose44`

### Quaternion

- `alignmentQuat`
- `conjugateQ`
- `invertQ`
- `mixQ`
- `mulQ`
- `mulVQ`
- `quatFromAxisAngle`
- `quatFromEuler`
- `quatToAxisAngle`
- `quatToMat33`
- `quatToMat44`

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
