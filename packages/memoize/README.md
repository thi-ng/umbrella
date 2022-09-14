<!-- This file is generated - DO NOT EDIT! -->

# ![memoize](https://media.thi.ng/umbrella/banners-20220914/thing-memoize.svg?2ef19a22)

[![npm version](https://img.shields.io/npm/v/@thi.ng/memoize.svg)](https://www.npmjs.com/package/@thi.ng/memoize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/memoize.svg)
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
  - [Optimized version for single arg functions](#optimized-version-for-single-arg-functions)
  - [Arbitrary args](#arbitrary-args)
  - [Via JSON.stringify()](#via-jsonstringify)
- [Authors](#authors)
- [License](#license)

## About

Function memoization with configurable caching.

This package provides different function memoization implementations for
functions with 1 or more arguments and custom result caching using ES6
Map API like implementations. Unlike native ES6 Maps, **the
implementations MUST support value, not just referential, equality
semantics** (e.g. those provided by
[@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative))
or
[@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)).
The latter also support automatically pruning of memoization caches,
based on different strategies. See doc strings for further details.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmemoize%5D+in%3Atitle)

### Related packages

- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache) - In-memory cache implementations with ES6 Map-like API and different eviction strategies

## Installation

```bash
yarn add @thi.ng/memoize
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/memoize"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const memoize = await import("@thi.ng/memoize");
```

Package sizes (gzipped, pre-treeshake): ESM: 282 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                 | Description                                           | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
|                                                                                                                            | Isolated, component-local DOM updates                 | [Demo](https://demo.thi.ng/umbrella/hdom-local-render/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-local-render)   |
|                                                                                                                            | Basic rstream-gestures multi-touch demo               | [Demo](https://demo.thi.ng/umbrella/multitouch/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/multitouch)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/> | rstream based spreadsheet w/ S-expression formula DSL | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/memoize/)

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

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-memoize,
  title = "@thi.ng/memoize",
  author = "Karsten Schmidt",
  note = "https://thi.ng/memoize",
  year = 2018
}
```

## License

&copy; 2018 - 2022 Karsten Schmidt // Apache Software License 2.0
