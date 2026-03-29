<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/soa](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-soa.svg?15c3f478)

[![npm version](https://img.shields.io/npm/v/@thi.ng/soa.svg)](https://www.npmjs.com/package/@thi.ng/soa)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/soa.svg)
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

![AOS memory block diagram](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/soa/aos.png)

#### SOA (Structure of Arrays)

![SOA memory block diagram](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/soa/soa.png)

#### Hybrid

![Hybrid memory block diagram](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/soa/hybrid.png)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bsoa%5D)

See tests for usage. This package might be merged with and/or superseded
by
[@thi.ng/ecs](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/ecs).

## Related packages

- [@thi.ng/ecs](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/malloc](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/malloc) - ArrayBuffer based malloc() impl for hybrid JS/WASM use cases, based on thi.ng/tinyalloc
- [@thi.ng/simd](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/simd) - WASM based SIMD vector operations for batch processing
- [@thi.ng/unionstruct](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/unionstruct) - C-style struct, union and bitfield read/write views of ArrayBuffers
- [@thi.ng/vector-pools](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.44 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/binary)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/transducers-binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers-binary)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Three projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                  | Description                                                       | Live demo                                           | Source                                                                                   |
|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:----------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/soa-ecs-100k.png" width="240"/> | Entity Component System w/ 100k 3D particles                      | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/soa-ecs)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-cube.png" width="240"/>   | 3D arcball controller to rotate the camera view of a colored cube | [Demo](https://demo.thi.ng/umbrella/webgl-arcball/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-arcball) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-cube.png" width="240"/>   | WebGL multi-colored cube mesh                                     | [Demo](https://demo.thi.ng/umbrella/webgl-cube/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-cube)    |

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

&copy; 2019 - 2026 Karsten Schmidt // Apache License 2.0
