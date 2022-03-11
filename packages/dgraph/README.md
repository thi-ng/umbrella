<!-- This file is generated - DO NOT EDIT! -->

# ![dgraph](https://media.thi.ng/umbrella/banners/thing-dgraph.svg?55059134)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dgraph.svg)](https://www.npmjs.com/package/@thi.ng/dgraph)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dgraph.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [Status](#status)
  - [Support packages](#support-packages)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Type-agnostic directed acyclic graph (DAG), using
[@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
maps & sets as backend.

### Features

- cycle detection
- accessors for direct & transitive dependencies / dependents
- topological sorting
- iterable (in topo order)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdgraph%5D+in%3Atitle)

### Support packages

- [@thi.ng/dgraph-dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph-dot) - Customizable Graphviz DOT serialization for [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)

### Related packages

- [@thi.ng/adjacency](https://github.com/thi-ng/umbrella/tree/develop/packages/adjacency) - Sparse & bitwise adjacency matrices and related functions for directed & undirected graphs
- [@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot) - Graphviz document abstraction & serialization to DOT format
- [@thi.ng/system](https://github.com/thi-ng/umbrella/tree/develop/packages/system) - Minimal and explicit dependency-injection & lifecycle container for stateful app components

## Installation

```bash
yarn add @thi.ng/dgraph
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dgraph"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const dgraph = await import("@thi.ng/dgraph");
```

Package sizes (gzipped, pre-treeshake): ESM: 844 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                              | Live demo | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------|:----------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/package-stats.png" width="240"/> | CLI util to visualize umbrella pkg stats |           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/package-stats) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dgraph/)

```ts
import { DGraph } from "@thi.ng/dgraph";

g = new DGraph();

// dependencies from a -> b
g.addDependency([1, 2], [10, 20]);
g.addDependency([3, 4], [30, 40]);
g.addDependency([1, 2], [3, 4]);

// add isolated nodes
g.addNode([100, 200]);

g.sort();
// [[30, 40], [3, 4], [10, 20], [100, 200], [1, 2]]
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dgraph,
  title = "@thi.ng/dgraph",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dgraph",
  year = 2015
}
```

## License

&copy; 2015 - 2022 Karsten Schmidt // Apache Software License 2.0
