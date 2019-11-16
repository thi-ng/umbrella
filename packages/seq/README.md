# @thi.ng/seq

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/seq.svg)](https://www.npmjs.com/package/@thi.ng/seq)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/seq.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Various implementations of the [@thi.ng/api
`ISeq`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/seq.ts)
interface / sequence abstraction and related tooling.

Unlike ES6 iterators, `ISeq.next()` is decoupled from an iteration step
and merely produces a new view of the remaining sequence values. This
allows forking & sharing of the sequence head among multiple consumers,
each able to read the remaining values at their own pace.

## Installation

```bash
yarn add @thi.ng/seq
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)

## Usage examples

```ts
import { aseq, concat, iterator } from "@thi.ng/seq";

// create a sequence abstraction of an array
const a = aseq([1,2,3]);

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

// if start index > end index, seq is built in reverse
// the iterator here is only used for demo purposes
// (i.e. to convert the sequence to a standard ES6 iterable & show the result)
[...iterator(aseq([10, 20, 30, 40], 3, 1))]
// [40, 30]

// zero-copy concat (supporting nullable parts/sub-sequences)
[...iterator(concat(null, aseq([]), aseq([1, 2]), undefined, aseq([3])))]
// [ 1, 2, 3 ]

// if only arrays are used as sources, can also use concatA()
[...iterator(concatA(null, [], [1, 2], undefined, [3]))]
// [ 1, 2, 3 ]
```

Since the entire approach is interface based, sequences can be defined
for any custom datatype (via the `ISeqable` interface), for example here
using
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/master/packages/dcons):

```ts
import { dcons } from "@thi.ng/dcons";

// concat array with doubly-linked list
[...iterator(concat(aseq([1,2,3]), dcons([4,5,6]).seq()))]
// [ 1, 2, 3, 4, 5, 6 ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
