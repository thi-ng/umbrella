# @thi.ng/associative

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/associative.svg)](https://www.npmjs.com/package/@thi.ng/associative)

## About

This package provided alternative Set & Map data type implementations
with customizable equality semantics, as well as common operations
working with these types:

- `EquivSet` & `EquivMap` types implement the full ES6 Set/Map APIs
- Polymorphic set operations (union, intersection, difference) - works
  with both native and custom Sets and retains their types
- Natural & selective
  [joins](https://en.wikipedia.org/wiki/Relational_algebra#Joins_and_join-like_operators)
  (incl. key renaming, ported from Clojure)
- Key-value pair inversion for maps and vanilla objects (`K -> V => V -> K`)
- Single or multi-property index generation for maps and objects
- Key selection & renaming for maps and objects

### Why?

The native ES6 implementations use object reference identity to
determine key containment, but often it's more practical and useful to
use equivalent value semantics for this purpose, especially when keys
are structured data (arrays / objects).

**Note**: It's the user's responsibility to ensure the inserted keys are
kept immutable (even if technically they're not).

### Comparison

```ts
// two objects w/ equal values
const a = { a: 1 };
const b = { a: 1 };

// using native implementations
const set = new Set();
set.add(a);
set.has(b);
// false

const map = new Map();
map.set(a, "foo");
map.get(b);
// undefined
```

```ts
import { EquivSet, EquivMap } from "@thi.ng/associative";

// using custom implementations
const set = new EquivSet();
set.add(a);
set.has(b);
// true

const map = new EquivMap();
map.set(a, "foo");
map.get(b);
// "foo"
```

## Installation

```
yarn add @thi.ng/associative
```

## Types

### EquivSet

This `Set` implementation uses
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/master/packages/dcons)
as backing storage for values and by default uses
[@thi.ng/api/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/api/src/equiv.ts)
for equivalence checking.

### EquivMap

This `Map` implementation uses a native ES6 `Map` as backing storage for
key-value pairs and additional `EquivSet` for canonical keys. By default
it too uses
[@thi.ng/api/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/api/src/equiv.ts)
for equivalence checking of keys.

## Usage examples

TODO... Please see
[tests](https://github.com/thi-ng/umbrella/tree/master/packages/associative/test/)
and documentation in source code for now...

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0
