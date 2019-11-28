# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

Various implementations of the [@thi.ng/api
`ISeq`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/seq.ts)
interface / sequence abstraction and related tooling (inspired by
Clojure). Think of `ISeq`s as readonly sequential views & cursors of an
underlying (not necessarily sequential) collection...

Unlike with ES6 iterators,
[`ISeq.next()`](https://github.com/thi-ng/umbrella/blob/develop/packages/api/src/api/seq.ts#L23)
is decoupled from an iteration step and merely produces a new view /
sequence head of the remaining sequence values. This allows forking &
sharing the sequence head(s) among multiple consumers, each able to read
the remaining values at their own pace.

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

// zero-copy concat (supporting nullable parts/sub-sequences)
[...iterator(concat(null, aseq([]), aseq([1, 2]), undefined, aseq([3])))]
// [ 1, 2, 3 ]

// if only arrays are used as sources, can also use concatA()
[...iterator(concatA(null, [], [1, 2], undefined, [3]))]
// [ 1, 2, 3 ]
```

Since the entire approach is interface based, sequences can be defined
for any custom datatype (preferably via the
[ISeqable](https://github.com/thi-ng/umbrella/blob/develop/packages/api/src/api/seq.ts#L35)
interface), for example here using
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/master/packages/dcons):

```ts
import { dcons } from "@thi.ng/dcons";

// concat reversed array with doubly-linked list
[...iterator(concat(rseq([1, 2, 3]), dcons([4, 5, 6])))]
// [ 3, 2, 1, 4, 5, 6 ]
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
