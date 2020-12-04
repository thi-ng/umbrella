<!-- This file is generated - DO NOT EDIT! -->

# ![arrays](https://media.thi.ng/umbrella/banners/thing-arrays.svg?f87eb97c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/arrays.svg)](https://www.npmjs.com/package/@thi.ng/arrays)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/arrays.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Binary search result predicates](#binary-search-result-predicates)
- [Authors](#authors)
- [License](#license)

## About

Array / Arraylike utilities.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Barrays%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/arrays
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/arrays?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/arrays/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.84 KB / CJS: 2.00 KB / UMD: 1.99 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

## API

[Generated API docs](https://docs.thi.ng/umbrella/arrays/)

- [binarySearch()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/binary-search.ts)
- [endsWith()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/ends-with.ts)
- [ensureArray()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/ensure-array.ts)
- [ensureIterable()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/ensure-iterable.ts)
- [fuzzyMatch()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/fuzzy-match.ts)
- [isSorted()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/is-sorted.ts)
- [multiSwap()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/swap.ts)
- [peek()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/peek.ts)
- [quickSort()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/quicksort.ts)
- [shuffle()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/shuffle.ts) (w/ custom PRNG support)
- [shuffleRange()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/shuffle.ts) (w/ custom PRNG support)
- [startsWith()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/starts-with.ts)
- [swap()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/swap.ts)
- [swizzle()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/swizzle.ts)

### Binary search result predicates

The following predicates can be used to perform predecessor / successor
queries using `binarySearch()`.

- `bsLT()` - Returns index of last item less than search value or -1 if
  no such values exist
- `bsLE()` - Similar to `bsLT()`, but for less-than-equals queries
- `bsGT()` - Returns index of first item greater than search value or -1
  if no such values exist
- `bsGE()` - Similar to `bsGT()`, but for less-than-equals queries
- `bsEQ()` - Merely syntax sugar, casting any non-found result indices to -1

```ts
const src = [10, 20, 30, 40];

bsLT(binarySearch(src, 25))
// 1

// greater-than queries also require the array length

bsGT(binarySearch(src, 25), src.length)
// 2

bsGT(binarySearch(src, 40), src.length)
// -1
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-arrays,
  title = "@thi.ng/arrays",
  author = "Karsten Schmidt",
  note = "https://thi.ng/arrays",
  year = 2018
}
```

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
