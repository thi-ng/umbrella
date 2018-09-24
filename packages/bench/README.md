# @thi.ng/bench

[![npm version](https://img.shields.io/npm/v/@thi.ng/bench.svg)](https://www.npmjs.com/package/@thi.ng/bench)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bench.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Basic, non-precise benchmarking helpers.

This feature was previously part of the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
package.

## Installation

```bash
yarn add @thi.ng/bench
```

## Dependencies

None

## Usage examples

```ts
import { timed, bench } from "@thi.ng/bench";

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

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
