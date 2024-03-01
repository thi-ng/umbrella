<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

### Basic usage

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
import { benchmark } from "@thi.ng/bench";

// fib() function is from previous example above...

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
import { suite, FORMAT_MD } from "@thi.ng/bench";

// fib2() function defined in earlier example above...

suite(
    [
        { title: "fib2(10)", fn: () => fib2(10) },
        { title: "fib2(20)", fn: () => fib2(20) },
        { title: "fib2(30)", fn: () => fib2(30) },
        { title: "fib2(40)", fn: () => fib2(40) },
    ],
    { iter: 10, size: 100000, warmup: 5, format: FORMAT_MD }
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

<!-- include ../../assets/tpl/footer.md -->
