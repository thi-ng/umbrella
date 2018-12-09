# @thi.ng/geom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Usage examples](#usage-examples)
    - [Tessellations](#tessellations)
    - [Subdivision curves](#subdivision-curves)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package is a partial WIP port of selected features of the
[Clojure/ClojureScript version of
thi.ng/geom](https://github.com/thi-ng/geom), as well as
[c.thi.ng](https://github.com/thi-ng/c-thing). Currently only 2D shapes
& operations are supported.

**This package will soon be replaced by the currently still unreleased
[@thi.ng/geom2](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/geom2)
package**

## Status

ALPHA - major breaking changes forthcoming...

## Installation

```bash
yarn add @thi.ng/geom
```

## Usage examples

### Tessellations

![sample output](../../assets/geom/tessel.svg)

```ts
import * as g from "@thi.ng/geom";
import * as v from "@thi.ng/vectors";
import * as h from "@thi.ng/hiccup";
import * as svg from "@thi.ng/hiccup-svg";
import * as fs from "fs";

const tintedPoly = (points) => {
    const p = g.polygon2(points);
    const c = p.centroid().toPolar();
    p.attribs = { fill: `hsl(${v.deg(c.y)},${c.x}%,${100-c.x/2}%)` };
    return p;
};

fs.writeFileSync(
    "tessel.svg",
    h.serialize(
        svg.svg(
            {
                width: 1000, height: 1000,
                viewBox: "-100 -100 200 200",
                fill: "none",
                stroke: "#000",
                "stroke-width": 0.5,
            },
            svg.convertTree(
                g.circle2(100)
                    .toPolygon(6)
                    .tessellate([g.quadFan, g.triFan, g.edgeSplit, g.quadFan])
                    .map((pts) => tintedPoly(pts).toHiccup())
            )
        )
    )
);
```

### Subdivision curves

| Chaikin (closed)                                        | Chaikin (open)                                      |
|---------------------------------------------------------|-----------------------------------------------------|
| ![chaikin closed](../../assets/geom/chaikin-closed.svg) | ![chaikin open](../../assets/geom/chaikin-open.svg) |

```ts
g.polygon2([-100,-100, 0,100, 100,-100, 0,0]).subdivide(g.CHAIKIN_CLOSED, 4);
g.polyline2([-100,100, -100,-100, 0,0, 100,-100, 100,100]).subdivide(g.CHAIKIN_OPEN, 4);
```

## Authors

- Karsten Schmidt

## License

&copy; 2013 - 2018 Karsten Schmidt // Apache Software License 2.0
