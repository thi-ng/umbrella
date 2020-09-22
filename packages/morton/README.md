<!-- This file is generated - DO NOT EDIT! -->

# ![morton](https://media.thi.ng/umbrella/banners/thing-morton.svg?a8f62264)

[![npm version](https://img.shields.io/npm/v/@thi.ng/morton.svg)](https://www.npmjs.com/package/@thi.ng/morton)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/morton.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [ZCurve class](#zcurve-class)
  - [Low level (2D / 3D only)](#low-level-2d---3d-only)
- [Authors](#authors)
- [License](#license)

## About

Z-order curve / Morton encoding, decoding & range extraction for arbitrary dimensions.

References:

- [Z-order-curve](https://en.wikipedia.org/wiki/Z-order_curve)
- [Decoding Morton Codes](https://fgiesen.wordpress.com/2009/12/13/decoding-morton-codes/)
- [Morton encoding/decoding through bit interleaving](https://www.forceflow.be/2013/10/07/morton-encodingdecoding-through-bit-interleaving-implementations/)
- [github.com/JaneliaSciComp/Morton.jl](https://github.com/JaneliaSciComp/Morton.jl/blob/develop/src/Morton.jl)
- [Z-Order Indexing for Multifaceted Queries in Amazon DynamoDB](https://aws.amazon.com/blogs/database/z-order-indexing-for-multifaceted-queries-in-amazon-dynamodb-part-1/)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bmorton%5D)

### Related packages

- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators) - 2D grid iterators w/ multiple orderings
- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel) - n-D spatial indexing data structures with a shared ES6 Map/Set-like API

## Installation

```bash
yarn add @thi.ng/morton
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/morton?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/morton/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.02 KB / CJS: 2.16 KB / UMD: 2.13 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)

## API

[Generated API docs](https://docs.thi.ng/umbrella/morton/)

### ZCurve class

The `ZCurve` class provides nD encoding/decoding and Z index range
extraction (for a given nD bounding box). The maximum per-component
value range is 32 bits (unsigned!).

**Note: All Z indices are encoded as ES
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
and therefore only available in environments where `BigInt`s are already
supported. No polyfill is provided!**

TypeScript projects using this class should set their compile target (in
`tsconfig.json`) to `"ESNext"` to enable `BigInt` support.

```ts
// create new Z-curve for 3D positions and 16bit value range
const z = new ZCurve(3, 16);

z.encode([60000, 30000, 20000]);
// 67807501328384n

z.decode(67807501328384n);
// [ 60000, 30000, 20000 ]

// optimized z-index iteration for given bounding box (min, max)
[...z.range([2, 2, 0], [3, 6, 1])]
// [
//    24n,  25n,  26n,  27n,  28n,
//    29n,  30n,  31n, 136n, 137n,
//   138n, 139n, 140n, 141n, 142n,
//   143n, 152n, 153n, 156n, 157n
// ]

// or as coordinates
[...z.range([2, 2, 0], [3, 6, 1])].map((i) => z.decode(i));
// [
//   [ 2, 2, 0 ], [ 3, 2, 0 ],
//   [ 2, 3, 0 ], [ 3, 3, 0 ],
//   [ 2, 2, 1 ], [ 3, 2, 1 ],
//   [ 2, 3, 1 ], [ 3, 3, 1 ],
//   [ 2, 4, 0 ], [ 3, 4, 0 ],
//   [ 2, 5, 0 ], [ 3, 5, 0 ],
//   [ 2, 4, 1 ], [ 3, 4, 1 ],
//   [ 2, 5, 1 ], [ 3, 5, 1 ],
//   [ 2, 6, 0 ], [ 3, 6, 0 ],
//   [ 2, 6, 1 ], [ 3, 6, 1 ]
// ]
```

### Low level (2D / 3D only)

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/morton/src/mux.ts)

```ts
import * as m from "@thi.ng/morton";

// unsigned 16 bit coords only
m.mux2(23, 42);
// 2461

m.demux2(2461)
// [ 23, 42 ]

// encoded normalized coords (see source for opts)
m.muxScaled2(0.25, 0.75)
// 2594876074

m.demuxScaled2(m.muxScaled2(0.25, 0.75))
// [ 0.2500038147554742, 0.7499961852445258 ]
```

## Authors

Karsten Schmidt

## License

&copy; 2015 - 2020 Karsten Schmidt // Apache Software License 2.0
