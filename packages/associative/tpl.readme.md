# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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
- `TrieMap` for string-based keys and `MultiTrie` for array-like keys and
  multiple values per key
- `SparseSet` implementations for numeric values
- Polymorphic set operations (union, intersection, difference) - works
  with both native and custom Sets and retains their types
- Natural & selective
  [joins](https://en.wikipedia.org/wiki/Relational_algebra#Joins_and_join-like_operators)
  (incl. key renaming, ported from Clojure)
- Key-value pair inversion for maps and vanilla objects
    - i.e. swaps `K => V` to `V => K`
- Single or multi-property index generation for maps and objects
- Key selection & renaming / transformations for maps and objects

### Why?

Please see these packages for some example use cases:

- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs)
- [@thi.ng/rstream-query](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-query)

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
set = defArraySet();
set.add(a);
set.add({a: 1});
// ArraySet { [ 1, 2 ], { a: 1 } }
set.has(b);
// true
set.has({a: 1});
// true

set = defLLSet();
set.add(a);
set.add({a: 1});
// LLSet { [ 1, 2 ], { a: 1 } }
set.has(b);
// true
set.has({a: 1});
// true

// by default EquivMap uses ArraySet for its canonical keys
map = defEquivMap();

// with custom implementation
map = defEquivMap(null, { keys: assoc.ArraySet });
map.set(a, "foo");
// EquivMap { [ 1, 2 ] => 'foo' }
map.get(b);
// "foo"

// Hash map w/ user supplied hash code function
// (here using `hash` function for arrays)
import { hash } from "@thi.ng/vectors"

m = defHashMap([], { hash })
m.set([1, 2], "a");
m.set([3, 4, 5], "b");
m.set([1, 2], "c");
// HashMap { [ 1, 2 ] => 'c', [ 3, 4, 5 ] => 'b' }

set = defSortedSet([a, [-1, 2], [-1, -2]]);
// SortedSet { [ -1, -2 ], [ -1, 2 ], [ 1, 2 ] }
set.has(b);
// true

map = defSortedMap([[a, "foo"], [[-1,-2], "bar"]]);
// SortedMap { [ -1, -2 ] => 'bar', [ 1, 2 ] => 'foo' }
map.get(b);
// "foo"

// key lookup w/ default value
map.get([3,4], "n/a");
// "n/a"
```

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

### TrieMap

[Tries](https://en.wikipedia.org/wiki/Trie) (also called Prefix maps) are useful
data structures for search based use cases, auto-complete, text indexing etc.
and provide partial key matching (prefixes), suffix iteration for a common
prefix, longest matching prefix queries etc.

The implementations here too feature ES6 Map-like API, similar to other types in
this package, with some further trie-specific additions.

```ts
const trie = defTrieMap([
  ["hey", "en"],
  ["hello", "en"],
  ["hallo", "de"],
  ["hallo", "de-at"],
  ["hola", "es"],
  ["hold", "en"],
  ["hej", "se"],
]);

trie.knownPrefix("hole")
// "hol"

[...trie.suffixes("he")]
// [ "j", "llo", "y" ]

// w/ prefix included
[...trie.suffixes("he", true)]
// [ "hej", "hello", "hey" ]
```

### MultiTrie

The `MultiTrie` is similar to `TrieMap`, but supports array-like keys and
multiple values per key. Values are stored in sets whose implementation can be
configured via ctor options.

```ts
// init w/ custom value set type (here only for illustration)
const t = defMultiTrie<string[], string>(null, { vals: () => new ArraySet() });

t.add("to be or not to be".split(" "), 1);
t.add("to be or not to be".split(" "), 2);
t.add("to be and to live".split(" "), 3);

t.get("to be or not to be".split(" "))
// Set(2) { 1, 2 }

t.knownPrefix(["to", "be", "not"]);
// [ "to", "be" ]

// auto-complete w/ custom separator between words
[...t.suffixes(["to", "be"], false, "/")]
// [ "and/to/live", "or/not/to/be" ]
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
