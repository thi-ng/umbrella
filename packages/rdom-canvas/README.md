<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/rdom-canvas](https://media.thi.ng/umbrella/banners-20220914/thing-rdom-canvas.svg?d17bbfc7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom-canvas.svg)](https://www.npmjs.com/package/@thi.ng/rdom-canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom-canvas.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

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

@thi.ng/rdom component wrapper for @thi.ng/hiccup-canvas and declarative canvas drawing

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brdom-canvas%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/scenegraph](https://github.com/thi-ng/umbrella/tree/develop/packages/scenegraph) - Extensible 2D/3D scene graph with [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) support

## Installation

```bash
yarn add @thi.ng/rdom-canvas
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rdom-canvas"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rdomCanvas = await import("@thi.ng/rdom-canvas");
```

Package sizes (brotli'd, pre-treeshake): ESM: 646 bytes

## Dependencies

- [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/tree/develop/packages/adapt-dpi)
- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                               | Description                                             | Live demo                                               | Source                                                                               |
|:-------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|:--------------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png" width="240"/> | Interactive visualization of closest points on ellipses | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ellipse-proximity) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>    | rdom & hiccup-canvas interop test                       | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom-canvas/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rdom-canvas,
  title = "@thi.ng/rdom-canvas",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rdom-canvas",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache License 2.0
