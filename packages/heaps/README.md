<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/heaps](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-heaps.svg?148215f4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/heaps.svg)](https://www.npmjs.com/package/@thi.ng/heaps)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/heaps.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

ESM import:

```ts
import * as heaps from "@thi.ng/heaps";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/heaps"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const heaps = await import("@thi.ng/heaps");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.00 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

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
[`PriorityQueue`](https://docs.thi.ng/umbrella/heaps/functions/defPriorityQueue.html)
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
import { defPriorityQueue } from "@thi.ng/heaps";

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2017 - 2025 Karsten Schmidt // Apache License 2.0
