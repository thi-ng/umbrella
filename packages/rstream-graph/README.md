# @thi.ng/rstream-graph

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-graph.svg)](https://www.npmjs.com/package/@thi.ng/rstream-graph)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Declarative, reactive dataflow graph construction using
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream),
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom) and [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
primitives.

Stream subscription types act as graph nodes and attached transducers as
graph edges, transforming data for downstream consumers / nodes.
Theoretically, allows cycles and is not restricted to DAG topologies,
but care must be taken to avoid CPU hogging (user's responsibility).

## Installation

```
yarn add @thi.ng/rstream-graph
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/master/packages/paths)
- [@thi.ng/resolve-map](https://github.com/thi-ng/umbrella/tree/master/packages/resolve-map)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

Small(ish), fully commented projects can be found in the `/examples` folder:

* **Dataflow circles** -
  [Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow),
  [Live version](http://demo.thi.ng/umbrella/rstream-dataflow)
* **SVG grid gen** -
  [Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow),
  [Live version](http://demo.thi.ng/umbrella/rstream-dataflow)

More basic:

```typescript
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

Please see documentation in the source code & test cases for further
details.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
