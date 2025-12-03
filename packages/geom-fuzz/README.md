<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-fuzz](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-geom-fuzz.svg?45938d4b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-fuzz.svg)](https://www.npmjs.com/package/@thi.ng/geom-fuzz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-fuzz.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
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
- [Authors](#authors)
- [License](#license)

## About

Highly configurable, fuzzy line & polygon creation with presets and composable fill & stroke styles. Canvas & SVG support. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-fuzz%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling

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

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                   | Description                           | Live demo                                              | Source                                                                              |
|:-------------------------------------------------------------------------------------------------------------|:--------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/> | geom-fuzz basic shape & fill examples | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics) |

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

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
