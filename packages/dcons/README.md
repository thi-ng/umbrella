<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dcons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-dcons.svg?a2b73bce)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dcons.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
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
  - [Head centric](#head-centric)
  - [Tail centric](#tail-centric)
  - [Random Access](#random-access)
  - [Insertion](#insertion)
  - [Finding](#finding)
  - [Structure](#structure)
- [Authors](#authors)
- [License](#license)

## About

Double-linked lists with comprehensive set of operations (incl. optional self-organizing behaviors).

- ES6 iterator support
- Stack & queue API (front and/or back)
- Random node access (read / write, O(n/2))
- Node insertion (also w/ custom comparator)
- Node finding (O(n))
- Node swaps (O(1))
- Reversing (O(n/2))
- Rotation (left / right) (O(1))
- Shuffling (configurable, support custom PRNG)
- Sorting (Merge sort, w/ custom comparator)
- Slicing (sublist copies)
- Splicing (delete and/or insert)
- `release()` (emptying, GC friendly)
- `concat()` / `into()`
- `map()` / `filter()` / `reduce()`
- `compare()` / `equiv()`
- `toJSON()` transform (-> array)

v2.3.0 adds the [self-organizing
list](https://en.wikipedia.org/wiki/Self-organizing_list) type `SOL` (an
extension of `DCons`), which dynamically re-orders items based on certain
accesses and offers these two built-in strategies:

- `defMTF()` - moves currently accessed element to front of list
- `defTranspose()` - swaps currently accessed element with its predecessor

Only the following operations will trigger the self-organizing behavior:

- `nth()`
- `setNth()`
- `setTail()`
- `find()`
- `findWith()`

Btw. Also see
[@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)
for more LRU, MRU implementations based on managed `DCons` impls...

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdcons%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/dcons
```

ESM import:

```ts
import * as dcons from "@thi.ng/dcons";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/dcons"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const dcons = await import("@thi.ng/dcons");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.54 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/dcons/)

### Head centric

- `cons()`
- `first()`
- `drop()`
- `setHead()`

### Tail centric

- `into()`
- `push()`
- `peek()`
- `pop()`
- `setTail()`

### Random Access

- `.length`
- `nth()`
- `nthCell()`
- `setNth()`

### Insertion

- `insertBefore()`
- `insertAfter()`
- `insertBeforeNth()`
- `insertAfterNth()`
- `insertSorted()`

### Finding

- `find()`
- `findWith()`

### Structure

- `copy()`
- `concat()`
- `slice()`
- `splice()`
- `swap()`
- `shuffle()`
- `sort()`
- `reverse()`
- `rotateLeft()`
- `rotateRight()`
- `release()`

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dcons,
  title = "@thi.ng/dcons",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dcons",
  year = 2017
}
```

## License

&copy; 2017 - 2025 Karsten Schmidt // Apache License 2.0
