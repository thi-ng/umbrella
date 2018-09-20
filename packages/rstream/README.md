# @thi.ng/rstream

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream.svg)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Lightweight reactive multi-tap streams and transducer based
transformation pipeline constructs, written in TypeScript.

This library provides & uses three key building blocks for reactive
programming:

- **Stream sources**: event targets, iterables, timers, promises,
  watches, workers, CSP channels, custom...
- **Subscriptions**: chained stream processors, each subscribable
  (one-to-many) itself
- **Transducers**: stream transformers, either as individual
  subscription or to transform values for a single subscription. See
  [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
  for 90+ composable operators.
- **Recursive teardown**: Whenever possible, any unsubscription
  initiates cleanup and propagates to parent(s).

Using these building blocks, a growing number of high-level operations
are provided too:

### Stream creation helpers

- [fromAtom()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/atom.ts) - streams from value changes in atoms/cursors
- [fromChannel()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-csp) - CSP channel to stream conversion
- [fromEvent()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/event.ts) - DOM events
- [fromInterval()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/interval.ts) - interval based counters
- [fromIterable()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/iterable.ts) - arrays, iterators / generators
- [fromPromise()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/promise.ts) - single value stream from promis
- [fromPromises()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/promises.ts) - results from multiple promise
- [fromRAF()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/raf.ts) - requestAnimationFrame() counter (w/ node fallback)
- [fromView()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/view.ts) - derived view changes (see @thi.ng/atom)
- [fromWorker()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/worker.ts) - messages received from worker
- [manual / custom](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream.ts) - anything else

### Stream merging

#### [merge()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-merge.ts) - unsorted merge from multiple inputs (dynamic add/remove)

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rstream-merge.png)

Returns a new `StreamMerge` instance, a subscription type consuming
inputs from multiple inputs and passing received values on to any
subscribers. Input streams can be added and removed dynamically. By
default, `StreamMerge` calls `done()` when the last active input is
done, but this behavior can be overridden via the `close` option (set it
to `false`).

```ts
merge({
  src: [
    fromIterable([1,2,3], 10),
    fromIterable([10,20,30], 21),
    fromIterable([100,200,300], 7),
  ]
}).subscribe(trace());
// 100
// 1
// 200
// 10
// 2
// 300
// 3
// 20
// 30
```

Use the `labeled()` transducer for each input to create a stream of
labeled values and track their provenance:

```ts
merge({
    src: [
        fromIterable([1,2,3]).transform(labeled("a")),
        fromIterable([10,20,30]).transform(labeled("b")),
    ]
}).subscribe(trace());
// ["a", 1]
// ["b", 10]
// ["a", 2]
// ["b", 20]
// ["a", 3]
// ["b", 30]
```

#### [sync()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-sync.ts) - synchronized merge and labeled tuple objects

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rstream-sync.png)

Similar to `StreamMerge` above, but with extra synchronization of
inputs. Before emitting any new values, `StreamSync` collects values
until at least one has been received from *all* inputs. Once that's the
case, the collected values are sent as labeled tuple object to
downstream subscribers. Each value in the emitted tuple objects is
stored under their input stream's ID. Only the last value received from
each input is passed on. After the initial tuple has been emitted, you
can choose from two possible behaviors:

1) Any future change in any input will produce a new result tuple. These
   tuples will retain the most recently read values from other inputs.
   This behavior is the default and illustrated in the above schematic.
2) If the `reset` option is `true`, every input will have to provide at
   least one new value again until another result tuple is produced.

Any done inputs are automatically removed. By default, `StreamSync`
calls `done()` when the last active input is done, but this behavior can
be overridden via the `close` constructor option (set to `false`).

```ts
s = sync({src: [a=new Stream("a"), b=new Stream("b")]});
s.subscribe(trace("result: "));
a.next(1);
b.next(2);
// result: { a: 1, b: 2 }
```

Input streams can be added and removed dynamically and the emitted tuple
size adjusts to the current number of inputs (the next time a value is
received).

If the `reset` option is enabled, the last emitted tuple is allowed to
be incomplete, by default. To only allow complete tuples, also set the
`all` option to `false`.

The synchronization is done via the `partitionSync()` transducer from
the @thi.ng/transducers package. [See this function's docs for further
details](https://github.com/thi-ng/umbrella/tree/master/packages/transducers/src/xform/partition-sync.ts).

### Stream splitting

- [pubsub](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/pubsub.ts) - topic based splitting

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rstream-pubsub.png)

Topic based stream splitter. Applies `topic` function to each
received value and only forwards it to child subscriptions for
returned topic. The actual topic (return value from `topic` fn) can
be of any type, apart from `undefined`. Complex topics (e.g objects /
arrays) are allowed and they're matched with registered topics using
@thi.ng/equiv by default (but customizable via `equiv` option).
Each topic can have any number of subscribers.

If a transducer is specified for the `PubSub`, it is always applied
prior to passing the input to the topic function. I.e. in this case
the topic function will receive the transformed inputs.

PubSub supports dynamic topic subscriptions and unsubscriptions via
`subscribeTopic()` and `unsubscribeTopic()`. However, **the standard
`subscribe()` / `unsubscribe()` methods are NOT supported** (since
meaningless here) and will throw an error! `unsubscribe()` can only be
called WITHOUT argument to unsubscribe the entire `PubSub` instance
(incl. all topic subscriptions) from the parent stream.

#### [bisect()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/bisect.ts) - splitting via predicate

### Side-chaining

#### [sidechainPartition()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/sidechain-partition.ts) - chunks input, controlled by sidechain

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rstream-sidechain-partition.png)

Buffers values from `src` until side chain fires, then emits buffer
(unless empty) and repeats process until either input is done. By
default, the value read from the side chain is ignored, however the
optional predicate can be used to only trigger for specific values /
conditions.

```ts
// merge various event streams
merge([
    fromEvent(document,"mousemove"),
    fromEvent(document,"mousedown"),
    fromEvent(document,"mouseup")
])
// queue event processing to only execute during the
// requestAnimationFrame cycle (RAF)
.subscribe(sidechainPartition(fromRAF()))
.subscribe(trace())
```

#### [sidechainToggle()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/sidechain-toggle.ts) - toggles input, controlled by sidechain

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rstream-sidechain-toggle.png)

Filters values from input based on values received from side chain. By
default, the value read from the side chain is ignored, however the
optional predicate can be used to only trigger for specific
values/conditions. Every time the predicate fn returns true, the filter
will be toggled on/off. Whilst switched off, no input values will be
forwarded.

```ts
// use slower interval stream to toggle main stream on/off
fromInterval(500)
  .subscribe(sidechainToggle(fromInterval(1000)))
  .subscribe(trace());
// 0
// 3
// 4
// 7
// 8
...
```

### Useful subscription ops

- [postWorker](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/post-worker.ts) - send values to workers (incl. optional worker instantiation)
- [resolve](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/resolve.ts) - resolve on-stream promises
- [trace](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/trace.ts) - debug helper
- [transduce](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/transduce.ts) - transduce or just reduce an entire stream into a promise

### Miscellaneous

- Subscriptions implement @thi.ng/api's `IDeref` interface and therefore
  can be used directly in UI components based on
  [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom).

## Supporting packages

- [@thi.ng/rstream-csp](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-csp) - CSP channel-to-stream adapter
- [@thi.ng/rstream-dot](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-dot) - GraphViz DOT conversion of rstream dataflow graph topologies
- [@thi.ng/rstream-gestures](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-gestures) - unified mouse, single-touch & wheel event stream
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph) - declarative dataflow graph construction
- [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log) - extensible multi-level, multi-target structured logging
- [@thi.ng/rstream-query](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-query) - triple store & reactive query engine

## Conceptual differences to RxJS

(No value judgements implied - there's room for both approaches!)

- Streams are not the same as Observables: I.e. stream sources are NOT
  (often just cannot) re-run for each new sub added. Only the first sub
  is guaranteed to receive **all** values. Subs added at a later time
  MIGHT not receive earlier emitted values, but only the most recent
  emitted and any future values)
- Every subscription supports any number of subscribers, which can be
  added/removed at any time
- Every unsubscription recursively triggers upstream unsubscriptions
  (provided a parent has no other active child subscriptions)
- Every subscription can have its own transducer transforming
  incoming values (possibly into multiple new ones)
- Transducers can create streams themselves (only for `merge()` /
  `sync()`)
- Transducers can cause early stream termination and subsequent unwinding
- Values can be manually injected into the stream pipeline / graph at
  any point
- Every Stream also is a subscription
- Unhandled errors in subscriptions will move subscription into error
  state and cause unsubscription from parent (if any). Unhandled errors
  in stream sources will cancel the stream.
- *Much* smaller API surface since most common & custom operations can
  be solved via available transducers. Therefore less need to provide
  specialized functions (map / filter etc.) and more flexibility in
  terms of composing new operations.
- IMHO less confusing naming / terminology (only streams (producers) &
  subscriptions (consumers))

## Installation

```bash
yarn add @thi.ng/rstream
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/master/packages/associative)
- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/master/packages/paths)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

There're several examples using this package in the `/examples`
directory of this repo:

### SVG grid gen

Interactive demo is utilizing the [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph) support package to compute a SVG grid.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-grid)
| [Live version](https://demo.thi.ng/umbrella/rstream-grid)

### Declarative dataflow graph

This demo is utilizing the [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph) support package.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow)
| [Live version](https://demo.thi.ng/umbrella/rstream-dataflow)

### @thi.ng/hdom benchmark

The FPS counter canvas component used in this benchmark is driven by
this package and based on the barebones version shown below.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-benchmark)
| [Live version](https://demo.thi.ng/umbrella/hdom-benchmark/)

### Basic usage patterns

```ts
import * as rs from "@thi.ng/rstream";
import * as tx from "@thi.ng/transducers";
```

### FPS counter

```ts
// requestAnimationFrame() event stream (counter)
// (in Node falls back to `fromInterval(16)`)
const raf = rs.fromRAF();

// add subscription w/ a composed transducer computing
// average FPS of last 10 frames
raf.subscribe(
    {
        next(x) {
            console.log(x.toFixed(1), "fps");
        }
    },
    tx.comp(
        tx.benchmark(),
        tx.movingAverage(10),
        tx.map(x => 1000 / x)
    )
);

// add another subscription (untransformed)
raf.subscribe(rs.trace());

// stop stream after 10 secs
setTimeout(()=> raf.done(), 10000);
```

### StreamMerge

See
[@thi.ng/rstream-gestures](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph)
for a related, but more highlevel approach.

```ts
rs.merge({
    src: [
        rs.fromEvent(document, "mousemove"),
        rs.fromEvent(document, "mousedown"),
        rs.fromEvent(document, "mouseup"),
    ]
})
// add event transformer
.subscribe(tx.map((e) => [e.type, [e.clientX, e.clientY]]))
// add debug subscription
.subscribe(rs.trace());
// ["mousedown", [472, 195]]
// ["mousemove", [472, 197]]
// ["mouseup", [473, 198]]
// ["mousemove", [485, 204]]
// ...
```

### PubSub

```ts
import { mapIndexed } from "@thi.ng/transducers";

pub = rs.pubsub({ topic: (x) => x[0], xform: mapIndexed((i,x) => [x, i]) });
pub.subscribeTopic("e", rs.trace("topic E:"));
pub.subscribeTopic("o", rs.trace("topic O:"));

rs.fromIterable("hello world").subscribe(pub);
// topic E: [ 'e', 1 ]
// topic O: [ 'o', 4 ]
// topic O: [ 'o', 7 ]
// topic E: done
// topic O: done
```

### Dataflow graph example

This example uses [synchronized stream
merging](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-sync.ts#L19)
to implement a dataflow graph whose leaf inputs (and their changes) are
sourced from a central immutable
[atom](https://github.com/thi-ng/umbrella/tree/master/packages/).

```ts
import { Atom } from "@thi.ng/atom/atom";
import { map } from "@thi.ng/transducers";
import * as rs from "@thi.ng/rstream";

// create mutable/watchable container for graph inputs
const graph = new Atom<any>({
    a1: { ports: { a: 1, b: 2 } },
    a2: { ports: { b: 10 } },
    a3: { ports: { c: 0 } },
});

// create a synchronized stream merge from given inputs
const adder = (src) =>
    rs.sync({
        src,
        // define transducer for merged tuple objects
        // summing all values in each tuple
        // (i.e. the values from the input streams)
        xform: map((ports) => {
            let sum = 0;
            for (let p in ports) {
                sum += ports[p];
            }
            return sum;
        }),
        // reset=false will only synchronize *all* inputs for the
        // very 1st merged tuple, then emit updated ones when *any*
        // input has changed with other input values in the tuple
        // remaining the same
        reset: false
    });

// define first dataflow node
// `fromView()` creates a stream of value changes
// for given value path in the above atom
const a1 = adder([
    rs.fromView(graph, "a1.ports.a"),
    rs.fromView(graph, "a1.ports.b"),
]);

// this node computes sum of:
// - prev node
// - view of a2.ports.b value in atom
// - for fun, another external stream (iterable)
const a2 = adder([
    a1,
    rs.fromView(graph, "a2.ports.b"),
    rs.fromIterable([0, 1, 2]),
]);

// last node computes sum of the other 2 nodes
const a3 = adder([a1, a2]);

// add a console.log sub to see results
a3.subscribe(rs.trace("result:"));
// result: 16
// result: 17
// result: 18

// value update in atom triggers recomputation
// of impacted graph nodes (and only those!)
setTimeout(() => graph.resetIn("a2.ports.b", 100), 100);
// result: 108
```

### Central app state atom with reactive undo / redo

```ts
import * as atom from "@thi.ng/atom";
import * as tx from "@thi.ng/transducers";

// central app state / single source of truth
const app = new atom.Atom({ ui: { theme: "dark", mode: false}, foo: "bar" });

// define some cursors for different UI params
const theme = new atom.Cursor(app, "ui.theme");
const mode = new atom.Cursor(app, "ui.mode");

// create streams of cursor value changes
rs.fromAtom(theme).subscribe(rs.trace("theme:"));
// with transducer
rs.fromAtom(mode).subscribe(rs.trace("mode:"), tx.map(mode => mode ? "advanced" : "basic"));
// another one for an hitherto unknown value in app state (via derived view)
rs.fromView(app, "session.user").subscribe(rs.trace("user:"));

// attach history only to `ui` branch
// undo/redo will not record/change other keys in the atom
const hist = new atom.History(new atom.Cursor(app, "ui"));

hist.record(); // record current snapshot
theme.reset("light");
// theme: light

hist.record();
mode.swap(mode => !mode); // toggle mode
// mode: advanced

hist.undo();  // 1st
// mode: basic
// { theme: 'light', mode: false }

hist.undo();  // 2nd
// theme: dark
// { theme: 'dark', mode: false }

hist.redo();  // 1st
// theme: light
// { theme: 'light', mode: false }

// update another part of the app state (DON'T MUTATE!)
app.swap((state) => atom.setIn(state, "session.user", "asterix"));
// user: asterix
// { ui: { theme: 'light', mode: false },
//   foo: 'bar',
//   session: { user: 'asterix' } }

hist.redo(); // redo 2nd time
// mode: advanced
// { theme: 'light', mode: true }

// verify history redo did not destroy other keys
app.deref();
// { ui: { theme: 'light', mode: true },
//   foo: 'bar',
//   session: { user: 'asterix' } }
```

TODO more to come... see tests for now!

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0
