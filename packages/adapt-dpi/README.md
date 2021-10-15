<!-- This file is generated - DO NOT EDIT! -->

# ![adapt-dpi](https://media.thi.ng/umbrella/banners/thing-adapt-dpi.svg?bd63a9f3)

[![npm version](https://img.shields.io/npm/v/@thi.ng/adapt-dpi.svg)](https://www.npmjs.com/package/@thi.ng/adapt-dpi)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/adapt-dpi.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

HDPI canvas adapter / styling utility.

Attempts to determine display pixel density via `window.devicePixelRatio`
(default 1.0) and resizes canvas accordingly. I.e. If DPR != 1.0, attaches
explicit `width` and `height` CSS properties to force canvas to given CSS pixel
size, and resizes canvas pixel buffer itself based on DPR (e.g. 2x size).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Badapt-dpi%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/adapt-dpi
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/adapt-dpi"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const adaptDpi = await import("@thi.ng/adapt-dpi");
```

Package sizes (gzipped, pre-treeshake): ESM: 168 bytes

## Dependencies

None

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                                  | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/>  | Entity Component System w/ 100k 3D particles | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cubemap.jpg" width="240"/> | WebGL cube maps with async texture loading   | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cubemap) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-grid.jpg" width="240"/>    | WebGL instancing, animated grid              | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-grid)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/>    | WebGL MSDF text rendering & particle system  | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/adapt-dpi/)

```ts
import { adaptDPI, isHighDPI } from "@thi.ng/adapt-dpi";

const canvas = document.createElement("canvas");

adaptDPI(canvas, 640, 480);

if (isHighDPI()) {
    // ...
}
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-adapt-dpi,
  title = "@thi.ng/adapt-dpi",
  author = "Karsten Schmidt",
  note = "https://thi.ng/adapt-dpi",
  year = 2015
}
```

## License

&copy; 2015 - 2021 Karsten Schmidt // Apache Software License 2.0
