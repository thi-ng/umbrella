<!-- This file is generated - DO NOT EDIT! -->

# ![heaps](https://media.thi.ng/umbrella/banners-20220914/thing-heaps.svg?c054595d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/heaps.svg)](https://www.npmjs.com/package/@thi.ng/heaps)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/heaps.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Heaps](#heaps)
  - [Priority queue](#priority-queue)
- [Authors](#authors)
- [License](#license)

## About

Various heap implementations for arbitrary values and with customizable ordering.

Type agnostic Heap and Priority Queue implementations with customizable
ordering and fanout / tree arity (in case of `DHeap`) and largely unified API:

- Binary heap ([`Heap`](https://docs.thi.ng/umbrella/heaps/classes/heap.html))
- d-ary heap ([`DHeap`](https://docs.thi.ng/umbrella/heaps/classes/dheap.html))
- Pairing heap ([`PairingHeap`](https://docs.thi.ng/umbrella/heaps/classes/pairingheap.html))
- Priority queue ([`PriorityQueue`](https://docs.thi.ng/umbrella/heaps/classes/priorityqueue.html))

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bheaps%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/heaps
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/heaps"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const heaps = await import("@thi.ng/heaps");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.84 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)

## API

[Generated API docs](https://docs.thi.ng/umbrella/heaps/)

### Heaps

```ts
import { defDHeap } from "@thi.ng/heaps";

// with initial values, custom comparator and heap arity
const h = defDHeap<number>(
    [5, 2, 10, 15, 18, 23, 22, -1],
    {
        // custom comparator
        compare: (a, b) => b - a,
        // branch size (DHeap only)
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

### Priority queue

Even though all provided heap implementations support arbitrary values and
comparators and could be used as-is to implement a priority queue, since v1.3.0
this package also includes a dedicated
[`PriorityQueue`](https://docs.thi.ng/umbrella/heaps/modules.html#defPriorityQueue)
class, a thin veneer wrapper for a backing `Heap` and exposing a PQ-like API for
arbitrary values, with configurable value equality handling and priority
ordering:

- By default higher priority values mean higher priority
- Already queued items can be reprioritized or removed
- The queue head can be inspected via `peek()` and/or `peekPriority()`
  without removing it from the queue
- Multiple items can be added at once via `into()`
- The queue is iterable (in priority order, according to given comparator)

```ts
// use default config
const queue = defPriorityQueue();

// add items
queue.push(["alice", 5]);
queue.into([["bob", 3], ["charlie", 10], ["dora", 8]]);

// peek at top priority item
queue.peek()
// "charlie"
queue.peekPriority()
// 10

// reprioritize
queue.reprioritize("alice", 20)

// retrieve & remove top priority item
queue.pop()
// "alice"
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-heaps,
  title = "@thi.ng/heaps",
  author = "Karsten Schmidt",
  note = "https://thi.ng/heaps",
  year = 2017
}
```

## License

&copy; 2017 - 2022 Karsten Schmidt // Apache Software License 2.0
