<!-- This file is generated - DO NOT EDIT! -->

# ![rasterize](https://media.thi.ng/umbrella/banners-20220914/thing-rasterize.svg?75411efe)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rasterize.svg)](https://www.npmjs.com/package/@thi.ng/rasterize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rasterize.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Circle](#circle)
  - [Line](#line)
  - [Polygon / polyline](#polygon--polyline)
  - [Rect](#rect)
  - [Flood fill](#flood-fill)
- [Custom shaders](#custom-shaders)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
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

Currently the following functions are available. All of them support [custom
shader-like](#custom-shaders) functions to produce "pixel" values.

### Circle

- [`drawCircle()`](https://docs.thi.ng/umbrella/rasterize/modules.html#drawCircle):
  Filled or outline implementation of [Bresenham's circle
  algorithm](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm), with
  clipping.

### Line

- [`drawLine()`](https://docs.thi.ng/umbrella/rasterize/modules.html#drawLine):
  Implementation of [Bresenham's line
  algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) with
  pre-applied [Liang-Barsky
  clipping](https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm)
- [`traceLine()`](https://docs.thi.ng/umbrella/rasterize/modules.html#traceLine):
  Apply custom functions to trace the line

### Polygon / polyline

Filled or outline drawing of polygons (without holes):

- [`drawPolyline()`](https://docs.thi.ng/umbrella/rasterize/modules.html#drawPolyline)
- [`fillPoly()`](https://docs.thi.ng/umbrella/rasterize/modules.html#fillPoly)

### Rect

- [`drawRect()`](https://docs.thi.ng/umbrella/rasterize/modules.html#drawRect):
  Filled or outline implementation with pre-applied clipping against the target
  grid.

### Flood fill

- [`floodFill()`](https://docs.thi.ng/umbrella/rasterize/modules.html#floodFill):
  Fills grid in the connected region around `x,y` with given value or shader

Also see corresponding function in
[@thi.ng/grid-iterators](https://docs.thi.ng/umbrella/grid-iterators/modules.html#floodFill).

## Custom shaders

Conceptually similar, but **not** to be equaled with actual WebGL fragement
shaders, many functions in this package support shader-like functions to produce
per-pixel fill/color values for each individual pixel processed. These simple
functions take an `x` and `y` arg (in grid-space, **not** normalized!) and
produce a fill value for that location. A pixel is processed at most once per
draw call.

The following shader functions are provided:

- [`defPattern()`](https://docs.thi.ng/umbrella/rasterize/modules.html#defPattern):
  pattern fill (must be same format as target grid)
- [`defStripes()`](https://docs.thi.ng/umbrella/rasterize/modules.html#defStripes):
  procedural stripes (configurable)
- [`defNoise()`](https://docs.thi.ng/umbrella/rasterize/modules.html#defNoise):
  random noise pattern (configurable)

As an example, here's a simple custom UV gradient shader for drawing into a
[float RGBA](https://docs.thi.ng/umbrella/pixel/modules.html#floatBuffer)
buffer:

```ts
import type { Shader2D } from "@thi.ng/rasterize";
import { floatBuffer } from "@thi.ng/pixel";
import { drawCircle } from "@thi.ng/rasterize";

// custom gradient shader
const defUVGradient = (width: number, height: number): Shader2D<number[]> =>
  (x, y) => [x/width, y/height, 0.5, 1];

const W = 256;

// create float RGBA pixel buffer
const img = floatBuffer(W, W);

// draw filled circle using gradient shader
drawCircle(img, W/2, W/2, W/2 - 4, defUVGradient(W, W), true);
```

![result image: circle with gradient fill](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rasterize/uv-circle.png)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brasterize%5D+in%3Atitle)

## Related packages

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.47 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators)
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                             | Description                                         | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rasterize-blend.jpg" width="240"/> | Steering behavior drawing with alpha-blended shapes | [Demo](https://demo.thi.ng/umbrella/rasterize-blend/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rasterize-blend) |

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

&copy; 2021 - 2022 Karsten Schmidt // Apache Software License 2.0
