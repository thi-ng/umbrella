<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/memoize](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-memoize.svg?27d4079c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/memoize.svg)](https://www.npmjs.com/package/@thi.ng/memoize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/memoize.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Available memoization functions](#available-memoization-functions)
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

Function memoization with configurable caching and support for async functions.

This package provides different function memoization implementations for
functions with arbitrary arguments and custom result caching using ES6
Map API like implementations. Unlike native ES6 Maps, **the
implementations MUST support value, not just referential, equality
semantics** (e.g. those provided by
[@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative))
or
[@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)).
The latter also support automatically pruning of memoization caches,
based on different strategies. See doc strings for further details.

### Available memoization functions

- [defOnce()](https://docs.thi.ng/umbrella/memoize/functions/defOnce.html)
- [delay()](https://docs.thi.ng/umbrella/memoize/functions/delay.html)
- [doOnce()](https://docs.thi.ng/umbrella/memoize/functions/doOnce.html)
- [memoize()](https://docs.thi.ng/umbrella/memoize/functions/memoize.html) / [memoizeAsync()](https://docs.thi.ng/umbrella/memoize/functions/memoizeAsync.html)
- [memoize1()](https://docs.thi.ng/umbrella/memoize/functions/memoize1.html) / [memoizeAsync1()](https://docs.thi.ng/umbrella/memoize/functions/memoizeAsync1.html)
- [memoizeJ()](https://docs.thi.ng/umbrella/memoize/functions/memoizeJ.html) / [memoizeAsyncJ()](https://docs.thi.ng/umbrella/memoize/functions/memoizeAsyncJ.html)
- [memoizeO()](https://docs.thi.ng/umbrella/memoize/functions/memoizeO.html) / [memoizeAsyncO()](https://docs.thi.ng/umbrella/memoize/functions/memoizeAsyncO.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmemoize%5D+in%3Atitle)

## Related packages

- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache) - In-memory cache implementations with ES6 Map-like API and different eviction strategies

## Installation

```bash
yarn add @thi.ng/memoize
```

ESM import:

```ts
import * as mem from "@thi.ng/memoize";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/memoize"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const mem = await import("@thi.ng/memoize");
```

Package sizes (brotli'd, pre-treeshake): ESM: 507 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Three projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

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
import { memoize1 } from "@thi.ng/memoize";

foo = memoize1((x: number) => {
    console.log("exec");
    return x * 10;
});

foo(1);
// exec
// 10
foo(1);
// 10

import { EquivMap } from "@thi.ng/associative";

// with custom cache
foo = memoize1(
    (x: number[]) => (console.log("exec"), x[0] * 10),
    // custom ES6 Map impl which compares by value, not by reference
    new EquivMap()
);

foo([1]);
// exec
// 10

// would be a cache miss w/ native ES6 Map
// due to lack of value equality semantics
foo([1]);
// 10

import { LRUCache } from "@thi.ng/cache";

// use LRU cache to limit cache size
foo = memoize1(
    (x: number[]) => (console.log("exec"), x[0] * 10),
    new LRUCache(null, { maxlen: 3 })
);
```

### Arbitrary args

```ts
import { memoize } from "@thi.ng/memoize";
import { EquivMap } from "@thi.ng/associative";

const dotProduct = memoize(
    (x: number[], y: number[]) => {
        console.log("exec");
        return x[0] * y[0] + x[1] * y[1];
    },
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
import { memoizeJ } from "@thi.ng/memoize";

const dotProduct = memoizeJ(
    (x: number[], y: number[]) => {
        console.log("exec");
        return x[0] * y[0] + x[1] * y[1];
    }
);

dotProduct([1, 2], [3, 4]);
// exec
// 11

dotProduct([1, 2], [3, 4]);
// 11
```

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
