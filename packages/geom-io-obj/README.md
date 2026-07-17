<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-io-obj](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-io-obj.svg?bfe84d70)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-io-obj.svg)](https://www.npmjs.com/package/@thi.ng/geom-io-obj)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-io-obj.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]

> This is one of 216 standalone projects. LLM-free, human-made and
> cared for software, maintained as part of the
> [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem and
> anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
  - [Features](#features)
  - [Planned features](#planned-features)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Wavefront OBJ parser (& exporter soon). This is a support package for [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom).

### Features

- Geometry split into declared objects & groups by default (can be disabled)
- Full support for n-gon faces, polylines
- Optional n-gon face tessellation into triangles
- Support for relative (negative) vertex references
- Optional vertex, normal & UV transforms (e.g. convert Y-up / Z-up, flip UVs)
- Skip parsing/processing of UVs and/or normals
- Per group `mtllib` and `usemtl` references
- Per group smooth flags
- Optionally retained comments (e.g. for additional metadata parsing)
- Async parsing with support for ReadableStream
- Fast (see [benchmarks](#benchmarks) below)

### Planned features

- [ ] OBJ export
- [ ] MTL parser

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-io-obj%5D)

## Installation

```bash
yarn add @thi.ng/geom-io-obj
```

ESM import:

```ts
import * as gio from "@thi.ng/geom-io-obj";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-io-obj"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gio = await import("@thi.ng/geom-io-obj");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.18 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                        | Description                                                     | Live demo                                       | Source                                                                               |
|:------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------|:------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/webgl-obj.avif" width="240"/> | Basic 3D OBJ model loading & interactive arcball camera control | [Demo](https://demo.thi.ng/umbrella/webgl-obj/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-obj) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-io-obj/)

The parsed OBJ model format produced by all parser functions:
[OBJModel](https://docs.thi.ng/umbrella/geom-io-obj/interfaces/OBJModel.html)

Available functions:

- [parseOBJFromStream()](https://docs.thi.ng/umbrella/geom-io-obj/functions/parseOBJFromStream.html)
- [parseOBJFromString()](https://docs.thi.ng/umbrella/geom-io-obj/functions/parseOBJFromString.html)
- [parseOBJFromIterable()](https://docs.thi.ng/umbrella/geom-io-obj/functions/parseOBJFromIterable.html)
- [parseOBJGenerator()](https://docs.thi.ng/umbrella/geom-io-obj/functions/parseOBJGenerator.html)

```ts
import { parseObjFromString } from "@thi.ng/geom-io-obj";

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

// parse with defaults
const model = parseObjFromString(src);

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

// vertex indices now zero-based (instead of 1-based in OBJ)
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

Benchmark uses `parseOBJFromString()` with a model with 270,050 vertices, same
number of normals and 271,624 faces (99% quads), filesize 41.2MB.

Results on MacBook Air M1 (2020), 16GB RAM, Bun v1.3.12:

```text
benchmarking: parse
        warmup... 18331.85ms (50 runs)
        total: 36671.33ms, runs: 100 (@ 1 calls/iter)
        freq: 2.73 ops/sec
        mean: 366.71ms, median: 365.48ms, range: [344.24..403.17]
        q1: 359.71ms, q3: 372.67ms
        sd: 2.65%

benchmarking: parse w/ tesselation
        warmup... 19795.49ms (50 runs)
        total: 39542.96ms, runs: 100 (@ 1 calls/iter)
        freq: 2.53 ops/sec
        mean: 395.43ms, median: 394.13ms, range: [363.78..423.67]
        q1: 389.40ms, q3: 402.07ms
        sd: 2.71%
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-io-obj,
  title = "@thi.ng/geom-io-obj",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-io-obj",
  year = 2016
}
```

## License

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
