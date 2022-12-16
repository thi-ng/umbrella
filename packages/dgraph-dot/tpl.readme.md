<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package acts as optional glue layer between the
[@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
and
[@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot)
packages. The latter is used to perform the actual
[Graphviz](https://graphviz.org) serialization. Please consult its
readme & source code for visualization options.

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

<!-- include ../../assets/tpl/footer.md -->
