<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
