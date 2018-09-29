# @thi.ng/memoize

[![npm version](https://img.shields.io/npm/v/@thi.ng/memoize.svg)](https://www.npmjs.com/package/@thi.ng/memoize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/memoize.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [Optimized version for single arg functions](#optimized-version-for-single-arg-functions)
    - [Arbitrary args](#arbitrary-args)
    - [Via JSON.stringify()](#via-jsonstringify)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package provides different function memoization implementations for
functions with 1 or more arguments and custom result caching using ES6
Map API like implementations. Unlike native ES6 Maps, **the
implementations MUST support value, not referential, equality
semantics** (e.g. those provided by
[@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/master/packages/associative))
or
[@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/master/packages/cache)).
The latter also support automatically pruning of memoization caches,
based on different strategies. See doc strings for further details.

## Installation

```bash
yarn add @thi.ng/memoize
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)

## Usage examples

```ts
import * as m from "@thi.ng/memoize";

// (optional, for custom caching)
import { EquivMap } from "@thi.ng/associative";
import { LRUCache } from "@thi.ng/cache";
```

### Optimized version for single arg functions

```ts
foo = m.memoize1((x) => (console.log("exec"), x * 10));
foo(1);
// exec
// 10
foo(1);
// 10

// with custom cache
foo = m.memoize1(
    (x) => (console.log("exec"), x[0] * 10),
    new EquivMap()
);

foo([1]);
// exec
// 10
foo([1]); // wouldn't work w/ native ES6 Map as cache
// 10

// use LRU cache to limit cache size
foo = m.memoize1(
    (x) => (console.log("exec"), x[0] * 10),
    new LRUCache(null, { maxlen: 3 })
);
```

### Arbitrary args

```ts
dotProduct = m.memoize(
    (x, y) => (console.log("exec"), x[0] * y[0] + x[1] * y[1]),
    new EquivMap()
);

dotProduct([1,2], [3,4]);
// exec
// 11
dotProduct([1,2], [3,4]);
// 11
```

### Via JSON.stringify()

```ts
dotProduct = m.memoizeJ(
    (x, y) => (console.log("exec"), x[0] * y[0] + x[1] * y[1])
);
dotProduct([1,2], [3,4]);
// exec
// 11
dotProduct([1,2], [3,4]);
// 11
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
