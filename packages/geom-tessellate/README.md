<!-- This file is generated - DO NOT EDIT! -->

# ![geom-tessellate](https://media.thi.ng/umbrella/banners/thing-geom-tessellate.svg?667e4c7b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-tessellate.svg)](https://www.npmjs.com/package/@thi.ng/geom-tessellate)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-tessellate.svg)
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

2D/3D convex polygon tessellators.

- [earcut](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/earcut.ts)
- [edgeSplit](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/edge-split.ts)
- [inset](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/inset.ts)
- [quadFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/quad-fan.ts)
- [rimTris](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/rim-tris.ts)
- [triFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/tri-fan.ts)

**Note**: Though not officially supported, all functions *might* also
work (in principle) with concave polygons, though correct results are
highly dependent on the concavities present. YMMV!

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-tessellate
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/geom-tessellate?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/geom-tessellate/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 782 bytes / CJS: 872 bytes / UMD: 921 bytes

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                | Description                               | Live demo                                         | Source                                                                         |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/tessel.png" width="240"/> | Animated, recursive polygon tessellations | [Demo](https://demo.thi.ng/umbrella/geom-tessel/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-tessel) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-tessellate/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
