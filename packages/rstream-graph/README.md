<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rstream-graph](https://media.thi.ng/umbrella/banners-20230807/thing-rstream-graph.svg?29e08325)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-graph.svg)](https://www.npmjs.com/package/@thi.ng/rstream-graph)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-graph.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
- [Graph specification](#graph-specification)
- [Authors](#authors)
- [License](#license)

## About

Declarative, reactive dataflow graph construction using
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream),
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
and
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
primitives.

Stream subscription types act as graph nodes and attached transducers as
graph edges, transforming data for downstream consumers / nodes.
Theoretically, allows cycles and is not restricted to DAG topologies,
but care must be taken to avoid CPU hogging if those cycles are causing
synchronous computation loops (it the user's responsibility to avoid
these and keep any cycles async).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-graph%5D+in%3Atitle)

## Related packages

- [@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot) - Graphviz document abstraction & serialization to DOT format
- [@thi.ng/resolve-map](https://github.com/thi-ng/umbrella/tree/develop/packages/resolve-map) - DAG resolution of vanilla objects & arrays with internally linked values
- [@thi.ng/rstream-dot](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-dot) - Graphviz DOT conversion of [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) dataflow graph topologies

## Installation

```bash
yarn add @thi.ng/rstream-graph
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rstream-graph"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rstreamGraph = await import("@thi.ng/rstream-graph");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.01 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/resolve-map](https://github.com/thi-ng/umbrella/tree/develop/packages/resolve-map)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                            | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
|                                                                                                                            | Minimal rstream dataflow graph                                         | [Demo](https://demo.thi.ng/umbrella/rstream-dataflow/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-dataflow)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>        | Interactive grid generator, SVG generation & export, undo/redo support | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/> | rstream based spreadsheet w/ S-expression formula DSL                  | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-graph/)

### Basic usage

```ts
import { Atom } from "@thi.ng/atom";
import * as rs from "@thi.ng/rstream";
import * as rsg from "@thi.ng/rstream-graph";

// (optional) state atom to source value change streams from
const state = new Atom({a: 1, b: 2});

// graph declaration / definition
const graph = rsg.initGraph(state, {
    // this node sources both of its inputs
    // from values in the state atom
    add: {
        fn: rsg.add,
        ins: {
            a: { path: "a" },
            b: { path: "b" }
        },
    },
    // this node receives values from the `add` node
    // and the given iterable
    mul: {
        fn: rsg.mul,
        ins: {
            a: { stream: "/add/node" },
            b: { stream: () => rs.fromIterable([10, 20, 30]) }
        },
    }
});

// (optional) subscribe to individual nodes
graph.mul.subscribe({
    next: (x) => console.log("result:", x)
});

// result: 30
// result: 60
// result: 90

// changes in subscribed atom values flow through the graph
setTimeout(() => state.resetIn("a", 10), 1000);
// result: 360
```

## Graph specification

A dataflow graph spec is a plain object where keys are node names and
their values are `NodeSpec`s, defining a node's inputs, outputs and the
operation to be applied to produce one or more result streams.

```ts
interface NodeSpec {
    fn: NodeFactory<any>;
    ins: IObjectOf<NodeInputSpec>;
    outs?: IObjectOf<NodeOutputSpec>;
}
```

Specification for a single "node" in the dataflow graph. Nodes here are
actually just wrappers of streams / subscriptions (or generally any form
of
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
`ISubscribable`), usually with an associated transducer to transform /
combine the inputs and produce values for the node's result stream.

The `fn` function is responsible to produce such a stream transformer
construct and the library provides several general purpose helpers for
that purpose. The keys used to specify inputs in the `ins` object are
dictated by the actual node `fn` used. Most node functions with multiple
inputs will be implemented as
[`StreamSync`](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream/src/stream-sync.ts)
instances and the input IDs are used to locally rename input streams
within the `StreamSync` container. Alo see `initGraph` and
`nodeFromSpec` (in
[`/src/nodes.ts`](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-graph/src/nodes.ts)
for more details how these specs are compiled into stream constructs.

Specification for a single input, which can be given in different ways:

1) Create a stream of value changes at given path in state
   [Atom](https://github.com/thi-ng/umbrella/e/develop/packages/atom)
   (passed to `initGraph`):

```ts
{ path: "nested.src.path" }
{ path: ["nested", "src", "path"] }
```

2) Reference path to another node's output in the GraphSpec object. See
   [@thi.ng/resolve-map](https://github.com/thi-ng/umbrella/tree/develop/packages/resolve-map)
   for details.

```ts
{ stream: "/node-id/node" } // main node output
{ stream: "/node-id/outs/foo" } // specific output
```

3) Reference another node indirectly. The passed in `resolve` function
   can be used to lookup other nodes, with the same logic as above. E.g.
   the following spec looks up the main output of node "abc" and adds a
   transformed subscription, which is then used as input for current
   node.

```ts
{ stream: (resolve) =>
    resolve("/abc/node").subscribe(map(x => x * 10)) }
```

4) Provide an external input stream:

```ts
{ stream: () => fromIterable([1,2,3], 500) }
```

5) Single value input stream:

```ts
{ const: 1 }
{ const: () => 1 }
```

If the optional `xform` key is given, a subscription with the given
transducer is added to the input and then used as input instead. This is
allows for further pre-processing of inputs.

Please see detailed documentation in the source code & test cases for
further details.

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rstream-graph,
  title = "@thi.ng/rstream-graph",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rstream-graph",
  year = 2018
}
```

## License

&copy; 2018 - 2023 Karsten Schmidt // Apache License 2.0
