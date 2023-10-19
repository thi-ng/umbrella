<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

Type-agnostic directed acyclic graph (DAG), using
[@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
maps & sets as backend.

Implementation based on [Stuart Sierra's Clojure version](https://github.com/stuartsierra/dependency).

### Features

- cycle detection
- accessors for direct & transitive dependencies / dependents
- topological sorting
- iterable (in topo order)

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

<!-- include ../../assets/tpl/footer.md -->
