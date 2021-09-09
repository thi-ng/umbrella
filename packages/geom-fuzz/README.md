<!-- This file is generated - DO NOT EDIT! -->

# ![geom-fuzz](https://media.thi.ng/umbrella/banners/thing-geom-fuzz.svg?87727ec7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-fuzz.svg)](https://www.npmjs.com/package/@thi.ng/geom-fuzz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-fuzz.svg)
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

Highly configurable, fuzzy line & polygon creation with presets and composable fill & stroke styles. Canvas & SVG support. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-fuzz%5D+in%3Atitle)

### Related packages

- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)

## Installation

```bash
yarn add @thi.ng/geom-fuzz
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-fuzz"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const geomFuzz = await import("@thi.ng/geom-fuzz");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.02 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                   | Description                           | Live demo                                              | Source                                                                              |
|:-------------------------------------------------------------------------------------------------------------|:--------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/> | geom-fuzz basic shape & fill examples | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-fuzz/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-fuzz,
  title = "@thi.ng/geom-fuzz",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-fuzz",
  year = 2020
}
```

## License

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
