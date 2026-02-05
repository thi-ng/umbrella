<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/arcball](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-arcball.svg?57164613)

[![npm version](https://img.shields.io/npm/v/@thi.ng/arcball.svg)](https://www.npmjs.com/package/@thi.ng/arcball)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/arcball.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
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
- [Authors](#authors)
- [License](#license)

## About

3D arcball controller for intuitive click & drag gesture-based camera view rotations. Quaternion-based..

Ported from:
https://github.com/thi-ng/geom/blob/feature/no-org/src/thi/ng/geom/gl/arcball.cljc

Which itself is based on:

"ARCBALL: A User Interface for Specifying Three-Dimensional Orientation Using a Mouse" by Ken Shoemake
https://www.talisman.org/~erlkonig/misc/shoemake92-arcball.pdf

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Barcball%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/arcball
```

ESM import:

```ts
import * as arc from "@thi.ng/arcball";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/arcball"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const arc = await import("@thi.ng/arcball");
```

Package sizes (brotli'd, pre-treeshake): ESM: 659 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                        | Description                                                       | Live demo                                           | Source                                                                           |
|:------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/> | 3D arcball controller to rotate the camera view of a colored cube | [Demo](https://demo.thi.ng/umbrella/webgl-arcball/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-arcball) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/arcball/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-arcball,
  title = "@thi.ng/arcball",
  author = "Karsten Schmidt",
  note = "https://thi.ng/arcball",
  year = 2025
}
```

## License

&copy; 2025 - 2026 Karsten Schmidt // Apache License 2.0
