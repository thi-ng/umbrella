<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/wasm-api-webgl](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-wasm-api-webgl.svg?eedcda58)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-webgl.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-webgl.svg)
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

WebGL bridge API for hybrid TypeScript & WASM (Zig) applications. This is a support package for [@thi.ng/wasm-api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/wasm-api). It's also closely aligned with and directly interacts with
[@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bwasm-api-webgl%5D)

## Related packages

- [@thi.ng/wasm-api-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/wasm-api-canvas) - HTML Canvas2D bridge API for hybrid TypeScript & WASM (Zig) applications
- [@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/wasm-api-webgl
```

ESM import:

```ts
import * as waw from "@thi.ng/wasm-api-webgl";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/wasm-api-webgl"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 2.29 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/wasm-api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/wasm-api)
- [@thi.ng/wasm-api-dom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/wasm-api-dom)
- [@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                                | Description                      | Live demo                                       | Source                                                                        |
|:--------------------------------------------------------------------------------------------------------------------------|:---------------------------------|:------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/zig-webgl.avif" width="240"/> | Basic Zig/WebAssembly WebGL demo | [Demo](https://demo.thi.ng/umbrella/zig-webgl/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/zig-webgl) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-webgl/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-webgl,
  title = "@thi.ng/wasm-api-webgl",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api-webgl",
  year = 2024
}
```

## License

&copy; 2024 - 2026 Karsten Schmidt // Apache License 2.0
