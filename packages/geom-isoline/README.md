# @thi.ng/geom-isoline

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-isoline.svg)](https://www.npmjs.com/package/@thi.ng/geom-isoline)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-isoline.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

2D isoline / contour extraction, using [Marching
squares](https://en.wikipedia.org/wiki/Marching_squares). Ported from
Clojure version of
[thi.ng/ndarray](https://github.com/thi-ng/ndarray/blob/master/src/contours.org).

## Installation

```bash
yarn add @thi.ng/geom-isoline
```

## Dependencies

- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Animated version:
[Live demo](https://demo.thi.ng/umbrella/iso-plasma/) |
[Source code](https://github.com/thi-ng/umbrella/tree/master/examples/iso-plasma)

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png)

```ts
import * as g from "@thi.ng/geom";
import * as iso from "@thi.ng/geom-isoline";
import * as tx from "@thi.ng/transducers";

import * as fs from "fs";

// evaluate fn for each [x,y], create array
const makeField = (fn, width, height) =>
    iso.setBorder(
        [...tx.map(fn, tx.range2d(width, height))],
        width,
        height,
        1000
    );

// precompute field with given fn
const src = makeField(
    ([x, y]) => Math.sin(x * 0.1) * Math.cos(y * 0.1),
    100,
    100
);

// contour iterator
const contours = tx.iterator(
    tx.comp(
        // iso value => RGB color from
        tx.mapIndexed((i, x) => [x, [i / 20, 1 - i / 40, 1 - i / 20]]),
        // contour & color tuples
        tx.mapcat(([i, col]) => tx.map((pts)=> [pts, col], iso.isolines(src, 100, 100, i))),
        // wrap as polygon for svg
        tx.map(([pts, col]) => g.polygon(pts, { stroke: col}))
    ),
    // iso value range
    tx.range(-1, 1, 0.05)
);

// svg document wrapper
const doc = g.svgDoc(
    {
        width: 600,
        height: 600,
        fill: "none",
        "stroke-width": 0.1
    },
    ...contours
);

// output
fs.writeFileSync("contours.svg", g.asSvg(doc));
```

## Authors

- Karsten Schmidt

## License

&copy; 2015 Karsten Schmidt // Apache Software License 2.0
