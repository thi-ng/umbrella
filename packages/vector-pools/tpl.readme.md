# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This still package provides several data structures for managing &
working with memory mapped vectors. Together with
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors),
these structures enable high-level, zero-copy<sup>*</sup> manipulation
of the underlying memory region and are largely intended for WebGL &
WASM use cases, e.g. to provide JS friendly views of a structured data
region of a WebGL or WASM memory buffer.

<sup>*</sup> The only copying taking place is to GPU memory

${status}

This package might be merged with and/or superseded by
[@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs)
/
[@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/develop/packages/soa).

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
