<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/dgraph-dot](https://media.thi.ng/umbrella/banners-20230807/thing-dgraph-dot.svg?f014a3fb)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dgraph-dot.svg)](https://www.npmjs.com/package/@thi.ng/dgraph-dot)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dgraph-dot.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdgraph-dot%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/dgraph-dot
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dgraph-dot"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const dgraphDot = await import("@thi.ng/dgraph-dot");
```

Package sizes (brotli'd, pre-treeshake): ESM: 228 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
- [@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                                | Description                                                                    | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/> | Declarative component-based system with central rstream-based pubsub event bus | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus) |

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
