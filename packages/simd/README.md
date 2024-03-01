<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/simd](https://media.thi.ng/umbrella/banners-20230807/thing-simd.svg?4afce80e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/simd.svg)](https://www.npmjs.com/package/@thi.ng/simd)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/simd.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Available functions](#available-functions)
- [Status](#status)
  - [BREAKING CHANGES](#breaking-changes)
    - [0.4.0](#040)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
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

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsimd%5D+in%3Atitle)

The [WebAssembly SIMD spec](https://github.com/WebAssembly/simd) is
still WIP and (at the time of writing) only partially implemented and
hidden behind feature flags. Currently only fully tested (& testable for
me) on Node 14.6+.

- [SIMD implementation status](https://github.com/WebAssembly/simd/blob/master/proposals/simd/ImplementationStatus.md)
- Node (v12.10 .. v20.7): `node --experimental-wasm-simd` (flag not needed anymore since v20.8)
- Chrome: Enable SIMD support via [chrome://flags](chrome://flags)

### BREAKING CHANGES

#### 0.4.0

Due to the [opcode renumbering of SIMD
operations](https://github.com/WebAssembly/simd/pull/209#issuecomment-607282125)
proposed in April 2020, the WASM module will only work on engines released after
2020-05-21 when that change was committed to the WASM spec. For NodeJS this
means only v14.6.0 or newer will be supported. This was an external change and
outside our control...

## Related packages

- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/develop/packages/malloc) - ArrayBuffer based malloc() impl for hybrid JS/WASM use cases, based on thi.ng/tinyalloc
- [@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/develop/packages/soa) - SOA & AOS memory mapped structured views with optional & extensible serialization
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors

## Installation

```bash
yarn add @thi.ng/simd
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/simd"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const simd = await import("@thi.ng/simd");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.16 KB

## Dependencies

- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                       | Description                                                           | Live demo                                       | Source                                                                       |
|:-----------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------|:------------------------------------------------|:-----------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/simd-plot.png" width="240"/> | Fitting, transforming & plotting 10k data points per frame using SIMD | [Demo](https://demo.thi.ng/umbrella/simd-plot/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/simd-plot) |

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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-simd,
  title = "@thi.ng/simd",
  author = "Karsten Schmidt",
  note = "https://thi.ng/simd",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
