<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/matrices](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-matrices.svg?07e7fd3b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/matrices.svg)](https://www.npmjs.com/package/@thi.ng/matrices)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/matrices.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmatrices%5D+in%3Atitle)

## Related packages

- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) - Array-based color types, CSS parsing, conversions, transformations, declarative theme generation, gradients, presets
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts

## Installation

```bash
yarn add @thi.ng/matrices
```

ESM import:

```ts
import * as mat from "@thi.ng/matrices";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/matrices"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const mat = await import("@thi.ng/matrices");
```

Package sizes (brotli'd, pre-treeshake): ESM: 5.19 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

17 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                           | Description                                                                                  | Live demo                                                    | Source                                                                                    |
|:-------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:-------------------------------------------------------------|:------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-sdf-logo.jpg" width="240"/>                 | (Re)Constructing the thi.ng logo using a 2D signed-distance field                            | [Demo](https://demo.thi.ng/umbrella/geom-sdf-logo/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-sdf-logo)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-attrib-pool.jpg" width="240"/>        | Augmenting thi.ng/geom shapes for WebGL, using instancing & attribute buffers                | [Demo](https://demo.thi.ng/umbrella/geom-webgl-attrib-pool/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-attrib-pool) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-basics.jpg" width="240"/>             | Converting thi.ng/geom shape types for WebGL                                                 | [Demo](https://demo.thi.ng/umbrella/geom-webgl-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export                         | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ifs-fractal.jpg" width="240"/>                   | Barnsley fern IFS fractal renderer                                                           | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ifs-fractal)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-geom.jpg" width="240"/>                | Live coding playground for 2D geometry generation using @thi.ng/pointfree-lang               | [Demo](https://demo.thi.ng/umbrella/pointfree-geom/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-geom)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>                    | 2D scenegraph & shape picking                                                                | [Demo](https://demo.thi.ng/umbrella/scenegraph/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>              | 2D scenegraph & image map based geometry manipulation                                        | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-graph.jpg" width="240"/>                  | Minimal shader graph developed during livestream #2                                          | [Demo](https://demo.thi.ng/umbrella/shader-graph/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-graph)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/simd-plot.png" width="240"/>                     | Fitting, transforming & plotting 10k data points per frame using SIMD                        | [Demo](https://demo.thi.ng/umbrella/simd-plot/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/simd-plot)              |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/>                  | Entity Component System w/ 100k 3D particles                                                 | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)                | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)                |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>                   | 3D wireframe textmode demo                                                                   | [Demo](https://demo.thi.ng/umbrella/text-canvas/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/unbiased-normals.png" width="240"/>              | Visual comparison of biased vs. unbiased normal vectors projected on the surface of a sphere | [Demo](https://demo.thi.ng/umbrella/unbiased-normals/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/unbiased-normals)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/>                    | WebGL multi-colored cube mesh                                                                | [Demo](https://demo.thi.ng/umbrella/webgl-cube/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cube)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cubemap.jpg" width="240"/>                 | WebGL cube maps with async texture loading                                                   | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cubemap)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-grid.jpg" width="240"/>                    | WebGL instancing, animated grid                                                              | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-grid)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/>                    | WebGL MSDF text rendering & particle system                                                  | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf)             |

## API

[Generated API docs](https://docs.thi.ng/umbrella/matrices/)

### Constants

- `IDENT22` / `IDENT23` / `IDENT33` / `IDENT44`

### Matrix creation

- `fit23` / `fit44`
- `rotation22` / `rotation23`
- `rotationAroundAxis33` / `rotationAroundAxis44`
- `rotationAroundPoint23`
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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-matrices,
  title = "@thi.ng/matrices",
  author = "Karsten Schmidt",
  note = "https://thi.ng/matrices",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
