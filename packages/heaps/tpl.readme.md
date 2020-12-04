# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Type agnostic binary heap & d-ary heap implementations with customizable
ordering and fanout / tree arity (in case of `DHeap`). Both `Heap` and
`DHeap` have an identical base API, however the former provides several
additional operations.

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import { Heap, DHeap } from "@thi.ng/heaps";

// with initial values, custom comparator and heap arity
const h = new DHeap<number>(
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

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
