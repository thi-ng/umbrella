# @thi.ng/malloc

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/malloc.svg)](https://www.npmjs.com/package/@thi.ng/malloc)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/malloc.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
    - [MemPool](#mempool)
    - [`malloc(size: number)`](#mallocsize-number)
    - [`mallocAs(type: Type, num: number)`](#mallocastype-type-num-number)
    - [`calloc(size: number)`](#callocsize-number)
    - [`callocAs(type: Type, num: number)`](#callocastype-type-num-number)
    - [`free(addr: number | TypedArray)`](#freeaddr-number--typedarray)
    - [`freeAll()`](#freeall)
    - [`release()`](#release)
    - [`stats()`](#stats)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

TypeScript port of
[thi.ng/tinyalloc](https://github.com/thi-ng/tinyalloc), for raw or
typed array memory pooling and/or hybrid JS/WASM use cases etc. Supports
free block compaction and configurable splitting. Unlike the original,
this implementation does not constrain the overall number of blocks in
use and the only imposed limit is that of the underlying array buffer.

Each `MemPool` instance operates on a single large `ArrayBuffer` used as
backing memory chunk, e.g. the same buffer used by a WASM module.

Even for non-WASM use cases, using this package can drastically speed up
allocation of typed arrays and reduce GC pressure. See
[benchmarks](#benchmarks) below.

## Installation

```bash
yarn add @thi.ng/malloc
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)

## Usage examples

```ts
import { MemPool, Type } from "@thi.ng/malloc";

// create memory w/ optional start allocation address
// (start address can't be zero, reserved for malloc/calloc failure)
const pool = new MemPool(new ArrayBuffer(0x1000), { start: 8 });

// all memory blocks will be aligned to 8-byte boundaries
// size is given in bytes
// returns pointer / index in array buffer
ptr = pool.malloc(16);
// 8

// request memory and return as typed view
// in this case we use number of elements, NOT bytes
vec = pool.mallocAs(Type.F64, 4);
// Float64Array [ 0, 0, 0, 0 ]

// report block stats (sizes & addresses in bytes)
pool.stats();
// { free: { count: 0, size: 0 },
//   used: { count: 2, size: 48 },
//   top: 56,
//   available: 4040,
//   total: 4096 }

// release address or view back into pool / heap
pool.free(ptr);
// true
pool.free(vec);
// true

// pointers / views can only be freed once
pool.free(vec);
// false

// memory blocks are re-merged whenever possible
// likewise, available free blocks might be split
// if smaller size requested...
pool.stats();
// { free: { count: 1, size: 48 },
//   used: { count: 0, size: 0 },
//   top: 56,
//   available: 4040,
//   total: 4096 }
```

## API

### MemPool

The `MemPool` constructor takes an `ArrayBuffer` (or size only) and an
optional `MemPoolOpts` object for specifying start and end addresses
(byte offsets) delineating the allocatable / managed region and other
options.

```ts
// example with default options shown
new MemPool(0x1000, {
    start:    0x8,
    end:      0x1000,
    compact:  true,
    split:    true,
    minSplit: 16
});
```

The default `start` address is 8 and `end` the length of the buffer. This
start address is also the minimum supported address for memory blocks.
Address 0x0 is reserved as return value for allocation errors.

The `compact` option enables recursive compaction / joining of
neighboring free blocks. Enabled by default to minimize fragmentation.

The `split` option is used to enable (default) splitting of a larger
suitable free block when allocating a smaller size. `minSplit` specifies
the minimum excess between requested size and actual block size, i.e. by
default a block will be split during allocation if there're at least 16
bytes left over. The given value should always be a multiple of 8.

### `malloc(size: number)`

Attempts to allocate a new block of memory of given byte size and
returns start address if successful, or zero (`0`) if unsuccessful.
Memory blocks always start at multiples of 8.

### `mallocAs(type: Type, num: number)`

Similar to `malloc()`, but returns a typed array view of desired `type`
and instead of byte size, expects number of elements. Returns `null`, if
allocation failed.

Types are referred to via the `Type` enum, e.g. `Type.F64`:

`U8`, `U8C`, `I8`, `U16`, `I16`, `U32`, `I32`, `F32`, `F64`

### `calloc(size: number)`

Like `malloc()` but zeroes allocated block before returning. Unless the
allocated block is immediately filled with user data, this method is
preferred over `malloc()`.

### `callocAs(type: Type, num: number)`

Like `mallocAs()` but zeroes allocated block before returning.

### `free(addr: number | TypedArray)`

Releases given address or array view back into the pool. Returns `true`
if successful. Only previously allocated addresses or views created by
this instance can be freed and its the user's responsibility to not use
the freed address or view after this call.

### `freeAll()`

Frees all allocated blocks, essentially resets the pool. This is useful
when using a `MemPool` for temporary object allocation within a function
and then calling this method before returning. This is also much cheaper
than individually freeing the blocks.

### `release()`

This completely destroys all internal pool references & state and should
only be used when the pool is no longer needed. The pool is unusable
afterwards. If there're no other external references to the pool's
underlying `ArrayBuffer`, then it will also be garbage collected soon
after.

### `stats()`

Returns pool statistics (see above example).

## Benchmarks

```bash
node bench/index.js
```

```text
1x f64x4 malloc x 8,712,284 ops/sec ±0.39% (92 runs sampled) mean: 0.00011ms
1x f64x4 vanilla x 1,714,557 ops/sec ±2.18% (82 runs sampled) mean: 0.00058ms

6x f64 malloc x 704,920 ops/sec ±1.20% (91 runs sampled) mean: 0.00142ms
6x f64 vanilla x 251,799 ops/sec ±1.87% (84 runs sampled) mean: 0.00397ms
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
