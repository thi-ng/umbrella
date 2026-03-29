<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dgraph](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-dgraph.svg?27398a04)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dgraph.svg)](https://www.npmjs.com/package/@thi.ng/dgraph)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dgraph.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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
[@thi.ng/associative](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/associative)
maps & sets as backend.

Implementation based on [Stuart Sierra's Clojure version](https://github.com/stuartsierra/dependency).

### Features

- cycle detection
- accessors for direct & transitive dependencies / dependents
- topological sorting
- iterable (in topo order)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bdgraph%5D)

## Support packages

- [@thi.ng/dgraph-dot](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dgraph-dot) - Customizable Graphviz DOT serialization for [@thi.ng/dgraph](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dgraph)

## Related packages

- [@thi.ng/adjacency](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/adjacency) - Sparse & bitwise adjacency matrices, lists and selected traversal algorithms for directed & undirected graphs
- [@thi.ng/dot](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dot) - Graphviz document abstraction & serialization to DOT format
- [@thi.ng/system](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/system) - Minimal and explicit dependency-injection & lifecycle container for stateful app components

## Installation

```bash
yarn add @thi.ng/dgraph
```

ESM import:

```ts
import * as dgr from "@thi.ng/dgraph";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/dgraph"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const dgr = await import("@thi.ng/dgraph");
```

Package sizes (brotli'd, pre-treeshake): ESM: 866 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/associative](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/associative)
- [@thi.ng/equiv](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/equiv)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                              | Live demo | Source                                                                                   |
|:---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------|:----------|:-----------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/package-stats.png" width="240"/> | CLI util to visualize umbrella pkg stats |           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/package-stats) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dgraph/)

```ts
import { defDGraph } from "@thi.ng/dgraph";

g = defDGraph();

// add dependencies (order: a -> b)
g.addDependency([1, 2], [10, 20]);
g.addDependency([3, 4], [30, 40]);
g.addDependency([1, 2], [3, 4]);

// add isolated nodes
g.addNode([100, 200]);

g.sort();
// [[30, 40], [3, 4], [10, 20], [100, 200], [1, 2]]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2015 - 2026 Karsten Schmidt // Apache License 2.0
