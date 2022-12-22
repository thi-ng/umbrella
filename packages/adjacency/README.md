<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/adjacency](https://media.thi.ng/umbrella/banners-20220914/thing-adjacency.svg?f522aab9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/adjacency.svg)](https://www.npmjs.com/package/@thi.ng/adjacency)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/adjacency.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Graph implementations](#graph-implementations)
  - [Traversals](#traversals)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Sparse & bitwise adjacency matrices, lists and selected traversal algorithms for directed & undirected graphs.

### Graph implementations

The following types all implement the [`IGraph`
interface](https://docs.thi.ng/umbrella/adjacency/interfaces/IGraph.html) and
support both directed & undirected graphs:

- [AdjacencyBitMatrix (bit matrix based)](https://docs.thi.ng/umbrella/adjacency/classes/AdjacencyBitMatrix.html)
- [AdjacencyMatrix (sparse matrix based)](https://docs.thi.ng/umbrella/adjacency/classes/AdjacencyMatrix.html)
- [AdjacencyList](https://docs.thi.ng/umbrella/adjacency/classes/AdjacencyList.html)

### Traversals

- [Breadth-First Search](https://docs.thi.ng/umbrella/adjacency/functions/bfs.html)
- [Depth-First Search](https://docs.thi.ng/umbrella/adjacency/functions/dfs.html)
- [Floyd-Warshall (global shortest paths search)](https://docs.thi.ng/umbrella/adjacency/functions/floydWarshall.html)
- [Minimum Spanning Tree](https://docs.thi.ng/umbrella/adjacency/functions/mst.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Badjacency%5D+in%3Atitle)

## Related packages

- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph) - Type-agnostic directed acyclic graph (DAG) & graph operations

## Installation

```bash
yarn add @thi.ng/adjacency
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/adjacency"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const adjacency = await import("@thi.ng/adjacency");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.54 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/develop/packages/bitfield)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/sparse](https://github.com/thi-ng/umbrella/tree/develop/packages/sparse)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/adjacency/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-adjacency,
  title = "@thi.ng/adjacency",
  author = "Karsten Schmidt",
  note = "https://thi.ng/adjacency",
  year = 2018
}
```

## License

&copy; 2018 - 2022 Karsten Schmidt // Apache License 2.0
