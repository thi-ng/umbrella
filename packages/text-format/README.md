<!-- This file is generated - DO NOT EDIT! -->

# ![text-format](https://media.thi.ng/umbrella/banners/thing-text-format.svg?10f2b35d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/text-format.svg)](https://www.npmjs.com/package/@thi.ng/text-format)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/text-format.svg)
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

Customizable color text formatting with presets for ANSI & HTML.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btext-format%5D+in%3Atitle)

### Related packages

- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas) - Text based canvas, drawing, tables with arbitrary formatting (incl. ANSI/HTML)

## Installation

```bash
yarn add @thi.ng/text-format
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/text-format"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const textFormat = await import("@thi.ng/text-format");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.46 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/develop/packages/memoize)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                               | Description                                  | Live demo                                               | Source                                                                               |
|:-------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:--------------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>       | 3D wireframe textmode demo                   | [Demo](https://demo.thi.ng/umbrella/text-canvas/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas-image.png" width="240"/> | Textmode image warping w/ 16bit color output | [Demo](https://demo.thi.ng/umbrella/text-canvas-image/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas-image) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/text-format/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-text-format,
  title = "@thi.ng/text-format",
  author = "Karsten Schmidt",
  note = "https://thi.ng/text-format",
  year = 2020
}
```

## License

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
