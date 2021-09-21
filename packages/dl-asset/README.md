<!-- This file is generated - DO NOT EDIT! -->

# ![dl-asset](https://media.thi.ng/umbrella/banners/thing-dl-asset.svg?7d078ea4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dl-asset.svg)](https://www.npmjs.com/package/@thi.ng/dl-asset)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dl-asset.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Local asset download for web apps, with automatic MIME type detection.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdl-asset%5D+in%3Atitle)

### Related packages

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

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const dlAsset = await import("@thi.ng/dl-asset");
```

Package sizes (gzipped, pre-treeshake): ESM: 428 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                           | Description                                                                 | Live demo                                                | Source                                                                                |
|:-------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>               | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export        | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>              | Parser grammar livecoding editor/playground & codegen                       | [Demo](https://demo.thi.ng/umbrella/parse-playground/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                      | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>                  | Interactive grid generator, SVG generation & export, undo/redo support      | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/wolfram.png" width="240"/>                       | 1D Wolfram automata with OBJ point cloud export                             | [Demo](https://demo.thi.ng/umbrella/wolfram/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/wolfram)            |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dl-asset/)

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
import { MIME_TYPES } from "@thi.ng/mime";

download("hello.txt", src, {
    mime: MIME_TYPES.text,
    utf8: true,
    expire: 1000
});
```

## Authors

Karsten Schmidt

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

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
