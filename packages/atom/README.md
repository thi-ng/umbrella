# @thi.ng/atom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Clojure inspired mutable wrappers for (usually) immutable values, with
infrastructure support for:

- watches
- derived view subscriptions
- cursors (direct R/W access to nested values)
- undo/redo history

Together these types act as building blocks for various application
state handling patterns, specifically aimed (though not exclusively) at
the concept of using a nested, immutable, centralized atom as single
source of truth within an application.

### Status

Stable, used in production and in active development.

**Note: On 2018-03-17 this package was split to remain more focused.
Path based getters/setters have been moved into the new
[@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/master/packages/paths)
package. Likewise, all interceptor based event handling functionality
now lives in the
[@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
package.**

## Installation

```bash
yarn add @thi.ng/atom
```

**New since 2018-03-15: You can now create a preconfigured app skeleton
using @thi.ng/atom, @thi.ng/hdom & @thi.ng/router using the
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project
generator:**

```bash
yarn create hdom-app my-app

cd my-app
yarn install
yarn start
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/master/packages/paths)

## Usage examples

Several projects in the
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples/)
directory make heavy use of this library.

### Atom

An `Atom` is a mutable wrapper for immutable values. The wrapped value
can be obtained via `deref()`, replaced via `reset()` and updated using
`swap()`. An atom too supports the concept of watches, essentially
`onchange` event handlers which are called from `reset`/`swap` and
receive both the old and new atom values.

```ts
import * as atom from "@thi.ng/atom";

const a = new atom.Atom(23);

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

### Cursor

Cursors provide direct & immutable access to a nested value within a
structured atom. The path to the desired value must be provided when the
cursor is created and cannot be changed later. The path is then compiled
into a [getter and
setter](https://github.com/thi-ng/umbrella/tree/master/packages/paths)
to allow cursors to be used like atoms and update the parent state in an
immutable manner (i.e. producing an optimized copy with structural
sharing of the original (as much as possible)) - see further details
below.

**It's important to remember** that cursors also cause their parent
state (atom or another cursor) to reflect their updated local state.
I.e. any change to a cursor's value propagates up the hierarchy of
parent states.

```ts
a = new atom.Atom({a: {b: {c: 1}}})
// cursor to `b` value
b=new atom.Cursor(a, "a.b")
// cursor to `c` value, relative to `b`
c=new atom.Cursor(b, "c")

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
main = new atom.Atom({ a: { b: { c: 23 }, d: { e: 42 } }, f: 66 });

// cursor to `c` value
cursor = new atom.Cursor(main, "a.b.c");
// or
cursor = new atom.Cursor(main, ["a","b","c"]);

// alternatively provide path implicitly via lookup & update functions
// both fns will be called with cursor's parent state
// this allows the cursor implementation to work with any data structure
// as long as the updater DOES NOT mutate in place
cursor = new atom.Cursor(
    main,
    (s) => s.a.b.c,
    (s, x) => ({...s, a: {...s.a, b: {...s.a.b, c: x}}})
);

// add watch just as with Atom
cursor.addWatch("foo", console.log);

cursor.deref()
// 23

cursor.swap(x => x + 1);
// foo 23 24

main.deref()
// { a: { b: { c: 24 }, d: { e: 42 } }, f: 66 }
```

### Derived views

Whereas cursors provide read/write access to nested key paths within a
state atom, there are many situations when one only requires read access
and the ability to (optionally) produce transformed versions of such a
value. The `View` type provides exactly this functionality:

```ts
db = new atom.Atom({a: 1, b: {c: 2}});

// create a view for a's value
viewA = db.addView("a");

// create a view for c's value w/ transformer
viewC = db.addView("b.c", (x) => x * 10);

viewA.deref()
// 1

viewC.deref()
// 20

// update the atom
db.swap((state) => atom.setIn(state, "b.c", 3))

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
let x;
let a = new Atom({value: 1})

// create an eager view by passing `false` as last arg
view = a.addView("value", (y) => (x = y, y * 10), false);

// check `x` to verify that transformer already has run
x === 1
// true

// reset x
x = null

// verify transformed value
view.deref() === 10
// true

// verify transformer hasn't rerun because of deref()
x === null
// true
```

Atoms & views are useful tools for keeping state outside UI components.
Here's an example of a tiny
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
web app, demonstrating how to use derived views to switch the UI for
different application states / modules.

Note: The constrained nature of this next example doesn't really do
justice to the powerful nature of the approach. Also stylistically, in a
larger app we'd want to avoid the use of global variables (apart from
`db`) as done here...

For a more advanced / realworld usage pattern, check the related [event
handling
package](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
and bundled
[examples](https://github.com/thi-ng/umbrella/tree/master/examples/).

This example is also available in standalone form:

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/login-form) | [Live demo](https://demo.thi.ng/umbrella/login-form/)

```ts
import { Atom, setIn } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";

// central immutable app state
const db = new Atom({ state: "login" });

// define views for different state values
const appState = db.addView<string>("state");
const error = db.addView<string>("error");
// specify a view transformer for the username value
const user = db.addView<string>(
    "user.name",
    (x) => x ? x.charAt(0).toUpperCase() + x.substr(1) : null
);

// state update functions
const setValue = (path, val) => db.swap((state) => setIn(state, path, val));
const setState = (s) => setValue(appState.path, s);
const setError = (err) => setValue(error.path, err);
const setUser = (e) => setValue(user.path, e.target.value);
const loginUser = () => {
    if (user.deref() && user.deref().toLowerCase() === "admin") {
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

// components for different app states
// note how the value views are used here
const uiViews = {
    // dummy login form
    login: () =>
        ["div#login",
            ["h1", "Login"],
            error.deref() ? ["div.error", error.deref()] : undefined,
            ["input", { type: "text", onchange: setUser }],
            ["button", { onclick: loginUser }, "Login"]
        ],
    logout: () =>
        ["div#logout",
            ["h1", "Good bye"],
            "You've been logged out. ",
            ["a",
                { href: "#", onclick: () => setState("login") },
                "Log back in?"
            ]
        ],
    main: () =>
        ["div#main",
            ["h1", `Welcome, ${user.deref()}!`],
            ["div", "Current app state:"],
            ["div",
                ["textarea",
                    { cols: 40, rows: 10 },
                    JSON.stringify(db.deref(), null, 2)]],
            ["button", { onclick: logoutUser }, "Logout"]
        ]
};

// finally define another derived view for the app state value
// including a transformer, which maps the current app state value
// to its correct UI component (incl. a fallback for illegal app states)
const currView = db.addView(
    appState.path,
    (state) =>
        uiViews[state] ||
        ["div", ["h1", `No component for state: ${state}`]]
);

// app root component
const app = () =>
    ["div#app",
        currView.deref(),
        ["footer", "Made with @thi.ng/atom and @thi.ng/hdom"]];

start(document.body, app);
```

### Undo history

The `History` type can be used with & behaves like an Atom or Cursor,
but creates snapshots of the current state before applying the new
state. By default history has length of 100 steps, but this is
configurable.

```ts
db = new atom.History(new atom.Atom({a: 1}))
db.deref()
// {a: 1}

db.reset({a: 2, b: 3})
db.reset({b: 4})

db.undo()
// {a: 2, b: 3}

db.undo()
// {a: 1}

db.undo()
// undefined (no more undo possible)
db.canUndo()
// false

db.redo()
// {a: 2, b: 3}

db.redo()
// {b: 4}

db.redo()
// undefined (no more redo possible)

db.canRedo()
// false
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
