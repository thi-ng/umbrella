<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/sorted-map](https://media.thi.ng/umbrella/banners-20230807/thing-sorted-map.svg?a2ee1fc6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/sorted-map.svg)](https://www.npmjs.com/package/@thi.ng/sorted-map)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/sorted-map.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 193 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Skiplist-based sorted map & set implementation.

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

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsorted-map%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/sorted-map
```

ESM import:

```ts
import * as sm from "@thi.ng/sorted-map";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/sorted-map"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const sm = await import("@thi.ng/sorted-map");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.71 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/sorted-map/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-sorted-map,
  title = "@thi.ng/sorted-map",
  author = "Karsten Schmidt",
  note = "https://thi.ng/sorted-map",
  year = 2024
}
```

## License

&copy; 2024 Karsten Schmidt // Apache License 2.0
