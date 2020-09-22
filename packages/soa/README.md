<!-- This file is generated - DO NOT EDIT! -->

# ![soa](https://media.thi.ng/umbrella/banners/thing-soa.svg?466a113a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/soa.svg)](https://www.npmjs.com/package/@thi.ng/soa)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/soa.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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

SOA & AOS memory mapped structured views with optional & extensible serialization.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bsoa%5D)

See tests for usage. This package might be merged with and/or superseded
by
[@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs).

### Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/develop/packages/malloc) - ArrayBuffer based malloc() impl for hybrid JS/WASM use cases, based on thi.ng/tinyalloc
- [@thi.ng/simd](https://github.com/thi-ng/umbrella/tree/develop/packages/simd) - WASM based SIMD vector operations for batch processing
- [@thi.ng/unionstruct](https://github.com/thi-ng/umbrella/tree/develop/packages/unionstruct) - C-style struct, union and bitfield read/write views of ArrayBuffers
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors

## Installation

```bash
yarn add @thi.ng/soa
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/soa?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/soa/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.45 KB / CJS: 1.52 KB / UMD: 1.62 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                          | Description                                  | Live demo                                        | Source                                                                        |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/> | Entity Component System w/ 100k 3D particles | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/>   | WebGL multi-colored cube mesh                | [Demo](https://demo.thi.ng/umbrella/webgl-cube/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cube) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/soa/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
