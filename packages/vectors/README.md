# @thi.ng/vectors

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/vectors.svg)](https://www.npmjs.com/package/@thi.ng/vectors)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Vectors](#vectors)
    - [Matrices](#matrices)
- [Installation](#installation)
- [Usage examples](#usage-examples)
    - [Basics](#basics)
    - [Vector classes & interleaved vectors in large buffer](#vector-classes--interleaved-vectors-in-large-buffer)
    - [Image RGB grayscale conversion](#image-rgb-grayscale-conversion)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package provides vector and matrix operations as plain functions
and class wrappers with fluid interface. All functions support any array
/ typed array storage, incl. mapped views of larger buffers (e.g. for
WebGL / WASM interop, pixel buffers). Additionally, vectors support
flexible data layouts, incl. [AOS /
SOA](https://en.wikipedia.org/wiki/AOS_and_SOA), striped, interleaved,
aligned etc.

### Vectors

In addition to [arbitrary sized
vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/gvec.ts),
the library provides these optimized fixed-sized versions:

- [Vec2](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec2.ts)
- [Vec3](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec3.ts)
- [Vec4](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec4.ts)

#### Supported operations

Note: Most functions are provided in different (optimized) versions,
depending on vector size. E.g. `add` performs vector addition for
arbitrary sizes, `add2` for 2D vectors, `add3` for 3D, `add4` for 4D...

All vector operations (regardless of size) operate on any array-like
buffer and accept optional start indices and component strides (number
of elements (+1) between individual vector components). This allows for
zero-copy vector operations on sections of larger buffers. See examples
below and
[tests](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/test/).

### Matrices

- [Mat23](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat23.ts)
- [Mat33](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat33.ts)
- [Mat44](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat44.ts)

## Installation

```bash
yarn add @thi.ng/vectors
```

## Usage examples

### Basics

```ts
import * as v from "@thi.ng/vectors";

// raw vector addition
v.add4([1, 2, 3, 4], [10, 20, 30, 40]);
// [ 11, 22, 33, 44 ]

// with custom layout
// here 3x 3D vectors in SOA layout:
//       [x, x, x, y, y, y, z, z, z]
points = [1, 4, 7, 2, 5, 8, 3, 6, 9];

// specify start indices and stride lengths
// update 1st vector
v.add3(points, [100, 200, 300], 0, 0, 3, 1);
// [ 101, 4, 7, 202, 5, 8, 303, 6, 9 ]

// update 2nd vector
v.add3(points, [100, 200, 300], 1, 0, 3, 1);
// [ 101, 104, 7, 202, 205, 8, 303, 306, 9 ]

// update 3rd vector
v.add3(points, [100, 200, 300], 2, 0, 3, 1);
// [ 101, 104, 107, 202, 205, 208, 303, 306, 309 ]

// add 1st and 3rd vector and extract result
v.get3(v.add3(points, points, 0, 2, 3, 3), 0, 3);
// [ 208, 410, 612 ]

// re-arrange vector components into new vector
// the last 4 args define component order:

// YXWZ
v.swizzle4([], [10, 20, 30, 40], 1, 0, 3, 2);
// [ 20, 10, 40, 30 ]

// XXZZ
v.swizzle4([], [10, 20, 30, 40], 0, 0, 2, 2);
// [ 10, 10, 30, 30 ]

// arbitrary length vectors
norm = v.normalize([1, 2, 3, 4, 5, 6, 7, 8, 6, 4]);
// [ 0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5, 0.375, 0.25 ]

v.mag(norm);
// 1
```

### Vector classes & interleaved vectors in large buffer

```ts
// element stride 3 + 2 + 4 = 9
buf = [
    // pos     uv   color (rgba)
    0,0,0,     0,0, 1,0,0,1,
    100,0,0,   1,0, 1,1,0,1,
    100,100,0, 1,1, 1,0,1,1,
    0,100,0,   0,1, 0,1,1,1,
];

// create memory mapped vector instances (using Vec3 class)
pos = v.Vec3.mapBuffer(buf, 4, 0, 1, 9); // offset = 0
uv = v.Vec2.mapBuffer(buf, 4, 3, 1, 9);  // offset = 3
col = v.Vec4.mapBuffer(buf, 4, 5, 1, 9); // offset = 5

console.log(`pos: ${pos[1]}, uv: ${uv[1]}, color: ${col[1]}`);
// pos: [100, 0, 0], uv: [1, 0], color: [1, 1, 0, 1]

// compute centroid
centroid = pos.reduce((c, p) => c.add(p), v.vec3()).divN(pos.length);
// Vec3 { buf: [ 50, 50, 0 ], i: 0, s: 1 }

// build matrix to transform geometry
tx = v.Mat44.concat(
    v.Mat44.scale(0.01),
    v.Mat44.translation(centroid.copy().neg()),
    v.Mat44.rotationZ(v.rad(90)),
);

// apply transform to all positions
pos.forEach((p) => tx.mulV3(p));
```

### Image RGB grayscale conversion

```ts
canvas = document.getElementById("main");
img = canvas.getContext("2d").getImageData(0,0, canvas.width, canvas.height);

v.transformVectors1(
    // multiply each RGB vector w/ weights
    // then use result for all 3 color channels
    (a, b, ia, ib, sa, sb) =>
        v.setN3(a, v.dot3(a, b, ia, ib, sa, sb), ia, sa),
    // pixel buffer
    img,
    // RGB weight coefficients
    [0.29, 0.6, 0.11],
    // num pixels (RGBA vectors)
    canvas.width * canvas.height,
    // start indices
    0, 0,
    // component strides
    1, 1,
    // pixel stride
    4
);
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
