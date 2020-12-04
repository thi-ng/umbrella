<!-- This file is generated - DO NOT EDIT! -->

# ![heaps](https://media.thi.ng/umbrella/banners/thing-heaps.svg?bbf868b8)

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
- [Authors](#authors)
- [License](#license)

## About

Various heap implementations for arbitrary values and with customizable ordering.

Type agnostic binary heap & d-ary heap implementations with customizable
ordering and fanout / tree arity (in case of `DHeap`). Both `Heap` and
`DHeap` have an identical base API, however the former provides several
additional operations.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bheaps%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/heaps
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/heaps?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/heaps/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.53 KB / CJS: 1.59 KB / UMD: 1.69 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)

## API

[Generated API docs](https://docs.thi.ng/umbrella/heaps/)

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

&copy; 2017 - 2020 Karsten Schmidt // Apache Software License 2.0
