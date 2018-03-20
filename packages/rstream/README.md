# @thi.ng/rstream

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream)

Lightweight reactive multi-tap streams and transducer based
transformation pipeline constructs, written in TypeScript.

## About

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

- [merge](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-merge.ts) - unsorted merge from multiple inputs (dynamic add/remove)
- [sync](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/stream-sync.ts) - synchronized merge and labeled tuple objects

### Useful subscription handlers

- [bisect](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/bisect.ts) - split via predicate
- [postWorker](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/post-worker.ts) - send values to workers (incl. optional worker instantiation)
- [resolve](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/resolve.ts) - resolve on-stream promises
- [sidechainPartition](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/sidechain-partition.ts) - emits chunks from source, controlled by sidechain stream
- [sidechainToggle](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/sidechain-toggle.ts) - toggles source based on signals from sidechain
- [trace](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/trace.ts) - debug helper
- [transduce](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/src/subs/transduce.ts) - transduce or just reduce an entire stream into a promise

Furthermore, the
[@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log)
package provides an extensible multi-level, multi-target logging
solution based on this library.

## Conceptual differences to RxJS

- Streams are not the same as Observables: I.e. stream sources are NOT
  (often just cannot) re-run for each new sub added. Only the first sub
  is guaranteed to receive **all** values. Subs added at a later time
  MIGHT not receive earlier emitted values, only the most recent emitted
  and any future ones)
- Every subscription supports any number of subscribers
- Every unsubscription recursively triggers upstream unsubscriptions
  (provided a parent has no other active child subscriptions)
- Every subscription can have its own transducer transforming
  incoming values (possibly into multiple new ones)
- Transducers can create streams themselves (only for `merge()` /
  `sync()`)
- Transducers can cause early stream termination and subsequent unwinding
- Values can be manually injected into the stream pipeline / graph at
  any point
- Every Stream is a subscription
- Unhandled errors in user subscriptions will move subscription into
  error state and cause unsubscription from parent
- *Much* smaller API surface since most common & custom operations can
  be solved via transducers, so less need to provide specialized
  functions (map / filter etc.)
- IMHO less confusing naming / terminology (only streams (producers) &
  subscriptions (consumers))

## Installation

```
yarn add @thi.ng/rstream
```

## Usage examples

### Basic usage patterns

```typescript
import * as rs from "@thi.ng/rstream";
import * as tx from "@thi.ng/transducers";
```

### FPS counter

```typescript
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

### Stream merging

```typescript
new rs.StreamMerge({
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

### Dataflow graph example

TODO see [test](https://github.com/thi-ng/umbrella/tree/master/packages/rstream/test/stream-sync.ts) for now...

```typescript

```

### Central app state atom with reactive undo / redo

```typescript
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
