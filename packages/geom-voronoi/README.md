<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/geom-voronoi

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-voronoi.svg)](https://www.npmjs.com/package/@thi.ng/geom-voronoi)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-voronoi.svg)
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

Fast, incremental 2D Delaunay & Voronoi mesh implementation, based on
the
[@thi.ng/quad-edge](https://github.com/thi-ng/umbrella/tree/master/packages/quad-edge)
data structure after Guibas & Stolfi and partially ported from C++
versions by Dani Lischinski, Paul Heckbert et al:

References:

- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/lischinski/114.ps

Construction speed: 20k random points ([poisson disc samples, even
distribution](https://github.com/thi-ng/umbrella/tree/master/packages/poisson))
in ~850ms (Chrome 72, MBP 2016)

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-voronoi
```

Package sizes (gzipped): ESM: 1.3KB / CJS: 1.4KB / UMD: 1.5KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/master/packages/geom-clip)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/master/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/master/packages/geom-poly-utils)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/quad-edge](https://github.com/thi-ng/umbrella/tree/master/packages/quad-edge)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### geom-voronoi-mst <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/geom-voronoi-mst.jpg)

Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization

[Live demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/geom-voronoi-mst)

### rotating-voronoi <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/rotating-voronoi.jpg)

[Live demo](https://demo.thi.ng/umbrella/rotating-voronoi/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/rotating-voronoi)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-voronoi/)

![example screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/geom/geom-voronoi.jpg)

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

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
