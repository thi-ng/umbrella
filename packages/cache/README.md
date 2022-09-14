<!-- This file is generated - DO NOT EDIT! -->

# ![cache](https://media.thi.ng/umbrella/banners/thing-cache.svg?799414e6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/cache.svg)](https://www.npmjs.com/package/@thi.ng/cache)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/cache.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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
- Optional item release callbacks (to clean up resources when value is expunged)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcache%5D+in%3Atitle)

### Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - Alternative Map and Set implementations with customizable equality semantics & supporting operations

## Installation

```bash
yarn add @thi.ng/cache
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/cache"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const cache = await import("@thi.ng/cache");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.06 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

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

Removes least recently used items if a new item is added, but would not satisfy cache limit. Every time a cached item is accessed, it's recency is updated.

```ts
import * as cache from "@thi.ng/cache";

// caches can be configured with maxLen, maxSize and sizing functions (see below)
const lru = new cache.LRUCache<string, number>(null, { maxlen: 3 });
lru.set("foo", 23);
lru.set("bar", 42);
lru.set("baz", 66);

lru.has("foo");
// true
// retrieving a value from the cache updates its timestamp
lru.get("foo");
// 23

// caches are fully iterable
// largely intended for inspection, does not update recency
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
lru.getSet("boo", () => Promise.resolve(999)).then(console.log);
// 999

// the given retrieval fn is only called if there's a cache miss
// (not the case here). `getSet()` always returns a promise
lru.getSet("boo", () => Promise.resolve(123)).then(console.log);
// 999

// caches can be limited by size instead of (or in addition to)
// number of items. the meaning of `size` is user-defined.
// sizing fns can be provided for both keys & values (both default to 0)
// here we multiply value size by 8 since JS numbers are doubles by default
// we also provide a release hook for demo purposes

// the first arg is an iterable of KV pairs to store (just as for Map)
lru = new cache.LRUCache<string, number[]>(
    [ ["a", [1.0, 2.0]], ["b", [3.0, 4.0, 5.0]] ],
    {
        maxsize: 32,
        ksize: (k) => k.length,
        vsize: (v) => v.length * 8,
        release: (k, v) => console.log("release", k, v)
    }
);
// release a [1, 2] ("a" is evicted due to maxsize constraint)
lru.size
// 25

[...lru.keys()]
// [ 'b' ]
```

### TLRU

Time-aware LRU cache. Extends LRU strategy with TTL (time-to-live)
values associated with each entry. `has()` will only return `true` and
`get()` only returns a cached value if its TTL hasn't yet expired. When
adding a new value to the cache, first removes expired entries and if
there's still not sufficient space removes entries in LRU order. `set()`
takes an optional entry specific `ttl` arg. If not given, uses the cache
instance's default (provided via ctor option arg). If no instance TTL is
given, TTL defaults to 1 hour.

```ts
// same opts as LRUCache, but here with custom TTL period (in ms)
tlru = new cache.TLRUCache(null, { ttl: 10000 });

// with item specific TTL (500ms)
tlru.set("foo", 42, 500)
```

### MRU

Similar to LRU, but removes most recently accessed items first. [Wikipedia](https://en.wikipedia.org/wiki/Cache_replacement_policies#Most_recently_used_(MRU))

```ts
// same opts as LRUCache
mru = new cache.MRUCache();
```

## Authors

Karsten Schmidt

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

&copy; 2018 - 2022 Karsten Schmidt // Apache Software License 2.0
