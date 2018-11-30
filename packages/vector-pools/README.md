# @thi.ng/vector-pools

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/vector-pools.svg)](https://www.npmjs.com/package/@thi.ng/vector-pools)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/vector-pools.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [WebGL geometry definition / manipulation](#webgl-geometry-definition--manipulation)
    - [WASM interop](#wasm-interop)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This still unreleased package provides various data structures for
managing & working with memory mapped vectors. Together with
[@thi.ng/vectors3](https://github.com/thi-ng/umbrella/tree/master/packages/vectors3)
(also still unreleased) these structures enable high-level,
zero-copy<sup>*</sup> manipulation of the underlying memory region and
are largely intended for WebGL & WASM use cases, e.g. to provide JS
friendly views of a structured data region of a WebGL or WASM memory
buffer.

<sup>*</sup> The only copying taking place is to GPU memory

## Installation

```bash
yarn add @thi.ng/vector-pools
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/master/packages/malloc)
- [@thi.ng/vectors3](https://github.com/thi-ng/umbrella/tree/master/packages/vectors3)

## Usage examples

### WebGL geometry definition / manipulation

```ts
import { AttribPool, GLType } from "@thi.ng/vector-pools";
import * as v from "@thi.ng/vectors3";

// ...Webgl boilerplate omitted
const gl = ...

// create an interleaved (AOS layout) attribute buffer w/ default values
const geo = new AttribPool(
    // initial size in bytes (or provide ArrayBuffer or @thi.ng/malloc/MemPool)
    0x200,
    // num elements
    4,
    // attrib specs (data mapping layout)
    {
        pos: { type: GLType.F32, size: 3, default: [0, 0, 0], byteOffset: 0 },
        uv: { type: GLType.F32, size: 2, default: [0, 0], byteOffset: 12 },
        col: { type: GLType.F32, size: 3, default: [1, 1, 1], byteOffset: 20 },
        id: { type: GLType.U16, size: 1, default: 0, byteOffset: 32 }
    }
);

// computed overall stride length
geo.byteStrength
// 36

// set attrib values
geo.setAttribValues("pos", [[-5, 0, 0], [5, 0, 0], [5, 5, 0], [-5, 5, 0]]);
geo.setAttribValues("uv", [[0, 0], [1, 0], [1, 1], [0, 1]]);
geo.setAttribValues("id", [0, 1, 2, 3]);

// get view of individual attrib val
geo.attribValue("pos", 3)
// Float32Array [ -5, 5, 0 ]

// zero-copy direct manipulation of attrib val
v.mulN(null, geo.attribValue("pos", 3), 2);
// Float32Array [ -10, 10, 0 ]

// get iterator of mapped attrib vals (e.g. for batch processing)
[...geo.attribValues("pos")]
// [ Float32Array [ -5, 0, 0 ],
//   Float32Array [ 5, 0, 0 ],
//   Float32Array [ 5, 5, 0 ],
//   Float32Array [ -10, 10, 0 ] ]

// use with transducers, e.g. to compute map positions to colors
tx.run(
    tx.map(([pos, col]) => v.maddN(col, [0.5, 0.5, 0.5], v.normalize(col, pos), 0.5)),
    tx.tuples(geo.attribValues("pos"), geo.attribValues("col"))
);

// updated colors
[...geo.attribValues("col")]
// [ Float32Array [ 0, 0.5, 0.5 ],
//   Float32Array [ 1, 0.5, 0.5 ],
//   Float32Array [ 0.8535534143447876, 0.8535534143447876, 0.5 ],
//   Float32Array [ 0.1464466154575348, 0.8535534143447876, 0.5 ] ]

// dynamically add another attrib
// this will change the overall stride length and re-align all existing attribs
geo.initAttribs({
    normal: { type: GLType.F32, size: 3, default: [0, 0, 1], byteOffset: 36 }
});

// updated overall stride length
geo.byteStrength
// 48

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
initAttrib(gl, attribLocID, geo.specs.id);
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

const Vertex vertices[4];

int main() {
    return 0;
}

Vertex vertices[4] = {
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
// ... WASM / Emscripten boilerplate omitted
const Module = ...

//
const geo = new vp.AttribPool(
    // map WASM memory
    Module.buffer,
    // num elements (obtained from C function)
    Module._getNumVertices(),
    // attrib specs (data mapping layout)
    // don't specify attrib defaults to avoid overriding
    // values already initialized by WASM code
    {
        pos: { type: vp.GLType.F32, size: 3, byteOffset: 0 },
        uv: { type: vp.GLType.F32, size: 2, byteOffset: 12 },
        col: { type: vp.GLType.F32, size: 3, byteOffset: 20 },
        id: { type: vp.GLType.U16, size: 1, byteOffset: 32 }
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

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
