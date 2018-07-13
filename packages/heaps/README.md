# @thi.ng/heaps

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/heaps.svg)](https://www.npmjs.com/package/@thi.ng/heaps)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Type agnostic binary heap & d-ary heap implementations with customizable
ordering and fanout / tree arity (in case of `DHeap`). Both `Heap` and
`DHeap` have identical API.

## Installation

```bash
yarn add @thi.ng/heaps
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/master/packages/compare)

## Usage examples

```ts
import { Heap, DHeap } from "@thi.ng/heaps";

// with initial values, custom comparator and heap arity
const h = new DHeap(
    [5, 2, 10, 15, 18, 23, 22, -1],
    {
        compare: (a,b) => b - a,
        d: 4
    }
);

h.pop();
// 23
h.pop();
// 22

// insert new value unless it's a new root
// else pop and return current root
h.pushPop(16)
// 18

h.push(24);
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0
