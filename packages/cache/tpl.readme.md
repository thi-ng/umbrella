<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

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
import { TLRUCache } from "@thi.ng/cache";

// same opts as LRUCache, but here with custom TTL period (in ms)
tlru = new TLRUCache(null, { ttl: 10000 });

// with item specific TTL (500ms)
tlru.set("foo", 42, 500)
```

### MRU

Similar to LRU, but removes most recently accessed items first. [Wikipedia](https://en.wikipedia.org/wiki/Cache_replacement_policies#Most_recently_used_(MRU))

```ts
import { MRUCache } from "@thi.ng/cache";

// same opts as LRUCache
mru = new MRUCache();
```

<!-- include ../../assets/tpl/footer.md -->
