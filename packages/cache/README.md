# @thi.ng/cache

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/cache.svg)](https://www.npmjs.com/package/@thi.ng/cache)

## About

In-memory cache implementations with ES6 Map-like API and different
expunge strategies. Supports any types for both keys & values.

This package is still in early development and currently the only
strategies available are:

- **LRU**: Least Recently Used

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

// caches have a getSet() method to obtain & store a new value if its key is not known
// this process is asynchronous
lru.getSet("boo", ()=> Promise.resolve(999)).then(console.log);
// 999

// the given fn is only called if there's a cache miss (not the case here)
lru.getSet("boo", ()=> Promise.resolve(123)).then(console.log);
// 999

// caches can be limited by actual size rather than number of items
// the meaning of `size` is user-defined
// sizing fns are provided for both keys & values
// here we multiply value size by 8 since JS numbers are doubles by default
lru = new cache.LRUCache<string,number[]>({ maxSize: 32, ksize: (k)=>k.length, vsize: (v) => v.length * 8})
lru.set("a", [1.0, 2.0]);
lru.size
// 17

lru.set("b", [3.0, 4.0]);
// 17 ("a" has been expunged due to max size)

[...lru.keys()]
// [ 'b' ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
