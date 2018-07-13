# @thi.ng/paths

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/paths.svg)](https://www.npmjs.com/package/@thi.ng/paths)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

This library provides immutable and mutable, optimized path-based
accessors for nested, vanilla JS objects & arrays with structural
sharing.

## Installation

```bash
yarn add @thi.ng/paths
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## Usage

```ts
import * as paths from "@thi.ng/paths";
```

The `getter()`, `setter()` and `updater()` functions compile a lookup
path like `a.b.c` into a function operating directly at the value the
path points to in nested object. For getters, this essentially compiles
to `val = obj.a.b.c`, with the important difference that the function
returns `undefined` if any intermediate values along the lookup path are
undefined (and doesn't throw an error).

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

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
