# @thi.ng/rstream

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Support packages](#support-packages)
- [Conceptual differences to RxJS](#conceptual-differences-to-rxjs)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [Realtime crypto candle chart](#realtime-crypto-candle-chart)
    - [Interactive SVG grid generator](#interactive-svg-grid-generator)
    - [Mouse gesture analysis](#mouse-gesture-analysis)
    - [Declarative dataflow graph](#declarative-dataflow-graph)
    - [@thi.ng/hdom benchmark](#thinghdom-benchmark)
- [API](#api)
    - [Stream creation](#stream-creation)
    - [Stream merging](#stream-merging)
    - [Stream splitting](#stream-splitting)
    - [Side-chaining](#side-chaining)
    - [Worker support](#worker-support)
    - [Other subscription ops](#other-subscription-ops)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

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
  for 100+ composable operators.
- **Recursive teardown**: Whenever possible, any unsubscription
  initiates cleanup and propagates to parent(s).

## Support packages

- [@thi.ng/rstream-csp](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-csp) - CSP channel-to-stream adapter
- [@thi.ng/rstream-dot](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-dot) - GraphViz DOT conversion of rstream dataflow graph topologies
- [@thi.ng/rstream-gestures](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-gestures) - unified mouse, single-touch & wheel event stream
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph) - declarative dataflow graph construction
- [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log) - extensible multi-level, multi-target structured logging
- [@thi.ng/rstream-query](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-query) - triple store & query engine

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

Several demos in this repo's [/examples]() directoy are using this package.

A small selection:

### Realtime crypto candle chart

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/crypto-chart.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/crypto-chart) |
[Live version](https://demo.thi.ng/umbrella/crypto-chart/)

### Worker-based mandelbrot fractal renderer

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/mandelbrot.jpg)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/mandelbrot) |
[Live version](https://demo.thi.ng/umbrella/mandelbrot/)

### Interactive SVG grid generator

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/rstream-grid.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-grid) |
[Live version](https://demo.thi.ng/umbrella/rstream-grid/)

### Mouse gesture analysis

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/gesture-analysis.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/gesture-analysis)
| [Live version](https://demo.thi.ng/umbrella/gesture-analysis)

### Declarative dataflow graph

This demo is utilizing the [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph) support package.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow)
| [Live version](https://demo.thi.ng/umbrella/rstream-dataflow)

### @thi.ng/hdom benchmark

The FPS counter canvas component used in this benchmark is driven by
this package.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-benchmark)
| [Live version](https://demo.thi.ng/umbrella/hdom-benchmark/)

## API

### Stream creation

#### [stream()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream.ts)

Creates a new `Stream` instance, optionally with given `StreamSource`
function and / or ID. If a `src` function is provided, the function
will be only called (with the `Stream` instance as single argument)
once the first subscriber has attached to the stream. If the function
returns another function, it will be used for cleanup purposes if the
stream is cancelled, e.g. if the last subscriber has unsubscribed.
Streams are intended as (primarily async) data sources in a dataflow
graph and are the primary construct for the various `from*()`
functions provided by the package. However, streams can also be
triggered manually (from outside the stream), in which case the user
should call `stream.next()` to cause value propagation.

```ts
a = rs.stream((s) => {
    s.next(1);
    s.next(2);
    s.done()
});
a.subscribe(trace("a"))
// a 1
// a 2
// a done

// as reactive value mechanism
b = rs.stream();
// or alternatively
// b = rs.subscription();

b.subscribe(trace("b1"));
b.subscribe(trace("b2"));

// external trigger
b.next(42);
// b1 42
// b2 42
```

`Stream`s (like `Subscription`s) implement the @thi.ng/api `IDeref`
interface which provides read access to a stream's last received value.
This is useful for various purposes, e.g. in combination with
@thi.ng/hdom, which supports direct embedding of streams (i.e. their
values) into UI components (and will be deref'd automatically). If the
stream has not yet emitted a value or if the stream is done, it will
deref to `undefined`.

#### [subscription()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subscription.ts)

Creates a new `Subscription` instance, the fundamental datatype &
building block provided by this package (`Stream`s are `Subscription`s
too). Subscriptions can be:

- linked into directed graphs (if async, not necessarily DAGs)
- transformed using transducers (incl. early termination)
- can have any number of subscribers (optionally each w/ their own
  transducer)
- recursively unsubscribe themselves from parent after their last
  subscriber unsubscribed
- will go into a non-recoverable error state if NONE of the subscribers
  has an error handler itself
- implement the @thi.ng/api `IDeref` interface

```ts
// as reactive value mechanism (same as with stream() above)
s = rs.subscription();
s.subscribe(rs.trace("s1"));
s.subscribe(rs.trace("s2"), tx.filter((x) => x > 25));

// external trigger
s.next(23);
// s1 23
s.next(42);
// s2 42
// s1 42
```

#### Other stream creation helpers

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
- [trigger()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/trigger.ts) - one-off events

### Stream merging

#### [merge()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-merge.ts) - unsorted merge from multiple inputs (dynamic add/remove)

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/rstream-merge.png)

Returns a new `StreamMerge` instance, a subscription type consuming
inputs from multiple inputs and passing received values on to any
subscribers. Input streams can be added and removed dynamically. By
default, `StreamMerge` calls `done()` when the last active input is
done, but this behavior can be overridden via the `close` option (set it
to `false`).

```ts
merge({
    // input streams w/ different frequencies
    src: [
        fromIterable([1, 2, 3], 10),
        fromIterable([10, 20, 30], 21),
        fromIterable([100, 200, 300], 7)
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

Use the [`labeled()`
transducer](https://github.com/thi-ng/umbrella/tree/master/packages/transducers/src/xform/labeled.ts)
for each input to create a stream of labeled values and track their
provenance:

```ts
merge({
    src: [
        fromIterable([1, 2, 3]).transform(labeled("a")),
        fromIterable([10, 20, 30]).transform(labeled("b")),
    ]
}).subscribe(trace());
// ["a", 1]
// ["b", 10]
// ["a", 2]
// ["b", 20]
// ["a", 3]
// ["b", 30]
```

See
[StreamMergeOpts](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-merge.ts#L7)
for further reference of the various behavior options.

#### [sync()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-sync.ts) - synchronized merge and labeled tuple objects

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/rstream-sync.png)

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
const a = rs.stream();
const b = rs.stream();
s = sync({ src: { a, b } }).subscribe(trace("result: "));
a.next(1);
b.next(2);
// result: { a: 1, b: 2 }
```

Input streams can be added and removed dynamically and the emitted tuple
size adjusts to the current number of inputs (the next time a value is
received from any input).

If the `reset` option is enabled, the last emitted tuple is allowed to
be incomplete, by default. To only allow complete tuples, also set the
`all` option to `false`.

The synchronization is done via the
[`partitionSync()`](https://github.com/thi-ng/umbrella/tree/master/packages/transducers/src/xform/partition-sync.ts)
transducer from the @thi.ng/transducers package. See this function's
docs for further details.

See
[StreamSyncOpts](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-sync.ts#L12)
for further reference of the various behavior options.

### Stream splitting

#### [pubsub()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/pubsub.ts) - topic based splitting

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/rstream-pubsub.png)

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

Returns a new `PubSub` instance using given predicate `pred` as boolean
topic function and `a` & `b` as subscribers for truthy (`a`) and falsy
`b` values.

```ts
rs.fromIterable([1, 2, 3, 4]).subscribe(
  rs.bisect(
    (x) => !!(x & 1),
    rs.trace("odd"),
    rs.trace("even")
  )
);
// odd 1
// even 2
// odd 3
// even 4
// odd done
// even done
```

If `a` or `b` need to be subscribed to directly, then `a` / `b` MUST be
first created as `Subscription` (if not already) and a reference kept
prior to calling `bisect()`.

```ts
const odd = rs.subscription();
const even = rs.subscription();
odd.subscribe(rs.trace("odd"));
odd.subscribe(rs.trace("odd x10"), tx.map((x)=> x * 10));
even.subscribe(rs.trace("even"));

rs.fromIterable([1, 2, 3, 4]).subscribe(rs.bisect((x) => !!(x & 1), odd, even));
// odd x10 10
// odd 1
// even 2
// odd x10 30
// odd 3
// even 4
// odd done
// odd x10 done
// even done
```

### Side-chaining

#### [sidechainPartition()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/sidechain-partition.ts) - chunks input, controlled by sidechain

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/rstream-sidechain-partition.png)

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

![diagram](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/rstream-sidechain-toggle.png)

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

### Worker support

#### [tunnel()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/tunnel.ts)

Delegate stream value processing to workers and pass on their responses
to downstream subscriptions. Supports multiple worker instances and
worker termination / restart for each new stream value received.

#### [postWorker()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/post-worker.ts)

Send values to workers (incl. optional (inline) worker instantiation)

#### [fromWorker()](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/from/worker.ts)

Create value stream from worker messages.

### Other subscription ops

- [resolve](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/resolve.ts) - resolve on-stream promises
- [trace](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/trace.ts) - debug helper
- [transduce](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/transduce.ts) - transduce or just reduce an entire stream into a promise

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0
