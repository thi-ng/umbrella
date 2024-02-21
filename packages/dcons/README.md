<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/dcons](https://media.thi.ng/umbrella/banners-20230807/thing-dcons.svg?657d4371)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dcons.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
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

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dcons"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

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

&copy; 2017 - 2024 Karsten Schmidt // Apache License 2.0
