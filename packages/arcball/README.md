<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/arcball](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-arcball.svg?57164613)

[![npm version](https://img.shields.io/npm/v/@thi.ng/arcball.svg)](https://www.npmjs.com/package/@thi.ng/arcball)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/arcball.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]

> This is one of 216 standalone projects. LLM-free, human-made and
> cared for software, maintained as part of the
> [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem and
> anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Barcball%5D)

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

Package sizes (brotli'd, pre-treeshake): ESM: 812 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/matrices](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/matrices)
- [@thi.ng/rstream-gestures](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream-gestures)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

The `thi.ng/rstream-gestures` dependency is only needed when using
[`defArcballController()`](https://docs.thi.ng/umbrella/arcball/functions/defArcballController.html).

## Usage examples

Two projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                        | Description                                                       | Live demo                                           | Source                                                                                   |
|:------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:----------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-cube.png" width="240"/> | 3D arcball controller to rotate the camera view of a colored cube | [Demo](https://demo.thi.ng/umbrella/webgl-arcball/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-arcball) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-obj.avif" width="240"/> | Basic 3D OBJ model loading & interactive arcball camera control   | [Demo](https://demo.thi.ng/umbrella/webgl-obj/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-obj)     |

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
