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
