<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
