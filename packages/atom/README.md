<!-- This file is generated - DO NOT EDIT! -->

# ![atom](https://media.thi.ng/umbrella/banners-20220914/thing-atom.svg?86d0b56f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/atom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Temporary restrictions](#temporary-restrictions)
- [Breaking changes](#breaking-changes)
  - [4.0.0](#400)
    - [Type checked accessors](#type-checked-accessors)
    - [Factory functions](#factory-functions)
    - [Deprecated](#deprecated)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Atom](#atom)
  - [Transacted updates](#transacted-updates)
    - [Nested transactions](#nested-transactions)
    - [External modifications during active transaction](#external-modifications-during-active-transaction)
  - [Cursor](#cursor)
  - [Derived views](#derived-views)
  - [Undo / Redo history](#undo--redo-history)
- [Authors](#authors)
- [License](#license)

## About

Mutable wrappers for nested immutable values with optional undo/redo history and transaction support.

Additional support for:

- type checked value access for up to 8 levels of nesting (deeper values
  default to `any`)
- watches (listeners)
- derived, eager/lazy view subscriptions (w/ optional transformation)
- cursors (direct R/W access to nested values)
- transacted updates (incl. nested transactions)
- undo/redo history

Together, these types act as building blocks for various application
state handling patterns, specifically aimed (though not exclusively) at
the concept of using a centralized atom around a nested, immutable
object as single source of truth within an application and driving
reactive updates from performed state changes.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Batom%5D+in%3Atitle)

## Temporary restrictions

Due to a change of inferencing rules in TypeScript 4.3 with regards to tuples, the `IReset` and `ISwap` interface definitions in this package had to be updated and removed support for lookup path lengths > 6. This change is expected to be temporary only and is tracked by [#303](https://github.com/thi-ng/umbrella/issues/303).

## Breaking changes

### 4.0.0

#### Type checked accessors

The `resetIn()` and `swapIn()` methods are fully type checked (up to 8
levels deep), with the given value paths (and the new state value) being
validated against the structure of the containers's main value type.
Since that kind of type checking can only be done via tuples, **string
paths are NOT supported anymore** and instead require using the
`resetInUnsafe()` and `swapInUnsafe()` methods, which now provide the
legacy, unchecked update functionality. More details below.

The use of the `Unsafe` suffix is inspired by Rust and, for consistency,
now used across other umbrella packages providing both checked and
unchecked variations.

#### Factory functions

Users are encouraged to use the new set of (type checked) factory
functions in lieu of direct constructor invocations. These functions are
now considered the defacto way to create new instances are generally
starting to be provided more consistently across the umbrella ecosystem.
All of them use the `def` prefix, e.g. `defAtom()`, `defCursor()` etc.
`Unsafe` versions exist for some types too. [More
info](https://github.com/thi-ng/umbrella/issues/210)

#### Deprecated

Derived views can now only be created via `defView()`, `defViewUnsafe()`
(or `new View()`). The `IViewable` interface and `.addView()` methods
have been removed.

## Related packages

- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors) - Interceptor based event bus, side effect & immutable state handling
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths) - Immutable, optimized and optionally typed path-based object property / array accessors with structural sharing
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/atom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/atom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const atom = await import("@thi.ng/atom");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.91 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                 | Description                                                            | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
|                                                                                                                            | BMI calculator in a devcards format                                    | [Demo](https://demo.thi.ng/umbrella/devcards/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/devcards)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>           | Interactive inverse FFT toy synth                                      | [Demo](https://demo.thi.ng/umbrella/fft-synth/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)           |
|                                                                                                                            | Custom dropdown UI component for hdom                                  | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dropdown)       |
|                                                                                                                            | Custom dropdown UI component w/ fuzzy search                           | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown-fuzzy/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dropdown-fuzzy) |
|                                                                                                                            | Using custom hdom context for dynamic UI theming                       | [Demo](https://demo.thi.ng/umbrella/hdom-dyn-context/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dyn-context)    |
|                                                                                                                            | Hiccup / hdom DOM hydration example                                    | [Demo](https://demo.thi.ng/umbrella/hydrate-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hydrate-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>              | Canvas based Immediate Mode GUI components                             | [Demo](https://demo.thi.ng/umbrella/imgui/)               | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)               |
|                                                                                                                            | Basic SPA example with atom-based UI router                            | [Demo](https://demo.thi.ng/umbrella/login-form/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/login-form)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-svg-nodes.png" width="240"/>      | rdom powered SVG graph with draggable nodes                            | [Demo](https://demo.thi.ng/umbrella/rdom-svg-nodes/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-svg-nodes)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>    | Animated Voronoi diagram, cubic splines & SVG download                 | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/router-basics.jpg" width="240"/>       | Complete mini SPA app w/ router & async content loading                | [Demo](https://demo.thi.ng/umbrella/router-basics/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/router-basics)       |
|                                                                                                                            | Minimal rstream dataflow graph                                         | [Demo](https://demo.thi.ng/umbrella/rstream-dataflow/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-dataflow)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>        | Interactive grid generator, SVG generation & export, undo/redo support | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/> | rstream based spreadsheet w/ S-expression formula DSL                  | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-waveform.jpg" width="240"/>        | Additive waveform synthesis & SVG visualization with undo/redo         | [Demo](https://demo.thi.ng/umbrella/svg-waveform/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-waveform)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/todo-list.png" width="240"/>           | Obligatory to-do list example with undo/redo                           | [Demo](https://demo.thi.ng/umbrella/todo-list/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/todo-list)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png" width="240"/>        | Triple store query results & sortable table                            | [Demo](https://demo.thi.ng/umbrella/triple-query/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)        |

## API

[Generated API docs](https://docs.thi.ng/umbrella/atom/)

### Atom

An `Atom` is a mutable (typed) wrapper for supposedly immutable values.
The wrapped value can be obtained via `deref()`, replaced via `reset()`
and updated using `swap()`. An atom too supports the concept of watches,
essentially `onchange` event handlers which are called from `reset` /
`swap` and receive both the old and new atom values.

Note: The [`IDeref`
interface](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html)
is widely supported across many thi.ng/umbrella packages and implemented
by most value wrapper types.

```ts
import { defAtom } from "@thi.ng/atom";

const a = defAtom(23);

// obtain value via deref()
a.deref();
// 23

// add watch to observe value changes
a.addWatch("foo", (id, prev, curr) => console.log(`${id}: ${prev} -> ${curr}`));
// true

// example update function
const add = (x, y) => x + y;

// apply given function to current value
// (incl. any additional arguments passed to swap)
// this is the same as:
// a.reset(adder(a.deref(), 1))
a.swap(add, 1);
// foo: 23 -> 24

// reset atom's value
a.reset(42);
// foo: 24 -> 42
```

When `Atom`-like containers are used to wrap nested object values, the
`resetIn()` / `swapIn()` methods can be used to directly update nested
values. These updates are handled via immutable setters provided by
[@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths).

```ts
const db = defAtom({ a: { b: 1, c: 2 } });

// type checked access
db.resetIn(["a", "b"], 100);
// { a: { b: 100, c: 2 } }

// unchecked access
db.resetInUnsafe("a.b", 100);
// { a: { b: 100, c: 2 } }

// type checked access
// type of `x` in update function is automatically inferred too
db.swapIn(["a", "c"], (x) => x + 1);
// { a: { b: 100, c: 3 } }

// unchecked access
db.swapInUnsafe("a.c", (x) => x + 1);
// { a: { b: 100, c: 4 } }
```

If the update path is created dynamically, you will have to use one of
these approaches:

```ts
interface Item {
    name: string;
}

const db = defAtom<Item[]>([{ name: "thi.ng" }, { name: "atom" }]);

const id = 1;

// using <const> expr
db.resetIn(<const>[id, "name"], "umbrella");

// unchecked
db.resetInUnsafe([id, "name"], "umbrella");

// unchecked (string path)
db.resetInUnsafe(`${id}.name`, "umbrella");
```

### Transacted updates

Since v3.1.0, multiple sequential state updates can be grouped in
transactions and then applied in one go (or canceled altogether). This
can be useful to produce a clean(er) sequence of undo snapshots (see
further below) and avoids multiple / obsolete invocations of watches
caused by each interim state update. Using a transaction, the parent
state is only updated once and watches too are only notified once after
each commit.

Transactions can also be canceled, thus not impacting the parent state
at all.

`Transacted` can wrap any existing
[IAtom](https://docs.thi.ng/umbrella/atom/interfaces/IAtom.html) implementation,
e.g. `Atom`, `Cursor` or `History` instances. `Transacted` also implements
`IAtom` itself...

```ts
const db = defAtom<any>({ a: 1, b: 2 });
const tx = defTransacted(db);

// start transaction
tx.begin();

// alternatively use syntax sugar for:
// `defTransacted(db).begin()`
tx = beginTransaction(db);

// perform multiple updates
// (none of them are applied to the parent state
// until `commit` is called)
// IMPORTANT: calling any of these update methods without
// a running transaction will throw an error!
tx.resetIn(["a"], 11);
tx.resetIn(["c"], 33);

// tx.deref() will always return latest state
tx.deref()
// { a: 11, b: 2, c: 33 }

// however, at this point the parent
// still contains pre-transaction state...
db.deref()
// { a: 1, b: 2 }

// apply all changes at once (or `cancel()` transaction)
tx.commit();
// { a: 11, b: 2, c: 33 }

// verify parent state
db.deref()
// { a: 11, b: 2, c: 33 }
```

#### Nested transactions

Nested transactions on a single `Transacted` instance are **not**
supported and attempting to do so will throw an error. However, nested
transactions can be achieved by wrapping another `Transacted` container.

```ts
const tx1 = beginTransaction(db);
tx1.resetIn(["a"], 10);

// nested transaction
const tx2 = beginTransaction(tx1);
tx2.resetIn(["b"], 20);
tx2.commit();

tx1.commit();

db.deref();
// { a: 10, b: 20 }
```

#### External modifications during active transaction

An error will be thrown if the parent change receives any updates whilst
a transaction is active. This is to guarantee general data integrity and
to signal race conditions due to erroneous / out-of-phase state update
logic.

```ts
const tx = beginTransaction(db);
tx.resetIn(["a"], 10);

// attempting to update parent will throw an error
db.resetIn(["a"], 2);
```

### Cursor

Cursors provide direct & immutable access to a nested value within a
structured atom. The path to the desired value must be provided when the
cursor is created and cannot be changed later. Since v4.0.0, the path
itself is type checked and MUST be compatible with the type of the
parent state (or use `defCursorUnsafe()` as fallback, see [breaking
changes](#breaking-changes)). The path is then compiled into a [getter
and
setter](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
to allow cursors to be used like atoms and update the parent state in an
immutable manner (i.e. producing an optimized copy with structural
sharing of the original (as much as possible)) - see further details
below.

**It's important to remember** that cursors also cause their parent
state (atom or another cursor) to reflect their updated local state.
I.e. any change to a cursor's value propagates up the hierarchy of
parent states and also triggers any watches attached to the parent.

```ts
a = defAtom({a: {b: {c: 1}}})
// cursor to `b` value
b = defCursor(a, "a.b")
// cursor to `c` value, relative to `b`
c = defCursor(b, "c")

c.reset(2);

b.deref();
// { c: 2 }

a.deref();
// { a: { b: { c: 2 } } }
```

For that reason, it's recommended to design the overall data layout
rather wide than deep (my personal limit is 3-4 levels) to minimize the
length of the propagation chain and maximize structural sharing.

```ts
// main state
main = defAtom({ a: { b: { c: 23 }, d: { e: 42 } }, f: 66 });

// cursor to `c` value
cursor = defCursor(main, ["a", "b", "c"]);

// or
cursor = defCursorUnsafe<number>(main, "a.b.c");

// add watch just as with Atom
cursor.addWatch("foo", console.log);

cursor.deref();
// 23

cursor.swap(x => x + 1);
// foo 23 24

main.deref();
// { a: { b: { c: 24 }, d: { e: 42 } }, f: 66 }
```

### Derived views

Whereas cursors provide read/write access to nested key paths within a
state atom, there are many situations when one only requires read access
and the ability to (optionally) produce transformed versions of such a
value. The `View` type provides exactly this functionality:

```ts
db = defAtom({ a: 1, b: { c: 2 } });

// create a view for a's value
viewA = defView(db, ["a"]);

// create a view for c's value w/ transformer
viewC = defView(db, ["b","c"], (x) => x * 10);

// or unchecked
viewC = defViewUnsafe(db, "b.c", (x) => x * 10);

viewA.deref()
// 1

viewC.deref()
// 20

// update the atom
db.resetIn(["b","c"], 3)

// views can indicate if their value has changed
// (will be reset to `false` after each deref)

// here viewA hasn't changed (we only updated `c`)
viewA.changed()
// false
viewC.changed()
// true

// the transformer function is only executed once per value change
viewC.deref()
// 30

// just returns current cached transformed value
viewC.deref()
// 30

// discard views
viewA.release()
viewC.release()
```

Since v1.1.0 views can also be configured to be eager, instead of the
"lazy" default behavior. If the optional `lazy` arg is true (default),
the view's transformer will only be executed with the first `deref()`
after each value change. If `lazy` is false, the transformer function
will be executed immediately after a value change occurred and so can be
used like a selective watch which only triggers if there was an actual
value change (in contrast to normal watches, which execute with each
update, regardless of value change).

Related, the actual value change predicate can be customized. If not
given, the default `@thi.ng/equiv` will be used.

```ts
let x = 0;
let a = defAtom({ value: 1 })

// create an eager view by passing `false` as last arg
view = defView(a, ["value"], (y) => (x = y, y * 10), false);

// check `x` to verify that transformer already has run
x === 1
// true

// reset x
x = 0

// verify transformed value
view.deref() === 10
// true

// verify transformer hasn't rerun because of deref()
x === 0
// true
```

Atoms & views are useful tools for keeping state outside UI components.
Here's an example of a tiny
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
web app, demonstrating how to use derived views to switch the UI for
different application states / modules.

Note: The constrained nature of this next example doesn't really do
justice to the powerful nature of the approach. Also stylistically, in a
larger app we'd want to avoid the use of global variables (apart from
`db`) as done here...

For a more advanced / realworld usage pattern, check the related [event
handling
package](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors)
and bundled
[examples](https://github.com/thi-ng/umbrella/tree/develop/examples/).

This example is also available in standalone form:

[Source](https://github.com/thi-ng/umbrella/tree/develop/examples/login-form) | [Live demo](https://demo.thi.ng/umbrella/login-form/)

```ts
import type { Nullable, Path } from "@thi.ng/api";
import { defAtom, defView } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";
import { capitalize } from "@thi.ng/strings";

interface State {
    state: string;
    error?: string;
    user: {
        name?: string;
    };
}

// central immutable app state
const db = defAtom<State>({ state: "login", user: {} });

// define views for different state values
const appState = defView(db, ["state"]);

// the error view converts the state value into a UI component array
const error = defView(db, ["error"], (error) =>
    error ? ["div.error", error] : null
);

// view transformer for the username value
const user = defView(db, ["user", "name"], (name) =>
    name ? capitalize(name) : null
);

// state update functions

// trigger new route / UI view
const setState = (s: string) => setValue(appState.path, s);

const setError = (err: Nullable<string>) => setValue(error.path, err);

const setUser = (e: Event) => setValue(user.path, (<any>e.target).value);

const setValue = (path: Path, val: any) => db.resetInUnsafe(path, val);

const loginUser = () => {
    if (user.deref() === "admin") {
        setError(null);
        setState("main");
    } else {
        setError("sorry, wrong username (try 'admin')");
    }
};

const logoutUser = () => {
    setValue(user.path, null);
    setState("logout");
};

// UI components for different app states
// note how the value views are used here
const uiViews: any = {
    // dummy login form
    login: () => [
        "div#login",
        ["h1", "Login"],
        // embedded error view (will auto-deref)
        error.deref(),
        ["input", { type: "text", onchange: setUser }],
        ["button", { onclick: loginUser }, "Login"],
    ],
    logout: () => [
        "div#logout",
        ["h1", "Good bye"],
        "You've been logged out. ",
        ["a", { href: "#", onclick: () => setState("login") }, "Log back in?"],
    ],
    main: () => [
        "div#main",
        ["h1", `Welcome, ${user.deref()}!`],
        ["div", "Current app state:"],
        [
            "div",
            [
                "textarea",
                { cols: 40, rows: 10 },
                JSON.stringify(db.deref(), null, 2),
            ],
        ],
        ["button", { onclick: logoutUser }, "Logout"],
    ],
};

// finally define another derived view for the app state value
// including a transformer, which maps the current app state value
// to its correct UI component (incl. a fallback for illegal app states)
const currView = defView(
    db,
    ["state"],
    (state) => uiViews[state] || ["div", ["h1", `No component for state: ${state}`]]
);

// app root component
// embedded view (will auto-deref)
start(() => ["div", currView]);
```

### Undo / Redo history

The `History` type can be used with & behaves just like an `Atom` or
`Cursor`, but too creates snapshots of the current state before applying
the new state. These snapshots are stored in a doubly-linked list and
can be navigated via `.undo()` / `.redo()`. Each time one of these
methods is called, the parent state will be updated and any attached
watches are notified. By default, the history has length of 100 steps,
though this is configurable via ctor args.

```ts
// create history w/ max. 100 steps
db = defHistory(defAtom({ a: 1 }), 100)
db.deref()
// { a: 1 }

db.reset({ a: 2, b: 3 })
db.reset({ b: 4 })

db.undo()
// { a: 2, b: 3 }

db.undo()
// { a: 1 }

db.undo()
// undefined (no more undo possible)
db.canUndo()
// false

db.redo()
// { a: 2, b: 3 }

db.redo()
// { b: 4 }

db.redo()
// undefined (no more redo possible)

db.canRedo()
// false
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-atom,
  title = "@thi.ng/atom",
  author = "Karsten Schmidt",
  note = "https://thi.ng/atom",
  year = 2017
}
```

## License

&copy; 2017 - 2022 Karsten Schmidt // Apache Software License 2.0
