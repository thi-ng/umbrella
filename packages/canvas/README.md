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

# ![@thi.ng/canvas](https://media.thi.ng/umbrella/banners-20230807/thing-canvas.svg?d06dff79)

[![npm version](https://img.shields.io/npm/v/@thi.ng/canvas.svg)](https://www.npmjs.com/package/@thi.ng/canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/canvas.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcanvas%5D+in%3Atitle)

Note: Some functions were previously part of the
[thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/blob/develop/packages/adapt-dpi)
and
[thi.ng/pixel](https://github.com/thi-ng/umbrella/blob/develop/packages/pixel)
packages, but have been migrated to this package for better/smaller re-use...

## Installation

```bash
yarn add @thi.ng/canvas
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/canvas"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const canvas = await import("@thi.ng/canvas");
```

Package sizes (brotli'd, pre-treeshake): ESM: 348 bytes

## Dependencies

None

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                  | Description                                                                                  | Live demo                                                  | Source                                                                                  |
|:----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>             | Interactive & reactive image blurhash generator                                              | [Demo](https://demo.thi.ng/umbrella/blurhash/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>      | Self-modifying, animated typographic grid with emergent complex patterns                     | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/>                | geom-fuzz basic shape & fill examples                                                        | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/grid-iterators.png" width="240"/>       | Visualization of different grid iterator strategies                                          | [Demo](https://demo.thi.ng/umbrella/grid-iterators/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/grid-iterators)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-basics.png" width="240"/> | Basic hiccup-based canvas drawing                                                            | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ifs-fractal.jpg" width="240"/>          | Barnsley fern IFS fractal renderer                                                           | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ifs-fractal)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/pixel-basics.png" width="240"/>            | Pixel buffer manipulations                                                                   | [Demo](https://demo.thi.ng/umbrella/pixel-basics/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-basics)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-dither.jpg" width="240"/>         | Showcase of various dithering algorithms                                                     | [Demo](https://demo.thi.ng/umbrella/pixel-dither/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-dither)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-indexed.jpg" width="240"/>        | Image dithering and remapping using indexed palettes                                         | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-indexed)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-normal-map.jpg" width="240"/>     | Normal map creation/conversion basics                                                        | [Demo](https://demo.thi.ng/umbrella/pixel-normal-map/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-normal-map)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-waveform.jpg" width="240"/>       | RGB waveform image analysis                                                                  | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-waveform)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff/porter-duff2.png" width="240"/>      | Port-Duff image compositing / alpha blending                                                 | [Demo](https://demo.thi.ng/umbrella/porter-duff/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/porter-duff)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rasterize-blend.jpg" width="240"/>      | Steering behavior drawing with alpha-blended shapes                                          | [Demo](https://demo.thi.ng/umbrella/rasterize-blend/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rasterize-blend)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/>         | Entity Component System w/ 100k 3D particles                                                 | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)              |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/unbiased-normals.png" width="240"/>     | Visual comparison of biased vs. unbiased normal vectors projected on the surface of a sphere | [Demo](https://demo.thi.ng/umbrella/unbiased-normals/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/unbiased-normals)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cubemap.jpg" width="240"/>        | WebGL cube maps with async texture loading                                                   | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cubemap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-grid.jpg" width="240"/>           | WebGL instancing, animated grid                                                              | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-grid)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/>           | WebGL MSDF text rendering & particle system                                                  | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf)           |
|                                                                                                                             | Minimal multi-pass / GPGPU example                                                           | [Demo](https://demo.thi.ng/umbrella/webgl-multipass/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-multipass)      |

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

&copy; 2023 - 2024 Karsten Schmidt // Apache License 2.0
