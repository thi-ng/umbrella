# @thi.ng/paths

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/paths.svg)](https://www.npmjs.com/package/@thi.ng/paths)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

This library provides immutable and mutable, optimized path-based
accessors for vanilla JS objects.

## Installation

```
yarn add @thi.ng/paths
```

## Usage

```
import * as paths from "@thi.ng/paths";
```

The `getter()` and `setter()` functions transform a path like `a.b.c`
into a function operating directly at the value the path points to in
nested object. For getters, this essentially compiles to `val =
obj.a.b.c`, with the important difference that the function returns
`undefined` if any intermediate values along the lookup path are
undefined (and doesn't throw an error).

The resulting setter function too accepts a single object to operate on
and when called, **immutably** replaces the value at the given path,
i.e. it produces a selective deep copy of obj up until given path. If
any intermediate key is not present in the given object, it creates a
plain empty object for that missing key and descends further along the
path.

```typescript
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

In addition to these higher-order functions, the module also provides
immediate-use wrappers: `getIn()`, `setIn()`, `updateIn()` and
`deleteIn()`. These functions are using `getter` / `setter` internally,
so have same behaviors.

```typescript
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

Only keys in the path will be updated, all other keys present in the
given object retain their original/identical values to provide efficient
structural sharing / re-use. This is the same *behavior* as in Clojure's
immutable maps or those provided by ImmutableJS (albeit those
implementation are completely different - they're using trees, we're
using the ES6 spread op and recursive functional composition to produce
the setter/updater).

```typescript
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
