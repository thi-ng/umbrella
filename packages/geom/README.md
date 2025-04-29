<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-geom.svg?0f8f2ae6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 206 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

For the Clojure version, please visit: [thi.ng/geom-clj](https://thi.ng/geom-clj)

- [About](#about)
  - [Shape types](#shape-types)
  - [Hiccup support](#hiccup-support)
  - [SVG support](#svg-support)
  - [Polymorphic operations](#polymorphic-operations)
  - [Shape factory functions](#shape-factory-functions)
    - [AABB](#aabb)
    - [Arc](#arc)
    - [Bezier patch](#bezier-patch)
    - [Circle](#circle)
    - [Cubic](#cubic)
    - [Group](#group)
    - [Line](#line)
    - [Path](#path)
    - [Plane](#plane)
    - [Polygon](#polygon)
    - [Polyline](#polyline)
    - [Quad](#quad)
    - [Rect](#rect)
    - [Sphere](#sphere)
    - [Triangle](#triangle)
  - [Constants & presets](#constants--presets)
    - [Curve subdivision kernels](#curve-subdivision-kernels)
    - [Polygon tessellation algorithms](#polygon-tessellation-algorithms)
    - [Vertex convolution kernels](#vertex-convolution-kernels)
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

The following 2D/3D shape primitives are provided. All these types are implemented as
basic data container classes with additional eponymous factory functions (e.g.
`Circle` (class) => `circle()` (function)), which are encouraged to be used
instead of calling class constructors directly. For many shapes there're
[multiple ways to create them](#shape-factory-functions), please also check
linked sources and/or docs.

> [!IMPORTANT]
> Support for 3D shapes is WIP and currently limited to the various operations
> provided by this package, but does not _yet_ find any usage outside (e.g. for
> visualization). Sill, even the ops supported so far can be useful for many
> use cases...

| Shape/Form                                                                                             | Description                           | Hiccup support      |
|--------------------------------------------------------------------------------------------------------|---------------------------------------|---------------------|
| [AABB](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/aabb.ts)                      | 3D Axis-aligned bounding box          | ✅<sup>(1)</sup>     |
| [Arc](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/arc.ts)                        | 2D elliptic arc                       | ✅                   |
| [BPatch](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/bpatch.ts)                  | 2D cubic bezier patch (4x4 points)    | ✅                   |
| [Circle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/circle.ts)                  | 2D circle                             | ✅                   |
| [ComplexPolygon](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/complex-polygon.ts) | 2D polygon w/ holes                   | ✅                   |
| [Cubic](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/cubic.ts)                    | 2D cubic bezier                       | ✅                   |
| [Cubic3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/cubic3.ts)                  | 3D cubic bezier                       | ✅<sup>(1)</sup>     |
| [Ellipse](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ellipse.ts)                | 2D ellipse                            | ✅                   |
| [Extra](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/extra.ts)                    | Custom embedded hiccup/SVG data       | ✅                   |
| [Group](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/group.ts)                    | group of 2D shapes                    | ✅                   |
| [Group3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/group3.ts)                  | group of 3D shapes                    | ✅<sup>(1)</sup>     |
| [Line](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/line.ts)                      | 2D line segment                       | ✅                   |
| [Line3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/line3.ts)                    | 3D line segment                       | ✅<sup>(1)</sup>     |
| [Path](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path.ts)                      | 2D path (w/ optional holes/sub-paths) | ✅                   |
| [Path3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path3.ts)                    | 3D path (w/ optional holes/sub-paths) | ✅<sup>(1),(2)</sup> |
| [Plane](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/plane.ts)                    | 3D plane                              | ✅<sup>(1)</sup>     |
| [Points](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/points.ts)                  | 2D point cloud                        | ✅                   |
| [Points3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/points3.ts)                | 3D point cloud                        | ✅<sup>(1)</sup>     |
| [Polygon](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polygon.ts)                | 2D simple polygon (no holes)          | ✅                   |
| [Polygon3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polygon3.ts)              | 3D simple polygon (no holes)          | ✅                   |
| [Polyline](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polyline.ts)              | 2D polyline                           | ✅                   |
| [Polyline3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polyline3.ts)            | 3D polyline                           | ✅<sup>(1)</sup>     |
| [Quad](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quad.ts)                      | 2D quad (4-gon)                       | ✅                   |
| [Quad3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quad3.ts)                    | 2D quad (4-gon)                       | ✅<sup>(1)</sup>     |
| [Quadratic](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quadratic.ts)            | 2D quadratic bezier                   | ✅                   |
| [Quadratic3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quadratic3.ts)          | 3D quadratic bezier                   | ✅<sup>(1)</sup>     |
| [Ray](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ray.ts)                        | 2D ray                                | ✅                   |
| [Ray3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ray3.ts)                      | 3D ray                                | ✅<sup>(1)</sup>     |
| [Rectangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/rect.ts)                 | 2D rectangle                          | ✅                   |
| [Sphere](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/sphere.ts)                  | 3D sphere                             | ✅<sup>(1)</sup>     |
| [Text](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/text.ts)                      | Basic stub for text labels            | ✅<sup>(3)</sup>     |
| [Triangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/triangle.ts)              | 2D triangle                           | ✅                   |
| [Triangle3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/triangle3.ts)            | 3D triangle                           | ✅<sup>(1)</sup>     |

- <sup>(1)</sup> valid hiccup format, but currently still missing **external** tool/library support
- <sup>(2)</sup> only lines, cubic & quadratic curve segments supported
- <sup>(3)</sup> merely treated as a point in space (e.g. used for placing text labels), no geometry of text itself

### Hiccup support

> [!NOTE]
> Sidebar with background information for advanced usage only. Most users can safely ignore this.

With very few exceptions these all are implementing the [`IToHiccup`
interface](https://docs.thi.ng/umbrella/api/interfaces/IToHiccup.html) and so
can be easily converted (via
[hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)) to a
variety of other formats, incl. [conversion to SVG](#svg-support).

By design, for more flexibility and for performance reasons, the hiccup flavor
used by this package is **not** compatible with that used by
[thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg),
though the latter provides a
[`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
function for that purpose. This is only needed for some cases of dynamic
in-browser SVG DOM creation...

Instead, the hiccup format used here for interim interop is compatible with that
used by the
[thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)
package (see its readme for details) and avoids extraneous stringification of
geometry data and attrib values. A brief example to illustrate some differences:

```ts tangle:export/readme-hiccup.ts
import { circle, asSvg } from "@thi.ng/geom";
import { convertTree } from "@thi.ng/hiccup-svg";

// a circle with RGBA color attrib
const a = circle([100, 200], 300, { fill: [1, 0.5, 0, 1] });

// invocation of the IToHiccup interface (all shapes support it)
console.log(a.toHiccup());
// [ "circle", { fill: [ 1, 0, 0, 1 ] }, [ 100, 200 ], 300 ]

// convert shape into to a SVG compatible hiccup format
// (i.e. stringify attributes, convert colors etc.)
console.log(convertTree(a));
// [ "circle", { fill: "#ff8000", cx: "100", cy: "200", r: "300" } ]

// asSvg() automatically uses convertTree() when serializing shape(s) to SVG
console.log(asSvg(a));
// <circle fill="#ff8000" cx="100" cy="200" r="300"/>
```

### SVG support

For 2D shape types only, SVG conversion is included via the
[`asSvg()`](https://docs.thi.ng/umbrella/geom/functions/asSvg.html) and
[`svgDoc()`](https://docs.thi.ng/umbrella/geom/functions/svgDoc.html) functions.

### Polymorphic operations

The following operations are provided (many also applicable to shape groups
directly and/or perform automatic resampling/conversion if needed).

| Operation                                                                                           | Description                                                        |
|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [`applyTransforms()`](https://docs.thi.ng/umbrella/geom/functions/applyTransforms.html)             | applies any spatial transformation attributes                      |
| [`arcLength()`](https://docs.thi.ng/umbrella/geom/functions/arcLength.html)                         | compute arc length / perimeter of shape boundary                   |
| [`area()`](https://docs.thi.ng/umbrella/geom/functions/area.html)                                   | signed/unsigned surface area                                       |
| [`asCubic()`](https://docs.thi.ng/umbrella/geom/functions/asCubic.html)                             | convert shape boundary to cubic bezier segments                    |
| [`asPath()`](https://docs.thi.ng/umbrella/geom/functions/asPath.html)                               | convert shape to path                                              |
| [`asPolygon()`](https://docs.thi.ng/umbrella/geom/functions/asPolygon.html)                         | convert shape to polygon(s)                                        |
| [`asPolyline()`](https://docs.thi.ng/umbrella/geom/functions/asPolyline.html)                       | convert shape to polyline(s)                                       |
| [`asSector()`](https://docs.thi.ng/umbrella/geom/functions/asSector.html)                           | convert arc to sector (path)                                       |
| [`asSvg()`](https://docs.thi.ng/umbrella/geom/functions/asSvg.html)                                 | serialize shape/group/hierarchy to SVG                             |
| [`bounds()`](https://docs.thi.ng/umbrella/geom/functions/bounds.html)                               | compute bounding box                                               |
| [`center()`](https://docs.thi.ng/umbrella/geom/functions/center.html)                               | center shape around origin or point                                |
| [`centroid()`](https://docs.thi.ng/umbrella/geom/functions/centroid.html)                           | compute shape centroid                                             |
| [`classifyPoint()`](https://docs.thi.ng/umbrella/geom/functions/classifyPoint.html)                 | classify point in relation to shape boundary (in/out)              |
| [`clipConvex()`](https://docs.thi.ng/umbrella/geom/functions/clipConvex.html)                       | clip shape against convex boundary                                 |
| [`closestPoint()`](https://docs.thi.ng/umbrella/geom/functions/closestPoint.html)                   | compute closest point on shape boundary                            |
| [`convexHull()`](https://docs.thi.ng/umbrella/geom/functions/convexHull.html)                       | compute convex hull (2d only)                                      |
| [`convolve()`](https://docs.thi.ng/umbrella/geom/functions/convolve.html)                           | kernel based vertex convolution/filtering                          |
| [`edges()`](https://docs.thi.ng/umbrella/geom/functions/edges.html)                                 | extract edges                                                      |
| [`edgesFromTessellation()`](https://docs.thi.ng/umbrella/geom/functions/edgesFromTessellation.html) | extract unique edges from tessellation results                     |
| [`fitIntoBounds2()`](https://docs.thi.ng/umbrella/geom/functions/fitIntoBounds2.html)               | rescale/reposition a 2D shape into a destination boundary          |
| [`fitIntoBounds3()`](https://docs.thi.ng/umbrella/geom/functions/fitIntoBounds3.html)               | rescale/reposition a 3D shape into a destination boundary          |
| [`fitAllIntoBounds2()`](https://docs.thi.ng/umbrella/geom/functions/fitAllIntoBounds2.html)         | rescale/reposition multiple 2D shapes into a boundary              |
| [`flip()`](https://docs.thi.ng/umbrella/geom/functions/flip.html)                                   | reverse order (vertices or direction)                              |
| [`graphFromTessellation()`](https://docs.thi.ng/umbrella/geom/functions/graphFromTessellation.html) | create graph from tessellation results                             |
| [`intersects()`](https://docs.thi.ng/umbrella/geom/functions/intersects.html)                       | pairwise shape intersection (various types)                        |
| [`mapPoint()`](https://docs.thi.ng/umbrella/geom/functions/mapPoint.html)                           | transform world space point into local shape UV space              |
| [`offset()`](https://docs.thi.ng/umbrella/geom/functions/offset.html)                               | shape/path offsetting                                              |
| [`pointAt()`](https://docs.thi.ng/umbrella/geom/functions/pointAt.html)                             | compute point on shape boundary at parametric position             |
| [`pointInside()`](https://docs.thi.ng/umbrella/geom/functions/pointInside.html)                     | check if point is inside shape                                     |
| [`proximity()`](https://docs.thi.ng/umbrella/geom/functions/proximity.html)                         | distance from point to shape boundary                              |
| [`resample()`](https://docs.thi.ng/umbrella/geom/functions/resample.html)                           | resample/convert shape                                             |
| [`rotate()`](https://docs.thi.ng/umbrella/geom/functions/rotate.html)                               | rotate shape (2D only)                                             |
| [`rotateAroundAxis()`](https://docs.thi.ng/umbrella/geom/functions/rotateAroundAxis.html)           | rotate shape (3D only)                                             |
| [`rotateX()`](https://docs.thi.ng/umbrella/geom/functions/rotateX.html)                             | rotate shape (3D only)                                             |
| [`rotateY()`](https://docs.thi.ng/umbrella/geom/functions/rotateY.html)                             | rotate shape (3D only)                                             |
| [`rotateZ()`](https://docs.thi.ng/umbrella/geom/functions/rotateZ.html)                             | rotate shape (3D only)                                             |
| [`scale()`](https://docs.thi.ng/umbrella/geom/functions/scale.html)                                 | scale shape (uniformly/non-uniformly)                              |
| [`scaleWithCenter()`](https://docs.thi.ng/umbrella/geom/functions/scaleWithCenter.html)             | scale shape with pivot point                                       |
| [`scatter()`](https://docs.thi.ng/umbrella/geom/functions/scatter.html)                             | create random points inside a shape boundary                       |
| [`simplify()`](https://docs.thi.ng/umbrella/geom/functions/simplify.html)                           | simplify shape/boundary (Douglas-Peucker)                          |
| [`splitArcLength()`](https://docs.thi.ng/umbrella/geom/functions/splitArcLength.html)               | split shapes & groups based on max. arc length                     |
| [`splitAt()`](https://docs.thi.ng/umbrella/geom/functions/splitAt.html)                             | split shape/boundary at parametric position                        |
| [`splitNearPoint()`](https://docs.thi.ng/umbrella/geom/functions/splitNearPoint.html)               | split shape/boundary near world position                           |
| [`subdivCurve()`](https://docs.thi.ng/umbrella/geom/functions/subdivCurve.html)                     | recursively apply curve subdivision kernel                         |
| [`tangentAt()`](https://docs.thi.ng/umbrella/geom/functions/tangentAt.html)                         | compute tangent at parametric position                             |
| [`tessellate()`](https://docs.thi.ng/umbrella/geom/functions/tessellate.html)                       | (recursively) tessellate shape                                     |
| [`transformVertices()`](https://docs.thi.ng/umbrella/geom/functions/transformVertices.html)         | apply custom function to each vertex                               |
| [`transform()`](https://docs.thi.ng/umbrella/geom/functions/transform.html)                         | apply transformation matrix                                        |
| [`translate()`](https://docs.thi.ng/umbrella/geom/functions/translate.html)                         | translate shape                                                    |
| [`union()`](https://docs.thi.ng/umbrella/geom/functions/union.html)                                 | compute shape union                                                |
| [`unmapPoint()`](https://docs.thi.ng/umbrella/geom/functions/unmapPoint.html)                       | transform local shape UV point into world space                    |
| [`vertices()`](https://docs.thi.ng/umbrella/geom/functions/vertices.html)                           | extract/sample vertices from shape boundary                        |
| [`volume()`](https://docs.thi.ng/umbrella/geom/functions/volume.html)                               | compute shape volume (3D only)                                     |
| [`warpPoint()`](https://docs.thi.ng/umbrella/geom/functions/warpPoint.html)                         | transfer single point between the local spaces defined by 2 shapes |
| [`warpPoints()`](https://docs.thi.ng/umbrella/geom/functions/warpPoints.html)                       | transfer points between the local spaces defined by 2 shapes       |
| [`warpPointsBPatch()`](https://docs.thi.ng/umbrella/geom/functions/warpPointsBPatch.html)           | transfer points to the local spaces of a bezier patch              |
| [`withAttribs()`](https://docs.thi.ng/umbrella/geom/functions/withAttribs.html)                     | shallow copy of given shape with new `attribs` assigned            |

### Shape factory functions

In addition to the [above listed direct shape type functions](#shape-types),
the following additional shape creation helpers are provided:

#### AABB

- [aabbFromMinMax()](https://docs.thi.ng/umbrella/geom/functions/aabbFromMinMax.html)
- [aabbFromMinMaxWithMargin()](https://docs.thi.ng/umbrella/geom/functions/aabbFromMinMaxWithMargin.html)
- [aabbFromCentroid()](https://docs.thi.ng/umbrella/geom/functions/aabbFromCentroid.html)
- [aabbWithCentroidAndMargin()](https://docs.thi.ng/umbrella/geom/functions/aabbWithCentroidAndMargin.html)
- [intersectionAABB()](https://docs.thi.ng/umbrella/geom/functions/intersectionAABB.html)
- [inscribedAABB()](https://docs.thi.ng/umbrella/geom/functions/inscribedAABB.html)

#### Arc

- [arcFrom2Points()](https://docs.thi.ng/umbrella/geom/functions/arcFrom2Points.html)

#### Bezier patch

- [bpatchFromQuad()](https://docs.thi.ng/umbrella/geom/functions/bpatchFromQuad.html)
- [bpatchFromHex()](https://docs.thi.ng/umbrella/geom/functions/bpatchFromHex.html)

#### Circle

- [circleFrom2Points()](https://docs.thi.ng/umbrella/geom/functions/circleFrom2Points.html)
- [circleFrom3Points()](https://docs.thi.ng/umbrella/geom/functions/circleFrom3Points.html)
- [invertCircle()](https://docs.thi.ng/umbrella/geom/functions/invertCircle.html)
- [invertCirclePoint()](https://docs.thi.ng/umbrella/geom/functions/invertCirclePoint.html)

#### Cubic

- [cubicFromArc()](https://docs.thi.ng/umbrella/geom/functions/cubicFromArc.html)
- [cubicFromLine()](https://docs.thi.ng/umbrella/geom/functions/cubicFromLine.html)
- [cubicFromLine3()](https://docs.thi.ng/umbrella/geom/functions/cubicFromLine3.html)
- [cubicFromQuadratic()](https://docs.thi.ng/umbrella/geom/functions/cubicFromQuadratic.html)
- [cubicFromQuadratic3()](https://docs.thi.ng/umbrella/geom/functions/cubicFromQuadratic3.html)

#### Group

- [groupFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/groupFromTessellation.html)

#### Line

- [clippedLine()](https://docs.thi.ng/umbrella/geom/functions/clippedLine.html)

#### Path

- [pathBuilder()](https://docs.thi.ng/umbrella/geom/functions/pathBuilder-1.html)
- [pathBuilder3()](https://docs.thi.ng/umbrella/geom/functions/pathBuilder3.html)
- [pathFromSvg()](https://docs.thi.ng/umbrella/geom/functions/pathFromSvg.html)
- [pathFromCubics()](https://docs.thi.ng/umbrella/geom/functions/pathFromCubics.html)
- [normalizedPath()](https://docs.thi.ng/umbrella/geom/functions/normalizedPath.html)
- [roundedRect()](https://docs.thi.ng/umbrella/geom/functions/roundedRect.html)

#### Plane

- [planeWithPoint()](https://docs.thi.ng/umbrella/geom/functions/planeWithPoint.html)
- [planeFrom3Points()](https://docs.thi.ng/umbrella/geom/functions/planeFrom3Points.html)
- [planeFromRay()](https://docs.thi.ng/umbrella/geom/functions/planeFromRay.html)

#### Polygon

- [smoothPolygon()](https://docs.thi.ng/umbrella/geom/functions/smoothPolygon.html)
- [star()](https://docs.thi.ng/umbrella/geom/functions/star.html)
- [starWithCentroid()](https://docs.thi.ng/umbrella/geom/functions/starWithCentroid.html)

#### Polyline

- [smoothPolyline()](https://docs.thi.ng/umbrella/geom/functions/smoothPolyline.html)
- [spiral()](https://docs.thi.ng/umbrella/geom/functions/spiral.html)

#### Quad

- [quadOnPlane()](https://docs.thi.ng/umbrella/geom/functions/quadOnPlane.html)

#### Rect

- [rectFromMinMax()](https://docs.thi.ng/umbrella/geom/functions/rectFromMinMax.html)
- [rectFromMinMaxWithMargin()](https://docs.thi.ng/umbrella/geom/functions/rectFromMinMaxWithMargin.html)
- [rectWithCentroid()](https://docs.thi.ng/umbrella/geom/functions/rectWithCentroid.html)
- [rectWithCentroidAndMargin()](https://docs.thi.ng/umbrella/geom/functions/rectWithCentroidAndMargin.html)
- [intersectionRect()](https://docs.thi.ng/umbrella/geom/functions/intersectionRect.html)
- [inscribedSquare()](https://docs.thi.ng/umbrella/geom/functions/inscribedSquare.html)
- [inscribedSquareHex()](https://docs.thi.ng/umbrella/geom/functions/inscribedSquareHex.html)

#### Sphere

- [sphereFrom2Points()](https://docs.thi.ng/umbrella/geom/functions/sphereFrom2Points.html)

#### Triangle

- [equilateralTriangle()](https://docs.thi.ng/umbrella/geom/functions/equilateralTriangle.html)

### Constants & presets

Some of the shape operations require configuration with specific algorithms
and/or constants. In all cases this relies on a completely extensible mechanism,
but the package provides presets for common options/implementations:

#### Curve subdivision kernels

To be used with [`subdivideCurve()`](https://docs.thi.ng/umbrella/geom/functions/subdivCurve.html):

- [SUBDIV_CHAIKIN](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_CHAIKIN.html)
- [SUBDIV_CUBIC](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_CUBIC.html)
- [SUBDIV_DISPLACE](https://docs.thi.ng/umbrella/geom/functions/SUBDIV_DISPLACE.html)
- [SUBDIV_DLG](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_DLG.html)
- [SUBDIV_MID](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_MID.html)
- [SUBDIV_THIRDS](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_THIRDS.html)

#### Polygon tessellation algorithms

To be used with [`tessellate()`](https://docs.thi.ng/umbrella/geom/functions/tessellate.html):

See [thi.ng/geom-tessellate
readme](https://github.com/thi-ng/umbrella/blob/develop/packages/geom-tessellate/README.md#tessellators)
for diagrams/illustrations of each algorithm!

- [TESSELLATE_EARCUT](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_EARCUT.html)
- [TESSELLATE_EARCUT_COMPLEX](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_EARCUT_COMPLEX.html)
- [TESSELLATE_EDGE_SPLIT](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_EDGE_SPLIT.html)
- [TESSELLATE_INSET](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_INSET.html)
- [TESSELLATE_QUAD_FAN](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_QUAD_FAN.html)
- [TESSELLATE_RIM_TRIS](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_RIM_TRIS.html)
- [TESSELLATE_TRI_FAN](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_TRI_FAN.html)
- [TESSELLATE_TRI_FAN_BOUNDARY](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_TRI_FAN_BOUNDARY.html)
- [TESSELLATE_TRI_FAN_SPLIT](https://docs.thi.ng/umbrella/geom/functions/TESSELLATE_TRI_FAN_SPLIT.html)

Tessellation behaviors:

- [basicTessellation()](https://docs.thi.ng/umbrella/geom/functions/basicTessellation.html):
  default impl
- [meshTessellation()](https://docs.thi.ng/umbrella/geom/functions/meshTessellation.html):
  uses kD-tree to deduplicate result points

Tessellation post-processing:

- [edgesFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/edgesFromTessellation.html)
- [edgePointsFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/edgePointsFromTessellation.html)
- [graphFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/graphFromTessellation.html)
- [groupFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/groupFromTessellation.html)

#### Vertex convolution kernels

To be used with [`convolve()`](https://docs.thi.ng/umbrella/geom/functions/convolve.html):

- [KERNEL_BOX](https://docs.thi.ng/umbrella/geom/functions/KERNEL_BOX.html)
- [KERNEL_GAUSSIAN](https://docs.thi.ng/umbrella/geom/functions/KERNEL_GAUSSIAN.html)
- [KERNEL_TRIANGLE](https://docs.thi.ng/umbrella/geom/functions/KERNEL_TRIANGLE.html)
---

This package acts as a higher-level frontend for most of the following related
packages (which are more low-level, lightweight and usable by themselves too):

## Support packages

- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel) - n-D spatial indexing data structures with a shared ES6 Map/Set-like API
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
- [@thi.ng/geom-webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-webgl) - WebGL geometry/shape conversion & interop

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

ESM import:

```ts
import * as geom from "@thi.ng/geom";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const geom = await import("@thi.ng/geom");
```

Package sizes (brotli'd, pre-treeshake): ESM: 17.48 KB

## Dependencies

- [@thi.ng/adjacency](https://github.com/thi-ng/umbrella/tree/develop/packages/adjacency)
- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
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
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

39 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                    | Description                                                                      | Live demo                                                    | Source                                                                                    |
|:------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------------|:------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/boid-basics.png" width="240"/>            | Basic 2D boid simulation and spatial indexing neighbor lookups                   | [Demo](https://demo.thi.ng/umbrella/boid-basics/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/boid-basics)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>        | Self-modifying, animated typographic grid with emergent complex patterns         | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/>           | Fiber-based cooperative multitasking basics                                      | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-classify-point.png" width="240"/>    | Polygon point classification (inside/boundary/outside)                           | [Demo](https://demo.thi.ng/umbrella/geom-classify-point/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-classify-point)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-complex-poly.png" width="240"/>      | Shape conversions & operations using polygons with holes                         | [Demo](https://demo.thi.ng/umbrella/geom-complex-poly/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-complex-poly)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png" width="240"/>       | Convex hull & shape clipping of 2D polygons                                      | [Demo](https://demo.thi.ng/umbrella/geom-convex-hull/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-csv-piechart.png" width="240"/>      | Piechart visualization of CSV data                                               | [Demo](https://demo.thi.ng/umbrella/geom-csv-piechart/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-csv-piechart)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-extra-hiccup.jpg" width="240"/>      | Embedding thi.ng/hiccup data/elements in thi.ng/geom shape hierarchies           | [Demo](https://demo.thi.ng/umbrella/geom-extra-hiccup/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-extra-hiccup)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/>                  | geom-fuzz basic shape & fill examples                                            | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-hexgrid.png" width="240"/>           | Hex grid generation & tessellations                                              | [Demo](https://demo.thi.ng/umbrella/geom-hexgrid/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-hexgrid)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-sdf-logo.jpg" width="240"/>          | (Re)Constructing the thi.ng logo using a 2D signed-distance field                | [Demo](https://demo.thi.ng/umbrella/geom-sdf-logo/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-sdf-logo)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-sdf-path.png" width="240"/>          | SVG path to SDF, applying deformation and converting back to SVG                 | [Demo](https://demo.thi.ng/umbrella/geom-sdf-path/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-sdf-path)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-terrain-viz.jpg" width="240"/>       | 2.5D hidden line visualization of digital elevation files (DEM)                  | [Demo](https://demo.thi.ng/umbrella/geom-terrain-viz/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-terrain-viz)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/tessel.png" width="240"/>                     | Animated, recursive polygon tessellations                                        | [Demo](https://demo.thi.ng/umbrella/geom-tessel/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-tessel)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-unique-edges.png" width="240"/>      | Iterating the unique edges of a tessellation                                     | [Demo](https://demo.thi.ng/umbrella/geom-unique-edges/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-unique-edges)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/>       | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-attrib-pool.jpg" width="240"/> | Augmenting thi.ng/geom shapes for WebGL, using instancing & attribute buffers    | [Demo](https://demo.thi.ng/umbrella/geom-webgl-attrib-pool/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-attrib-pool) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-basics.jpg" width="240"/>      | Converting thi.ng/geom shape types for WebGL                                     | [Demo](https://demo.thi.ng/umbrella/geom-webgl-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png" width="240"/>       | Mouse gesture / stroke analysis, simplification, corner detection                | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/>  | 2D Bezier curve-guided particle system                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-arcs.jpg" width="240"/>     | Animated arcs & drawing using hiccup-canvas                                      | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-arcs/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-arcs)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                 | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)                  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)                  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>               | Animated sine plasma effect visualized using contour lines                       | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/kmeans-viz.jpg" width="240"/>             | k-means clustering visualization                                                 | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/kmeans-viz)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-geom.jpg" width="240"/>         | Live coding playground for 2D geometry generation using @thi.ng/pointfree-lang   | [Demo](https://demo.thi.ng/umbrella/pointfree-geom/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-geom)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg" width="240"/>                 | 2D Poisson-disc sampler with procedural gradient map                             | [Demo](https://demo.thi.ng/umbrella/poisson-circles/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poisson-circles)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>            | Polygon to cubic curve conversion & visualization                                | [Demo](https://demo.thi.ng/umbrella/poly-spline/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>            | Animated, iterative polygon subdivisions & visualization                         | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/quasi-lattice.png" width="240"/>          | Quasi-random lattice generator                                                   | [Demo](https://demo.thi.ng/umbrella/quasi-lattice/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/quasi-lattice)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/>     | Minimal rdom-canvas animation                                                    | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-canvas-basics)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>       | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>             | 2D scenegraph & shape picking                                                    | [Demo](https://demo.thi.ng/umbrella/scenegraph/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>       | 2D scenegraph & image map based geometry manipulation                            | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-pan-zoom.avif" width="240"/>   | Basic 2D scenegraph example with pan/zoom functionality                          | [Demo](https://demo.thi.ng/umbrella/scenegraph-pan-zoom/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-pan-zoom)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/spline-tangent.png" width="240"/>         | Compute cubic spline position & tangent using Dual Numbers                       | [Demo](https://demo.thi.ng/umbrella/spline-tangent/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/spline-tangent)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>           | SVG path parsing & dynamic resampling                                            | [Demo](https://demo.thi.ng/umbrella/svg-resample/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>            | 3D wireframe textmode demo                                                       | [Demo](https://demo.thi.ng/umbrella/text-canvas/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>           | Multi-layer vectorization & dithering of bitmap images                           | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/tsne-colors.avif" width="240"/>           | Animated t-SNE visualization of 4D data                                          | [Demo](https://demo.thi.ng/umbrella/tsne-colors/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/tsne-colors)            |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom/)

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

&copy; 2013 - 2025 Karsten Schmidt // Apache License 2.0
