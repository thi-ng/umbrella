<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/cache](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-cache.svg?4dc85e1d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/cache.svg)](https://www.npmjs.com/package/@thi.ng/cache)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/cache.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Available strategies](#available-strategies)
  - [Features](#features)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Common config options](#common-config-options)
  - [LRU](#lru)
  - [TLRU](#tlru)
  - [MRU](#mru)
- [Authors](#authors)
- [License](#license)

## About

In-memory cache implementations with different [eviction
strategies](https://en.wikipedia.org/wiki/Cache_replacement_policies).

### Available strategies

- **LRU**: Least Recently Used
- **TLRU**: Time-aware Least Recently Used
- **MRU**: Most Recently Used

### Features

- ES6 Map-like API (with minor differences)
- Supports any types for both keys & values
- Customizable cache limits (no. of items / actual size)
- Customizable key equality checks (@thi.ng/equiv by default)
- Optional item update & release callbacks (e.g. to clean up resources when
  value is being updated or evicted)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcache%5D+in%3Atitle)

## Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - ES Map/Set-compatible implementations with customizable equality semantics & supporting operations

## Installation

```bash
yarn add @thi.ng/cache
```

ESM import:

```ts
import * as cache from "@thi.ng/cache";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/cache"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const cache = await import("@thi.ng/cache");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.09 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                              | Description                                                          | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-table-ssr.png" width="240"/> | Filterable commit log UI w/ minimal server to provide commit history | [Demo](https://demo.thi.ng/umbrella/commit-table-ssr/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-table-ssr) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/cache/)

### Common config options

All caches support at least the following options (all optional):

```ts
interface CacheOpts<K, V> {
    /**
     * Key size calculation
     */
    ksize: (k: K) => number;
    /**
     * Value size calculation
     */
    vsize: (v: V) => number;
    /**
     * Eviction callback to clean up resources
     */
    release: (k: K, v: V) => void;
    /**
     * Update callback to clean up resources
     */
    update: (k: K, vold: V, vnew: V) => void;
    /**
     * Factory for ES6 Map compatible instance
     * to index cache entries
     */
    map: () => Map<K, any>;
    /**
     * Max number of items in cache (default: ∞)
     */
    maxlen: number;
    /**
     * Max cache size (computed via `ksize` & `vsize`) (default: ∞)
     */
    maxsize: number;
}
```

### LRU

Removes least recently used items if a new item is added, but would not satisfy
cache limit. Every time a cached item is accessed, it's recency is updated.

```ts
import { LRUCache } from "@thi.ng/cache";

// caches can be configured with maxlen, maxsize and sizing functions (see below)
const lru = new LRUCache<string, number>(null, { maxlen: 3 });
lru.set("foo", 23);
lru.set("bar", 42);
lru.set("baz", 66);

lru.has("foo");
// true
// retrieving a value from the cache updates its timestamp
lru.get("foo");
// 23

// caches are fully iterable
// largely intended for inspection only, does not update recency
// btw. "foo" appears last since most recently accessed
[...lru]
// [ { k: 'bar', v: 42, s: 0 },
//   { k: 'baz', v: 66, s: 0 },
//   { k: 'foo', v: 23, s: 0 } ]
[...lru.keys()]
// [ 'bar', 'baz', 'foo' ]
[...lru.values()]
// [ 42, 66, 23 ]

// remove from cache
lru.delete("foo");
// true

// caches have a getSet() method to obtain & store a new value
// if its key is not known. this process is asynchronous
lru.getSet("boo", async () => 999).then(console.log);
// 999

// the given retrieval fn is only called if there's a cache miss
// (not the case here). `getSet()` always returns a promise
lru.getSet("boo", async () => 123).then(console.log);
// 999

// caches can be limited by size instead of (or in addition to)
// number of items. the meaning of `size` is user-defined.
// sizing fns can be provided for both keys & values (both default to 0)
// here we multiply value size by 8 since JS numbers are doubles by default
// we also provide a release hook for demo purposes

// the first arg is an iterable of KV pairs to store (just as for Map)
lru = new LRUCache<string, number[]>(
    [ ["a", [1.0, 2.0]], ["b", [3.0, 4.0, 5.0]] ],
    {
        maxsize: 32,
        ksize: (k) => k.length,
        vsize: (v) => v.length * 8,
        release: (k, v) => console.log("release", k, v),
        update: (k, vold, vnew) => console.log("update", k, vold, "->", vnew)
    }
);
// release a [1, 2] ("a" is evicted due to maxsize constraint)
lru.size
// 25

[...lru.keys()]
// [ 'b' ]
```

### TLRU

Time-aware [LRU cache](#lru). Extends LRU strategy with TTL (time-to-live)
values associated with each entry, which has an impact on:

- `has()` only returns `true` if a cached value's TTL hasn't yet expired
- `get()` only returns a cached value if its TTL hasn't yet expired. Using the
  `autoExtend` option given via the cache constructor options, the cache can be
  configured such that a successful cache hit will update/extend the expiry time
  of that respective entry.
- `set()` takes an optional entry specific `ttl` arg. If not given, uses the
  cache's default (provided via ctor option arg). Default TTL is 1 hour.

When adding a new value to the cache, first removes expired entries and if
there's still not sufficient space removes entries in LRU order.

```ts
import { TLRUCache } from "@thi.ng/cache";

// same opts as LRUCache, but here with additional custom TTL period (in ms)
tlru = new TLRUCache(null, { ttl: 10000, autoExtend: true });

// with item specific TTL (500ms)
tlru.set("foo", 42, 500)
```

### MRU

Similar to LRU, but removes most recently accessed items first.
[Wikipedia](https://en.wikipedia.org/wiki/Cache_replacement_policies#Most_recently_used_(MRU))

```ts
import { MRUCache } from "@thi.ng/cache";

// same opts as LRUCache
mru = new MRUCache();
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-cache,
  title = "@thi.ng/cache",
  author = "Karsten Schmidt",
  note = "https://thi.ng/cache",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
