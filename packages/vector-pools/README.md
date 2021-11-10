<!-- This file is generated - DO NOT EDIT! -->

# ![vector-pools](https://media.thi.ng/umbrella/banners/thing-vector-pools.svg?4ebed464)

[![npm version](https://img.shields.io/npm/v/@thi.ng/vector-pools.svg)](https://www.npmjs.com/package/@thi.ng/vector-pools)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/vector-pools.svg)
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
  - [WebGL geometry definition / manipulation](#webgl-geometry-definition--manipulation)
  - [WASM interop](#wasm-interop)
- [Authors](#authors)
- [License](#license)

## About

Data structures for managing & working with strided, memory mapped vectors.

This still package provides several data structures for managing &
working with memory mapped vectors. Together with
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors),
these structures enable high-level, zero-copy<sup>*</sup> manipulation
of the underlying memory region and are largely intended for WebGL &
WASM use cases, e.g. to provide JS friendly views of a structured data
region of a WebGL or WASM memory buffer.

<sup>*</sup> The only copying taking place is to GPU memory

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bvector-pools%5D+in%3Atitle)

This package might be merged with and/or superseded by
[@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs)
/
[@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/develop/packages/soa).

### Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/develop/packages/malloc) - ArrayBuffer based malloc() impl for hybrid JS/WASM use cases, based on thi.ng/tinyalloc
- [@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/develop/packages/soa) - SOA & AOS memory mapped structured views with optional & extensible serialization
- [@thi.ng/unionstruct](https://github.com/thi-ng/umbrella/tree/develop/packages/unionstruct) - C-style struct, union and bitfield read/write views of ArrayBuffers
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/vector-pools
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/vector-pools"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const vectorPools = await import("@thi.ng/vector-pools");
```

Package sizes (gzipped, pre-treeshake): ESM: 3.11 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/develop/packages/malloc)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                        | Description                                 | Live demo                                        | Source                                                                        |
|:------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/> | WebGL MSDF text rendering & particle system | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/vector-pools/)

### WebGL geometry definition / manipulation

```ts
import { AttribPool, GLType } from "@thi.ng/vector-pools";
import * as v from "@thi.ng/vectors";
import * as tx from "@thi.ng/transducers";

// create an interleaved (AOS layout) attribute buffer w/ default values
const geo = new AttribPool({
    // initial size in bytes (or provide ArrayBuffer or @thi.ng/malloc/MemPool)
    mem: { size: 0x200 },
    // num elements
    num: 4,
    // attrib specs (data mapping layout)
    attribs: {
        pos: { type: GLType.F32, size: 3, byteOffset: 0 },
        uv: { type: GLType.F32, size: 2, byteOffset: 12 },
        col: { type: GLType.F32, size: 3, default: [1, 1, 1], byteOffset: 20 },
        id: { type: GLType.U16, size: 1, byteOffset: 32 }
    }
});

// computed overall stride length
geo.byteStride
// 36

// set attrib values
geo.setAttribs({
    pos: { data: [[-5, 0, 0], [5, 0, 0], [5, 5, 0], [-5, 5, 0]]},
    uv: { data: [[0, 0], [1, 0], [1, 1], [0, 1]] }
});
// ...or individually
geo.setAttribValues("id", [0, 1, 2, 3]);

// get view of individual attrib val
geo.attribValue("pos", 3)
// Float32Array [ -5, 5, 0 ]

// zero-copy direct manipulation of mapped attrib val
v.mulN(null, geo.attribValue("pos", 3), 2);
// Float32Array [ -10, 10, 0 ]

// get iterator of mapped attrib vals (e.g. for batch processing)
[...geo.attribValues("pos")]
// [ Float32Array [ -5, 0, 0 ],
//   Float32Array [ 5, 0, 0 ],
//   Float32Array [ 5, 5, 0 ],
//   Float32Array [ -10, 10, 0 ] ]

// use with transducers, e.g. to map positions to colors
tx.run(
    tx.map(([pos, col]) => v.maddN(col, [0.5, 0.5, 0.5], v.normalize(col, pos), 0.5)),
    tx.zip(geo.attribValues("pos"), geo.attribValues("col"))
);

// updated colors
[...geo.attribValues("col")]
// [ Float32Array [ 0, 0.5, 0.5 ],
//   Float32Array [ 1, 0.5, 0.5 ],
//   Float32Array [ 0.8535534143447876, 0.8535534143447876, 0.5 ],
//   Float32Array [ 0.1464466154575348, 0.8535534143447876, 0.5 ] ]

// dynamically add another attrib
// this will change the overall stride length and re-align all existing attribs
geo.addAttribs({
    normal: { type: GLType.F32, size: 3, default: [0, 0, 1], byteOffset: 36 }
});

// updated overall stride length
geo.byteStride
// 48

// ...Webgl boilerplate omitted
const gl = ...

// only need to use & bind single (interleaved) buffer
// containing all attribs
buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, geo.bytes(), gl.STATIC_DRAW);

// helper fn to bind a single shader attrib
const initAttrib = (gl, loc, attrib) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(
        loc,
        attrib.size,
        attrib.type,
        false,
        attrib.byteStride, // computed by pool
        attrib.byteOffset
    );
};

initAttrib(gl, attribLocPosition, geo.specs.pos);
initAttrib(gl, attribLocNormal, geo.specs.normal);
initAttrib(gl, attribLocUV, geo.specs.uv);
```

### WASM interop

```c
// main.c

#include <emscripten.h>
#include <stdint.h>

typedef struct {
    float pos[3];
    float uv[2];
    float col[3];
    uint16_t id;
} Vertex;

Vertex vertices[] = {
    {.pos = {-5, 0, 0}, .uv = {0, 0}, .col = {1, 0, 0}, .id = 0},
    {.pos = {5, 0, 0}, .uv = {1, 0}, .col = {0, 1, 0}, .id = 1},
    {.pos = {5, 5, 0}, .uv = {1, 1}, .col = {0, 0, 1}, .id = 2},
    {.pos = {-5, 5, 0}, .uv = {0, 1}, .col = {1, 0, 1}, .id = 3},
};

int main() { return 0; }

EMSCRIPTEN_KEEPALIVE Vertex* getVertices() {
    return vertices;
}

EMSCRIPTEN_KEEPALIVE int getNumVertices() {
    return sizeof(vertices) / sizeof(Vertex);
}
```

```ts
import { Type } from "@thi.ng/api";

// ... WASM / Emscripten boilerplate omitted
const Module = ...

// initialize pool from mapped WASM memory
const geo = new vp.AttribPool(
    // map WASM memory
    Module.buffer,
    // num elements (obtained from C function)
    Module._getNumVertices(),
    // attrib specs (data mapping layout)
    // don't specify attrib defaults to avoid overriding
    // values already initialized by WASM code
    {
        pos: { type: Type.F32, size: 3, byteOffset: 0 },
        uv:  { type: Type.F32, size: 2, byteOffset: 12 },
        col: { type: Type.F32, size: 3, byteOffset: 20 },
        id:  { type: Type.U16, size: 1, byteOffset: 32 }
    },
    // pool options
    {
        // don't allow resizing (since we're mapping a fixed sized C array)
        resizable: false,
        // initialize mem pool to start @ C `vertices` array
        mempool: {
            start: Module._getVertices(),
        }
    }
);

[...geo.attribValues("pos")]
// [ Float32Array [ -5, 0, 0 ],
//   Float32Array [ 5, 0, 0 ],
//   Float32Array [ 5, 5, 0 ],
//   Float32Array [ -5, 5, 0 ] ]
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-vector-pools,
  title = "@thi.ng/vector-pools",
  author = "Karsten Schmidt",
  note = "https://thi.ng/vector-pools",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0
