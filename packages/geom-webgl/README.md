<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-webgl](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-webgl.svg?536e2cfd)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-webgl.svg)](https://www.npmjs.com/package/@thi.ng/geom-webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-webgl.svg)
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
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

WebGL geometry/shape conversion & interop.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-webgl%5D)

## Installation

```bash
yarn add @thi.ng/geom-webgl
```

ESM import:

```ts
import * as gw from "@thi.ng/geom-webgl";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-webgl"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gw = await import("@thi.ng/geom-webgl");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.19 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/defmulti](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/defmulti)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom)
- [@thi.ng/object-utils](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/object-utils)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/vector-pools](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vector-pools)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)
- [@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                            | Description                                                                   | Live demo                                                    | Source                                                                                            |
|:--------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-webgl-attrib-pool.jpg" width="240"/> | Augmenting thi.ng/geom shapes for WebGL, using instancing & attribute buffers | [Demo](https://demo.thi.ng/umbrella/geom-webgl-attrib-pool/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-webgl-attrib-pool) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-webgl-basics.jpg" width="240"/>      | Converting thi.ng/geom shape types for WebGL                                  | [Demo](https://demo.thi.ng/umbrella/geom-webgl-basics/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-webgl-basics)      |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-webgl/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-webgl,
  title = "@thi.ng/geom-webgl",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-webgl",
  year = 2024
}
```

## License

&copy; 2024 - 2026 Karsten Schmidt // Apache License 2.0
