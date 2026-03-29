<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-fuzz](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-fuzz.svg?45938d4b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-fuzz.svg)](https://www.npmjs.com/package/@thi.ng/geom-fuzz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-fuzz.svg)
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

Highly configurable, fuzzy line & polygon creation with presets and composable fill & stroke styles. Canvas & SVG support. This is a support package for [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom).

![example output](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/geom/geom-fuzz.png)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-fuzz%5D)

## Related packages

- [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup) & related tooling

## Installation

```bash
yarn add @thi.ng/geom-fuzz
```

ESM import:

```ts
import * as gfuzz from "@thi.ng/geom-fuzz";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-fuzz"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gfuzz = await import("@thi.ng/geom-fuzz");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.19 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/color](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/color)
- [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom)
- [@thi.ng/geom-clip-line](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-clip-line)
- [@thi.ng/geom-resample](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-resample)
- [@thi.ng/grid-iterators](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/grid-iterators)
- [@thi.ng/object-utils](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/object-utils)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                           | Live demo                                              | Source                                                                               |
|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------|:-------------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/geom/geom-fuzz.png" width="240"/> | geom-fuzz basic shape & fill examples | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-fuzz-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-fuzz/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2020 - 2026 Karsten Schmidt // Apache License 2.0
