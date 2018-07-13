# @thi.ng/associative

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/associative.svg)](https://www.npmjs.com/package/@thi.ng/associative)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

This package provides alternative `Set` & `Map` data type
implementations with customizable equality semantics, as well as common
operations working with these types:

- Array based `ArraySet`, Linked List based `LLSet`,
  [Skiplist](https://en.wikipedia.org/wiki/Skip_list) based `SortedMap`
  & `SortedSet` and customizable `EquivMap` implement the full ES6
  Map/Set APIs and additional features:
    - range query iterators (via `entries()`, `keys()`, `values()`)
      (sorted types only)
    - `ICopy`, `IEmpty` & `IEquiv` implementations
    - `ICompare` implementation for sorted types
    - multiple value additions / updates / deletions via `into()`,
      `dissoc()` (maps) and `disj()` (sets)
    - configurable key equality & comparison (incl. default
      implementations)
    - getters w/ optional "not-found" default value
    - `fromObject()` converters (for maps only)
- Polymorphic set operations (union, intersection, difference) - works
  with both native and custom Sets and retains their types
- Natural & selective
  [joins](https://en.wikipedia.org/wiki/Relational_algebra#Joins_and_join-like_operators)
  (incl. key renaming, ported from Clojure)
- Key-value pair inversion for maps and vanilla objects
    - i.e. swaps `K => V` to `V => K`
- Single or multi-property index generation for maps and objects
- Key selection & renaming for maps and objects

### Why?

The native ES6 implementations use object reference identity to
determine key containment, but often it's more practical and useful to
use equivalent value semantics for this purpose, especially when keys
are structured data (arrays / objects).

**Note**: It's the user's responsibility to ensure the inserted keys are
kept immutable (even if technically they're not).

### Comparison with ES6 native types

```ts
// first two objects w/ equal values
a = [1, 2];
b = [1, 2];
```

Using native implementations

```ts
set = new Set();
set.add(a);
set.has(b);
// false

map = new Map();
map.set(a, "foo");
map.get(b);
// undefined
```

Using custom implementations:

```ts
import * as assoc from "@thi.ng/associative";

set = new assoc.ArraySet();
set.add(a);
set.add({a: 1});
// ArraySet { [ 1, 2 ], { a: 1 } }
set.has(b);
// true
set.has({a: 1});
// true

set = new assoc.LLSet();
set.add(a);
set.add({a: 1});
// LLSet { [ 1, 2 ], { a: 1 } }
set.has(b);
// true
set.has({a: 1});
// true

// by default EquivMap uses ArraySet for its canonical keys
map = new assoc.EquivMap();

// with custom implementation
map = new assoc.EquivMap(null, { keys: assoc.ArraySet });
map.set(a, "foo");
// EquivMap { [ 1, 2 ] => 'foo' }
map.get(b);
// "foo"

set = new assoc.SortedSet([a, [-1, 2], [-1, -2]]);
// SortedSet { [ -1, -2 ], [ -1, 2 ], [ 1, 2 ] }
set.has(b);
// true

map = new assoc.SortedMap([[a, "foo"], [[-1,-2], "bar"]]);
// SortedMap { [ -1, -2 ] => 'bar', [ 1, 2 ] => 'foo' }
map.get(b);
// "foo"

// key lookup w/ default value
map.get([3,4], "n/a");
// "n/a"
```

## Installation

```bash
yarn add @thi.ng/associative
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/master/packages/compare)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/master/packages/dcons)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/iterators](https://github.com/thi-ng/umbrella/tree/master/packages/iterators)

## Types

### IEquivSet

All `Set` implementations in this package implement the
[IEquivSet](https://github.com/thi-ng/umbrella/tree/master/packages/associative/src/api.ts#L7)
interface, an extension of the native ES6 Set API.

### ArraySet

Simple array based `Set` implementation which by default uses
[@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv/src/index.ts)
for value equivalence checking.

### LLSet

Similar to `ArraySet`, but uses
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/master/packages/dcons) linked list
as backing storage for values.

### EquivMap

This `Map` implementation uses a native ES6 `Map` as backing storage for
its key-value pairs and an additional `IEquivSet` implementation for
canonical keys. By default uses `ArraySet` for this purpose.

### SortedMap

Alternative implementation of the ES6 Map API using a Skip list as
backing store and support for configurable key equality and sorting
semantics. Like with sets, uses @thi.ng/equiv & @thi.ng/compare by
default.

William Pugh's (creator of this data structure) description:

> "Skip lists are probabilistic data structures that have the same
asymptotic expected time bounds as balanced trees, are simpler, faster
and use less space."

Data structure description:

- ftp://ftp.cs.umd.edu/pub/skipLists/skiplists.pdf
- https://en.wikipedia.org/wiki/Skip_list

#### Ranged queries

```ts
map = new assoc.SortedMap([
    ["c", 3], ["a", 1], ["d", 4], ["b", 2]
]);
// SortedMap { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }

// forward selection w/ given start key
// also works with `keys()` and `values()`
[...map.entries("c")]
// [ [ 'c', 3 ], [ 'd', 4 ] ]

// unknown start keys are ok
[...map.entries("cc")]
// [ [ 'd', 4 ] ]

// reverse order
[...map.entries(undefined, true)]
// [ [ 'd', 4 ], [ 'c', 3 ], [ 'b', 2 ], [ 'a', 1 ] ]

// reverse order from start key
[...map.entries("c", true)]
// [ [ 'c', 3 ], [ 'b', 2 ], [ 'a', 1 ] ]
```

### SortedSet

Sorted set implementation with standard ES6 Set API, customizable value
equality and comparison semantics and additional functionality:

- range queries (via `entries`, `keys`, `values`)
- multiple value addition/deletion via `into()` and `disj()`

Furthermore, this class implements the `ICopy`, `IEmpty`, `ICompare` and
`IEquiv` interfaces defined by `@thi.ng/api`. The latter two allow
instances to be used as keys themselves in other data types defined in
this (and other) package(s).

This set uses a `SortedMap` as backing store.

## Usage examples

TODO... Please see
[tests](https://github.com/thi-ng/umbrella/tree/master/packages/associative/test/)
and documentation in source code for now...

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0
