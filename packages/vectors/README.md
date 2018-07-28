# @thi.ng/vectors

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/vectors.svg)](https://www.npmjs.com/package/@thi.ng/vectors)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Vector and matrix operations as plain functions and class wrappers with
fluid interface. All functions support any array/typed array storage,
incl. mapped views of larger buffers. Additionally, vectors can have
flexible data layouts, incl. AOS, SOA, striped / interleaved, useful in
combination with memory pools / arenas (e.g. WASM interop).

Vectors:

- [Vec2](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec2.ts)
- [Vec3](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec3.ts)
- [Vec4](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec4.ts)

Matrices:

- [Mat23](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat23.ts)
- [Mat33](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat33.ts)
- [Mat44](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/mat44.ts)

## Installation

```bash
yarn add @thi.ng/vectors
```

## Usage examples

```ts
import * as v from "@thi.ng/vectors";

// raw vector addition
v.add4([1,2,3,4], [10,20,30,40]);
// [ 11, 22, 33, 44 ]

// buffer of interleaved attributes
// element stride 3 + 2 + 4 = 9
buf = [
    // pos     uv   color (rgba)
    0,0,0,     0,0, 1,0,0,1,
    100,0,0,   1,0, 1,1,0,1,
    100,100,0, 1,1, 1,0,1,1,
    0,100,0,   0,1, 0,1,1,1,
];

// created memory mapped vector instances
pos = v.Vec3.mapBuffer(buf, 4, 0, 1, 9);
uv = v.Vec2.mapBuffer(buf, 4, 3, 1, 9);
col = v.Vec4.mapBuffer(buf, 4, 5, 1, 9);

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

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
