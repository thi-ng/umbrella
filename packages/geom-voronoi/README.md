<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-voronoi](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-voronoi.svg?5849b556)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-voronoi.svg)](https://www.npmjs.com/package/@thi.ng/geom-voronoi)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-voronoi.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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
[@thi.ng/quad-edge](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/quad-edge)
data structure after Guibas & Stolfi and partially ported from C++
versions by Dani Lischinski, Paul Heckbert et al:

References:

- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/lischinski/114.ps

Construction speed: 20k random points ([poisson disc samples, even
distribution](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/poisson))
in ~850ms (Chrome 72, MBP 2016)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-voronoi%5D)

## Related packages

- [@thi.ng/quad-edge](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/quad-edge) - Quadedge data structure after Guibas & Stolfi

## Installation

```bash
yarn add @thi.ng/geom-voronoi
```

ESM import:

```ts
import * as gv from "@thi.ng/geom-voronoi";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-voronoi"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gv = await import("@thi.ng/geom-voronoi");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.45 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/bitfield](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/bitfield)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/geom-clip-line](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-clip-line)
- [@thi.ng/geom-clip-poly](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-clip-poly)
- [@thi.ng/geom-isec](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-poly-utils)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/quad-edge](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/quad-edge)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Three projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                                      |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------|:--------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-voronoi-mst) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/quasi-lattice.png" width="240"/>    | Quasi-random lattice generator                                                   | [Demo](https://demo.thi.ng/umbrella/quasi-lattice/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/quasi-lattice)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/rotating-voronoi.jpg" width="240"/> | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rotating-voronoi) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-voronoi/)

![example screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/geom/geom-voronoi.jpg)

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

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
