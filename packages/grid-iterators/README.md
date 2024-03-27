<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/grid-iterators](https://media.thi.ng/umbrella/banners-20230807/thing-grid-iterators.svg?9ea1cbba)

[![npm version](https://img.shields.io/npm/v/@thi.ng/grid-iterators.svg)](https://www.npmjs.com/package/@thi.ng/grid-iterators)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/grid-iterators.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Columns](#columns)
  - [Diagonal (45 degrees)](#diagonal-45-degrees)
  - [Diagonal with configurable slope](#diagonal-with-configurable-slope)
  - [Hilbert curve](#hilbert-curve)
  - [Interleave columns](#interleave-columns)
  - [Interleave rows](#interleave-rows)
  - [Random](#random)
  - [Rows](#rows)
  - [Outward spiral](#outward-spiral)
  - [Z-curve](#z-curve)
  - [Zigzag columns](#zigzag-columns)
  - [Zigzag diagonal](#zigzag-diagonal)
  - [Zigzag rows](#zigzag-rows)
  - [Mirror symmetries & arbitrary coordinate transformations](#mirror-symmetries--arbitrary-coordinate-transformations)
  - [Flood filling](#flood-filling)
  - [Shape iterators](#shape-iterators)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D grid and shape iterators w/ multiple orderings.

Provides the altogether 25 following orderings (excluding symmetries) to
generate grid coordinates, including iterators for shape rasterization, drawing,
clipping, filling, processing in general:

### Columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/columns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/columns.ts)

Also see the filtered version
[`columnEnds2d()`](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/column-ends.ts),
which only includes the end points of each column.

### Diagonal (45 degrees)

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/diagonal2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/diagonal.ts)

Also see the filtered version
[`diagonalEnds2d()`](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/diagonal-ends.ts),
which only includes the end points of the diagonals.

### Diagonal with configurable slope

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/diagonalslopex-small.gif)
![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/diagonalslopey-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/diagonal-slope.ts)

### Hilbert curve

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/hilbert2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hilbert.ts)

### Interleave columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/interleavecolumns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/interleave.ts)

Supports custom strides... example uses `step = 4`

### Interleave rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/interleaverows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/interleave.ts)

Supports custom strides... example uses `step = 4`

### Random

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/random2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/random.ts)

Supports custom PRNG implementations via `IRandom` interface defined in
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

### Rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/rows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/rows.ts)

Also see the filtered version
[`rowEnds2d()`](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/row-ends.ts),
which only includes the end points of each row.

### Outward spiral

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/spiral2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/spiral.ts)

### Z-curve

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zcurve2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zcurve.ts)

### Zigzag columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zigzagcolumns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zigzag-columns.ts)

### Zigzag diagonal

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zigzagdiagonal2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zigzag-diagonal.ts)

### Zigzag rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zigzagrows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zigzag-rows.ts)

Some functions have been ported from [Christopher
Kulla](https://fpsunflower.github.io/ckulla/)'s Java-based [Sunflow
renderer](https://sunflow.sf.net).

For more basic 2D/3D grid iteration, also see `range2d()` & `range3d()`
in
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

### Mirror symmetries & arbitrary coordinate transformations

All of the above mentioned grid iterators support point (grid coordinate)
transformations to create variations of their base orderings. The package
provides the `flipX`, `flipY` and `flipXY` preset transforms to mirror one or
both axes, but custom transforms can be easily implemented via the same
underlying mechanism. These transforms can be specified via the `tx` option
passed to the iterators (see code example further below).

### Flood filling

The `floodFill()` iterator can be used to iterate arbitrary 2D grids using an
user-provided predicate function. The function recursively explores (in a
row-major manner) the space in the `[0,0]..(width,height)` interval, starting at
given `x,y` and continues as long given predicate function returns a truthy
value. Any eligible 90-degree connected regions will be found and iterated
recursively. The predicate function is used to select eligible grid cells
(e.g. "pixels" of sorts).

```ts
import { floodFill } from "@thi.ng/grid-iterators";

// source "image"
const img = [
    "█", " ", " ", " ", "█",
    "█", " ", "█", " ", " ",
    " ", " ", "█", " ", "█",
    " ", "█", "█", " ", " ",
    " ", " ", " ", "█", "█",
];

// flood fill iterator from point (1,0)
// only accept " " as source pixel value
// image size is 5x5
const region = floodFill((x, y) => img[x + y * 5] === " ", 1, 0, 5, 5);

// label filled pixels using increasing ASCII values
let ascii = 65; // "A"
for(let [x,y] of region) img[x + y * 5] = String.fromCharCode(ascii++);

// result image showing fill order
img
// [
//   "█", "A", "B", "C", "█",
//   "█", "I", "█", "D", "E",
//   "K", "J", "█", "F", "█",
//   "L", "█", "█", "G", "H",
//   "M", "N", "O", "█", "█"
// ]
```

### Shape iterators

Additionally, the following shape iterators are available, all also with
optional clipping:

- [circle](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/circle.ts) (Bresenham)
- [hline](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hvline.ts)
- [vline](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hvline.ts)
- [line](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/line.ts) (Bresenham)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgrid-iterators%5D+in%3Atitle)

## Related packages

- [@thi.ng/morton](https://github.com/thi-ng/umbrella/tree/develop/packages/morton) - Z-order curve / Morton encoding, decoding & range extraction for arbitrary dimensions
- [@thi.ng/rasterize](https://github.com/thi-ng/umbrella/tree/develop/packages/rasterize) - 2D shape drawing & rasterization
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers) - Lightweight transducer implementations for ES6 / TypeScript

## Installation

```bash
yarn add @thi.ng/grid-iterators
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/grid-iterators"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const gridIterators = await import("@thi.ng/grid-iterators");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.58 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/develop/packages/bitfield)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/morton](https://github.com/thi-ng/umbrella/tree/develop/packages/morton)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                         | Description                                            | Live demo                                                         | Source                                                                                         |
|:-----------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/grid-iterators.png" width="240"/>              | Visualization of different grid iterator strategies    | [Demo](https://demo.thi.ng/umbrella/grid-iterators/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/grid-iterators)              |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-css-image-transition.jpg" width="240"/> | Generating pure CSS image transitions                  | [Demo](https://demo.thi.ng/umbrella/hiccup-css-image-transition/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-css-image-transition) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>                | Multi-layer vectorization & dithering of bitmap images | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)                | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)                |

## API

[Generated API docs](https://docs.thi.ng/umbrella/grid-iterators/)

```ts
import * as gi from "@thi.ng/grid-iterators";

[...gi.zigzagRows2d({ cols: 4, rows: 4 })]

// [
//   [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
//   [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ],
//   [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ],
//   [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ]
// ]

// with applied horizontal mirroring
// also, if `rows` is missing, it defaults to same value as `cols`
[...gi.zigzagRows2d({ cols: 4, tx: gi.flipX })]
// [
//   [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ],
//   [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ],
//   [ 3, 2 ], [ 2, 2 ], [ 1, 2 ], [ 0, 2 ],
//   [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ]
// ]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-grid-iterators,
  title = "@thi.ng/grid-iterators",
  author = "Karsten Schmidt",
  note = "https://thi.ng/grid-iterators",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
