<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

TODO

<!-- include ../../assets/tpl/footer.md -->
