<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/geom-tessellate](https://media.thi.ng/umbrella/banners-20220914/thing-geom-tessellate.svg?0a4cce18)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-tessellate.svg)](https://www.npmjs.com/package/@thi.ng/geom-tessellate)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-tessellate.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

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

2D/3D convex polygon tessellators. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

- [earcut](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/earcut.ts)
- [edgeSplit](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/edge-split.ts)
- [inset](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/inset.ts)
- [quadFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/quad-fan.ts)
- [rimTris](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/rim-tris.ts)
- [triFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/tri-fan.ts)

**Note**: Though not officially supported, all functions *might* also
work (in principle) with concave polygons, though correct results are
highly dependent on the concavities present. YMMV!

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-tessellate%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-tessellate
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-tessellate"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomTessellate = await import("@thi.ng/geom-tessellate");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1018 bytes

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
|:----------------------------------------------------------------------------------------------------------|:------------------------------------------|:--------------------------------------------------|:-------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/tessel.png" width="240"/> | Animated, recursive polygon tessellations | [Demo](https://demo.thi.ng/umbrella/geom-tessel/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-tessel) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-tessellate/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-tessellate,
  title = "@thi.ng/geom-tessellate",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-tessellate",
  year = 2013
}
```

## License

&copy; 2013 - 2023 Karsten Schmidt // Apache License 2.0
