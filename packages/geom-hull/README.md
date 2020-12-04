<!-- This file is generated - DO NOT EDIT! -->

# ![geom-hull](https://media.thi.ng/umbrella/banners/thing-geom-hull.svg?b0095b45)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-hull.svg)](https://www.npmjs.com/package/@thi.ng/geom-hull)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-hull.svg)
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

Fast 2D convex hull (Graham Scan).

Current implementation is partially based on Clojure version of
[thi.ng/geom](http://thi.ng/geom).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-hull%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-hull
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/geom-hull?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/geom-hull/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 433 bytes / CJS: 489 bytes / UMD: 598 bytes

## Dependencies

- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                 | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png" width="240"/> | Convex hull & shape clipping of 2D polygons | [Demo](https://demo.thi.ng/umbrella/geom-convex-hull/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-hull/)

```ts
import { grahamScan2 } from "@thi.ng/geom-hull";

grahamScan2([[0, 0], [50, 10], [100, 0], [80, 50], [100, 100], [50, 90], [0, 100]]);
// [ [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ] ]
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-hull,
  title = "@thi.ng/geom-hull",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-hull",
  year = 2013
}
```

## License

&copy; 2013 - 2020 Karsten Schmidt // Apache Software License 2.0
