<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

[Skiplist](https://en.wikipedia.org/wiki/Skip_list) based `SortedMap` &
`SortedSet` implementing the full ES6 Map/Set APIs and additional features:

- range query iterators (via `entries()`, `keys()`, `values()`)
- [`ICompare`](https://docs.thi.ng/umbrella/api/interfaces/ICompare.html),
  [`ICopy`](https://docs.thi.ng/umbrella/api/interfaces/ICopy.html),
  [`IEmpty`](https://docs.thi.ng/umbrella/api/interfaces/IEmpty.html) &
  [`IEquiv`](https://docs.thi.ng/umbrella/api/interfaces/IEquiv.html)
  implementations
- multiple value additions / updates / deletions via `.into()`, `.dissoc()` or
  `.disj()`
- configurable key equality & comparison (incl. default implementations)
- getters w/ optional "not-found" default value

The native ES6 implementations use **object reference** identity to determine
key containment, but often it's **more practical and useful to use equivalent
value semantics** for this purpose, especially when keys are structured data
(arrays / objects).

**Note**: It's the user's responsibility to ensure the inserted keys are kept
immutable (even if technically they're not).

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
import { defSortedMap } from "@thi.ng/sorted-map";

map = defSortedMap([
    ["c", 3], ["a", 1], ["d", 4], ["b", 2]
]);
// SortedMap { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }

// all entries
[...map.entries()]
// [ [ 'd', 4 ], [ 'c', 3 ], [ 'b', 2 ], [ 'a', 1 ] ]

// range query w/ given start key
// also works with `keys()` and `values()`
[...map.entries("c")]
// [ [ 'c', 3 ], [ 'd', 4 ] ]

// unknown start keys are ok
[...map.entries("cc")]
// [ [ 'd', 4 ] ]

// range query w/ given MAX key
[...map.entries("c", true)]
// [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

### Basic usage

```ts
import { defSortedSet, defSortedMap } from "@thi.ng/sorted-map";

// define keys w/ equal values
const a = [1, 2];
const b = [1, 2];

const set = defSortedSet([a, [-1, 2], [-1, -2]]);
// SortedSet { [ -1, -2 ], [ -1, 2 ], [ 1, 2 ] }

// `b` was not added directly, but the set uses value equality
set.has(b);
// true

const map = defSortedMap([[a, "foo"], [[-1, -2], "bar"]]);
// SortedMap { [ -1, -2 ] => 'bar', [ 1, 2 ] => 'foo' }

// `b` was not added directly, but the set uses value equality
map.get(b);
// "foo"

// key lookup w/ default value
map.get([3, 4], "n/a");
// "n/a"
```

<!-- include ../../assets/tpl/footer.md -->
