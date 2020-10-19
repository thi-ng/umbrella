# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

## License

&copy; ${copyright} // ${license}
