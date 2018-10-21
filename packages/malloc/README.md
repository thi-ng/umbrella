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
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

A TypeScript port of
[thi.ng/tinyalloc](https://github.com/thi-ng/tinyalloc) for hybrid
JS/WASM use cases...

See see thi.ng/tinyalloc for diagram and further details.

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
const pool = new MemPool(new ArrayBuffer(0x1000), 8);

// all memory blocks will be aligned to 8-byte boundaries
// size is given in bytes
ptr = pool.malloc(16);
// 8

// request memory and return as typed view
// in this case we use number of elements, NOT bytes
vec = pool.mallocAs(Type.F64, 4);
// Float64Array [ 0, 0, 0, 0 ]

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

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
