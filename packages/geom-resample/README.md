<!-- This file is generated - DO NOT EDIT! -->

# ![geom-resample](https://media.thi.ng/umbrella/banners/thing-geom-resample.svg?7fa0e99f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-resample.svg)](https://www.npmjs.com/package/@thi.ng/geom-resample)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-resample.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable nD polyline interpolation, re-sampling, splitting & nearest point computation. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Also includes an implementation of [Douglas-Peucker polyline / polygon
simplification](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm).

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-resample%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-resample
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-resample"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const geomResample = await import("@thi.ng/geom-resample");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.27 KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                            | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/> | Animated Voronoi diagram, cubic splines & SVG download | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-resample/)

```ts
import { resample, simplify } from "@thi.ng/geom-resample";

// resample polygon w/ uniform distance
const pts = resample([[0,0], [100,0], [100,100], [0,100]], { dist: 25 }, true)

// [ [ 0, 0 ], [ 25, 0 ], [ 50, 0 ], [ 75, 0 ],
//   [ 100, 0 ], [ 100, 25 ], [ 100, 50 ], [ 100, 75 ],
//   [ 100, 100 ], [ 75, 100 ], [ 50, 100 ], [ 25, 100 ],
//   [ 0, 100 ], [ 0, 75 ], [ 0, 50 ], [ 0, 25 ] ]

// simply polygon
// (epsilon = 0 only removes co-linear points, increase if necessary)
simplify(pts, 0, true)

// [ [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ] ]
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-resample,
  title = "@thi.ng/geom-resample",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-resample",
  year = 2013
}
```

## License

&copy; 2013 - 2022 Karsten Schmidt // Apache Software License 2.0
