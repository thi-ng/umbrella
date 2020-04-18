<!-- This file is generated - DO NOT EDIT! -->

# ![geom-io-obj](https://media.thi.ng/umbrella/banners/thing-geom-io-obj.svg?ab1d8b98)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-io-obj.svg)](https://www.npmjs.com/package/@thi.ng/geom-io-obj)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-io-obj.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Wavefront OBJ parser (& exporter soon).

### Features

- geometry split into declared objects & groups (can be disabled)
- full support for n-gon faces, polylines
- vertex & normal swizzling (optional, e.g. convert Y-up / Z-up)
- skip parsing/processing of UVs and/or normals
- per group `mtllib` and `usemtl` references
- per group smooth flags
- fast (~100 verts, normals & faces per ms, MBP2015, Node 13.10)

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/geom-io-obj
```

Package sizes (gzipped, pre-treeshake): ESM: 858 bytes / CJS: 911 bytes / UMD: 1012 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-io-obj/)

TODO

See
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-io-obj/src/api.ts)
for details about resulting data structure.

```ts
import { parseObj } from "@thi.ng/geom-io-obj";

const src = `
# test cube

v 1.0000 1.0000 1.0000
v 1.0000 1.0000 0.0000
v 1.0000 0.0000 0.0000
v 1.0000 0.0000 1.0000
v 0.0000 1.0000 0.0000
v 0.0000 1.0000 1.0000
v 0.0000 0.0000 1.0000
v 0.0000 0.0000 0.0000

# quad faces
f 4 3 2 1
f 8 7 6 5
f 6 1 2 5
f 8 3 4 7
f 7 4 1 6
f 3 8 5 2
`;

const model = parseObj(src);

console.log(model.vertices);
// [
//   [ 1, 1, 1 ],
//   [ 1, 1, 0 ],
//   [ 1, 0, 0 ],
//   [ 1, 0, 1 ],
//   [ 0, 1, 0 ],
//   [ 0, 1, 1 ],
//   [ 0, 0, 1 ],
//   [ 0, 0, 0 ]
// ]

console.log(model.objects[0].groups[0].faces);
// [
//   { v: [ 3, 2, 1, 0 ] },
//   { v: [ 7, 6, 5, 4 ] },
//   { v: [ 5, 0, 1, 4 ] },
//   { v: [ 7, 2, 3, 6 ] },
//   { v: [ 6, 3, 0, 5 ] },
//   { v: [ 2, 7, 4, 1 ] }
// ]
```

## Benchmarks

Benchmark uses a quad-mesh model with 143,423 vertices, same number of normals and 142,802 faces (filesize 43.7MB).

```text
benchmarking: parse
    warmup... 7155.26ms (5 runs)
    executing...
    total: 13890.64ms, runs: 10
    mean: 1389.06ms, median: 1379.48ms, range: [1339.18..1450.96]
    q1: 1371.56ms, q3: 1427.43ms
    sd: 2.40%
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
