<!-- This file is generated - DO NOT EDIT! -->

# ![rasterize](https://media.thi.ng/umbrella/banners/thing-rasterize.svg?8a88a1a6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rasterize.svg)](https://www.npmjs.com/package/@thi.ng/rasterize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rasterize.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Circle](#circle)
  - [Line](#line)
  - [Rect](#rect)
  - [Flood fill](#flood-fill)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D shape drawing & rasterization.

The functions in this package can be used with any
[`IGrid2D`](https://docs.thi.ng/umbrella/api/interfaces/IGrid2D.html) compatible
grid/image type (e.g. those provided by
[@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
or
[@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)).

Currently the following functions are available:

### Circle

Filled or outline implementation of [Bresenham's circle
algorithm](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm). A clipping
check is pre-applied to see if the circle lies entirely outside the target grid.

### Line

Implementation of [Bresenham's line
algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) with
pre-applied [Liang-Barsky
clipping](https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm). The
higher-order function
[`drawLineWith()`](https://docs.thi.ng/umbrella/rasterize/modules.html#drawLineWith)
can be used to apply custom brushes to trace the line.

### Rect

Filled or outline implementation with pre-applied clipping against the target grid.

### Flood fill

Fills grid in the connected region around `x,y` with given value or pattern. See
[`floodFill()` in the @thi.ng/grid-iterators
package](https://docs.thi.ng/umbrella/grid-iterators/modules.html#floodFill) for
further details.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brasterize%5D+in%3Atitle)

### Related packages

- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators) - 2D grid and shape iterators w/ multiple orderings
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution
- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas) - Text based canvas, drawing, tables with arbitrary formatting (incl. ANSI/HTML)

## Installation

```bash
yarn add @thi.ng/rasterize
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rasterize"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const rasterize = await import("@thi.ng/rasterize");
```

Package sizes (gzipped, pre-treeshake): ESM: 669 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rasterize/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rasterize,
  title = "@thi.ng/rasterize",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rasterize",
  year = 2021
}
```

## License

&copy; 2021 Karsten Schmidt // Apache Software License 2.0
