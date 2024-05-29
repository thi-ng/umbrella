<!-- include ../../assets/tpl/header.md -->

For the Clojure version, please visit: [thi.ng/geom-clj](https://thi.ng/geom-clj)

<!-- toc -->

## About

{{pkg.description}}

This project is a partially ported from the [Clojure version of the same
name](http://thi.ng/geom-clj). All polymorphic operations built on
[@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti).

### Shape types

The following shape primitives are provided. For many there're multiple ways to
create them, please check linked sources and/or docs.

| Shape/Form                                                                                             | Description                           | Hiccup support  |
|--------------------------------------------------------------------------------------------------------|---------------------------------------|-----------------|
| [AABB](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/aabb.ts)                      | 3D Axis-aligned bounding box          | ✅<sup>(1)</sup> |
| [Arc](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/arc.ts)                        | 2D elliptic arc                       | ✅               |
| [Circle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/circle.ts)                  | 2D circle                             | ✅               |
| [ComplexPolygon](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/complex-polygon.ts) | 2D polygon w/ holes                   | ✅               |
| [Cubic](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/cubic.ts)                    | 2D cubic bezier                       | ✅               |
| [Cubic3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/cubic3.ts)                  | 3D cubic bezier                       | ✅<sup>(1)</sup> |
| [Ellipse](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ellipse.ts)                | 2D ellipse                            | ✅               |
| [Group](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/group.ts)                    | group of 2D shapes                    | ✅               |
| [Group3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/group3.ts)                  | group of 3D shapes                    | ✅<sup>(1)</sup> |
| [Line](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/line.ts)                      | 2D line segment                       | ✅               |
| [Line3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/line3.ts)                    | 3D line segment                       | ✅<sup>(1)</sup> |
| [Path](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path.ts)                      | 2D path (w/ optional holes/sub-paths) | ✅               |
| [Path3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path3.ts)                    | 3D path (w/ optional holes/sub-paths) | ✅<sup>(1)</sup> |
| [Path (from SVG)](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/path-from-svg.ts)  | 2D path from SVG                      | ✅               |
| [Plane](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/plane.ts)                    | 3D plane                              | ✅<sup>(1)</sup> |
| [Points](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/points.ts)                  | 2D point cloud                        | ✅               |
| [Points3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/points3.ts)                | 3D point cloud                        | ✅<sup>(1)</sup> |
| [Polygon](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polygon.ts)                | 2D simple polygon (no holes)          | ✅               |
| [Polygon3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polygon3.ts)              | 3D simple polygon (no holes)          | ✅               |
| [Polyline](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polyline.ts)              | 2D polyline                           | ✅               |
| [Polyline3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/polyline3.ts)            | 3D polyline                           | ✅<sup>(1)</sup> |
| [Quad](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quad.ts)                      | 2D quad (4-gon)                       | ✅               |
| [Quad3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quad3.ts)                    | 2D quad (4-gon)                       | ✅<sup>(1)</sup> |
| [Quadratic](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quadratic.ts)            | 2D quadratic bezier                   | ✅               |
| [Quadratic3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/quadratic3.ts)          | 3D quadratic bezier                   | ✅<sup>(1)</sup> |
| [Ray](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ray.ts)                        | 2D ray                                | ✅               |
| [Ray3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ray3.ts)                      | 3D ray                                | ✅<sup>(1)</sup> |
| [Rectangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/rect.ts)                 | 2D rectangle                          | ✅               |
| [Sphere](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/sphere.ts)                  | 3D sphere                             | ✅<sup>(1)</sup> |
| [Text](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/text.ts)                      | Basic stub for text labels            | ✅<sup>(2)</sup> |
| [Triangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/triangle.ts)              | 2D triangle                           | ✅               |
| [Triangle3](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/triangle3.ts)            | 3D triangle                           | ✅<sup>(1)</sup> |

- <sup>(1)</sup> valid hiccup format, but currently still missing **external** tool/library support
- <sup>(2)</sup> merely treated as a point in space (e.g. used for placing text labels), no geometry of text itself

### Hiccup support

With very few exceptions these all are implementing the [`IToHiccup`
interface](https://docs.thi.ng/umbrella/api/interfaces/IToHiccup.html) and so
can be easily converted (via
[hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)) to a
variety of other formats, incl. [conversion to SVG](#svg-support).

By design, for better flexibility and performance reasons, the hiccup flavor
used by this package is **not** compatible with that used by
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
| [`asPolygon()`](https://docs.thi.ng/umbrella/geom/functions/asPolygon.html)                 | convert shape to polygon(s)                                  |
| [`asPolyline()`](https://docs.thi.ng/umbrella/geom/functions/asPolyline.html)               | convert shape to polyline(s)                                 |
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
| [`mapPoint()`](https://docs.thi.ng/umbrella/geom/functions/mapPoint.html)                   | transform world space point into local shape UV space        |
| [`offset()`](https://docs.thi.ng/umbrella/geom/functions/offset.html)                       | shape/path offsetting                                        |
| [`pointAt()`](https://docs.thi.ng/umbrella/geom/functions/pointAt.html)                     | compute point on shape boundary at parametric position       |
| [`pointInside()`](https://docs.thi.ng/umbrella/geom/functions/pointInside.html)             | check if point is inside shape                               |
| [`proximity()`](https://docs.thi.ng/umbrella/geom/functions/proximity.html)                 | distance from point to shape boundary                        |
| [`resample()`](https://docs.thi.ng/umbrella/geom/functions/resample.html)                   | resample/convert shape                                       |
| [`rotate()`](https://docs.thi.ng/umbrella/geom/functions/rotate.html)                       | rotate shape                                                 |
| [`rotateAroundAxis()`](https://docs.thi.ng/umbrella/geom/functions/rotateAroundAxis.html)   | rotate shape (3D only)                                       |
| [`rotateX()`](https://docs.thi.ng/umbrella/geom/functions/rotateX.html)                     | rotate shape (3D only)                                       |
| [`rotateY()`](https://docs.thi.ng/umbrella/geom/functions/rotateY.html)                     | rotate shape (3D only)                                       |
| [`rotateZ()`](https://docs.thi.ng/umbrella/geom/functions/rotateZ.html)                     | rotate shape (3D only)                                       |
| [`scale()`](https://docs.thi.ng/umbrella/geom/functions/scale.html)                         | scale shape (uniformly/non-uniformly)                        |
| [`scaleWithCenter()`](https://docs.thi.ng/umbrella/geom/functions/scaleWithCenter.html)     | scale shape with pivot point                                 |
| [`scatter()`](https://docs.thi.ng/umbrella/geom/functions/scatter.html)                     | create random points inside a shape boundary                 |
| [`simplify()`](https://docs.thi.ng/umbrella/geom/functions/simplify.html)                   | simplify shape/boundary (Douglas-Peucker)                    |
| [`splitArcLength()`](https://docs.thi.ng/umbrella/geom/functions/splitArcLength.html)       | split shapes & groups based on max. arc length               |
| [`splitAt()`](https://docs.thi.ng/umbrella/geom/functions/splitAt.html)                     | split shape/boundary at parametric position                  |
| [`splitNearPoint()`](https://docs.thi.ng/umbrella/geom/functions/splitNearPoint.html)       | split shape/boundary near world position                     |
| [`subdivCurve()`](https://docs.thi.ng/umbrella/geom/functions/subdivCurve.html)             | recursively apply curve subdivision kernel                   |
| [`tangentAt()`](https://docs.thi.ng/umbrella/geom/functions/tangentAt.html)                 | compute tangent at parametric position                       |
| [`tessellate()`](https://docs.thi.ng/umbrella/geom/functions/tessellate.html)               | (recursively) tessellate shape                               |
| [`transformVertices()`](https://docs.thi.ng/umbrella/geom/functions/transformVertices.html) | apply custom function to each vertex                         |
| [`transform()`](https://docs.thi.ng/umbrella/geom/functions/transform.html)                 | apply transformation matrix                                  |
| [`translate()`](https://docs.thi.ng/umbrella/geom/functions/translate.html)                 | translate shape                                              |
| [`union()`](https://docs.thi.ng/umbrella/geom/functions/union.html)                         | compute shape union                                          |
| [`unmapPoint()`](https://docs.thi.ng/umbrella/geom/functions/unmapPoint.html)               | transform local shape UV point into world space              |
| [`vertices()`](https://docs.thi.ng/umbrella/geom/functions/vertices.html)                   | extract/sample vertices from shape boundary                  |
| [`volume()`](https://docs.thi.ng/umbrella/geom/functions/volume.html)                       | compute shape volume (3D only)                               |
| [`warpPoints()`](https://docs.thi.ng/umbrella/geom/functions/warpPoints.html)               | transfer points between the local spaces defined by 2 shapes |
| [`withAttribs()`](https://docs.thi.ng/umbrella/geom/functions/withAttribs.html)             | shallow copy of given shape with new `attribs` assigned      |

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

TODO

<!-- include ../../assets/tpl/footer.md -->
