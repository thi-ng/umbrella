<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/canvas](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-canvas.svg?4b51249a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/canvas.svg)](https://www.npmjs.com/package/@thi.ng/canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/canvas.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Canvas creation & HDPI support helpers.

This package provides small frequently used helpers for HTML Canvas 2D creation
& resizing:

- [`adaptiveCanvas2d()`](https://docs.thi.ng/umbrella/canvas/functions/adaptiveCanvas2d.html)
- [`canvas2d()`](https://docs.thi.ng/umbrella/canvas/functions/canvas2d.html)
- [`pixelCanvas2d()`](https://docs.thi.ng/umbrella/canvas/functions/pixelCanvas2d.html)
- [`adaptDPI()`](https://docs.thi.ng/umbrella/canvas/functions/adaptDPI.html)
- [`isHighDPI()`](https://docs.thi.ng/umbrella/canvas/functions/isHighDPI.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bcanvas%5D)

Note: Some functions were previously part of the
[thi.ng/adapt-dpi](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/adapt-dpi)
and
[thi.ng/pixel](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/pixel)
packages, but have been migrated to this package for better/smaller re-use...

## Installation

```bash
yarn add @thi.ng/canvas
```

ESM import:

```ts
import * as can from "@thi.ng/canvas";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/canvas"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 403 bytes

## Dependencies

None

## Usage examples

28 projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                  | Description                                                                                  | Live demo                                                  | Source                                                                                          |
|:----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:------------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/blurhash.jpg" width="240"/>             | Interactive & reactive image blurhash generator                                              | [Demo](https://demo.thi.ng/umbrella/blurhash/)             | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/blurhash)             |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/calibration-sheet.avif" width="240"/>   | Parametrically design calibration sheet for B&W photography                                  | [Demo](https://demo.thi.ng/umbrella/calibration-sheet/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/calibration-sheet)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/canvas-recorder.png" width="240"/>      | Self-modifying, animated typographic grid with emergent complex patterns                     | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/canvas-recorder)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/geom-classify-point.png" width="240"/>  | Polygon point classification (inside/boundary/outside)                                       | [Demo](https://demo.thi.ng/umbrella/geom-classify-point/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-classify-point)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/geom-complex-poly.png" width="240"/>    | Shape conversions & operations using polygons with holes                                     | [Demo](https://demo.thi.ng/umbrella/geom-complex-poly/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-complex-poly)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/geom-extra-hiccup.jpg" width="240"/>    | Embedding thi.ng/hiccup data/elements in thi.ng/geom shape hierarchies                       | [Demo](https://demo.thi.ng/umbrella/geom-extra-hiccup/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-extra-hiccup)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/geom/geom-fuzz.png" width="240"/>                | geom-fuzz basic shape & fill examples                                                        | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-fuzz-basics)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/geom-unique-edges.png" width="240"/>    | Iterating the unique edges of a tessellation                                                 | [Demo](https://demo.thi.ng/umbrella/geom-unique-edges/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-unique-edges)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/grid-iterators.png" width="240"/>       | Visualization of different grid iterator strategies                                          | [Demo](https://demo.thi.ng/umbrella/grid-iterators/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/grid-iterators)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/hiccup-canvas-basics.png" width="240"/> | Basic hiccup-based canvas drawing                                                            | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-basics/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hiccup-canvas-basics) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/ifs-fractal.jpg" width="240"/>          | Barnsley fern IFS fractal renderer                                                           | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/ifs-fractal)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/optical-flow.avif" width="240"/>        | Optical flow analysis of web cam or video inputs                                             | [Demo](https://demo.thi.ng/umbrella/optical-flow/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/optical-flow)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/pixel/pixel-basics.png" width="240"/>            | Pixel buffer manipulations                                                                   | [Demo](https://demo.thi.ng/umbrella/pixel-basics/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-basics)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/pixel-dither.jpg" width="240"/>         | Showcase of various dithering algorithms                                                     | [Demo](https://demo.thi.ng/umbrella/pixel-dither/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-dither)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/pixel-indexed.jpg" width="240"/>        | Image dithering and remapping using indexed palettes                                         | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-indexed)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/pixel-normal-map.jpg" width="240"/>     | Normal map creation/conversion basics                                                        | [Demo](https://demo.thi.ng/umbrella/pixel-normal-map/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-normal-map)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/pixel-waveform.jpg" width="240"/>       | RGB waveform image analysis                                                                  | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-waveform)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/poly-subdiv.jpg" width="240"/>          | Animated, iterative polygon subdivisions & visualization                                     | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poly-subdiv)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/porter-duff/porter-duff2.png" width="240"/>      | Port-Duff image compositing / alpha blending                                                 | [Demo](https://demo.thi.ng/umbrella/porter-duff/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/porter-duff)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/rasterize-blend.jpg" width="240"/>      | Steering behavior drawing with alpha-blended shapes                                          | [Demo](https://demo.thi.ng/umbrella/rasterize-blend/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rasterize-blend)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/scenegraph-pan-zoom.avif" width="240"/> | Basic 2D scenegraph example with pan/zoom functionality                                      | [Demo](https://demo.thi.ng/umbrella/scenegraph-pan-zoom/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/scenegraph-pan-zoom)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/soa-ecs-100k.png" width="240"/>         | Entity Component System w/ 100k 3D particles                                                 | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)              | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/soa-ecs)              |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/unbiased-normals.png" width="240"/>     | Visual comparison of biased vs. unbiased normal vectors projected on the surface of a sphere | [Demo](https://demo.thi.ng/umbrella/unbiased-normals/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/unbiased-normals)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-cubemap.jpg" width="240"/>        | WebGL cube maps with async texture loading                                                   | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-cubemap)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-grid.jpg" width="240"/>           | WebGL instancing, animated grid                                                              | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-grid)           |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-msdf.jpg" width="240"/>           | WebGL MSDF text rendering & particle system                                                  | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-msdf)           |
|                                                                                                                             | Minimal multi-pass / GPGPU example                                                           | [Demo](https://demo.thi.ng/umbrella/webgl-multipass/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-multipass)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-texture-paint.jpg" width="240"/>  | Interactively drawing to & reading from a WebGL offscreen render texture                     | [Demo](https://demo.thi.ng/umbrella/webgl-texture-paint/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-texture-paint)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/canvas/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-canvas,
  title = "@thi.ng/canvas",
  author = "Karsten Schmidt",
  note = "https://thi.ng/canvas",
  year = 2023
}
```

## License

&copy; 2023 - 2026 Karsten Schmidt // Apache License 2.0
