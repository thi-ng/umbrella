<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/bench](https://media.thi.ng/umbrella/banners-20230807/thing-bench.svg?7a8d9aad)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bench.svg)](https://www.npmjs.com/package/@thi.ng/bench)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bench.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Benchmarking with statistics](#benchmarking-with-statistics)
  - [Benchmark suites](#benchmark-suites)
  - [Output formatting](#output-formatting)
  - [Profiling](#profiling)
- [Authors](#authors)
- [License](#license)

## About

Benchmarking & profiling utilities w/ various statistics & formatters (CSV, JSON, Markdown etc.).

Though no public API change (only additions), since v2.0.0 this library
internally (via
[`now()`](https://docs.thi.ng/umbrella/bench/functions/now.html)) attempts to
use high-res ES
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
timestamps (in Node via
[`process.hrtime.bigint()`](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process_hrtime_bigint))
or falls back to `performance.now()` or lacking that to `Date.now()`. In all
cases, returns a (possibly rounded) nanosec-scale timestamp, either as `bigint`
or `number`. The
[`timeDiff()`](https://docs.thi.ng/umbrella/bench/functions/timeDiff.html)
function can be used to compute the difference between two such timestamp and
return it as milliseconds.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbench%5D+in%3Atitle)

## Related packages

- [@thi.ng/csv](https://github.com/thi-ng/umbrella/tree/develop/packages/csv) - Customizable, transducer-based CSV parser/object mapper and transformer
- [@thi.ng/markdown-table](https://github.com/thi-ng/umbrella/tree/develop/packages/markdown-table) - Markdown table formatter/generator with support for column alignments

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

```js
const bench = await import("@thi.ng/bench");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.13 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                | Description                                                                      | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg" width="240"/>           | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn-hash.jpg" width="240"/>      | K-nearest neighbor search in an hash grid                                        | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn-hash)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/>   | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg" width="240"/>    | Markdown to Hiccup to HTML parser / transformer                                  | [Demo](https://demo.thi.ng/umbrella/markdown/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>   | Parser grammar livecoding editor/playground & codegen                            | [Demo](https://demo.thi.ng/umbrella/parse-playground/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>      | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel                 | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)      |
|                                                                                                                           | Full umbrella repo doc string search w/ paginated results                        | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/> | Fork-join worker-based raymarch renderer (JS/CPU only)                           | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/bench/)

### Basic usage

```ts id:test-functions
// functions to benchmark...
const fib = (n: number) =>
    n > 2
        ? fib(n - 1) + fib(n - 2)
        : n > 0
            ? 1
            : 0;

const fib2 = (n: number) => {
    const res = [0, 1];
    for(let i = 2; i <= n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }
    return res[n];
};
```

```ts tangle:export/readme1.ts
import { timed, bench } from "@thi.ng/bench";

<<test-functions>>

// measure single execution time
console.log(timed(() => fib(40)));
// 318.86ms
// 102334155

console.log(timed(() => fib2(40)));
// 0.05ms
// 102334155

// measure 1mil iterations (default)
console.log(bench(() => fib(10), 1e6));
// 157.41ms
// 55

console.log(bench(() => fib2(10), 1e6));
// 95.97ms
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

```ts tangle:export/readme2.ts
import { benchmark } from "@thi.ng/bench";

<<test-functions>>

benchmark(() => fib(40), { title: "fib", iter: 10, warmup: 5 });
// benchmarking: fib
//         warmup... 1480.79ms (5 runs)
//         total: 2917.41ms, runs: 10 (@ 1 calls/iter)
//         freq: 3.43 ops/sec
//         mean: 291.74ms, median: 291.67ms, range: [291.51..292.58]
//         q1: 291.55ms, q3: 291.79ms
//         sd: 0.10%

// also returns results:
// {
//   title: "fib",
//   iter: 10,
//   size: 1,
//   total: 2917.4060010000003,
//   freq: 3.4277025537660157,
//   mean: 291.74060010000005,
//   median: 291.668125,
//   min: 291.50624999999997,
//   max: 292.581834,
//   q1: 291.55116699999996,
//   q3: 291.788417,
//   sd: 0.10295312107365955,
// }
```

### Benchmark suites

Multiple benchmarks can be run sequentially as suite (also returns an array of
all results):

```ts tangle:export/readme3.ts
import { suite, FORMAT_MD } from "@thi.ng/bench";

<<test-functions>>

suite(
    [
        { title: "fib2(10)", fn: () => fib2(10) },
        { title: "fib2(20)", fn: () => fib2(20) },
        { title: "fib2(30)", fn: () => fib2(30) },
        { title: "fib2(40)", fn: () => fib2(40) },
    ],
    { iter: 10, size: 100000, warmup: 5, format: FORMAT_MD }
)

// |                   Title|    Iter|    Size|       Total|   Frequency|    Mean|  Median|     Min|     Max|      Q1|      Q3|     SD%|
// |------------------------|-------:|-------:|-----------:|-----------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
// |                fib2(10)|      10|  100000|       93.25| 10723774.45|    9.33|    9.25|    8.94|   10.27|    9.03|    9.46|    4.15|
// |                fib2(20)|      10|  100000|      110.73|  9030823.33|   11.07|   11.02|   10.91|   11.56|   10.92|   11.10|    1.76|
// |                fib2(30)|      10|  100000|      175.10|  5711056.26|   17.51|   17.58|   17.03|   17.65|   17.50|   17.60|    0.96|
// |                fib2(40)|      10|  100000|      200.01|  4999765.64|   20.00|   19.71|   19.34|   21.78|   19.55|   19.91|    3.90|
```

Same table as actual Markdown:

|                   Title|    Iter|    Size|       Total|   Frequency|    Mean|  Median|     Min|     Max|      Q1|      Q3|     SD%|
|------------------------|-------:|-------:|-----------:|-----------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
|                fib2(10)|      10|  100000|       93.25| 10723774.45|    9.33|    9.25|    8.94|   10.27|    9.03|    9.46|    4.15|
|                fib2(20)|      10|  100000|      110.73|  9030823.33|   11.07|   11.02|   10.91|   11.56|   10.92|   11.10|    1.76|
|                fib2(30)|      10|  100000|      175.10|  5711056.26|   17.51|   17.58|   17.03|   17.65|   17.50|   17.60|    0.96|
|                fib2(40)|      10|  100000|      200.01|  4999765.64|   20.00|   19.71|   19.34|   21.78|   19.55|   19.91|    3.90|

### Output formatting

The following output formatters are available. Custom formatters can be easily
defined (see source for examples). Formatters are configured via the `format`
option given to `benchmark()` or `suite()`.

- `FORMAT_DEFAULT` - default plain text formatting
- `FORMAT_CSV` - Comma-separated values (w/ column header)
- `FORMAT_MD` - Markdown table format

### Profiling

Since v3.3.0 the package also provides a basic profiler to take named
measurements and compute derived statistics. The profiler can by dynamically
enabled/disabled, supports recursion and estimates/subtracts its internal
overhead. Results can be obtained as JSON objects or CSV.

```ts
import { Profiler } from "@thi.ng/bench";

// initialize with 1million warmup iterations to compute internal overhead (takes around ~100ms)
const profiler = new Profiler({ warmup: 1e6 });

// recursive function
const countdown = (n, acc = []) => {
    profiler.start("countdown");
    if (n > 0) countdown(n - 1, (acc.push(n),acc));
    profiler.end("countdown");
    return acc;
}

countdown(10);
// [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]

countdown(5);
// [ 5, 4, 3, 2, 1 ]

// obtain results
profiler.deref()
// {
//   countdown: {
//     id: 'countdown',
//     total: 0.028939979283999998,
//     timePerCall: 0.0017023517225882353,
//     totalPercent: 95.99309794988116,
//     calls: 17,
//     callsPercent: 100,
//     maxDepth: 11
//   }
// }

// results formatted as CSV
console.log(profiler.asCSV())
// "id","total (ms)","time/call (ms)","total (%)","calls","calls (%)","max depth"
// "countdown",0.0289,0.0017,17,95.99,100.00,11
```

## Authors

- Karsten Schmidt

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

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
