<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/wasm-api-canvas](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-wasm-api-canvas.svg?91454960)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-canvas.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-canvas.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Zig bindings](#zig-bindings)
  - [Minimal example](#minimal-example)
  - [HDPI support](#hdpi-support)
- [Authors](#authors)
- [License](#license)

## About

HTML Canvas2D bridge API for hybrid TypeScript & WASM (Zig) applications. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api).

This package already covers ~80-90% of the HTML Canvas2D features and provides
some additional drawing utilities to minimize boilerplate & WASM/JS cross-calling.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-canvas%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-canvas
```

ESM import:

```ts
import * as wac from "@thi.ng/wasm-api-canvas";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/wasm-api-canvas"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 2.62 KB

## Dependencies

- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)
- [@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                          | Description                                   | Live demo                                          | Source                                                                          |
|:--------------------------------------------------------------------------------------------------------------------|:----------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-cellular.jpg" width="240"/> | Zig-based 2D multi-behavior cellular automata | [Demo](https://demo.thi.ng/umbrella/zig-cellular/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-cellular) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-canvas/)

### Zig bindings

- [api.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-canvas/zig/api.zig)
- [lib.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-canvas/zig/lib.zig)

### Minimal example

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/wasm-api-canvas/readme.png)

```zig
const canvas2d = @import("wasm-api-canvas");
const dom = @import("wasm-api-dom");

// ...

// create canvas element and attached to document.body
const canvas = dom.createCanvas(&.{
    .width = 320,
    .height = 320,
    .parent = dom.body,
    // can be customized for HDPI screens (aka window.devicePixelRatio)
    // see readme section below
    .dpr = 1,
    .index = 0,
});

// start using this canvas
canvas2d.beginCtx(canvas);

// set fill color (any CSS color)
canvas2d.setFill("#f0f");

// draw a triangle
canvas2d.beginPath();
canvas2d.moveTo(250, 50);
canvas2d.lineTo(150, 250);
canvas2d.lineTo(50, 100);
canvas2d.fill();

// (could also be shortened via this helper:)
// canvas2d.polyline(&.{ .{ 250, 50 }, .{ 150, 250 }, .{ 50, 100 } }, true);

// pre-define gradient
const gradient = canvas2d.createLinearGradient(0, 0, 0, 100, &.{
    .{ .pos = 0.0, .color = "#ff0" },
    .{ .pos = 1.0, .color = "#0ff" },
});
// use gradient as fill color
canvas2d.setGradientFill(gradient);

// configure & draw text
canvas2d.setFont("100px Menlo");
canvas2d.setTextBaseline(.top);
canvas2d.fillText("HELLO", 10, 10, 0);

// create a bitmap pattern (ABGR pixel format)
const pixels = [4]u32{ 0xff000000, 0, 0, 0xff000000 };
const pattern = canvas2d.createPattern(&pixels, 2, 2, .repeat);
// use pattern as fill color
canvas2d.setPatternFill(pattern);
canvas2d.fillText("WORLD", 10, 120, 0);
```

### HDPI support

By default, canvas elements are created with a `dpr` (aka
`window.devicePixelRatio`) of 1. Use `dom.getWindowInfo()` prior to creating the
canvas to obtain the actual device pixel ratio and adapt the canvas to it.

```zig
const canvas2d = @import("wasm-api-canvas");
const dom = @import("wasm-api-dom");

var window: dom.WindowInfo = undefined;
dom.getWindowInfo(&window);

// create full-window canvas element with correct DPR
const canvas = dom.createCanvas(&.{
    .width = window.innerWidth,
    .height = window.innerHeight,
    .dpr = window.dpr,
    .parent = dom.body,
});
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-canvas,
  title = "@thi.ng/wasm-api-canvas",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api-canvas",
  year = 2022
}
```

## License

&copy; 2022 - 2025 Karsten Schmidt // Apache License 2.0
