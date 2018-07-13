# @thi.ng/dcons

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Comprehensive doubly linked list structure with:

- ES6 iterator support
- Stack & queue API (front and/or back)
- Random node access (read / write, O(n/2))
- Node insertion (also w/ custom comparator)
- Node finding (O(n))
- Node swaps (O(1))
- Reversing (O(n/2))
- Rotation (left / right) (O(1))
- Shuffling
- Slicing (sublist copies)
- Splicing (delete and/or insert)
- `release()` (emptying, GC friendly)
- `concat()` / `into()`
- `map()` / `filter()` / `reduce()`
- `compare()` / `equiv()`
- `toJSON()` transform (-> array)

## Installation

```bash
yarn add @thi.ng/dcons
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/master/packages/compare)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## Usage

```ts
// ES5
DCons = require("@thi.ng/dcons").DCons;

// ES6 / TS
import { DCons } from "@thi.ng/dcons";
```

## API

```ts
list = new DCons([1, 2, 3]);
list.length
[...list]
```

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
- `reverse()`
- `rotateLeft()`
- `rotateRight()`
- `release()`

TODO...

## Authors

- Karsten Schmidt

## License

&copy; 2017-2018 Karsten Schmidt // Apache Software License 2.0
