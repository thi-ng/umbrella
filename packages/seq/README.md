<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/seq](https://media.thi.ng/umbrella/banners-20230807/thing-seq.svg?a705a8f9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/seq.svg)](https://www.npmjs.com/package/@thi.ng/seq)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/seq.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
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
  - [ISeqable support](#iseqable-support)
  - [Lazy sequences](#lazy-sequences)
- [Authors](#authors)
- [License](#license)

## About

Various implementations of the [@thi.ng/api
`ISeq`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/seq.ts)
interface / sequence abstraction and related tooling (inspired by
Clojure). Think of `ISeq`s as readonly sequential views & cursors of an
underlying (not necessarily sequential) collection...

Unlike with ES6 iterators,
[`ISeq.next()`](https://docs.thi.ng/umbrella/api/interfaces/ISeq.html#next)
is decoupled from an iteration step and merely produces a new view /
sequence head of the remaining sequence values. This allows forking &
sharing the sequence head(s) among multiple consumers, each able to read
the remaining values at their own pace.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bseq%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/seq
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/seq"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const seq = await import("@thi.ng/seq");
```

Package sizes (brotli'd, pre-treeshake): ESM: 533 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)

## API

[Generated API docs](https://docs.thi.ng/umbrella/seq/)

```ts
import { aseq, rseq, concat, iterator } from "@thi.ng/seq";

// create a sequence abstraction of an array
const a = aseq([1,2,3]);

// aseq returns `undefined` for nullish or empty array arguments
// this is in accordance w/ the `ISeqable` interface
// see further below...
aseq([])
// undefined

// first() returns first value of seq (or undefined if empty)
a.first()
// 1

// next() returns new seq of remaining items
a.next()
// { first: [Function: first], next: [Function: next] }

a.next().first();
// 2
a.next().next().first();
// 3

// if the resulting sub-sequence is empty, next() returns undefined
a.next().next().next();
// undefined

// aseq() can take optional index range args
aseq([10, 20, 30, 40], 2).first()
// 30
aseq([10, 20, 30, 40], 2).next().first()
// 40

// the iterator here is only used for demo purposes
// (i.e. to convert the sequence to a standard ES6 iterable & show the result)
[...iterator(aseq([10, 20, 30, 40], 2))]
// [30, 40]

// rseq() produces a reverse sequence of the given array
rseq([1, 2, 3]).first()
// 3
rseq([1, 2, 3]).next().first()
// 2

// index ranges only (start MUST be > end)
[...iterator(rseq([0, 1, 2, 3, 4], 2))]
// [2, 1, 0]
[...iterator(rseq([0, 1, 2, 3, 4], 3, 1))]
// [3, 2]

// values can be prepended via cons()
[...iterator(cons(42, aseq([1, 2, 3])))]
// [ 42, 1, 2, 3 ]

// create new (or single value) seqs
cons(42).first()
// 42
cons(42).next()
// undefined

// zero-copy concat (supporting nullable parts/sub-sequences)
[...iterator(concat(null, aseq([]), aseq([1, 2]), undefined, cons(3)))]
// [ 1, 2, 3 ]

// if only arrays are used as sources, can also use concatA()
[...iterator(concatA(null, [], [1, 2], undefined, [3]))]
// [ 1, 2, 3 ]
```

### ISeqable support

Since the entire approach is interface based, sequences can be defined
for any custom datatype (preferably via the
[ISeqable](https://docs.thi.ng/umbrella/api/interfaces/ISeqable.html)
interface), for example here using
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons):

```ts
import { dcons } from "@thi.ng/dcons";

// concat reversed array with doubly-linked list
[...iterator(concat(rseq([1, 2, 3]), dcons([4, 5, 6])))]
// [ 3, 2, 1, 4, 5, 6 ]
```

### Lazy sequences

Lazily instantiated (possibly infinite) sequences can be created via
`lazyseq()`. This function returns an `ISeq` which only realizes its
values when they're requested.

```ts
import { defmultiN } from "@thi.ng/defmulti";

// defmultiN only used here to define multiple arities for `fib`
const fib = defmultiN({
    0: () => fib(0, 1),
    2: (a, b) => lazyseq(() => {
        console.log(`realize: ${a}`);
        return cons(a, fib(b, a + b));
    })
});

fib()
// { first: [Function: first], next: [Function: next] }

fib().first()
// realize: 0
// 0

fib().next().first()
// realize: 0
// realize: 1
// 1

fib().next().next().first()
// realize: 0
// realize: 1
// realize: 1
// 1

fib().next().next().next().first()
// realize: 0
// realize: 1
// realize: 1
// realize: 2
// 2

fib().next().next().next().next().first()
// realize: 0
// realize: 1
// realize: 1
// realize: 2
// realize: 3
// 3
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-seq,
  title = "@thi.ng/seq",
  author = "Karsten Schmidt",
  note = "https://thi.ng/seq",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
