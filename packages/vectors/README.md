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
zero-copy vector operations on sections of larger buffers. The default
start index is 0, default stride 1. See examples below and
[tests](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/test/).

| Operation                       | GVec         | Vec2             | Vec3             | Vec4             |
|---------------------------------|--------------|------------------|------------------|------------------|
| Get vector (dense copy)         | `get`        | `get2`           | `get3`           | `get4`           |
| Set vector components (vector)  | `set`        | `set2`           | `set3`           | `set4`           |
| Set vector components (uniform) | `setN`       | `setN2`          | `setN3`          | `setN4`          |
| Set vector components (scalars) |              | `setS2`          | `setS3`          | `setS4`          |
| Swizzle vector components       |              | `swizzle2`       | `swizzle3`       | `swizzle4`       |
| Equality (w/ epsilon)           | `eqDelta`    | `eqDelta2`       | `eqDelta3`       | `eqDelta4`       |
| Vector addition                 | `add`        | `add2`           | `add3`           | `add4`           |
| Vector subtraction              | `sub`        | `sub2`           | `sub3`           | `sub4`           |
| Vector multiplication           | `mul`        | `mul2`           | `mul3`           | `mul4`           |
| Vector division                 | `div`        | `div2`           | `div3`           | `div4`           |
| Uniform scalar addition         | `addN`       | `addN2`          | `addN3`          | `addN4`          |
| Uniform scalar subtraction      | `subN`       | `subN2`          | `subN3`          | `subN4`          |
| Uniform scalar multiply         | `mulN`       | `mulN2`          | `mulN3`          | `mulN4`          |
| Uniform scalar multiply         | `divN`       | `divN2`          | `divN3`          | `divN4`          |
| Vector negation                 | `neg`        | `neg2`           | `neg3`           | `neg4`           |
| Multiply-add vectors            | `madd`       | `madd2`          | `madd3`          | `madd4`          |
| Multiply-add scalar             | `maddN`      | `maddN2`         | `maddN3`         | `maddN4`         |
| Linear interpolation (vector)   | `mix`        | `mix2`           | `mix3`           | `mix4`           |
| Linear interpolation (uniform)  | `mixN`       | `mixN2`          | `mixN3`          | `mixN4`          |
| Dot product                     | `dot`        | `dot2`           | `dot3`           | `dot4`           |
| Cross product                   |              | `cross2`         | `cross3`         |                  |
| Magnitude                       | `mag`        | `mag2`           | `mag3`           | `mag4`           |
| Magnitude (squared)             | `magSq`      | `magSq2`         | `magSq3`         | `magSq4`         |
| Normalize (w/ opt length)       | `normalize`  | `normalize2`     | `normalize3`     | `normalize4`     |
| Limit to length                 |              | `limit2`         | `limit3`         | `limit4`         |
| Distance                        | `dist`       | `dist2`          | `dist3`          | `dist4`          |
| Distance (squared)              | `distSq`     | `distSq2`        | `distSq3`        | `distSq4`        |
| Manhattan distance              |              | `distManhattan2` | `distManhattan3` | `distManhattan4` |
| Chebyshev distance              |              | `distChebyshev2` | `distChebyshev3` | `distChebyshev4` |
| Reflection                      |              | `reflect2`       | `reflect3`       | `reflect4`       |
| RotationX                       |              |                  | `rotateX3`       |                  |
| RotationY                       |              |                  | `rotateY3`       |                  |
| RotationZ                       |              | `rotate2`        | `rotateZ3`       |                  |
| Heading XY                      |              | `heading2`       | `headingXY3`     |                  |
| Heading XZ                      |              |                  | `headingXZ3`     |                  |
| Heading YZ                      |              |                  | `headingYZ3`     |                  |
| Cartesian -> Polar              |              | `toPolar2`       | `toSpherical3`   |                  |
| Polar -> Cartesian              |              | `toCartesian2`   | `toCartesian3`   |                  |
| Minor axis                      |              | `minorAxis2`     | `minorAxis3`     | `minorAxis4`     |
| Major axis                      |              | `majorAxis2`     | `majorAxis3`     | `majorAxis4`     |
| Minimum                         | `min`        | `min2`           | `min3`           | `min4`           |
| Maximum                         | `max`        | `max2`           | `max3`           | `max4`           |
| Range clamping                  | `clamp`      | `clamp2`         | `clamp3`         | `clamp4`         |
| Step (like GLSL)                | `step`       | `step2`          | `step3`          | `step4`          |
| SmoothStep (like GLSL)          | `smoothStep` | `smoothStep2`    | `smoothStep3`    | `smoothStep4`    |
| Absolute value                  | `abs`        | `abs2`           | `abs3`           | `abs4`           |
| Sign (w/ opt epsilon)           | `sign`       | `sign2`          | `sign3`          | `sign4`          |
| Round down                      | `floor`      | `floor2`         | `floor3`         | `floor4`         |
| Round up                        | `ceil`       | `ceil2`          | `ceil3`          | `ceil4`          |
| Square root                     | `sqrt`       | `sqrt2`          | `sqrt3`          | `sqrt4`          |
| Power (vector)                  | `pow`        | `pow2`           | `pow3`           | `pow4`           |
| Power (uniform)                 | `powN`       | `powN2`          | `powN3`          | `powN4`          |

### Matrices

All matrix types are in WebGL layout (column major) and densely packed (stride always 1).

- [Mat23](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat23.ts)
- [Mat33](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat33.ts)
- [Mat44](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat44.ts)

| Operation                           | Mat23                   | Mat33         | Mat44               |
|-------------------------------------|-------------------------|---------------|---------------------|
| Set identity                        | `identity23`            | `identity33`  | `identity44`        |
| Get matrix components (dense copy)  | `get23`                 | `get33`       | `get44`             |
| Set matrix components (matrix)      | `set23`                 | `set33`       | `set44`             |
| Set matrix components (scalars)     | `setS23`                | `setS33`      | `setS44`            |
| Create rotation matrix              |                         | `rotationX33` | `rotationX44`       |
|                                     |                         | `rotationY33` | `rotationY44`       |
|                                     | `rotation23`            | `rotationZ33` | `rotationZ44`       |
|                                     | `rotationAroundPoint23` |               |                     |
| Create scale matrix (vector)        | `scaleV23`              | `scaleV33`    | `scaleV44`          |
| Create scale matrix (uniform)       | `scaleN23`              | `scaleN33`    | `scaleN44`          |
| Create scale matrix (scalars)       | `scaleS23`              | `scaleS33`    | `scaleS44`          |
|                                     | `scaleWithCenter23`     |               | `scaleWithCenter44` |
| Create translation matrix (vector)  | `translationV23`        |               | `translationV44`    |
| Create translation matrix (scalars) | `translationS23`        |               | `translationS44`    |
| Create skew matrix                  | `skewX23` / `shearX23`  |               |                     |
|                                     | `skewY23` / `shearY23`  |               |                     |
| Create projection matrix            |                         |               | `projection`        |
|                                     |                         |               | `ortho`             |
|                                     |                         |               | `frustum`           |
| Create camera matrix                |                         |               | `lookAt`            |
| Matrix multiply                     | `mul23`                 | `mul33`       | `mul44`             |
| Matrix concatenation (multiple)     | `concat23`              | `concat33`    | `concat44`          |
| Matrix vector multiply              | `mulV23`                | `mulV33`      | `mulV44` (Vec4)     |
|                                     |                         |               | `mulV344` (Vec3)    |
| Determinant                         | `det23`                 | `det33`       | `det44`             |
| Matrix inversion                    | `invert23`              | `invert33`    | `invert44`          |
| Matrix transpose                    |                         | `transpose33` | `transpose44`       |

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
