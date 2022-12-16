<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Immutable, semi-functional, structural tree editing, manipulation &
navigation, based on my fork and optimizations to
[fast-zip](https://github.com/postspectacular/fast-zip), which in turn
is based on
[clojure.zip](https://clojure.github.io/clojure/clojure.zip-api.html)
and which itself is based on the original data structure invented by
Gérard Huet in 1997.

Reference: https://en.wikipedia.org/wiki/Zipper_(data_structure)

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

```ts
import { arrayZipper } from "@thi.ng/zipper";

const x = [1, [5, 4, 3, 2], 6];

// create zipper for given array
const a = arrayZipper(x);

// .next navigates to logically next location (depth-first)
// .node retrieves a location's value
a.next.node
// 1

a.next.next.node
// [5, 4, 3, 2]

// all navigation verbs:
// prev, left, right, up, down, leftmost, rightmost
a.next.next.down.rightmost.node
// 2

// navigate to value `3`, remove it
// then append `7` at top level
// and apply changes by requesting root value
// (the latter is the actual zip operation)
a.next.next.down.rightmost.left.remove().up.up.appendChild(7).root
// [ 1, [ 5, 4, 2 ], 6, 7 ]

// the same edits in different order
a.appendChild(7).next.next.down.rightmost.left.remove().root
// [ 1, [ 5, 4, 2 ], 6, 7 ]

// insert child at the front
a.next.next.insertChild(10).root
// [ 1, [ 10, 5, 4, 3, 2 ], 6 ]

// replace the nested array
a.next.next.replace(10).root
// [1, 10, 6]

// all editing is immutable, original is untouched...
x
// [ 1, [ 5, 4, 3, 2 ], 6 ]
```

## Benchmark

For better comparison, the included benchmarks are also ported from the
[fast-zip](https://github.com/postspectacular/fast-zip) package and
measure traversal & editing of a tree of 10 x 10 x 10 values.

Measurements for MBP 2015 2.8GHz, 16GB, node v12.10.0:

```text
$ node bench/index.js

walk:
warmup... 2562ms
warmup... 2469ms
warmup... 2460ms
total: 2476ms, mean: 0.2476ms, runs: 10000

edit:
warmup... 4660ms
warmup... 4573ms
warmup... 4566ms
total: 4616ms, mean: 0.4616ms, runs: 10000
```

<!-- include ../../assets/tpl/footer.md -->
