# @thi.ng/simd

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/simd.svg)](https://www.npmjs.com/package/@thi.ng/simd)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/simd.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Available functions](#available-functions)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

[WebAssembly SIMD](https://github.com/WebAssembly/simd) vector
operations for batch processing, written in
[AssemblyScript](https://docs.assemblyscript.org/).

## Available functions

See
[/assembly](https://github.com/thi-ng/umbrella/tree/feature/simd/packages/simd/assembly)
for sources:

- `dot2_f32_aos()`
- `dot4_f32_aos()`
- `dot4_f32_soa()`
- `madd4_f32()`
- `maddn4_f32()`
- `mul_m23v2_aos()`
- `mul_m44v4_aos()`

Also see [src/api.ts](https://github.com/thi-ng/umbrella/tree/feature/simd/packages/simd/src/api.ts) for documentation about the exposed TS/JS API...

## Status

ALPHA - unreleased

## Installation

```bash
yarn add @thi.ng/simd
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)

## Usage examples

The [WebAssembly SIMD spec](https://github.com/WebAssembly/simd) is still WIP and (at the time of writing) only partially implemented.

- NodeJS (v12.10+): `node --experimental-wasm-simd`
- Chrome: Enable SIMD support via [chrome://flags](chrome://flags)

```ts
import { init } from "@thi.ng/simd";

// the WASM module doesn't specify any own memory and it must be provided by user
// the returned object contains all available vector functions & memory views
const simd = init(new WebAssembly.Memory({ initial: 1 }));

// input data: 3x vec4 buffers
const a = simd.f32.subarray(0, 4);
const b = simd.f32.subarray(4, 16);
const out = simd.f32.subarray(16, 18);

a.set([1, 2, 3, 4])
b.set([10, 20, 30, 40,  40, 30, 20, 10]);

// compute dot products
// by using 0 as stride for A, all dot products are using [1,2,3,4] for A
simd.dot4_f32_aos(
    out.byteOffset, // output addr / pointer
    a.byteOffset,   // vector A addr
    b.byteOffset,   // vector B addr
    2,              // number of vectors to process
    1,              // output stride (floats)
    0,              // A stride (floats)
    4               // B stride (floats)
);

// results for [dot(a0, b0), dot(a0, b1)]
out
// [300, 200]

// mat4 * vec4 matrix-vector multiplies
const mat = simd.f32.subarray(0, 16);
const points = simd.f32.subarray(16, 24);

// mat4 (col major)
mat.set([
    10, 0, 0, 0,
    0, 20, 0, 0,
    0, 0, 30, 0,
    100, 200, 300, 1
]);

// vec4 array
points.set([
    1, 2, 3, 1,
    4, 5, 6, 1,
]);

simd.mul_m44v4_aos(
    points.byteOffset, // output addr / pointer
    mat.byteOffset,    // mat4 addr
    points.byteOffset, // vec4 addr
    2,                 // number of vectors to process
    4,                 // output stride (float)
    4                  // vec stride (float)
);

// transformed points
points
// [110, 240, 390, 1, 140, 300, 480, 1]
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
