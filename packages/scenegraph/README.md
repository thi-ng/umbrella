<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/scenegraph](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-scenegraph.svg?2c02f09b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/scenegraph.svg)](https://www.npmjs.com/package/@thi.ng/scenegraph)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/scenegraph.svg)
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
- [Authors](#authors)
- [License](#license)

## About

Extensible 2D/3D scene graph with [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-canvas) support.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bscenegraph%5D)

## Related packages

- [@thi.ng/hdom-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-canvas) - [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom) component wrapper for declarative canvas scenegraphs
- [@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures
- [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup) & related tooling
- [@thi.ng/rdom-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-canvas) - [@thi.ng/rdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom) component wrapper for [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-canvas) and declarative canvas drawing

## Installation

```bash
yarn add @thi.ng/scenegraph
```

ESM import:

```ts
import * as sg from "@thi.ng/scenegraph";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/scenegraph"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const sg = await import("@thi.ng/scenegraph");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.11 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/matrices](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/matrices)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Four projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                  | Description                                             | Live demo                                                 | Source                                                                                         |
|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|:----------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/scenegraph.png" width="240"/>           | 2D scenegraph & shape picking                           | [Demo](https://demo.thi.ng/umbrella/scenegraph/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/scenegraph)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/scenegraph-image.png" width="240"/>     | 2D scenegraph & image map based geometry manipulation   | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/scenegraph-image)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/scenegraph-pan-zoom.avif" width="240"/> | Basic 2D scenegraph example with pan/zoom functionality | [Demo](https://demo.thi.ng/umbrella/scenegraph-pan-zoom/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/scenegraph-pan-zoom) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/shader-graph.jpg" width="240"/>         | Minimal shader graph developed during livestream #2     | [Demo](https://demo.thi.ng/umbrella/shader-graph/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-graph)        |

## API

[Generated API docs](https://docs.thi.ng/umbrella/scenegraph/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-scenegraph,
  title = "@thi.ng/scenegraph",
  author = "Karsten Schmidt",
  note = "https://thi.ng/scenegraph",
  year = 2016
}
```

## License

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
