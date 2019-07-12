# @thi.ng/geom-splines

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-splines.svg)](https://www.npmjs.com/package/@thi.ng/geom-splines)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-splines.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [Polygon to cubic curve conversion](#polygon-to-cubic-curve-conversion)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

nD cubic & quadratic curve analysis, conversion, interpolation,
splitting, resampling.

## Installation

```bash
yarn add @thi.ng/geom-splines
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/master/packages/geom-api)
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/master/packages/geom-arc)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/master/packages/geom-resample)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

### Polygon to cubic curve conversion

Currently, there're two ways to convert a polygon into a sequence of
cubic curve segments. Both modes support customizable curve tightness.

Furthermore, both conversion modes can be instructed to use uniformly
scaled control point tangents: In uniform mode, the tangents have a
uniform, user defined length, resulting in equidistant control points
for each poly vertex. In non-uniform mode, each tangent is scaled by the
length of its parent poly edge.

#### Poly vertices as control points

In this mode the curve always goes through the midpoints each polygon
edge, with the original polygon vertices being used to compute control
points.

| Proportional tangent scale                                                                            | Uniform tangent scale                                                                              |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-cp-nonuni.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-cp-uni.png) |

#### Poly vertices as break points

In this mode the curve always goes through the original polygon vertices
and additional control points are created via symmetric tangents at each
poly vertex. The tangents themselves are computed via the bisector of
each vertex corner, taking into the convexity of each poly vertex.

| Proportional tangent scale                                                                            | Uniform tangent scale                                                                              |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-bp-nonuni.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-splines-bp-uni.png) |

```ts
import * as gs from "@thi.ng/geom-splines";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
