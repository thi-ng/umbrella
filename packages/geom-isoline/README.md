<!-- This file is generated - DO NOT EDIT! -->

# ![geom-isoline](https://media.thi.ng/umbrella/banners/thing-geom-isoline.svg?a7bbf51d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-isoline.svg)](https://www.npmjs.com/package/@thi.ng/geom-isoline)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-isoline.svg)
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

2D isoline / contour extraction, using [Marching
squares](https://en.wikipedia.org/wiki/Marching_squares). Ported from
the Clojure version of
[thi.ng/ndarray](https://github.com/thi-ng/ndarray/blob/develop/src/contours.org).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-isoline%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-isoline
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-isoline"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const geomIsoline = await import("@thi.ng/geom-isoline");
```

Package sizes (gzipped, pre-treeshake): ESM: 765 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                      | Description                                                | Live demo                                        | Source                                                                        |
|:----------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/> | Animated sine plasma effect visualized using contour lines | [Demo](https://demo.thi.ng/umbrella/iso-plasma/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-isoline/)

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

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-isoline,
  title = "@thi.ng/geom-isoline",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-isoline",
  year = 2015
}
```

## License

&copy; 2015 - 2022 Karsten Schmidt // Apache Software License 2.0
