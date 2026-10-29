<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-mesh](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-mesh.svg?f7a50177)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-mesh.svg)](https://www.npmjs.com/package/@thi.ng/geom-mesh)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-mesh.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]

> This is one of 218 standalone projects. LLM-free, human-made and
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

Mesh data structures with support for incremental construction, spatial indexing, conversion/serialization for thi.ng/webgl.

**Note:** The current `IndexedMesh` implementation should be considered an
interim solution until the update of the full implementation of the Radial-Edge
Mesh datastructure is complete.

Like `IndexedMesh`, the latter will also support:

- user-defined attributes for points, vertices, edges, faces
- WebGL conversion

Additionally:

- comprehensive mesh navigation from any entity
- mesh editing ops (e.g. split/join vertices/edges/faces)
- subdivision schemes

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-mesh%5D)

## Installation

```bash
yarn add @thi.ng/geom-mesh
```

ESM import:

```ts
import * as gm from "@thi.ng/geom-mesh";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-mesh"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gm = await import("@thi.ng/geom-mesh");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.72 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/binary)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/geom-accel](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-accel)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)
- [@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                         | Description                                                    | Live demo                                        | Source                                                                                |
|:-------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------|:-------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-mesh.avif" width="240"/> | Basic thi.ng/geom-mesh creation and conversion from OBJ import | [Demo](https://demo.thi.ng/umbrella/webgl-mesh/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-mesh) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-mesh/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-mesh,
  title = "@thi.ng/geom-mesh",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-mesh",
  year = 2023
}
```

## License

&copy; 2023 - 2026 Karsten Schmidt // Apache License 2.0
