<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dl-asset](https://media.thi.ng/umbrella/banners-20230807/thing-dl-asset.svg?4cb6b47d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dl-asset.svg)](https://www.npmjs.com/package/@thi.ng/dl-asset)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dl-asset.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdl-asset%5D+in%3Atitle)

## Related packages

- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime) - 650+ file extension to MIME type mappings, based on mime-db

## Installation

```bash
yarn add @thi.ng/dl-asset
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dl-asset"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const dlAsset = await import("@thi.ng/dl-asset");
```

Package sizes (brotli'd, pre-treeshake): ESM: 576 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                           | Description                                                                    | Live demo                                                 | Source                                                                                 |
|:-------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>               | Self-modifying, animated typographic grid with emergent complex patterns       | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>                  | Probabilistic color theme generator                                            | [Demo](https://demo.thi.ng/umbrella/color-themes/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>               | Color palette generation via dominant color extraction from uploaded images    | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/>                  | Fiber-based cooperative multitasking basics                                    | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-terrain-viz.jpg" width="240"/>              | 2.5D hidden line visualization of digital elevation files (DEM)                | [Demo](https://demo.thi.ng/umbrella/geom-terrain-viz/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-terrain-viz)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ifs-fractal.jpg" width="240"/>                   | Barnsley fern IFS fractal renderer                                             | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ifs-fractal)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg" width="240"/>                    | Worker based, interactive Mandelbrot visualization                             | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>              | Parser grammar livecoding editor/playground & codegen                          | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/>               | Randomized 4-point 2D color gradient image generator                           | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-geom.jpg" width="240"/>                | Live coding playground for 2D geometry generation using @thi.ng/pointfree-lang | [Demo](https://demo.thi.ng/umbrella/pointfree-geom/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-geom)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/render-audio.png" width="240"/>                  | Generative audio synth offline renderer and WAV file export                    | [Demo](https://demo.thi.ng/umbrella/render-audio/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/render-audio)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                         | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>                  | Interactive grid generator, SVG generation & export, undo/redo support         | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>                  | Multi-layer vectorization & dithering of bitmap images                         | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/>           | rdom & WebGL-based image channel editor                                        | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/wolfram.png" width="240"/>                       | 1D Wolfram automata with OBJ point cloud export                                | [Demo](https://demo.thi.ng/umbrella/wolfram/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/wolfram)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-canvas.png" width="240"/>                    | Zig-based DOM creation & canvas drawing app                                    | [Demo](https://demo.thi.ng/umbrella/zig-canvas/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas)          |

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
[@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime).

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

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
