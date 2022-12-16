<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

### Cubic curve conversion from polygons & polylines

Currently, there're two ways to convert a polygon/polyline into a
sequence of cubic curve segments. Both modes support customizable curve
tightness.

Furthermore, both conversion modes can be instructed to use uniformly
scaled control point tangents: In uniform mode, the tangents have a
uniform, user defined length, resulting in equidistant control points
for each poly vertex. In non-uniform mode, each tangent is scaled by the
length of its parent poly edge.

#### Poly vertices as control points

In this mode the curve always goes through the midpoints each polygon
edge, with the original polygon vertices being used to compute control
points.

| Proportional tangent scale                                                                           | Uniform tangent scale                                                                             |
|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-cp-nonuni.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-cp-uni.png) |

#### Poly vertices as break points

In this mode the curve always goes through the original polygon vertices
and additional control points are created via symmetric tangents at each
poly vertex. The tangents themselves are computed via the bisector of
each vertex corner, taking into the convexity of each poly vertex.

| Proportional tangent scale                                                                           | Uniform tangent scale                                                                             |
|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-bp-nonuni.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-bp-uni.png) |

<!-- include ../../assets/tpl/footer.md -->
