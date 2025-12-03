<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/associative](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-associative.svg?8301e9d6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/associative.svg)](https://www.npmjs.com/package/@thi.ng/associative)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/associative.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Why?](#why)
  - [Comparison with ES6 native types](#comparison-with-es6-native-types)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [IEquivSet](#iequivset)
  - [ArraySet](#arrayset)
  - [LLSet](#llset)
  - [EquivMap](#equivmap)
  - [HashMap](#hashmap)
- [Authors](#authors)
- [License](#license)

## About

ES Map/Set-compatible implementations with customizable equality semantics & supporting operations.

> [!IMPORTANT]
> In July 2024 this package was restructured and split-up to extract some
> features into smaller more focused packages:
>
> - [@thi.ng/bidir-index](https://thi.ng/bidir-index)
> - [@thi.ng/object-utils](https://thi.ng/object-utils)
> - [@thi.ng/sorted-map](https://thi.ng/sorted-map)
> - [@thi.ng/sparse-set](https://thi.ng/sparse-set)
> - [@thi.ng/trie](https://thi.ng/trie)

- Array based `ArraySet`, Linked List based `LLSet` and customizable `EquivMap`
  & `HashMap` implementing the full ES6 Map/Set APIs and additional features:
    - `ICopy`, `IEmpty` & `IEquiv` implementations
    - `ICompare` implementation for sorted types
    - multiple value additions / updates / deletions via `into()`, `dissoc()`
      (maps) and `disj()` (sets)
    - configurable key equality & comparison (incl. default implementations)
    - getters w/ optional "not-found" default value
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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bassociative%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/associative
```

ESM import:

```ts
import * as assoc from "@thi.ng/associative";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/associative"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const assoc = await import("@thi.ng/associative");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.13 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Four projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                    | Description                                                                                | Live demo                                                    | Source                                                                                    |
|:------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------|:-------------------------------------------------------------|:------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-heatmap.png" width="240"/>         | Heatmap visualization of this mono-repo's commits                                          |                                                              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-heatmap)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-attrib-pool.jpg" width="240"/> | Augmenting thi.ng/geom shapes for WebGL, using instancing & attribute buffers              | [Demo](https://demo.thi.ng/umbrella/geom-webgl-attrib-pool/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-attrib-pool) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-key-sequences.jpg" width="240"/>     | rstream & transducer-based FSM for converting key event sequences into high-level commands | [Demo](https://demo.thi.ng/umbrella/rdom-key-sequences/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-key-sequences)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>         | Responsive image gallery with tag-based Jaccard similarity ranking                         | [Demo](https://demo.thi.ng/umbrella/related-images/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images)         |

## API

[Generated API docs](https://docs.thi.ng/umbrella/associative/)

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

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-associative,
  title = "@thi.ng/associative",
  author = "Karsten Schmidt",
  note = "https://thi.ng/associative",
  year = 2017
}
```

## License

&copy; 2017 - 2025 Karsten Schmidt // Apache License 2.0
