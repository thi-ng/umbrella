<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

TODO

### Basic usage

```ts tangle:export/readme.ts
import { defAdjBitMatrix, type Edge } from "@thi.ng/adjacency";

// relationships
const rels = {
	a: ["b", "c"],
	b: ["d"],
	c: ["d", "e"],
	e: ["a", "d", "b"],
};

// form set of unique node IDs
const nodeIDs = [
	...new Set(Object.entries(rels).flatMap(([id, rels]) => [id, ...rels])),
];

// the current adjacency matrix impls only support numeric node IDs
// therefore, we first map node names to numeric IDs
const index = new Map(nodeIDs.map((id, i) => [id, i]));

// transform relationships into sequence of edges (aka `[from,to]` tuples)
const edges = Object.entries(rels).flatMap(([id, rels]) =>
	rels.map((x) => <Edge>[index.get(id), index.get(x)])
);

// build adjacency matrix, treat as undirected graph
// edges can also be added/removed later
const graph = defAdjBitMatrix(nodeIDs.length, edges, true);

// graph queries
console.log("edges:", graph.numEdges(), "verts:", graph.numVertices());
// edges: 8 verts: 5

// check if vertex/node is present in graph
// (this is implementation specific and for the bitmatrix backed version here
// only true if the vertex has at least 1 edge...)
console.log(graph.hasVertex(index.get("d")!));
// true

// are `a` and `d` connected?
console.log(graph.hasEdge(index.get("a")!, index.get("d")!));
// false

// number of connected nodes for `a`
// (in directed graphs, there's also possibility to distinguish between in/out/inout)
console.log(graph.degree(index.get("a")!));
// 3

// neighbors of `a` (with reverse lookup of node names)
console.log(graph.neighbors(index.get("a")!).map((x) => nodeIDs[x]));
// [ 'b', 'c', 'e' ]

// serialize to GraphViz DOT format (see result visualization below)
console.log(graph.toDot(nodeIDs));
// graph g {
// "d"--"e";
// "c"--"d";
// "c"--"e";
// "b"--"d";
// "b"--"e";
// "a"--"b";
// "a"--"c";
// "a"--"e";
// }

// resize to new capacity & add add/remove vertices/edges
graph.resize(10);

graph.addEdge(4, 5);
graph.removeEdge(0, 1);
```

GraphViz visualization of the above example graph:

![example graph](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/adjacency/readme.png)

<!-- include ../../assets/tpl/footer.md -->
