<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/soa](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-soa.svg?15c3f478)

[![npm version](https://img.shields.io/npm/v/@thi.ng/soa.svg)](https://www.npmjs.com/package/@thi.ng/soa)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/soa.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Supported memory layouts](#supported-memory-layouts)
    - [AOS (Array Of Structures)](#aos-array-of-structures)
    - [SOA (Structure of Arrays)](#soa-structure-of-arrays)
    - [Hybrid](#hybrid)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

SOA & AOS memory mapped structured views with optional & extensible serialization.

### Supported memory layouts

#### AOS (Array Of Structures)

![AOS memory block diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/soa/aos.png)

#### SOA (Structure of Arrays)

![SOA memory block diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/soa/soa.png)

#### Hybrid

![Hybrid memory block diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/soa/hybrid.png)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsoa%5D+in%3Atitle)

See tests for usage. This package might be merged with and/or superseded
by
[@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs).

## Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/develop/packages/malloc) - ArrayBuffer based malloc() impl for hybrid JS/WASM use cases, based on thi.ng/tinyalloc
- [@thi.ng/simd](https://github.com/thi-ng/umbrella/tree/develop/packages/simd) - WASM based SIMD vector operations for batch processing
- [@thi.ng/unionstruct](https://github.com/thi-ng/umbrella/tree/develop/packages/unionstruct) - C-style struct, union and bitfield read/write views of ArrayBuffers
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts

## Installation

```bash
yarn add @thi.ng/soa
```

ESM import:

```ts
import * as soa from "@thi.ng/soa";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/soa"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const soa = await import("@thi.ng/soa");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.45 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                          | Description                                  | Live demo                                        | Source                                                                        |
|:--------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/> | Entity Component System w/ 100k 3D particles | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/>   | WebGL multi-colored cube mesh                | [Demo](https://demo.thi.ng/umbrella/webgl-cube/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cube) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/soa/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-soa,
  title = "@thi.ng/soa",
  author = "Karsten Schmidt",
  note = "https://thi.ng/soa",
  year = 2019
}
```

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache License 2.0
