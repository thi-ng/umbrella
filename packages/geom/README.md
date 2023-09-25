<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/geom](https://media.thi.ng/umbrella/banners-20230807/thing-geom.svg?f8c3d358)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

For the Clojure version, please visit: [thi.ng/geom-clj](https://thi.ng/geom-clj)

- [About](#about)
  - [Shape types](#shape-types)
  - [Hiccup support](#hiccup-support)
  - [SVG support](#svg-support)
  - [Polymorphic operations](#polymorphic-operations)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
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

### Shape types

The following shape primitives are provided. For many there're multiple ways to
create them, please check linked sources and/or docs.

| Shape/Form                                                                                            | Description                  | Hiccup support  |
|-------------------------------------------------------------------------------------------------------|------------------------------|-----------------|
| [AABB](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/aabb.ts)                     | 3D Axis-aligned bounding box | ✅<sup>(2)</sup> |
| [Arc](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/arc.ts)                       | 2D elliptic arc              | ✅               |
| [Circle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/circle.ts)                 | 2D circle                    | ✅               |
| [Cubic](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/cubic.ts)                   | nD cubic bezier              | ✅<sup>(1)</sup> |
| [Ellipse](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ellipse.ts)               | 2D ellipse                   | ✅               |
| [Group](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/group.ts)                   | group of 2D shapes           | ✅               |
| [Line](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/line.ts)                     | 2D line segment              | ✅               |
| [Path](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path-builder.ts)             | 2D path                      | ✅               |
| [Path (from SVG)](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path-from-svg.ts) | 2D path from SVG `<path>`    | ✅               |
| [Plane](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/plane.ts)                   | 3D plane                     | ✅<sup>(2)</sup> |
| [Point cloud](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/points.ts)            | nD point cloud               | ✅<sup>(1)</sup> |
| [Polygon](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polygon.ts)               | 2D simple polygon (no holes) | ✅               |
| [Polyline](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polyline.ts)             | 2D polyline                  | ✅               |
| [Quad](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quad.ts)                     | 2D/3D quad (4-gon)           | ✅<sup>(1)</sup> |
| [Quadratic](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quadratic.ts)           | nD quadratic bezier          | ✅<sup>(1)</sup> |
| [Ray](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ray.ts)                       | nD ray                       | ✅<sup>(1)</sup> |
| [Rectangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/rect.ts)                | 2D rectangle                 | ✅               |
| [Sphere](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/sphere.ts)                 | 3D sphere                    | ✅<sup>(2)</sup> |
| [Text](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/text.ts)                     | Basic stub for text labels   | ✅<sup>(3)</sup> |
| [Triangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/triangle.ts)             | 2D triangle                  | ✅               |

- <sup>(1)</sup> valid hiccup format, currently only useable/supported if 2D geometry
- <sup>(2)</sup> valid hiccup format, currently unused/unsupported elsewhere
- <sup>(3)</sup> merely treated as a point in space (e.g. used for placing text labels), no geometry of text itself

### Hiccup support

With very few exceptions these all are implementing the [`IToHiccup`
interface](https://docs.thi.ng/umbrella/api/interfaces/IToHiccup.html) and so
can be easily converted (via
[hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)) to a
variety of other formats. By design, for better flexibility and performance
reasons, the hiccup flavor used by this package is **not** compatible with that
used by
[thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg),
though the latter provides a
[`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
function for that purpose. This is only needed for some cases of dynamic
in-browser SVG DOM creation...

### SVG support

SVG conversion is included via the
[`asSvg()`](https://docs.thi.ng/umbrella/geom/functions/asSvg.html) and
[`svgDoc()`](https://docs.thi.ng/umbrella/geom/functions/svgDoc.html) functions.

### Polymorphic operations

The following operations are provided (many also applicable to shape groups
directly and/or perform automatic resampling/conversion if needed).

| Operation                                                                                   | Description                                                  |
|---------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [`applyTransforms()`](https://docs.thi.ng/umbrella/geom/functions/applyTransforms.html)     | applies any spatial transformation attributes                |
| [`arcLength()`](https://docs.thi.ng/umbrella/geom/functions/arcLength.html)                 | compute arc length / perimeter of shape boundary             |
| [`area()`](https://docs.thi.ng/umbrella/geom/functions/area.html)                           | signed/unsigned surface area                                 |
| [`asCubic()`](https://docs.thi.ng/umbrella/geom/functions/asCubic.html)                     | convert shape boundary to cubic bezier segments              |
| [`asPath()`](https://docs.thi.ng/umbrella/geom/functions/asPath.html)                       | convert shape to path                                        |
| [`asPolygon()`](https://docs.thi.ng/umbrella/geom/functions/asPolygon.html)                 | convert shape to polygon                                     |
| [`asPolyline()`](https://docs.thi.ng/umbrella/geom/functions/asPolyline.html)               | convert shape to polyline                                    |
| [`asSvg()`](https://docs.thi.ng/umbrella/geom/functions/asSvg.html)                         | serialize shape/group/hierarchy to SVG                       |
| [`bounds()`](https://docs.thi.ng/umbrella/geom/functions/bounds.html)                       | compute bounding box                                         |
| [`center()`](https://docs.thi.ng/umbrella/geom/functions/center.html)                       | center shape around origin or point                          |
| [`centroid()`](https://docs.thi.ng/umbrella/geom/functions/centroid.html)                   | compute shape centroid                                       |
| [`classifyPoint()`](https://docs.thi.ng/umbrella/geom/functions/classifyPoint.html)         | classify point in relation to shape boundary (in/out)        |
| [`clipConvex()`](https://docs.thi.ng/umbrella/geom/functions/clipConvex.html)               | clip shape against convex boundary                           |
| [`closestPoint()`](https://docs.thi.ng/umbrella/geom/functions/closestPoint.html)           | compute closest point on shape boundary                      |
| [`convexHull()`](https://docs.thi.ng/umbrella/geom/functions/convexHull.html)               | compute convex hull (2d only)                                |
| [`edges()`](https://docs.thi.ng/umbrella/geom/functions/edges.html)                         | extract edges                                                |
| [`fitIntoBounds()`](https://docs.thi.ng/umbrella/geom/functions/fitIntoBounds.html)         | rescale/reposition shapes into a destination boundary        |
| [`flip()`](https://docs.thi.ng/umbrella/geom/functions/flip.html)                           | reverse order (vertices or direction)                        |
| [`intersects()`](https://docs.thi.ng/umbrella/geom/functions/intersects.html)               | pairwise shape intersection (various types)                  |
| [`mapPoint()`](https://docs.thi.ng/umbrella/geom/functions/mapPoint.html)                   | transform world space point into local shape space           |
| [`offset()`](https://docs.thi.ng/umbrella/geom/functions/offset.html)                       | shape/path offsetting                                        |
| [`pointAt()`](https://docs.thi.ng/umbrella/geom/functions/pointAt.html)                     | compute point on shape boundary at parametric position       |
| [`pointInside()`](https://docs.thi.ng/umbrella/geom/functions/pointInside.html)             | check if point is inside shape                               |
| [`resample()`](https://docs.thi.ng/umbrella/geom/functions/resample.html)                   | resample/convert shape                                       |
| [`rotate()`](https://docs.thi.ng/umbrella/geom/functions/rotate.html)                       | rotate shape                                                 |
| [`scale()`](https://docs.thi.ng/umbrella/geom/functions/scale.html)                         | scale shape (uniformly/non-uniformly)                        |
| [`scatter()`](https://docs.thi.ng/umbrella/geom/functions/scatter.html)                     | create random points inside a shape boundary                 |
| [`simplify()`](https://docs.thi.ng/umbrella/geom/functions/simplify.html)                   | simplify shape/boundary (Douglas-Peucker)                    |
| [`splitArcLength()`](https://docs.thi.ng/umbrella/geom/functions/splitArcLength.html)       | split shapes & groups based on max. arc length               |
| [`splitAt()`](https://docs.thi.ng/umbrella/geom/functions/splitAt.html)                     | split shape/boundary at parametric position                  |
| [`splitNear()`](https://docs.thi.ng/umbrella/geom/functions/splitNear.html)                 | split shape/boundary near world position                     |
| [`subdivCurve()`](https://docs.thi.ng/umbrella/geom/functions/subdivCurve.html)             | recursively apply curve subdivision kernel                   |
| [`tangentAt()`](https://docs.thi.ng/umbrella/geom/functions/tangentAt.html)                 | compute tangent at parametric position                       |
| [`tessellate()`](https://docs.thi.ng/umbrella/geom/functions/tessellate.html)               | (recursively) tessellate shape                               |
| [`transformVertices()`](https://docs.thi.ng/umbrella/geom/functions/transformVertices.html) | apply custom function to each vertex                         |
| [`transform()`](https://docs.thi.ng/umbrella/geom/functions/transform.html)                 | apply transformation matrix                                  |
| [`translate()`](https://docs.thi.ng/umbrella/geom/functions/translate.html)                 | translate shape                                              |
| [`union()`](https://docs.thi.ng/umbrella/geom/functions/union.html)                         | compute shape union                                          |
| [`vertices()`](https://docs.thi.ng/umbrella/geom/functions/vertices.html)                   | extract/sample vertices from shape boundary                  |
| [`volume()`](https://docs.thi.ng/umbrella/geom/functions/volume.html)                       | compute shape volume (3D only)                               |
| [`warpPoints()`](https://docs.thi.ng/umbrella/geom/functions/warpPoints.html)               | transfer points between the local spaces defined by 2 shapes |
| [`withAttribs()`](https://docs.thi.ng/umbrella/geom/functions/withAttribs.html)             | shallow copy of given shape with new `attribs` assigned      |

This package acts as a higher-level frontend for most of the following related
packages (which are more low-level, lightweight and usable by themselves too):

## Support packages

- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel) - n-D spatial indexing data structures with a shared ES6 Map/Set-like API
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api) - Shared type & interface declarations for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) packages
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-arc) - 2D circular / elliptic arc operations
- [@thi.ng/geom-axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-axidraw) - Conversion and preparation of thi.ng/geom shapes & shape groups to/from AxiDraw pen plotter draw commands
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
- [@thi.ng/geom-trace-bitmap](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-trace-bitmap) - Bitmap image to hairline vector and point cloud conversions
- [@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi) - Fast, incremental 2D Delaunay & Voronoi mesh implementation

## Related packages

- [@thi.ng/axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/axidraw) - Minimal AxiDraw plotter/drawing machine controller for Node.js
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) - Array-based color types, CSS parsing, conversions, transformations, declarative theme generation, gradients, presets
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures
- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling
- [@thi.ng/viz](https://github.com/thi-ng/umbrella/tree/develop/packages/viz) - Declarative, functional & multi-format data visualization toolkit based around [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Status

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

```js
const geom = await import("@thi.ng/geom");
```

Package sizes (brotli'd, pre-treeshake): ESM: 12.78 KB

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
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/>          | Fiber-based cooperative multitasking basics                                      | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png" width="240"/>      | Convex hull & shape clipping of 2D polygons                                      | [Demo](https://demo.thi.ng/umbrella/geom-convex-hull/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/>                 | geom-fuzz basic shape & fill examples                                            | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-sdf-logo.jpg" width="240"/>         | (Re)Constructing the thi.ng logo using a 2D signed-distance field                | [Demo](https://demo.thi.ng/umbrella/geom-sdf-logo/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-sdf-logo)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/tessel.png" width="240"/>                    | Animated, recursive polygon tessellations                                        | [Demo](https://demo.thi.ng/umbrella/geom-tessel/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-tessel)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/>      | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png" width="240"/>      | Mouse gesture / stroke analysis, simplification, corner detection                | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/> | 2D Bezier curve-guided particle system                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-arcs.png" width="240"/>    | Animated arcs & drawing using hiccup-canvas                                      | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-arcs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-arcs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)                 | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)                 |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>              | Animated sine plasma effect visualized using contour lines                       | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/kmeans-viz.jpg" width="240"/>            | k-means clustering visualization                                                 | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/kmeans-viz)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg" width="240"/>                | 2D Poisson-disc sampler with procedural gradient map                             | [Demo](https://demo.thi.ng/umbrella/poisson-circles/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poisson-circles)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>           | Polygon to cubic curve conversion & visualization                                | [Demo](https://demo.thi.ng/umbrella/poly-spline/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/>    | Minimal rdom-canvas animation                                                    | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-canvas-basics)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>      | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>            | 2D scenegraph & shape picking                                                    | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>      | 2D scenegraph & image map based geometry manipulation                            | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/spline-tangent.png" width="240"/>        | Compute cubic spline position & tangent using Dual Numbers                       | [Demo](https://demo.thi.ng/umbrella/spline-tangent/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/spline-tangent)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>          | SVG path parsing & dynamic resampling                                            | [Demo](https://demo.thi.ng/umbrella/svg-resample/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>           | 3D wireframe textmode demo                                                       | [Demo](https://demo.thi.ng/umbrella/text-canvas/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>          | Multi-layer vectorization & dithering of bitmap images                           | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)          |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2013 - 2023 Karsten Schmidt // Apache License 2.0
