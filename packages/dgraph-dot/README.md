<!-- This file is generated - DO NOT EDIT! -->

# ![dgraph-dot](https://media.thi.ng/umbrella/banners/thing-dgraph-dot.svg?b35ed4d0)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dgraph-dot.svg)](https://www.npmjs.com/package/@thi.ng/dgraph-dot)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dgraph-dot.svg)
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

Customizable Graphviz DOT serialization for [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph).

This package acts as optional glue layer between the
[@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
and
[@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot)
packages. The latter is used to perform the actual
[Graphviz](https://graphviz.org) serialization. Please consult its
readme & source code for visualization options.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdgraph-dot%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/dgraph-dot
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/dgraph-dot?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/dgraph-dot/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 241 bytes / CJS: 292 bytes / UMD: 409 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
- [@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot)

## API

[Generated API docs](https://docs.thi.ng/umbrella/dgraph-dot/)

TODO

```ts
import { defDGraph } from "@thi.ng/dgraph";
import { toDot } from "@thi.ng/dgraph-dot";

// define dependency graph
const graph = defDGraph([
    ["a", "b"],
    ["a", "c"],
    ["b", "d"],
    ["c", "d"],
    ["c", "e"],
]);

// convert to graphviz format
console.log(toDot(graph, { id: (node) => node }));
// digraph g {
// "b"[label="b"];
// "c"[label="c"];
// "d"[label="d"];
// "e"[label="e"];
// "a"[label="a"];
// "b" -> "d";
// "c" -> "d";
// "c" -> "e";
// "a" -> "b";
// "a" -> "c";
// }
```

(Also see
[tests](https://github.com/thi-ng/umbrella/blob/develop/packages/dgraph-dot/test/index.ts))

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dgraph-dot,
  title = "@thi.ng/dgraph-dot",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dgraph-dot",
  year = 2020
}
```

## License

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
