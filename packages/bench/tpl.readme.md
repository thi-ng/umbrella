# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Though no public API change (only additions), since v2.0.0 this library
internally attempts to use high-res ES
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
timestamps (in Node via
[`process.hrtime.bigint()`](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process_hrtime_bigint)).
If `BigInt` is not available in the target environment, timestamps are
still only sourced via `Date.now()`.

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
