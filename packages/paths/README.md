<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/paths](https://media.thi.ng/umbrella/banners/thing-paths.svg?1583078711)

[![npm version](https://img.shields.io/npm/v/@thi.ng/paths.svg)](https://www.npmjs.com/package/@thi.ng/paths)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/paths.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Accessors](#accessors)
  - [Type checked versions](#type-checked-versions)
  - [Structural sharing](#structural-sharing)
  - [Mutable setter](#mutable-setter)
  - [Path checking](#path-checking)
- [Authors](#authors)
- [License](#license)

## About

Immutable, optimized and optionally typed path-based object property / array accessors with structural sharing.

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/paths
```

Package sizes (gzipped): ESM: 1.0KB / CJS: 1.1KB / UMD: 1.1KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

### hdom-elm <!-- NOTOC -->

Using hdom in an Elm-like manner

[Live demo](https://demo.thi.ng/umbrella/hdom-elm/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-elm)

### interceptor-basics2 <!-- NOTOC -->

Event handling w/ interceptors and side effects

[Live demo](https://demo.thi.ng/umbrella/interceptor-basics2/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/interceptor-basics2)

### rstream-event-loop <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-event-loop.png)

Minimal demo of using rstream constructs to form an interceptor-style event loop

[Live demo](https://demo.thi.ng/umbrella/rstream-event-loop/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-event-loop)

### todo-list <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/todo-list.png)

Obligatory to-do list example with undo/redo

[Live demo](https://demo.thi.ng/umbrella/todo-list/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/todo-list)

### triple-query <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png)

Triple store query results & sortable table

[Live demo](https://demo.thi.ng/umbrella/triple-query/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)

## API

[Generated API docs](https://docs.thi.ng/umbrella/paths/)

### Accessors

The `getter()`, `setter()` and `updater()` functions compile a lookup
path like `a.b.c` into an optimized function operating directly at the
value the path points to in nested object. For getters, this essentially
compiles to `val = obj.a.b.c`, with the important difference that the
function returns `undefined` if any intermediate values along the lookup
path are undefined (and doesn't throw an error).

The resulting setter function too accepts a single object (or array) to
operate on and when called, **immutably** replaces the value at the
given path, i.e. it produces a selective deep copy of obj up until given
path. If any intermediate key is not present in the given object, it
creates a plain empty object for that missing key and descends further
along the path.

```ts
s = setter("a.b.c");
// or
s = setter(["a","b","c"]);

s({a: {b: {c: 23}}}, 24)
// {a: {b: {c: 24}}}

s({x: 23}, 24)
// { x: 23, a: { b: { c: 24 } } }

s(null, 24)
// { a: { b: { c: 24 } } }
```

Nested value updaters follow a similar pattern, but also take a user
supplied function to apply to the existing value (incl. any other
arguments passed):

```ts
inc = updater("a.b", (x) => x != null ? x + 1 : 1);

inc({a: {b: 10}});
// { a: { b: 11 } }
inc({});
// { a: { b: 1 } }

// with additional arguments
add = updater("a.b", (x, n) => x + n);

add({a: {b: 10}}, 13);
// { a: { b: 23 } }
```

In addition to these higher-order functions, the module also provides
immediate-use wrappers: `getIn()`, `setIn()`, `updateIn()` and
`deleteIn()`. These functions are using `getter` / `setter` internally,
so have same behaviors.

```ts
state = {a: {b: {c: 23}}};

getIn(state, "a.b.c")
// 23

setIn(state, "a.b.c", 24)
// {a: {b: {c: 24}}}

// apply given function to path value
updateIn(state, "a.b.c", x => x + 1)
// {a: {b: {c: 24}}}

// immutably remove path key
deleteIn(state, "a.b.c.")
// {a: {b: {}}}
```

### Type checked versions

Since v2.2.0 type checked versions of the above accessors are available:

- `getterT` / `getInT`
- `setterT` / `setInT`
- `updaterT` / `updateInT`
- `deleteInT`
- `mutatorT` / `mutInT`

These functions use generics (via mapped types) to validate the given
path against the type structure of the state object. Since string paths
cannot be type checked, only path tuples are supported. **Type checking &
inference supports path lengths up to 8** (i.e. levels of
hierarchy) before reverting back to `any`.

```ts
const state = { a: { b: 1, c: ["c1", "c2"] } };

const b = getInT(state, ["a", "b"]); // b inferred as number
const c = getInT(state, ["a", "c"]); // c inferred as string[]
const c1len = getInT(state, ["a", "c", 0, "length"]); // inferred as number

getIn(state, ["a", "d"]); // compile error
getIn(state, ["x"]); // compile error
```

Using the typed checked HOF versions (e.g. `getterT`, `setterT` etc.) is
slightly more verbose due to missing type information of the not yet
know state and the way generics are done in TypeScript:

```ts
// define state structure (see above example)
interface State {
    a: {
        b: number;
        c: string[];
    }
}

// build typed getter for `b` & `c` state
const getB = getterT<State, "a", "b">(["a", "b"]);
const getFirstC = getterT<State, "a", "c", 0>(["a", "c", 0]);

// using `state` from previous example
const b = getB(state); // inferred as number
const c1 = getFirstC(state); // inferred as string
```

Since `deleteInT` immutably removes a key from the given state object, it also returns a new type from which the key has been explicitly removed.

```ts
// again using `state` from above example
// remove nested key `a.c`
const state2 = deleteInT(state, ["a","c"]);

// compile error: "Property `c` does not exist`
state2.a.c;
```

### Structural sharing

Only keys in the path will be updated, all other keys present in the
given object retain their original/identical values to provide efficient
structural sharing / re-use. This is the same *behavior* as in Clojure's
immutable maps or those provided by ImmutableJS (albeit those
implementation are completely different - they're using trees, we're
using the ES6 spread op (for objects, `slice()` for arrays) and dynamic
functional composition to produce the setter/updater).

```ts
s = setter("a.b.c");

// original
a = { x: { y: { z: 1 } }, u: { v: 2 } };
// updated version
b = s(a, 3);
// { x: { y: { z: 1 } }, u: { v: 2 }, a: { b: { c: 3 } } }

// verify anything under keys `x` & `u` is still identical
a.x === b.x // true
a.x.y === b.x.y // true
a.u === b.u; // true
```

### Mutable setter

`mutator()` is the mutable alternative to `setter()`. It returns a
function, which when called, mutates given object / array at given path
location and bails if any intermediate path values are non-indexable
(only the very last path element can be missing in the actual object
structure). If successful, returns original (mutated) object, else
`undefined`. This function too provides optimized versions for path
lengths <= 4.

As with `setIn`, `mutIn` is the immediate use mutator, i.e. the same as:
`mutator(path)(state, val)`.

```ts
mutIn({ a: { b: [10, 20] } }, "a.b.1", 23);
// or
mutIn({ a: { b: [10, 20] } }, ["a", "b", 1], 23);
// { a: { b: [ 10, 23 ] } }

// fails (because of missing path structure in target object)
mutIn({}, "a.b.c", 23);
// undefined
```

### Path checking

The `exists()` function takes an arbitrary object and lookup path.
Descends into object along path and returns true if the full path exists
(even if final leaf value is `null` or `undefined`). Checks are
performed using `hasOwnProperty()`.

```ts
exists({ a: { b: { c: [null] } } }, "a.b.c.0");
// true

exists({ a: { b: { c: [null] } } }, "a.b.c.1");
// false
```

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
