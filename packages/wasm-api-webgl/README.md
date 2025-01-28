<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/wasm-api-webgl](https://media.thi.ng/umbrella/banners-20230807/thing-wasm-api-webgl.svg?eedcda58)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-webgl.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-webgl.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 201 standalone projects, maintained as part
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

WebGL bridge API for hybrid TypeScript & WASM (Zig) applications. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api). It's also closely aligned with and directly interacts with
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-webgl%5D+in%3Atitle)

## Related packages

- [@thi.ng/wasm-api-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-canvas) - HTML Canvas2D bridge API for hybrid TypeScript & WASM (Zig) applications
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

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

Package sizes (brotli'd, pre-treeshake): ESM: 2.28 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)
- [@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                        | Description                      | Live demo                                       | Source                                                                       |
|:------------------------------------------------------------------------------------------------------------------|:---------------------------------|:------------------------------------------------|:-----------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-webgl.avif" width="240"/> | Basic Zig/WebAssembly WebGL demo | [Demo](https://demo.thi.ng/umbrella/zig-webgl/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-webgl) |

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

&copy; 2024 - 2025 Karsten Schmidt // Apache License 2.0
