<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/arrays](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-arrays.svg?2bff0ab9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/arrays.svg)](https://www.npmjs.com/package/@thi.ng/arrays)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/arrays.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Barrays%5D)

## Installation

```bash
yarn add @thi.ng/arrays
```

ESM import:

```ts
import * as arr from "@thi.ng/arrays";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/arrays"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const arr = await import("@thi.ng/arrays");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.23 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/compare](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/compare)
- [@thi.ng/equiv](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/equiv)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Six projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                     | Description                                                                   | Live demo                                             | Source                                                                                     |
|:-------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:------------------------------------------------------|:-------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/kmeans-viz.jpg" width="240"/>      | k-means clustering visualization                                              | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/kmeans-viz)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/pixel-gradients.jpg" width="240"/> | Randomized 4-point 2D color gradient image generator                          | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/pixel-gradients) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/poly-subdiv.jpg" width="240"/>     | Animated, iterative polygon subdivisions & visualization                      | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poly-subdiv)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/related-images.jpg" width="240"/>  | Responsive image gallery with tag-based Jaccard similarity ranking            | [Demo](https://demo.thi.ng/umbrella/related-images/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/related-images)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/stacked-layout.png" width="240"/>  | Responsive & reactively computed stacked column layout                        | [Demo](https://demo.thi.ng/umbrella/stacked-layout/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/stacked-layout)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/thing-browser.avif" width="240"/>  | Tree-based UI to find & explore thi.ng projects via their associated keywords | [Demo](https://demo.thi.ng/umbrella/thing-browser/)   | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/thing-browser)   |

## API

[Generated API docs](https://docs.thi.ng/umbrella/arrays/)

- [`arrayIterator()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/iterator.ts)
- [`argMin()` / `argMax()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/argmin.ts)
- [`argSort()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/arg-sort.ts)
- [`binarySearch()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/binary-search.ts)
- [`bisect()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/bisect.ts)
- [`blit1d()` / blit2d()](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/blit.ts)
- [`endsWith()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/ends-with.ts)
- [`ensureArray()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/ensure-array.ts)
- [`ensureIterable()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/ensure-iterable.ts)
- [`fillRange()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/fill-range.ts)
- [`find()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/find.ts)
- [`findSequence()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/find-sequence.ts)
- [`floydRivest()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/floyd-rivest.ts)
- [`fuzzyMatch()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/fuzzy-match.ts)
- [`insert()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/insert.ts)
- [`into()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/into.ts)
- [`isSorted()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/is-sorted.ts)
- [`levenshtein()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/levenshtein.ts)
- [`multiSwap()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/swap.ts)
- [`peek()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/peek.ts)
- [`permutation()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/permutation.ts)
- [`quickSort()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/quicksort.ts)
- [`rotate()` / `rotateTyped()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/rotate.ts)
- [`selectThresholdMin()` / `selectThresholdMax()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/threshold.ts)
- [`shuffle()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/shuffle.ts) (w/ custom PRNG support)
- [`shuffleRange()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/shuffle.ts) (w/ custom PRNG support)
- [`sortByCachedKey()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/sort-cached.ts)
- [`startsWith()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/starts-with.ts)
- [`swap()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/swap.ts)
- [`swizzle()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/swizzle.ts)
- [`topoSort()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays/src/topo-sort.ts)

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
import { binarySearch, bsGT, bsLT } from "@thi.ng/arrays";

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

&copy; 2018 - 2026 Karsten Schmidt // Apache License 2.0
