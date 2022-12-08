# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

For the Clojure version, please visit: [thi.ng/geom-clj](https://thi.ng/geom-clj)

<!-- TOC -->

## About

${pkg.description}

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
| [Rectangle](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/src/ray.ts)                 | 2D rectangle                 | ✅               |
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

${supportPackages}

${relatedPackages}

${status}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
