<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-io-obj](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-geom-io-obj.svg?bfe84d70)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-io-obj.svg)](https://www.npmjs.com/package/@thi.ng/geom-io-obj)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-io-obj.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Features](#features)
  - [Planned features](#planned-features)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Wavefront OBJ parser (& exporter soon). This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

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
- Fast (~100 verts, normals & faces per millisecond, MBP2015, Node 13.10)

### Planned features

- [ ] OBJ export
- [ ] MTL parser

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-io-obj%5D+in%3Atitle)

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

Package sizes (brotli'd, pre-treeshake): ESM: 1004 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-io-obj/)

TODO

See
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-io-obj/src/api.ts)
for details about resulting data structure. Also see tests for more.

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

// parse with defaults
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

Benchmark uses a quad-mesh model with 143,423 vertices, same number of
normals and 142,802 quad faces (filesize 43.7MB).

```text
benchmarking: parse
        warmup... 7299.40ms (5 runs)
        executing...
        total: 13795.25ms, runs: 10
        mean: 1379.52ms, median: 1379.91ms, range: [1356.43..1431.49]
        q1: 1362.21ms, q3: 1415.23ms
        sd: 1.77%

benchmarking: parse w/ tessellation
        warmup... 7752.45ms (5 runs)
        executing...
        total: 15170.43ms, runs: 10
        mean: 1517.04ms, median: 1540.89ms, range: [1425.28..1616.09]
        q1: 1487.29ms, q3: 1551.26ms
        sd: 3.35%
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

&copy; 2016 - 2025 Karsten Schmidt // Apache License 2.0
