<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-webgl](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-geom-webgl.svg?536e2cfd)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-webgl.svg)](https://www.npmjs.com/package/@thi.ng/geom-webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-webgl.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
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

WebGL geometry/shape conversion & interop.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-webgl%5D+in%3Atitle)

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

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                    | Description                                                                   | Live demo                                                    | Source                                                                                    |
|:------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:-------------------------------------------------------------|:------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-attrib-pool.jpg" width="240"/> | Augmenting thi.ng/geom shapes for WebGL, using instancing & attribute buffers | [Demo](https://demo.thi.ng/umbrella/geom-webgl-attrib-pool/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-attrib-pool) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-basics.jpg" width="240"/>      | Converting thi.ng/geom shape types for WebGL                                  | [Demo](https://demo.thi.ng/umbrella/geom-webgl-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-basics)      |

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

&copy; 2024 - 2025 Karsten Schmidt // Apache License 2.0
