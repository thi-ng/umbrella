<!-- include ../../assets/tpl/header.md -->

For the Clojure version, please visit: [thi.ng/geom-clj](https://thi.ng/geom-clj)

<!-- toc -->

## About

{{pkg.description}}

This project is a partially ported from the [Clojure version of the same
name](http://thi.ng/geom-clj). All polymorphic operations built on
[@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti).

### Shape types

The following shape primitives are provided. All these types are implemented as
basic data container classes with additional eponymous factory functions (e.g.
`Circle` (class) => `circle()` (function)), which are encouraged to be used
instead of calling class constructors directly. For many shapes there're
[multiple ways to create them](#shape-factory-functions), please also check
linked sources and/or docs.

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

SVG conversion is included via the
[`asSvg()`](https://docs.thi.ng/umbrella/geom/functions/asSvg.html) and
[`svgDoc()`](https://docs.thi.ng/umbrella/geom/functions/svgDoc.html) functions.

### Polymorphic operations

The following operations are provided (many also applicable to shape groups
directly and/or perform automatic resampling/conversion if needed).

| Operation                                                                                   | Description                                                        |
|---------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [`applyTransforms()`](https://docs.thi.ng/umbrella/geom/functions/applyTransforms.html)     | applies any spatial transformation attributes                      |
| [`arcLength()`](https://docs.thi.ng/umbrella/geom/functions/arcLength.html)                 | compute arc length / perimeter of shape boundary                   |
| [`area()`](https://docs.thi.ng/umbrella/geom/functions/area.html)                           | signed/unsigned surface area                                       |
| [`asCubic()`](https://docs.thi.ng/umbrella/geom/functions/asCubic.html)                     | convert shape boundary to cubic bezier segments                    |
| [`asPath()`](https://docs.thi.ng/umbrella/geom/functions/asPath.html)                       | convert shape to path                                              |
| [`asPolygon()`](https://docs.thi.ng/umbrella/geom/functions/asPolygon.html)                 | convert shape to polygon(s)                                        |
| [`asPolyline()`](https://docs.thi.ng/umbrella/geom/functions/asPolyline.html)               | convert shape to polyline(s)                                       |
| [`asSector()`](https://docs.thi.ng/umbrella/geom/functions/asSector.html)                   | convert arc to sector (path)                                       |
| [`asSvg()`](https://docs.thi.ng/umbrella/geom/functions/asSvg.html)                         | serialize shape/group/hierarchy to SVG                             |
| [`bounds()`](https://docs.thi.ng/umbrella/geom/functions/bounds.html)                       | compute bounding box                                               |
| [`center()`](https://docs.thi.ng/umbrella/geom/functions/center.html)                       | center shape around origin or point                                |
| [`centroid()`](https://docs.thi.ng/umbrella/geom/functions/centroid.html)                   | compute shape centroid                                             |
| [`classifyPoint()`](https://docs.thi.ng/umbrella/geom/functions/classifyPoint.html)         | classify point in relation to shape boundary (in/out)              |
| [`clipConvex()`](https://docs.thi.ng/umbrella/geom/functions/clipConvex.html)               | clip shape against convex boundary                                 |
| [`closestPoint()`](https://docs.thi.ng/umbrella/geom/functions/closestPoint.html)           | compute closest point on shape boundary                            |
| [`convexHull()`](https://docs.thi.ng/umbrella/geom/functions/convexHull.html)               | compute convex hull (2d only)                                      |
| [`convolve()`](https://docs.thi.ng/umbrella/geom/functions/convolve.html)                   | kernel based vertex convolution/filtering                          |
| [`edges()`](https://docs.thi.ng/umbrella/geom/functions/edges.html)                         | extract edges                                                      |
| [`fitIntoBounds2()`](https://docs.thi.ng/umbrella/geom/functions/fitIntoBounds2.html)       | rescale/reposition a 2D shape into a destination boundary          |
| [`fitIntoBounds3()`](https://docs.thi.ng/umbrella/geom/functions/fitIntoBounds3.html)       | rescale/reposition a 3D shape into a destination boundary          |
| [`fitAllIntoBounds2()`](https://docs.thi.ng/umbrella/geom/functions/fitAllIntoBounds2.html) | rescale/reposition multiple 2D shapes into a boundary              |
| [`flip()`](https://docs.thi.ng/umbrella/geom/functions/flip.html)                           | reverse order (vertices or direction)                              |
| [`intersects()`](https://docs.thi.ng/umbrella/geom/functions/intersects.html)               | pairwise shape intersection (various types)                        |
| [`mapPoint()`](https://docs.thi.ng/umbrella/geom/functions/mapPoint.html)                   | transform world space point into local shape UV space              |
| [`offset()`](https://docs.thi.ng/umbrella/geom/functions/offset.html)                       | shape/path offsetting                                              |
| [`pointAt()`](https://docs.thi.ng/umbrella/geom/functions/pointAt.html)                     | compute point on shape boundary at parametric position             |
| [`pointInside()`](https://docs.thi.ng/umbrella/geom/functions/pointInside.html)             | check if point is inside shape                                     |
| [`proximity()`](https://docs.thi.ng/umbrella/geom/functions/proximity.html)                 | distance from point to shape boundary                              |
| [`resample()`](https://docs.thi.ng/umbrella/geom/functions/resample.html)                   | resample/convert shape                                             |
| [`rotate()`](https://docs.thi.ng/umbrella/geom/functions/rotate.html)                       | rotate shape (2D only)                                             |
| [`rotateAroundAxis()`](https://docs.thi.ng/umbrella/geom/functions/rotateAroundAxis.html)   | rotate shape (3D only)                                             |
| [`rotateX()`](https://docs.thi.ng/umbrella/geom/functions/rotateX.html)                     | rotate shape (3D only)                                             |
| [`rotateY()`](https://docs.thi.ng/umbrella/geom/functions/rotateY.html)                     | rotate shape (3D only)                                             |
| [`rotateZ()`](https://docs.thi.ng/umbrella/geom/functions/rotateZ.html)                     | rotate shape (3D only)                                             |
| [`scale()`](https://docs.thi.ng/umbrella/geom/functions/scale.html)                         | scale shape (uniformly/non-uniformly)                              |
| [`scaleWithCenter()`](https://docs.thi.ng/umbrella/geom/functions/scaleWithCenter.html)     | scale shape with pivot point                                       |
| [`scatter()`](https://docs.thi.ng/umbrella/geom/functions/scatter.html)                     | create random points inside a shape boundary                       |
| [`simplify()`](https://docs.thi.ng/umbrella/geom/functions/simplify.html)                   | simplify shape/boundary (Douglas-Peucker)                          |
| [`splitArcLength()`](https://docs.thi.ng/umbrella/geom/functions/splitArcLength.html)       | split shapes & groups based on max. arc length                     |
| [`splitAt()`](https://docs.thi.ng/umbrella/geom/functions/splitAt.html)                     | split shape/boundary at parametric position                        |
| [`splitNearPoint()`](https://docs.thi.ng/umbrella/geom/functions/splitNearPoint.html)       | split shape/boundary near world position                           |
| [`subdivCurve()`](https://docs.thi.ng/umbrella/geom/functions/subdivCurve.html)             | recursively apply curve subdivision kernel                         |
| [`tangentAt()`](https://docs.thi.ng/umbrella/geom/functions/tangentAt.html)                 | compute tangent at parametric position                             |
| [`tessellate()`](https://docs.thi.ng/umbrella/geom/functions/tessellate.html)               | (recursively) tessellate shape                                     |
| [`transformVertices()`](https://docs.thi.ng/umbrella/geom/functions/transformVertices.html) | apply custom function to each vertex                               |
| [`transform()`](https://docs.thi.ng/umbrella/geom/functions/transform.html)                 | apply transformation matrix                                        |
| [`translate()`](https://docs.thi.ng/umbrella/geom/functions/translate.html)                 | translate shape                                                    |
| [`union()`](https://docs.thi.ng/umbrella/geom/functions/union.html)                         | compute shape union                                                |
| [`unmapPoint()`](https://docs.thi.ng/umbrella/geom/functions/unmapPoint.html)               | transform local shape UV point into world space                    |
| [`vertices()`](https://docs.thi.ng/umbrella/geom/functions/vertices.html)                   | extract/sample vertices from shape boundary                        |
| [`volume()`](https://docs.thi.ng/umbrella/geom/functions/volume.html)                       | compute shape volume (3D only)                                     |
| [`warpPoint()`](https://docs.thi.ng/umbrella/geom/functions/warpPoint.html)                 | transfer single point between the local spaces defined by 2 shapes |
| [`warpPoints()`](https://docs.thi.ng/umbrella/geom/functions/warpPoints.html)               | transfer points between the local spaces defined by 2 shapes       |
| [`warpPointsBPatch()`](https://docs.thi.ng/umbrella/geom/functions/warpPointsBPatch.html)   | transfer points to the local spaces of a bezier patch              |
| [`withAttribs()`](https://docs.thi.ng/umbrella/geom/functions/withAttribs.html)             | shallow copy of given shape with new `attribs` assigned            |

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
- [pathBuilder()](https://docs.thi.ng/umbrella/geom/functions/pathBuilder3.html)
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

- [`SUBDIV_CHAIKIN_CLOSED`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_CHAIKIN_CLOSED.html)
- [`SUBDIV_CHAIKIN_OPEN`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_CHAIKIN_OPEN.html)
- [`SUBDIV_CUBIC_CLOSED`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_CUBIC_CLOSED.html)
- [`SUBDIV_DISPLACE`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_DISPLACE.html)
- [`SUBDIV_MID_CLOSED`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_MID_CLOSED.html)
- [`SUBDIV_MID_OPEN`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_MID_OPEN.html)
- [`SUBDIV_THIRDS_CLOSED`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_THIRDS_CLOSED.html)
- [`SUBDIV_THIRDS_OPEN`](https://docs.thi.ng/umbrella/geom/variables/SUBDIV_THIRDS_OPEN.html)

#### Polygon tessellation algorithms

To be used with [`tessellate()`](https://docs.thi.ng/umbrella/geom/functions/tessellate.html):

See [thi.ng/geom-tessellate
readme](https://github.com/thi-ng/umbrella/blob/develop/packages/geom-tessellate/README.md#tessellators)
for diagrams/illustrations of each algorithm!

- [`TESSELLATE_EARCUT`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_EARCUT.html)
- [`TESSELLATE_EARCUT_COMPLEX`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_EARCUT_COMPLEX.html)
- [`TESSELLATE_EDGE_SPLIT`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_EDGE_SPLIT.html)
- [`TESSELLATE_INSET`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_INSET.html)
- [`TESSELLATE_QUAD_FAN`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_QUAD_FAN.html)
- [`TESSELLATE_RIM_TRIS`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_RIM_TRIS.html)
- [`TESSELLATE_TRI_FAN`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_TRI_FAN.html)
- [`TESSELLATE_TRI_FAN_BOUNDARY`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_TRI_FAN_BOUNDARY.html)
- [`TESSELLATE_TRI_FAN_SPLIT`](https://docs.thi.ng/umbrella/geom/variables/TESSELLATE_TRI_FAN_SPLIT.html)

Tessellation behaviors:

- [`basicTessellation()`](https://docs.thi.ng/umbrella/geom/functions/basicTessellation.html):
  default impl
- [`meshTessellation()`](https://docs.thi.ng/umbrella/geom/functions/meshTessellation.html):
  uses kD-tree to deduplicate result points

Tessellation post-processing:

- [edgesFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/edgesFromTessellation.html)
- [edgePointsFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/edgePointsFromTessellation.html)
- [graphFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/graphFromTessellation.html)
- [groupFromTessellation()](https://docs.thi.ng/umbrella/geom/functions/groupFromTessellation.html)

#### Vertex convolution kernels

To be used with [`convolve()`](https://docs.thi.ng/umbrella/geom/functions/convolve.html):

- [`KERNEL_BOX`](https://docs.thi.ng/umbrella/geom/variables/KERNEL_BOX.html)
- [`KERNEL_GAUSSIAN`](https://docs.thi.ng/umbrella/geom/variables/KERNEL_GAUSSIAN.html)
- [`KERNEL_TRI`](https://docs.thi.ng/umbrella/geom/variables/KERNEL_TRI.html)
---

This package acts as a higher-level frontend for most of the following related
packages (which are more low-level, lightweight and usable by themselves too):

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.status}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

<!-- include ../../assets/tpl/footer.md -->
