# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package acts as optional glue layer between the
[@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
and
[@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot)
packages. The latter is used to perform the actual
[Graphviz](https://graphviz.org) serialization. Please consult its
readme & source code for visualization options.

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
