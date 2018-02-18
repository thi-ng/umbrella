# @thi.ng/rstream

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream)

Lightweight reactive multi-tap streams and transducer based transformation
pipeline constructs, written in TypeScript.

# About

This library provides & uses three key building blocks for reactive programming:

- **Stream sources**: event targets, iterables, timers, promises, watches, workers, CSP channels, custom...
- **Subscriptions**: chained stream processors, each subscribable itself
- **Transducers**: stream transformers, individually or as part of a single subscription, see [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers).

Using these building blocks, a growing number of high-level operations are provided too:

- stream merging
- pubsub
- sidechain partitioning (emits chunks from source, controlled by sidechain stream)
- sidechain toggle (toggles source based on signals from sidechain)

Furthermore, the
[@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log)
package provides an extensible multi-level, multi-target logging solution based
on this library.

TODO

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
// another one for an hitherto unknown value in app state
rs.fromAtom(new atom.Cursor(app, "session.user")).subscribe(rs.trace("user:"));

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
