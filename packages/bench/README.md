<!-- This file is generated - DO NOT EDIT! -->

# ![bench](https://media.thi.ng/umbrella/banners/thing-bench.svg?b7925630)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bench.svg)](https://www.npmjs.com/package/@thi.ng/bench)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bench.svg)
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
  - [Benchmarking with statistics](#benchmarking-with-statistics)
  - [Benchmark suites](#benchmark-suites)
  - [Output formatting](#output-formatting)
- [Authors](#authors)
- [License](#license)

## About

Benchmarking utilities w/ various statistics & formatters (CSV, Markdown etc.).

Though no public API change (only additions), since v2.0.0 this library
internally attempts to use high-res ES
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
timestamps (in Node via
[`process.hrtime.bigint()`](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process_hrtime_bigint)).
If `BigInt` is not available in the target environment, timestamps are
still only sourced via `Date.now()`.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbench%5D+in%3Atitle)

### Related packages

- [@thi.ng/csv](https://github.com/thi-ng/umbrella/tree/develop/packages/csv) - Customizable, transducer-based CSV parser/object mapper and transformer
- [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-markdown) - Markdown parser & serializer from/to Hiccup format

## Installation

```bash
yarn add @thi.ng/bench
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/bench"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const bench = await import("@thi.ng/bench");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.36 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                | Description                                                                      | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg" width="240"/>           | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/>   | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg" width="240"/>    | Minimal Markdown to Hiccup to HTML parser / transformer                          | [Demo](https://demo.thi.ng/umbrella/markdown/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>   | Parser grammar livecoding editor/playground & codegen                            | [Demo](https://demo.thi.ng/umbrella/parse-playground/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>      | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel                 | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)      |
|                                                                                                                           | Full umbrella repo doc string search w/ paginated results                        | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/> | Fork-join worker-based raymarch renderer (JS/CPU only)                           | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/bench/)

```ts
import { timed, bench, benchmark } from "@thi.ng/bench";

// test functions
const fib = (n) => n > 2 ? fib(n - 1) + fib(n - 2) : n > 0 ? 1 : 0;

const fib2 = (n) => {
    const res = [0, 1];
    for(let i = 2; i <= n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }
    return res[n];
};

// measure single execution time
timed(() => fib(40));
// 714ms
// 102334155
timed(() => fib2(40));
// 0ms
// 102334155

// measure 1mil iterations (default)
bench(() => fib(10), 1e6);
// 395ms
// 55

bench(() => fib2(10), 1e6);
// 53ms
// 55
```

### Benchmarking with statistics

The `benchmark()` function executes a number of warmup runs, before
executing the main measurement and producing a number of useful
statistics: mean, median, min/max, 1st/3rd quartile, standard deviation
(as percentage)...

See
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/bench/src/api.ts)
for configuration options.

Also see the [formatting](#output-formatting) section below for other output
options. This example uses the default format...

```ts
benchmark(() => fib(40), { title: "fib", iter: 10, warmup: 5 });
// benchmarking: fib
//         warmup... 3707.17ms (5 runs)
//         executing...
//         total: 7333.72ms, runs: 10
//         mean: 733.37ms, median: 733.79ms, range: [728.58..743.43]
//         q1: 730.98ms, q3: 735.03ms
//         sd: 0.54%

// also returns results:
// {
//   title: "fib",
//   iter: 10,
//   total: 7333.72402,
//   mean: 733.372402,
//   median: 733.794194,
//   min: 728.5808,
//   max: 743.432538,
//   q1: 730.980115,
//   q3: 735.025314,
//   sd: 0.542200865574415
// }
```

### Benchmark suites

Multiple benchmarks can be run sequentially as suite (also returns an array of
all results):

```ts
b.suite(
    [
        { title: "fib2(10)", fn: () => fib2(10) },
        { title: "fib2(20)", fn: () => fib2(20) },
        { title: "fib2(30)", fn: () => fib2(30) },
        { title: "fib2(40)", fn: () => fib2(40) },
    ],
    { iter: 10, size: 100000, warmup: 5, format: b.FORMAT_MD }
)

// |                   Title|    Iter|    Size|       Total|    Mean|  Median|     Min|     Max|      Q1|      Q3|     SD%|
// |------------------------|-------:|-------:|-----------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
// |                fib2(10)|      10|  100000|       54.34|    5.43|    5.15|    4.40|    8.14|    4.84|    6.67|   20.32|
// |                fib2(20)|      10|  100000|      121.24|   12.12|   12.13|   11.73|   12.91|   11.93|   12.35|    2.61|
// |                fib2(30)|      10|  100000|      152.98|   15.30|   14.51|   13.93|   20.77|   14.35|   16.35|   12.65|
// |                fib2(40)|      10|  100000|      164.79|   16.48|   15.60|   15.01|   19.27|   15.42|   18.80|    9.34|
```

Same table as actual Markdown:

|                   Title|    Iter|    Size|       Total|    Mean|  Median|     Min|     Max|      Q1|      Q3|     SD%|
|------------------------|-------:|-------:|-----------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
|                fib2(10)|      10|  100000|       54.34|    5.43|    5.15|    4.40|    8.14|    4.84|    6.67|   20.32|
|                fib2(20)|      10|  100000|      121.24|   12.12|   12.13|   11.73|   12.91|   11.93|   12.35|    2.61|
|                fib2(30)|      10|  100000|      152.98|   15.30|   14.51|   13.93|   20.77|   14.35|   16.35|   12.65|
|                fib2(40)|      10|  100000|      164.79|   16.48|   15.60|   15.01|   19.27|   15.42|   18.80|    9.34|

### Output formatting

The following output formatters are available. Custom formatters can be easily
defined (see source for examples). Formatters are configured via the `format`
option given to `benchmark()` or `suite()`.

- `FORMAT_DEFAULT` - default plain text formatting
- `FORMAT_CSV` - Comma-separated values (w/ column header)
- `FORMAT_MD` - Markdown table format

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-bench,
  title = "@thi.ng/bench",
  author = "Karsten Schmidt",
  note = "https://thi.ng/bench",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0
