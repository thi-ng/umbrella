# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

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

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

![example screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-voronoi.jpg)

```ts
import * as g from "@thi.ng/geom";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { repeatedly } from "@thi.ng/transducers";
import { randNormS2 } from "@thi.ng/vectors";

const pts = [...repeatedly(() => randNormS2([], Math.random() * 250), 1000)];

const mesh = new DVMesh(pts);

// raw polygons of primary or dual mesh
mesh.delaunay()
mesh.voronoi()

// ...or clipped & filtered polygons within convex polygon boundary
const bounds = g.vertices(g.center(g.rect(500))!);
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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
