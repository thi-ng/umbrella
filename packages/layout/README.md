<!-- This file is generated - DO NOT EDIT! -->

# ![layout](https://media.thi.ng/umbrella/banners/thing-layout.svg?e3607d7a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/layout.svg)](https://www.npmjs.com/package/@thi.ng/layout)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/layout.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [GridLayout](#gridlayout)
- [Authors](#authors)
- [License](#license)

## About

Configurable nested 2D grid layout manager.

Currently, this package features only a single grid layout allocator, as
well as more [generic supporting
types](https://github.com/thi-ng/umbrella/tree/develop/packages/layout/src/api.ts)
to define other layout types / implementations.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blayout%5D+in%3Atitle)

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

```text
# with flag only for < v16
node --experimental-repl-await

> const layout = await import("@thi.ng/layout");
```

Package sizes (gzipped, pre-treeshake): ESM: 677 bytes

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                          | Description                                | Live demo                                          | Source                                                                          |
|:--------------------------------------------------------------------------------------------------------------------|:-------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>    | Interactive inverse FFT toy synth          | [Demo](https://demo.thi.ng/umbrella/fft-synth/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>       | Canvas based Immediate Mode GUI components | [Demo](https://demo.thi.ng/umbrella/imgui/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/imgui-basics.png" width="240"/> | Minimal IMGUI usage example                | [Demo](https://demo.thi.ng/umbrella/imgui-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/layout/)

### GridLayout

The `GridLayout` class supports infinite nesting and column/row-based
space allocation, based on an initial configuration and supporting
multiple column/row spans.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/layout/grid-layout.png)

The code producing this structure:

```ts
import { gridLayout } from "@thi.ng/layout";

// create a single column layout @ position 10,10 / 200px wide
// the last values are row height and cell spacing
const layout = gridLayout(10, 10, 200, 1, 16, 4);

// get next layout box (1st row)
// usually you don't need to call .next() manually, but merely pass
// the layout instance to a component...
layout.next();
// { x: 10, y: 10, w: 200, h: 16, cw: 200, ch: 16, gap: 4 }

// 2nd row
layout.next();
// { x: 10, y: 30, w: 200, h: 16, cw: 200, ch: 16, gap: 4 }

// create nested 2-column layout (3rd row)
const twoCols = layout.nest(2);

twoCols.next();
// { x: 10, y: 50, w: 98, h: 16, cw: 98, ch: 16, gap: 4 }

twoCols.next();
// { x: 112, y: 50, w: 98, h: 16, cw: 98, ch: 16, gap: 4 }

// now nest 3-columns in the 1st column of twoCols
// (i.e. now each column is 1/6th of the main layout's width)
const inner = twoCols.nest(3);

// allocate with col/rowspan, here 1 column x 4 rows
inner.next([1, 4])
// { x: 10, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }
inner.next([1, 4])
// { x: 44, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }
inner.next([1, 4])
// { x: 78, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }

// back to twoCols (2nd column)
twoCols.next([1, 2]);
// { x: 112, y: 70, w: 98, h: 36, cw: 98, ch: 16, gap: 4 }
```

## Authors

Karsten Schmidt

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

&copy; 2019 - 2021 Karsten Schmidt // Apache Software License 2.0
