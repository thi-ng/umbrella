<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/arrays](https://media.thi.ng/umbrella/banners-20230807/thing-arrays.svg?02d7f5d9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/arrays.svg)](https://www.npmjs.com/package/@thi.ng/arrays)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/arrays.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Binary search result predicates](#binary-search-result-predicates)
- [Authors](#authors)
- [License](#license)

## About

Array / Arraylike utilities.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Barrays%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/arrays
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/arrays"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const arrays = await import("@thi.ng/arrays");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.89 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                        | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/kmeans-viz.jpg" width="240"/>      | k-means clustering visualization                                   | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/kmeans-viz)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/> | Randomized 4-point 2D color gradient image generator               | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>     | Animated, iterative polygon subdivisions & visualization           | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>  | Responsive image gallery with tag-based Jaccard similarity ranking | [Demo](https://demo.thi.ng/umbrella/related-images/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/stacked-layout.png" width="240"/>  | Responsive & reactively computed stacked column layout             | [Demo](https://demo.thi.ng/umbrella/stacked-layout/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/stacked-layout)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/arrays/)

- [`arrayIterator()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/iterator.ts)
- [`argMin()` / argMax()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/argmin.ts)
- [`argSort()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/arg-sort.ts)
- [`binarySearch()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/binary-search.ts)
- [`bisect()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/bisect.ts)
- [`blit1d()` / blit2d()](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/blit.ts)
- [`endsWith()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/ends-with.ts)
- [`ensureArray()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/ensure-array.ts)
- [`ensureIterable()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/ensure-iterable.ts)
- [`fillRange()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/fill-range.ts)
- [`find()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/find.ts)
- [`floydRivest()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/floyd-rivest.ts)
- [`fuzzyMatch()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/fuzzy-match.ts)
- [`insert()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/insert.ts)
- [`into()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/into.ts)
- [`isSorted()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/is-sorted.ts)
- [`levenshtein()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/levenshtein.ts)
- [`multiSwap()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/swap.ts)
- [`peek()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/peek.ts)
- [`quickSort()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/quicksort.ts)
- [`rotate()` / `rotateTyped()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/rotate.ts)
- [`selectThresholdMin()` / `selectThresholdMax()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/threshold.ts)
- [`shuffle()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/shuffle.ts) (w/ custom PRNG support)
- [`shuffleRange()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/shuffle.ts) (w/ custom PRNG support)
- [`sortByCachedKey()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/sort-cached.ts)
- [`startsWith()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/starts-with.ts)
- [`swap()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/swap.ts)
- [`swizzle()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/swizzle.ts)
- [`topoSort()`](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays/src/topo-sort.ts)

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
