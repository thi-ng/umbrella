<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/layout](https://media.thi.ng/umbrella/banners-20230807/thing-layout.svg?4984f585)

[![npm version](https://img.shields.io/npm/v/@thi.ng/layout.svg)](https://www.npmjs.com/package/@thi.ng/layout)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/layout.svg)
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
  - [GridLayout](#gridlayout)
  - [StackedLayout](#stackedlayout)
- [Authors](#authors)
- [License](#license)

## About

Configurable nested 2D grid layout generators.

Currently, this package features two grid layout strategies (each based on
requesting/allocating cells of a desired size), as well as more general
supporting types to define other layout types / implementations using the same
shared API.

A brief overview and comparison of the available strategies is provided further
below.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blayout%5D+in%3Atitle)

## Related packages

- [@thi.ng/imgui](https://github.com/thi-ng/umbrella/tree/develop/packages/imgui) - Immediate mode GUI with flexible state handling & data only shape output

## Installation

```bash
yarn add @thi.ng/layout
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/layout"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const layout = await import("@thi.ng/layout");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.01 KB

## Dependencies

- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                            | Description                                            | Live demo                                            | Source                                                                            |
|:----------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>      | Interactive inverse FFT toy synth                      | [Demo](https://demo.thi.ng/umbrella/fft-synth/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>         | Canvas based Immediate Mode GUI components             | [Demo](https://demo.thi.ng/umbrella/imgui/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/imgui-basics.png" width="240"/>   | Minimal IMGUI usage example                            | [Demo](https://demo.thi.ng/umbrella/imgui-basics/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui-basics)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/layout-gridgen.png" width="240"/> | Randomized space-filling, nested grid layout generator | [Demo](https://demo.thi.ng/umbrella/layout-gridgen/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/layout-gridgen) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/layout/)

### GridLayout

The `GridLayout` class supports infinite nesting and column/row-based
space allocation, based on an initial configuration and supporting
multiple column/row spans.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/layout/readme-grid.png)

The code producing this layout (incl. the visualization itself):

```ts tangle:export/readme-grid.ts
import * as g from "@thi.ng/geom";
import { gridLayout, type LayoutBox } from "@thi.ng/layout";
import { writeFileSync } from "fs";

// collection of generated layout cells
const cells: g.Group[] = [];

const addRect = (id: number, box: LayoutBox, fill: string) => {
    console.log(box);
    const shape = g.rect([box.x, box.y], [box.w, box.h], { fill });
    cells.push(
        g.group({}, [
            shape,
            g.text(g.centroid(shape)!, "#" + id, {
                fill: "black",
                stroke: "none",
            }),
        ])
    );
};

// create a single column layout @ position [10,10], 1000px wide
// the last values are row height and cell spacing
const layout = gridLayout(10, 10, 1000, 1, 60, 4);

// get next layout box (1st row, by default the column/row span is [1,1])
addRect(1, layout.next(), "#fec");
// { x: 10, y: 10, w: 1000, h: 60, cw: 1000, ch: 60, gap: 4, span: [ 1, 1 ] }

// 2nd row
addRect(2, layout.next(), "#fec");
// { x: 10, y: 74, w: 1000, h: 60, cw: 1000, ch: 60, gap: 4, span: [ 1, 1 ] }

// create nested 2-column layout (3rd row)
const twoCols = layout.nest(2);

addRect(3, twoCols.next(), "#cfc");
// { x: 10, y: 138, w: 498, h: 60, cw: 498, ch: 60, gap: 4, span: [ 1, 1 ] }

addRect(4, twoCols.next(), "#cfc");
// { x: 512, y: 138, w: 498, h: 60, cw: 498, ch: 60, gap: 4, span: [ 1, 1 ] }

// now nest 3-columns in the 1st column of twoCols
// (i.e. now each column is 1/6th of the main layout's width)
const inner = twoCols.nest(3);

// allocate with col/rowspan, here 1 column x 4 rows
addRect(5, inner.next([1, 4]), "#9ff");
// { x: 10, y: 202, w: 163.33, h: 252, cw: 163.33, ch: 60, gap: 4, span: [ 1, 4 ] }
addRect(6, inner.next([1, 4]), "#9ff");
// { x: 177.33, y: 202, w: 163.33, h: 252, cw: 163.33, ch: 60, gap: 4, span: [ 1, 4 ] }
addRect(7, inner.next([1, 4]), "#9ff");
// { x: 344.66, y: 202, w: 163.33, h: 252, cw: 163.33, ch: 60, gap: 4, span: [ 1, 4 ] }

// back to twoCols (2nd column)
addRect(8, twoCols.next([1, 2]), "#cfc");
// { x: 512, y: 202, w: 498, h: 124, cw: 498, ch: 60, gap: 4, span: [ 1, 2 ] }

// export as SVG
writeFileSync(
    "export/readme-grid.svg",
    g.asSvg(
        g.svgDoc(
            {
                __bleed: 10,
                font: "12px Menlo, monospace",
                align: "center",
                baseline: "middle",
            },
            ...cells
        )
    )
);
```

### StackedLayout

An extension of [GridLayout](#gridlayout) which tracks individual column-based
heights and so can create more complex, irregular, packed, space-filling layout
arrangements. This layout algorithm prioritizes the column(s) with the lowest
height.

This class also provides a
[`.availableSpan()`](https://docs.thi.ng/umbrella/layout/classes/StackedLayout.html#availableSpan)
method to find available space and help equalize columns and fill/allocate any
bottom gaps.

IMPORTANT: As with GridLayout, nested layouts **MUST** be completed first before
requesting new cells (aka `LayoutBoxes`) from a parent, otherwise unintended
overlaps will occur.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/layout/readme-stacked.png)

The code producing this layout (incl. the visualization itself):

```ts tangle:export/readme-stacked.ts
import * as g from "@thi.ng/geom";
import { stackedLayout, type LayoutBox } from "@thi.ng/layout";
import { writeFileSync } from "fs";

// collection of generated layout cells
const cells: g.Group[] = [];

const addRect = (id: number, box: LayoutBox, fill: string) => {
    console.log(box);
    const shape = g.rect([box.x, box.y], [box.w, box.h], { fill });
    cells.push(
        g.group({}, [
            shape,
            g.text(g.centroid(shape)!, "#" + id, {
                fill: "black",
                stroke: "none",
            }),
        ])
    );
};

// create a 4-column layout @ position [0,0], 1000px wide
// the last values are row height and cell spacing
const layout = stackedLayout(0, 0, 1000, 4, 60, 4);

// get next layout box (1st column)
addRect(1, layout.next([1, 2]), "#fec");
// { x: 0, y: 0, w: 247, h: 124, cw: 247, ch: 60, gap: 4, span: [ 1, 2 ] }

// 2nd column
addRect(2, layout.next(), "#fec");
// { x: 251, y: 0, w: 247, h: 60, cw: 247, ch: 60, gap: 4, span: [ 1, 1 ] }

// 3rd column
addRect(3, layout.next([1, 4]), "#fec");
// { x: 502, y: 0, w: 247, h: 252, cw: 247, ch: 60, gap: 4, span: [ 1, 4 ] }

// 4th column
addRect(4, layout.next([1, 1]), "#fec");
// { x: 753, y: 0, w: 247, h: 60, cw: 247, ch: 60, gap: 4, span: [ 1, 1 ] }

// 2x2 span
// (note that this will create a gap in the 2nd column)
addRect(5, layout.next([2, 2]), "#fec");
// { x: 0, y: 128, w: 498, h: 124, cw: 247, ch: 60, gap: 4, span: [ 2, 2 ] }

const inner = layout.nest(2);

addRect(6, inner.next([1, 5]), "#cfc");
// { x: 753, y: 64, w: 121.5, h: 316, cw: 121.5, ch: 60, gap: 4, span: [ 1, 5 ] }
addRect(7, inner.next([1, 5]), "#cfc");
// { x: 878.5, y: 64, w: 121.5, h: 316, cw: 121.5, ch: 60, gap: 4, span: [ 1, 5 ] }

// fill available space in the other columns
// (depending on situation, this might have to be done multiple times
// to fill all available space, please consult documentation)
addRect(8, layout.next(layout.availableSpan()), "#9ff");
// { x: 0, y: 256, w: 749, h: 124, cw: 247, ch: 60, gap: 4, span: [ 3, 2 ] }

// export as SVG
writeFileSync(
    "export/readme-stacked.svg",
    g.asSvg(
        g.svgDoc(
            {
                __bleed: 10,
                font: "12px Menlo, monospace",
                align: "center",
                baseline: "middle",
            },
            ...cells
        )
    )
);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-layout,
  title = "@thi.ng/layout",
  author = "Karsten Schmidt",
  note = "https://thi.ng/layout",
  year = 2019
}
```

## License

&copy; 2019 - 2023 Karsten Schmidt // Apache License 2.0
