<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/geom-splines](https://media.thi.ng/umbrella/banners-20230807/thing-geom-splines.svg?82ae0eac)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-splines.svg)](https://www.npmjs.com/package/@thi.ng/geom-splines)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-splines.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

> [!NOTE]
> 🚀 Help me to work full-time on these projects by [sponsoring me on GitHub](https://github.com/sponsors/postspectacular) ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Cubic curve conversion from polygons & polylines](#cubic-curve-conversion-from-polygons--polylines)
    - [Poly vertices as control points](#poly-vertices-as-control-points)
    - [Poly vertices as break points](#poly-vertices-as-break-points)
- [Authors](#authors)
- [License](#license)

## About

nD cubic & quadratic curve analysis, conversion, interpolation, splitting. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-splines%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-subdiv-curve) - Freely customizable, iterative nD subdivision curves for open / closed geometries

## Installation

```bash
yarn add @thi.ng/geom-splines
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-splines"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomSplines = await import("@thi.ng/geom-splines");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.38 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-arc)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                         | Description                                       | Live demo                                         | Source                                                                         |
|:-------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------|:--------------------------------------------------|:-------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/> | Polygon to cubic curve conversion & visualization | [Demo](https://demo.thi.ng/umbrella/poly-spline/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-splines/)

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

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-splines,
  title = "@thi.ng/geom-splines",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-splines",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
