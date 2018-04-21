# @thi.ng/cache

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/cache.svg)](https://www.npmjs.com/package/@thi.ng/cache)

## About

In-memory cache implementations different expunge strategies. This
package is still in early development and currently the only strategies
available are:

- **LRU**: Least Recently Used

### Features

- ES6 Map-like API (with minor differences)
- Supports any types for both keys & values
- Customizable cache limits (no. of items / actual size)
- Customizable key equality checks (@thi.ng/api/equiv by default)
- Optional item release callbacks (to clean up resources when value is expunged)

## Installation

```
yarn add @thi.ng/cache
```

## Usage examples

```typescript
import * as cache from "@thi.ng/cache";

// caches can be configured with maxLen, maxSize and sizing functions (see below)
const lru = new cache.LRUCache<string, number>({ maxLen: 3 });
lru.set("foo", 23);
lru.set("bar", 42);
lru.set("baz", 66);

lru.has("foo");
// true
// retrieving a value from the cache updates its timestamp
lru.get("foo");
// 23

// caches are fully iterable
[...lru]
// [ { k: 'bar', v: 42, s: 0, t: 1524263352848 },
//   { k: 'baz', v: 66, s: 0, t: 1524263353254 },
//   { k: 'foo', v: 23, s: 0, t: 1524263362677 } ]
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

// caches can be limited by actual size instead of (or in addition to)
// number of items. the meaning of `size` is user-defined.
// sizing fns can be provided for both keys & values (both default to 0)
// here we multiply value size by 8 since JS numbers are doubles by default
// also provide a release hook for demo purposes
lru = new cache.LRUCache<string, number[]>({
    maxSize: 32,
    ksize: (k) => k.length,
    vsize: (v) => v.length * 8,
    release: (k, v) => console.log("release", k, v);
});

lru.set("a", [1.0, 2.0]);
lru.size
// 17

lru.set("b", [3.0, 4.0]);
// 17 ("a" has been expunged due to max size constraint)

[...lru.keys()]
// [ 'b' ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
