<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
