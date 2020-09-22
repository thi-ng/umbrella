<!-- This file is generated - DO NOT EDIT! -->

# ![simd](https://media.thi.ng/umbrella/banners/thing-simd.svg?083d98e4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/simd.svg)](https://www.npmjs.com/package/@thi.ng/simd)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/simd.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Available functions](#available-functions)
  - [Status](#status)
  - [BREAKING CHANGES](#breaking-changes)
    - [0.4.0](#040)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

[WebAssembly SIMD](https://github.com/WebAssembly/simd) vector
operations for array/batch processing, written in
[AssemblyScript](https://docs.assemblyscript.org/). These functions use
the CPU's vector instructions to process 128bit words at once, which is
the equivalent width of a 4D vector with 4x 32bit components. Several of
the provided functions can also be used to process 2D vectors.

## Available functions

See
[/assembly](https://github.com/thi-ng/umbrella/tree/develop/packages/simd/assembly)
for sources:

- `abs4_f32`
- `add4_f32`
- `addn4_f32`
- `clamp4_f32`
- `clampn4_f32`
- `div4_f32`
- `divn4_f32`
- `dot2_f32_aos` (2)
- `dot4_f32_aos`
- `dot4_f32_soa`
- `invsqrt4_f32`
- `madd4_f32`
- `maddn4_f32`
- `mag2_f32_aos`
- `mag4_f32_aos`
- `magsq2_f32_aos`
- `magsq4_f32_aos`
- `max4_f32`
- `min4_f32`
- `mix4_f32`
- `mixn4_f32`
- `msub4_f32`
- `msubn4_f32`
- `mul4_f32`
- `muln4_f32`
- `mul_m22v2_aos` (2)
- `mul_m23v2_aos` (2)
- `mul_m44v4_aos`
- `neg4_f32`
- `normalize2_f32_aos` (2)
- `normalize4_f32_aos`
- `sqrt4_f32`
- `sub4_f32`
- `subn4_f32`
- `sum4_f32`
- `swizzle4_32` (f32 and u32)

(2) 2x vec2 per iteration

Also see
[src/api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/simd/src/api.ts)
for documentation about the exposed TS/JS API...

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bsimd%5D)

The [WebAssembly SIMD spec](https://github.com/WebAssembly/simd) is
still WIP and (at the time of writing) only partially implemented and
hidden behind feature flags. Currently only fully tested (& testable for
me) on Node 14.6+.

- [SIMD implementation status](https://github.com/WebAssembly/simd/blob/master/proposals/simd/ImplementationStatus.md)
- Node (v12.10+): `node --experimental-wasm-simd`
- Chrome: Enable SIMD support via [chrome://flags](chrome://flags)

### BREAKING CHANGES

#### 0.4.0

Due to the [opcode renumbering of SIMD
operations](https://github.com/WebAssembly/simd/pull/209#issuecomment-607282125)
proposed in April 2020, the WASM module will only work on engines released after
2020-05-21 when that change was committed to the WASM spec. For NodeJS this
means only v14.6.0 or newer will be supported. This was an external change and
outside our control...

## Installation

```bash
yarn add @thi.ng/simd
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/simd?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/simd/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.47 KB / CJS: 2.53 KB / UMD: 2.65 KB

## Dependencies

- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)

## API

[Generated API docs](https://docs.thi.ng/umbrella/simd/)

```ts
import { init } from "@thi.ng/simd";

// the WASM module doesn't specify any own memory and it must be provided by user
// the returned object contains all available vector functions & memory views
// (an error will be thrown if WASM isn't available or SIMD unsupported)
const simd = init(new WebAssembly.Memory({ initial: 1 }));

// input data: 3x vec4 buffers
const a = simd.f32.subarray(0, 4);
const b = simd.f32.subarray(4, 16);
const out = simd.f32.subarray(16, 18);

a.set([1, 2, 3, 4])
b.set([10, 20, 30, 40,  40, 30, 20, 10]);

// compute dot products: dot(A[i], B[i])
// by using 0 as stride for A, all dot products are using the same vec
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

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
