<!-- This file is generated - DO NOT EDIT! -->

# ![geom](https://media.thi.ng/umbrella/banners-20220914/thing-geom.svg?f6f7f9de)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

For the Clojure version, please visit: [thi.ng/geom-clj](https://thi.ng/geom-clj)

- [About](#about)
  - [Support packages](#support-packages)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Functional, polymorphic API for 2D geometry types & SVG generation.

This project is a partially ported from the [Clojure version of the same
name](http://thi.ng/geom-clj). All polymorphic operations built on
[@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti).

<!--
[**Up-to-date feature matrix spreadsheet**](https://docs.google.com/spreadsheets/d/1GxJm-zOQaGECui2MJUmy3gQPTF-T6BJ6vhNlUnPsmDs/edit?usp=sharing)
-->

The following operations are provided (many also applicable to shape groups
directly and/or perform automatic resampling/conversion if needed):

| Operation                                                                                 | Description                                                  |
|-------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [`arcLength()`](https://docs.thi.ng/umbrella/geom/modules.html#arcLength)                 | compute arc length / perimeter of shape boundary             |
| [`area()`](https://docs.thi.ng/umbrella/geom/modules.html#area)                           | signed/unsigned surface area                                 |
| [`asCubic()`](https://docs.thi.ng/umbrella/geom/modules.html#asCubic)                     | convert shape boundary to cubic bezier segments              |
| [`asPath()`](https://docs.thi.ng/umbrella/geom/modules.html#asPath)                       | convert shape to path                                        |
| [`asPolygon()`](https://docs.thi.ng/umbrella/geom/modules.html#asPolygon)                 | convert shape to polygon                                     |
| [`asPolyline()`](https://docs.thi.ng/umbrella/geom/modules.html#asPolyline)               | convert shape to polyline                                    |
| [`asSvg()`](https://docs.thi.ng/umbrella/geom/modules.html#asSvg)                         | serialize shape/group/hierarchy to SVG                       |
| [`bounds()`](https://docs.thi.ng/umbrella/geom/modules.html#bounds)                       | compute bounding box                                         |
| [`center()`](https://docs.thi.ng/umbrella/geom/modules.html#center)                       | center shape around origin or point                          |
| [`centroid()`](https://docs.thi.ng/umbrella/geom/modules.html#centroid)                   | compute shape centroid                                       |
| [`classifyPoint()`](https://docs.thi.ng/umbrella/geom/modules.html#classifyPoint)         | classify point in relation to shape boundary (in/out)        |
| [`clipConvex()`](https://docs.thi.ng/umbrella/geom/modules.html#clipConvex)               | clip shape against convex boundary                           |
| [`closestPoint()`](https://docs.thi.ng/umbrella/geom/modules.html#closestPoint)           | compute closest point on shape boundary                      |
| [`convexHull()`](https://docs.thi.ng/umbrella/geom/modules.html#convexHull)               | compute convex hull (2d only)                                |
| [`edges()`](https://docs.thi.ng/umbrella/geom/modules.html#edges)                         | extract edges                                                |
| [`fitIntoBounds()`](https://docs.thi.ng/umbrella/geom/modules.html#fitIntoBounds)         | rescale/reposition shapes into a destination boundary        |
| [`flip()`](https://docs.thi.ng/umbrella/geom/modules.html#flip)                           | reverse order (vertices or direction)                        |
| [`intersects()`](https://docs.thi.ng/umbrella/geom/modules.html#intersects)               | pairwise shape intersection (various types)                  |
| [`mapPoint()`](https://docs.thi.ng/umbrella/geom/modules.html#mapPoint)                   | transform world space point into local shape space           |
| [`offset()`](https://docs.thi.ng/umbrella/geom/modules.html#offset)                       | shape/path offsetting                                        |
| [`pointAt()`](https://docs.thi.ng/umbrella/geom/modules.html#pointAt)                     | compute point on shape boundary at parametric position       |
| [`pointInside()`](https://docs.thi.ng/umbrella/geom/modules.html#pointInside)             | check if point is inside shape                               |
| [`resample()`](https://docs.thi.ng/umbrella/geom/modules.html#resample)                   | resample/convert shape                                       |
| [`rotate()`](https://docs.thi.ng/umbrella/geom/modules.html#rotate)                       | rotate shape                                                 |
| [`scale()`](https://docs.thi.ng/umbrella/geom/modules.html#scale)                         | scale shape (uniformly/non-uniformly)                        |
| [`scatter()`](https://docs.thi.ng/umbrella/geom/modules.html#scatter)                     | create random points inside a shape boundary                 |
| [`simplify()`](https://docs.thi.ng/umbrella/geom/modules.html#simplify)                   | simplify shape/boundary (Douglas-Peucker)                    |
| [`splitAt()`](https://docs.thi.ng/umbrella/geom/modules.html#splitAt)                     | split shape/boundary at parametric position                  |
| [`splitNear()`](https://docs.thi.ng/umbrella/geom/modules.html#splitNear)                 | split shape/boundary near world position                     |
| [`subdivCurve()`](https://docs.thi.ng/umbrella/geom/modules.html#subdivCurve)             | recursively apply curve subdivision kernel                   |
| [`tangentAt()`](https://docs.thi.ng/umbrella/geom/modules.html#tangentAt)                 | compute tangent at parametric position                       |
| [`tessellate()`](https://docs.thi.ng/umbrella/geom/modules.html#tessellate)               | (recursively) tessellate shape                               |
| [`transformVertices()`](https://docs.thi.ng/umbrella/geom/modules.html#transformVertices) | apply custom function to each vertex                         |
| [`transform()`](https://docs.thi.ng/umbrella/geom/modules.html#transform)                 | apply transformation matrix                                  |
| [`translate()`](https://docs.thi.ng/umbrella/geom/modules.html#translate)                 | translate shape                                              |
| [`union()`](https://docs.thi.ng/umbrella/geom/modules.html#union)                         | compute shape union                                          |
| [`vertices()`](https://docs.thi.ng/umbrella/geom/modules.html#vertices)                   | extract/sample vertices from shape boundary                  |
| [`volume()`](https://docs.thi.ng/umbrella/geom/modules.html#volume)                       | compute shape volume (3D only)                               |
| [`warpPoints()`](https://docs.thi.ng/umbrella/geom/modules.html#warpPoints)               | transfer points between the local spaces defined by 2 shapes |

This package acts as a higher-level frontend for most of the following related
packages (which are more low-level, lightweight and usable by themselves too):

### Support packages

- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel) - n-D spatial indexing data structures with a shared ES6 Map/Set-like API
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api) - Shared type & interface declarations for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) packages
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-arc) - 2D circular / elliptic arc operations
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line) - 2D line clipping (Liang-Barsky)
- [@thi.ng/geom-clip-poly](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-poly) - 2D polygon clipping / offsetting (Sutherland-Hodgeman, Grainer-Hormann)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point) - 2D / 3D closest point / proximity helpers
- [@thi.ng/geom-fuzz](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-fuzz) - Highly configurable, fuzzy line & polygon creation with presets and composable fill & stroke styles. Canvas & SVG support
- [@thi.ng/geom-hull](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-hull) - Fast 2D convex hull (Graham Scan)
- [@thi.ng/geom-io-obj](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-io-obj) - Wavefront OBJ parser (& exporter soon)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec) - 2D/3D shape intersection checks
- [@thi.ng/geom-isoline](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isoline) - Fast 2D contour line extraction / generation
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils) - 2D polygon/polyline analysis & processing utilities
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample) - Customizable nD polyline interpolation, re-sampling, splitting & nearest point computation
- [@thi.ng/geom-sdf](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-sdf) - 2D Signed Distance Field creation from [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) shapes, conversions, sampling, combinators
- [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-splines) - nD cubic & quadratic curve analysis, conversion, interpolation, splitting
- [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-subdiv-curve) - Freely customizable, iterative nD subdivision curves for open / closed geometries
- [@thi.ng/geom-tessellate](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate) - 2D/3D convex polygon tessellators
- [@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi) - Fast, incremental 2D Delaunay & Voronoi mesh implementation

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const geom = await import("@thi.ng/geom");
```

Package sizes (gzipped, pre-treeshake): ESM: 13.50 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-arc)
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line)
- [@thi.ng/geom-clip-poly](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-poly)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point)
- [@thi.ng/geom-hull](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-hull)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-splines)
- [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-subdiv-curve)
- [@thi.ng/geom-tessellate](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                   | Description                                                                      | Live demo                                                   | Source                                                                                   |
|:-----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png" width="240"/>      | Convex hull & shape clipping of 2D polygons                                      | [Demo](https://demo.thi.ng/umbrella/geom-convex-hull/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/>                 | geom-fuzz basic shape & fill examples                                            | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/tessel.png" width="240"/>                    | Animated, recursive polygon tessellations                                        | [Demo](https://demo.thi.ng/umbrella/geom-tessel/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-tessel)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/>      | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png" width="240"/>      | Mouse gesture / stroke analysis, simplification, corner detection                | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/> | 2D Bezier curve-guided particle system                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-arcs.png" width="240"/>    | Animated arcs & drawing using hiccup-canvas                                      | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-arcs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-arcs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)                 | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)                 |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>              | Animated sine plasma effect visualized using contour lines                       | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg" width="240"/>                | 2D Poisson-disc sampler with procedural gradient map                             | [Demo](https://demo.thi.ng/umbrella/poisson-circles/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poisson-circles)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>           | Polygon to cubic curve conversion & visualization                                | [Demo](https://demo.thi.ng/umbrella/poly-spline/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>      | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>            | 2D scenegraph & shape picking                                                    | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>      | 2D scenegraph & image map based geometry manipulation                            | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/spline-tangent.png" width="240"/>        | Compute cubic spline position & tangent using Dual Numbers                       | [Demo](https://demo.thi.ng/umbrella/spline-tangent/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/spline-tangent)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>          | SVG path parsing & dynamic resampling                                            | [Demo](https://demo.thi.ng/umbrella/svg-resample/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>           | 3D wireframe textmode demo                                                       | [Demo](https://demo.thi.ng/umbrella/text-canvas/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)           |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom,
  title = "@thi.ng/geom",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom",
  year = 2013
}
```

## License

&copy; 2013 - 2022 Karsten Schmidt // Apache Software License 2.0
