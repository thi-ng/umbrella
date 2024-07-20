<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

> [!IMPORTANT]
> In July 2024 this package was restructured & split-up to extract some
> features into smaller more focused packages:
>
> - [@thi.ng/bidir-index](https://thi.ng/bidir-index)
> - [@thi.ng/object-utils](https://thi.ng/object-utils)
> - [@thi.ng/sorted-map](https://thi.ng/sorted-map)
> - [@thi.ng/trie](https://thi.ng/trie)

- Array based `ArraySet`, Linked List based `LLSet` and customizable `EquivMap`
  & `HashMap` implementing the full ES6 Map/Set APIs and additional features:
    - `ICopy`, `IEmpty` & `IEquiv` implementations
    - `ICompare` implementation for sorted types
    - multiple value additions / updates / deletions via `into()`, `dissoc()`
      (maps) and `disj()` (sets)
    - configurable key equality & comparison (incl. default implementations)
    - getters w/ optional "not-found" default value
- `SparseSet` implementations for numeric values
- Polymorphic set operations (union, intersection, difference) - works with both
  native and custom Sets and retains their types
- Natural & selective
  [joins](https://en.wikipedia.org/wiki/Relational_algebra#Joins_and_join-like_operators)
  (incl. key renaming, ported from Clojure)

Please see these packages for some example use cases:

- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs)
- [@thi.ng/rstream-query](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-query)

### Why?

The native ES6 implementations use **object reference** identity to determine
key containment, but often it's **more practical and useful to use equivalent
value semantics** for this purpose, especially when keys are structured data
(arrays / objects).

**Note**: It's the user's responsibility to ensure the inserted keys are kept
immutable (even if technically they're not).

### Comparison with ES6 native types

```ts
// first two objects w/ equal values
const a = [1, 2];
const b = [1, 2];
```

Using native implementations

```ts
const set = new Set();
set.add(a);
set.has(b);
// false

const map = new Map();
map.set(a, "foo");
map.get(b);
// undefined
```

Using custom implementations:

```ts
import { defArraySet } from "@thi.ng/associative";

const set = defArraySet();
set.add(a);
set.add({a: 1});
// ArraySet { [ 1, 2 ], { a: 1 } }
set.has(b);
// true
set.has({a: 1});
// true
```

```ts
import { defLLSet } from "@thi.ng/associative";

const set = defLLSet();
set.add(a);
set.add({a: 1});
// LLSet { [ 1, 2 ], { a: 1 } }

set.has(b);
// true

set.has({a: 1});
// true
```

```ts
import { defEquivMap, ArraySet } from "@thi.ng/associative";

// by default EquivMap uses ArraySet for its canonical keys
// const map = defEquivMap();

// with custom implementation
const map = defEquivMap(null, { keys: ArraySet });
map.set(a, "foo");
// EquivMap { [ 1, 2 ] => 'foo' }

map.get(b);
// "foo"
```

```ts
import { defHashMap } from "@thi.ng/associative";
import { hash } from "@thi.ng/vectors"

// Hash map w/ user supplied hash code function
// (here using `hash` function for arrays)
const map = defHashMap([], { hash })
map.set([1, 2], "a");
map.set([3, 4, 5], "b");
map.set([1, 2], "c");
// HashMap { [ 1, 2 ] => 'c', [ 3, 4, 5 ] => 'b' }
```

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

### IEquivSet

All `Set` implementations in this package implement the
[`IEquivSet`](https://docs.thi.ng/umbrella/associative/interfaces/IEquivSet.html)
interface, an extension of the native ES6 Set API.

### ArraySet

Simple array based `Set` implementation which by default uses
[`@thi.ng/equiv`](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
for value equivalence checking.

### LLSet

Similar to `ArraySet`, but uses
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons) linked list
as backing storage for values.

### EquivMap

This `Map` implementation uses a native ES6 `Map` as backing storage for
its key-value pairs and an additional `IEquivSet` implementation for
canonical keys. By default uses `ArraySet` for this purpose.

### HashMap

Map implementation w/ standard ES6 Map API, supporting any key type via
hash codes computed via user supplied hash function. Uses [Open
Addressing](https://en.wikipedia.org/wiki/Open_addressing) / Linear
Probing to resolve key collisions. Customizable via `HashMapOpts`
constructor argument. Hash function MUST be given.

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
import { defSortedMap } from "@thi.ng/associative";

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

### SparseSet8/16/32

[Sparse sets](https://research.swtch.com/sparse) provide super fast
(approx. 4x faster than the native `Set` impl) insertion & lookups for
numeric values in the interval `[0..n)` . The implementation in this
package provides most of the ES6 Set API and internally relies on 2 uint
typed arrays, with the actual backing type dependent on `n`.

Furthermore, unless (or until) values are being removed from the set,
they retain their original insertion order. For some use cases (e.g.
deduplication of values), this property can be very useful.

```ts
import { defSparseSet } from "@thi.ng/associative";

// create sparse set for value range 0 - 99 (uint8 backed)
const a = defSparseSet(100);
a.into([99, 42, 66, 23, 66, 42]);
// SparseSet8 { 99, 42, 66, 23 }

a.has(66)
// true

// sparse sets are iterable
[...a]
// [ 99, 42, 66, 23 ]

// attempting to add out-of-range values will fail
a.add(100)
// SparseSet8 { 99, 42, 66, 23 }

// create sparse set for 16 bit value range 0 - 0xffff (uint16 backed)
const b = defSparseSet(0x10000);
// SparseSet16 {}
```

<!-- include ../../assets/tpl/footer.md -->
