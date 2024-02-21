<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/geom-isoline](https://media.thi.ng/umbrella/banners-20230807/thing-geom-isoline.svg?3e261cec)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-isoline.svg)](https://www.npmjs.com/package/@thi.ng/geom-isoline)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-isoline.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

## Status

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

```js
const geomIsoline = await import("@thi.ng/geom-isoline");
```

Package sizes (brotli'd, pre-treeshake): ESM: 716 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2015 - 2024 Karsten Schmidt // Apache License 2.0
