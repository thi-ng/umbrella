<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

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

<!-- include ../../assets/tpl/footer.md -->
