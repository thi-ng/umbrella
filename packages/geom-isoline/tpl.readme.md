<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

2D isoline / contour extraction, using [Marching
squares](https://en.wikipedia.org/wiki/Marching_squares). Ported from
the Clojure version of
[thi.ng/ndarray](https://github.com/thi-ng/ndarray/blob/develop/src/contours.org).

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
