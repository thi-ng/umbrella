<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dl-asset](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-dl-asset.svg?ded4384a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dl-asset.svg)](https://www.npmjs.com/package/@thi.ng/dl-asset)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dl-asset.svg)
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
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Simplified canvas downloads](#simplified-canvas-downloads)
- [Authors](#authors)
- [License](#license)

## About

Canvas, video recording & file asset download helpers for web apps.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bdl-asset%5D)

## Related packages

- [@thi.ng/mime](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/mime) - 650+ file extension to MIME type mappings, based on mime-db

## Installation

```bash
yarn add @thi.ng/dl-asset
```

ESM import:

```ts
import * as dl from "@thi.ng/dl-asset";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/dl-asset"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 576 bytes

## Dependencies

- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/mime](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/mime)

## Usage examples

18 projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                                   | Description                                                                    | Live demo                                                 | Source                                                                                  |
|:---------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:----------------------------------------------------------|:----------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/canvas-recorder.png" width="240"/>               | Self-modifying, animated typographic grid with emergent complex patterns       | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/canvas-recorder)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/color-themes.png" width="240"/>                  | Probabilistic color theme generator                                            | [Demo](https://demo.thi.ng/umbrella/color-themes/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/color-themes)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/dominant-colors.png" width="240"/>               | Color palette generation via dominant color extraction from uploaded images    | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/dominant-colors)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/fiber-basics.png" width="240"/>                  | Fiber-based cooperative multitasking basics                                    | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/fiber-basics)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-terrain-viz.jpg" width="240"/>              | 2.5D hidden line visualization of digital elevation files (DEM)                | [Demo](https://demo.thi.ng/umbrella/geom-terrain-viz/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-terrain-viz)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-shapes)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/ifs-fractal.jpg" width="240"/>                   | Barnsley fern IFS fractal renderer                                             | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/ifs-fractal)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/mandelbrot.jpg" width="240"/>                    | Worker based, interactive Mandelbrot visualization                             | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/mandelbrot)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/parse-playground.png" width="240"/>              | Parser grammar livecoding editor/playground & codegen                          | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/parse-playground)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/pixel-gradients.jpg" width="240"/>               | Randomized 4-point 2D color gradient image generator                           | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-gradients)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/pointfree-geom.jpg" width="240"/>                | Live coding playground for 2D geometry generation using @thi.ng/pointfree-lang | [Demo](https://demo.thi.ng/umbrella/pointfree-geom/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pointfree-geom)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/render-audio.png" width="240"/>                  | Generative audio synth offline renderer and WAV file export                    | [Demo](https://demo.thi.ng/umbrella/render-audio/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/render-audio)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                         | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rotating-voronoi)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rstream-grid.jpg" width="240"/>                  | Interactive grid generator, SVG generation & export, undo/redo support         | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-grid)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/trace-bitmap.jpg" width="240"/>                  | Multi-layer vectorization & dithering of bitmap images                         | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/trace-bitmap)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/>           | rdom & WebGL-based image channel editor                                        | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-channel-mixer) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/wolfram.png" width="240"/>                       | 1D Wolfram automata with OBJ point cloud export                                | [Demo](https://demo.thi.ng/umbrella/wolfram/)             | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/wolfram)             |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/zig-canvas.png" width="240"/>                    | Zig-based DOM creation & canvas drawing app                                    | [Demo](https://demo.thi.ng/umbrella/zig-canvas/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/zig-canvas)          |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dl-asset/)

### Basic usage

```ts
import { download } from "@thi.ng/dl-asset";

const src = "Hellö wörld!";

// mime type derived from file extension (.txt)
download("hello.txt", src, {
    utf8: true,
    expire: 1000
});

// with explicit MIME type string
download("hello.txt", src, {
    mime: "text/plain",
    utf8: true,
    expire: 1000
});
```

...or using MIME type preset from
[@thi.ng/mime](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/mime).

```ts
import { preferredType } from "@thi.ng/mime";

downloadWithMime("hello.txt", src, {
    // here mandatory to provide MIME type
    mime: preferredType("txt"), // text/plain
    utf8: true,
    expire: 1000
});
```

### Simplified canvas downloads

Since v2.1.0, HTML canvas downloads can be simplified using
[`downloadCanvas()`](https://docs.thi.ng/umbrella/dl-asset/functions/downloadCanvas.html):

```ts
import { downloadCanvas } from "@thi.ng/dl-asset";

// download as PNG (default)
downloadCanvas(canvas, "file-name-without-ext");

// download as JPG or WebP with given quality
downloadCanvas(canvas, "file-name-without-ext", "jpeg", 0.9);

downloadCanvas(canvas, "file-name-without-ext", "webp", 0.9);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dl-asset,
  title = "@thi.ng/dl-asset",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dl-asset",
  year = 2020
}
```

## License

&copy; 2020 - 2026 Karsten Schmidt // Apache License 2.0
