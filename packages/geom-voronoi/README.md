<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/geom-voronoi](https://media.thi.ng/umbrella/banners-20230807/thing-geom-voronoi.svg?85e52d54)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-voronoi.svg)](https://www.npmjs.com/package/@thi.ng/geom-voronoi)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-voronoi.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Fast, incremental 2D Delaunay & Voronoi mesh implementation, based on
the
[@thi.ng/quad-edge](https://github.com/thi-ng/umbrella/tree/develop/packages/quad-edge)
data structure after Guibas & Stolfi and partially ported from C++
versions by Dani Lischinski, Paul Heckbert et al:

References:

- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/lischinski/114.ps

Construction speed: 20k random points ([poisson disc samples, even
distribution](https://github.com/thi-ng/umbrella/tree/develop/packages/poisson))
in ~850ms (Chrome 72, MBP 2016)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-voronoi%5D+in%3Atitle)

## Related packages

- [@thi.ng/quad-edge](https://github.com/thi-ng/umbrella/tree/develop/packages/quad-edge) - Quadedge data structure after Guibas & Stolfi

## Installation

```bash
yarn add @thi.ng/geom-voronoi
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-voronoi"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomVoronoi = await import("@thi.ng/geom-voronoi");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.35 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/develop/packages/bitfield)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line)
- [@thi.ng/geom-clip-poly](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-poly)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/quad-edge](https://github.com/thi-ng/umbrella/tree/develop/packages/quad-edge)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/quasi-lattice.png" width="240"/>    | Quasi-random lattice generator                                                   | [Demo](https://demo.thi.ng/umbrella/quasi-lattice/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/quasi-lattice)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/> | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-voronoi/)

![example screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-voronoi.jpg)

```ts
import * as g from "@thi.ng/geom";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { repeatedly } from "@thi.ng/transducers";
import { randNorm2 } from "@thi.ng/vectors";

const pts = [...repeatedly(() => randNorm2([], Math.random() * 250), 1000)];

const mesh = new DVMesh(pts);

// raw polygons of primary or dual mesh
mesh.delaunay()
mesh.voronoi()

// ...or clipped & filtered polygons within convex polygon boundary
const bounds = g.vertices(g.center(g.rect(500)));
// [ [ -250, -250 ], [ 250, -250 ], [ 250, 250 ], [ -250, 250 ] ]

const cells = mesh.voronoi(bounds);

document.body.innerHtml = g.asSvg(
    g.svgDoc({ fill: "none", "stroke-width": 0.25 },
        g.group({ stroke: "blue" }, mesh.delaunay(bounds).map((p) => g.polygon(p))),
        g.group({ stroke: "red" }, mesh.voronoi(bounds).map((p) => g.polygon(p)))
    )
);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-voronoi,
  title = "@thi.ng/geom-voronoi",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-voronoi",
  year = 2016
}
```

## License

&copy; 2016 - 2023 Karsten Schmidt // Apache License 2.0
