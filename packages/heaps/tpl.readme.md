<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Type agnostic Heap and Priority Queue implementations with customizable
ordering and fanout / tree arity (in case of `DHeap`) and largely unified API:

- Binary heap ([`Heap`](https://docs.thi.ng/umbrella/heaps/classes/heap.html))
- d-ary heap ([`DHeap`](https://docs.thi.ng/umbrella/heaps/classes/dheap.html))
- Pairing heap ([`PairingHeap`](https://docs.thi.ng/umbrella/heaps/classes/pairingheap.html))
- Priority queue ([`PriorityQueue`](https://docs.thi.ng/umbrella/heaps/classes/priorityqueue.html))

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

<!-- include ../../assets/tpl/footer.md -->
