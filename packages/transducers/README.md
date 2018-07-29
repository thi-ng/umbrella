# @thi.ng/transducers

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/transducers.svg)](https://www.npmjs.com/package/@thi.ng/transducers)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:2 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This library provides altogether 130+ transducers, reducers, sequence
generators (iterators) and other supporting functions for composing data
transformation pipelines.

The overall concept and many of the core functions offered here are
directly inspired by the original Clojure implementation by Rich Hickey,
though the implementation does heavily differ (also in contrast to some
other JS based implementations) and dozens of less common, but generally
highly useful operators have been added. See full list below.

### Related packages

#### Extended functionality

- [@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-fsm) - Fine State Machine transducer
- [@thi.ng/transducers-stats](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-stats) - Technical / statistical analysis transducers

#### Packages utilizing transducers

- [@thi.ng/csp](https://github.com/thi-ng/umbrella/tree/master/packages/csp)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph)
- [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log)
- [@thi.ng/sax](https://github.com/thi-ng/umbrella/tree/master/packages/sax)

## Installation

```bash
yarn add @thi.ng/transducers
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/master/packages/compare)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## Usage examples

**There're several standalone example projects using this library in the
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory.**

Almost all functions can be imported selectively, but for development
purposes full module re-exports are defined.

```ts
// full import
import * as tx from "@thi.ng/transducers";

// selective
import { transduce } from "@thi.ng/transducers/transduce";
import { push } from "@thi.ng/transducers/rfn/push";
import { map } from "@thi.ng/transducers/xforms/map";
```

### Basic usage patterns

```ts
// compose transducer
xform = tx.comp(
    tx.filter(x => (x & 1) > 0), // odd numbers only
    tx.distinct(),               // distinct numbers only
    tx.map(x=> x * 3)            // times 3
);

// collect as array (tx.push)
tx.transduce(xform, tx.push(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// [ 3, 9, 15 ]

// re-use same xform, but collect as set (tx.conj)
tx.transduce(xform, tx.conj(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// Set { 3, 9, 15 }

// or apply as transforming iterator
// no reduction, only transformations
[...tx.iterator(xform, [1, 2, 3, 4, 5])]
// [ 3, 9, 15]

// single step execution
// returns undefined if transducer returned no result for this input
// returns array if transducer step produced multiple results
f = tx.step(xform);
f(1) // 3
f(2) // undefined
f(3) // 9
f(4) // undefined

f = tx.step(take)
```

### Fuzzy search

```ts
[...tx.iterator(tx.filterFuzzy("ho"), ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo", "heyoka"]
[...tx.iterator(tx.filterFuzzy("hlo"), ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo"]

// works with any array-like values & supports custom key extractors
[...tx.iterator(
    tx.filterFuzzy([1, 3], (x) => x.tags),
    [
        { tags: [1, 2, 3] },
        { tags: [1, 3, 4] },
        { tags: [4, 5, 6] },
        { tags: [1, 3, 6] }
    ]
)]
// [ { tags: [ 1, 2, 3 ] },
//   { tags: [ 1, 3, 4 ] },
//   { tags: [ 1, 3, 6 ] } ]
```

### Histogram generation & result grouping

```ts
// use the `frequencies` reducer to create
// a map counting occurrence of each value
tx.transduce(tx.map(x => x.toUpperCase()), tx.frequencies(), "hello world")
// Map { 'H' => 1, 'E' => 1, 'L' => 3, 'O' => 2, ' ' => 1, 'W' => 1, 'R' => 1, 'D' => 1 }

// reduction only (no transform)
tx.reduce(tx.frequencies(), [1, 1, 1, 2, 3, 4, 4])
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// with optional key function, here to bin by word length
tx.reduce(
    tx.frequencies(x => x.length),
    "my camel is collapsing and needs some water".split(" ")
)
// Map { 2 => 2, 5 => 3, 10 => 1, 3 => 1, 4 => 1 }

// actual grouping
tx.reduce(
    tx.groupByMap(x => x.length),
    "my camel is collapsing and needs some water".split(" ")
)
// Map {
//   2 => [ 'my', 'is' ],
//   3 => [ 'and' ],
//   4 => [ 'some' ],
//   5 => [ 'camel', 'needs', 'water' ],
//   10 => [ 'collapsing' ]
// }
```

### Pagination

```ts
// extract only items for given page id & page length
[...tx.iterator(tx.page(0, 5), tx.range(12))]
// [ 0, 1, 2, 3, 4 ]

// when composing with other transducers
// it's most efficient to place `page()` early on in the chain
// that way only the page items will be further processed
[...tx.iterator(tx.comp(tx.page(1, 5), tx.map(x => x * 10)), tx.range(12))]
// [ 50, 60, 70, 80, 90 ]

// use `padLast()` to fill up missing values
[...tx.iterator(tx.comp(tx.page(2, 5), tx.padLast(5, "n/a")), tx.range(12))]
// [ 10, 11, 'n/a', 'n/a', 'n/a' ]

[...tx.iterator(tx.page(3, 5), rtx.ange(12))]
// []
```

### Multiplexing / parallel transducer application

`multiplex` and `multiplexObj` can be used to transform values in
parallel using the provided transducers (which can be composed as usual)
and results in a tuple or keyed object.

```ts
tx.transduce(
    tx.multiplex(
        tx.map(x => x.charAt(0)),
        tx.map(x => x.toUpperCase()),
        tx.map(x => x.length)
    ),
    tx.push(),
    ["Alice", "Bob", "Charlie"]
)
// [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]

tx.transduce(
    tx.multiplexObj({
        initial: tx.map(x => x.charAt(0)),
        name: tx.map(x => x.toUpperCase()),
        len: tx.map(x => x.length)
    }),
    tx.push(),
    ["Alice", "Bob", "Charlie"]
)
// [ { len: 5, name: 'ALICE', initial: 'A' },
//   { len: 3, name: 'BOB', initial: 'B' },
//   { len: 7, name: 'CHARLIE', initial: 'C' } ]
```

### Moving average using sliding window

```ts
// use nested reduce to compute window averages
tx.transduce(
    tx.comp(
        tx.partition(5, 1),
        tx.map(x => tx.reduce(tx.mean(), x))
    ),
    tx.push(),
    [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10]
);
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]

// this combined transducer is also directly
// available as: `tx.movingAverage(n)`
tx.transduce(
    tx.movingAverage(5),
    [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10]
);
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]
```

### Benchmark function execution time

```ts
// function to test
fn = () => { for(i=0; i<1e6; i++) let x =Math.cos(i); return x; };

// compute the mean of 100 runs
tx.transduce(
    tx.comp(tx.benchmark(), tx.take(100)),
    tx.mean(),
    tx.repeatedly(fn)
);
// 1.93 (milliseconds)
```

### Apply inspectors to debug transducer pipeline

```ts
// alternatively, use tx.sideEffect() for any side fx
tx.transduce(
    tx.comp(
        tx.inspect("orig"),
        tx.map(x => x + 1),
        tx.inspect("mapped"),
        tx.filter(x => (x & 1) > 0)
    ),
    tx.push(),
    [1, 2, 3, 4]
);

// orig 1
// mapped 2
// orig 2
// mapped 3
// orig 3
// mapped 4
// orig 4
// mapped 5
// [ 3, 5 ]
```

### Stream parsing / structuring

The `struct` transducer is simply a composition of: `partitionOf ->
partition -> rename -> mapKeys`. [See code
here](https://github.com/thi-ng/umbrella/tree/master/packages/transducers/src/xform/struct.ts).

```ts
// Higher-order transducer to convert linear input into structured objects
// using given field specs and ordering. A single field spec is an array of
// 2 or 3 items: `[name, size, transform?]`. If `transform` is given, it will
// be used to produce the final value for this field. In the example below,
// it is used to unwrap the ID field values, e.g. from `[0] => 0`
[...tx.iterator(
    tx.struct([["id", 1, (id) => id[0]], ["pos", 2], ["vel", 2], ["color", 4]]),
    [0, 100, 200, -1, 0, 1, 0.5, 0, 1, 1, 0, 0, 5, 4, 0, 0, 1, 1]) ]
// [ { color: [ 1, 0.5, 0, 1 ],
//     vel: [ -1, 0 ],
//     pos: [ 100, 200 ],
//     id: 0 },
//   { color: [ 0, 0, 1, 1 ],
//     vel: [ 5, 4 ],
//     pos: [ 0, 0 ],
//     id: 1 } ]
```

### CSV parsing

```ts
tx.transduce(
    tx.comp(
        // split into rows
        tx.mapcat(x => x.split("\n")),
        // split each row
        tx.map(x => x.split(",")),
        // convert each row into object, rename array indices
        tx.rename({ id: 0, name: 1, alias: 2, num: "length" })
    ),
    tx.push(),
    ["100,typescript\n101,clojure,clj\n110,rust,rs"]
);
// [ { num: 2, name: 'typescript', id: '100' },
//   { num: 3, alias: 'clj', name: 'clojure', id: '101' },
//   { num: 3, alias: 'rs', name: 'rust', id: '110' } ]
```

### Early termination

```ts
// result is realized after max. 7 values, irrespective of nesting
tx.transduce(
    tx.comp(tx.flatten(), tx.take(7)),
    tx.push(),
    [1, [2, [3, 4, [5, 6, [7, 8], 9, [10]]]]]
)
// [1, 2, 3, 4, 5, 6, 7]
```

### Scan operator

```ts
// this transducer uses 2 scans (a scan = inner reducer per item)
// 1) counts incoming values
// 2) forms an array of the current counter value `x` & repeated `x` times
// 3) emits results as series of reductions in the outer array produced
//    by the main reducer
// IMPORTANT: since arrays are mutable we use `pushCopy` as the inner reducer
// instead of `push` (the outer reducer)
xform = tx.comp(
    tx.scan(tx.count()),
    tx.map(x => [...tx.repeat(x,x)]),
    tx.scan(tx.pushCopy())
);

tx.transduce(xform, tx.push(), [1, 1, 1, 1]);
// [ [ [ 1 ] ],
//   [ [ 1 ], [ 2, 2 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ], [ 4, 4, 4, 4 ] ] ]

// more simple & similar to previous, but without the 2nd xform step
tx.transduce(tx.comp(tx.scan(tx.count), tx.scan(tx.pushCopy)), tx.push(), [1,1,1,1])
// [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ]
```

### Streaming hexdump

This is a higher-order transducer, purely composed from other
transducers. [See code
here](https://github.com/thi-ng/umbrella/tree/master/packages/transducers/src/xform/hex-dump.ts).

```ts
src = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 33, 48, 49, 50, 51, 126, 122, 121, 120]

[...iterator(hexDump(8, 0x400), src)]
// [ '00000400 | 41 42 43 44 45 46 47 48 | ABCDEFGH',
//   '00000408 | 49 4a 21 30 31 32 33 7e | IJ!0123~',
//   '00000410 | 7a 79 78 00 00 00 00 00 | zyx.....' ]
```

### Bitstream

```ts
[...tx.iterator(tx.bits(8), [ 0xf0, 0xaa ])]
// [ 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ]

[...tx.iterator(
    tx.comp(
        tx.bits(8),
        tx.map(x=> x ? "#" : "."),
        tx.partition(8),
        tx.map(x=>x.join(""))
    ),
    [ 0x00, 0x18, 0x3c, 0x66, 0x66, 0x7e, 0x66, 0x00 ])]
// [ '........',
//   '...##...',
//   '..####..',
//   '.##..##.',
//   '.##..##.',
//   '.######.',
//   '.##..##.',
//   '........' ]
```

### Base64 & UTF-8 en/decoding

```ts
// add offset (0x80) to allow negative values to be encoded
// (URL safe result can be produced via opt arg to `base64Encode`)
enc = tx.transduce(
    tx.comp(
        tx.map(x => x + 0x80),
        tx.base64Encode()
    ),
    tx.str(),
    tx.range(-8, 8)
);
// "eHl6e3x9fn+AgYKDhIWGhw=="

// remove offset again during decoding, but (for example) only decode while val < 0
[...tx.iterator(
    tx.comp(
        tx.base64Decode(),
        tx.map(x => x - 0x80),
        tx.takeWhile(x=> x < 0)
    ),
    enc)]
// [ -8, -7, -6, -5, -4, -3, -2, -1 ]

buf = tx.transduce(
    tx.comp(tx.utf8Encode(), tx.base64Encode()),
    tx.str(),
    "beer (🍺) or hot beverage (☕︎)"
);
// "YmVlciAo8J+Nuikgb3IgaG90IGJldmVyYWdlICjimJXvuI4p"

tx.transduce(tx.comp(tx.base64Decode(), tx.utf8Decode()), tx.str(), buf)
// "beer (🍺) or hot beverage (☕︎)"
```

### Weighted random choices

```ts
tx.transduce(tx.take(10), tx.push(), tx.choices("abcd", [1, 0.5, 0.25, 0.125]))
// [ 'a', 'a', 'b', 'a', 'a', 'b', 'a', 'c', 'd', 'b' ]

tx.transduce(tx.take(1000), tx.frequencies(), tx.choices("abcd", [1, 0.5, 0.25, 0.125]))
// Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
```

## API

_Documentation is slowly forthcoming in the form of doc comments (incl.
code examples) for a growing number the functions listed below. Please
see source code for now._

### Types

Apart from type aliases, the only real types defined are:

#### Reducer

Reducers are the core building blocks of transducers. Unlike other
implementations using OOP approaches, a `Reducer` in this lib is a
simple 3-element array of functions, each addressing a separate
processing step.

Since v0.6.0 the bundled reducers are all wrapped in functions to
provide a uniform API (and some of them can be preconfigured and/or are
stateful closures). However, it's fine to define stateless reducers as
constant arrays.

```ts
interface Reducer<A, B> extends Array<any> {
    /**
     * Initialization, e.g. to provide a suitable accumulator value,
     * only called when no initial accumulator has been provided by user.
     */
    [0]: () => A,
    /**
     * Completion. When called usually just returns `acc`, but stateful
     * transformers should flush/apply their outstanding results.
     */
    [1]: (acc: A) => A,
    /**
     * Reduction step. Combines new input with accumulator.
     * If reduction should terminate early, wrap result via `reduced()`
     */
    [2]: (acc: A, x: B) => A | Reduced<A>,
}

// A concrete example:
const push: Reducer<any[], any> = [
    // init
    () => [],
    // completion (nothing to do in this case)
    (acc) => acc,
    // step
    (acc, x) => (acc.push(x), acc),
];
```

`partition`, `partitionBy`, `streamSort`, `streamShuffle` are (examples
of) transducers making use of their 1-arity completing function.

#### Reduced

```ts
class Reduced<T> implements IDeref<T> {
    protected value: T;
    constructor(val: T);
    deref(): T;
}
```

Simple type wrapper to identify early termination of a reducer. Does not
modify wrapped value by injecting magic properties. Instances can be
created via `reduced(x)` and handled via these helper functions:

#### `reduced(x: any): any`

#### `isReduced(x: any): boolean`

#### `ensureReduced(x: any): Reduced<any>`

#### `unreduced(x: any): any`

### Transducer

From Rich Hickey's original definition:

> A transducer is a transformation from one reducing function to another

As shown in the examples above, transducers can be dynamically composed
(using `comp()`) to form arbitrary data transformation pipelines without
causing large overheads for intermediate collections.

```ts
type Transducer<A, B> = (rfn: Reducer<any, B>) => Reducer<any, A>;

// concrete example of stateless transducer (expanded for clarity)
function map<A, B>(fn: (x: A) => B): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        return [
            () => rfn[0](),
            (acc) => rfn[1](acc),
            (acc, x: A) => rfn[2](acc, fn(x))
        ];
    };
}

// stateful transducer
// removes successive value repetitions
function dedupe<T>(): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        // state initialization
        let prev = {};
        return [
            () => rfn[0](),
            (acc) => rfn[1](acc),
            (acc, x) => {
                acc = prev === x ? acc : rfn[2](acc, x);
                prev = x;
                return acc;
            }
        ];
    };
}
```

### Transformations

#### `comp(f1, f2, ...)`

Returns new transducer composed from given transducers. Data flow is
from left to right. Offers fast paths for up to 10 args. If more are
given, composition is done dynamically via for loop.

#### `compR(rfn: Reducer<any, any>, fn: (acc, x) => any): Reducer<any, any>`

Helper function to compose reducers.

#### `iterator<A, B>(tx: Transducer<A, B>, xs: Iterable<A>): IterableIterator<B>`

Similar to `transduce()`, but emits results as ES6 iterator (and hence
doesn't use a reduction function).

#### `reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: Iterable<B>): A`

Reduces iterable using given reducer and optional initial
accumulator/result.

#### `transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc: C, xs: Iterable<A>): C`

Transforms iterable using given transducer and combines results with
given reducer and optional initial accumulator/result.

#### `run<A, B>(tx: Transducer<A, B>, fx: (x: B) => void, xs: Iterable<A>)`

Transforms iterable with given transducer and optional side effect
without any reduction step. If `fx` is given it will be called with
every value produced by the transducer. If `fx` is *not* given, the
transducer is assumed to include at least one `sideEffect()` step
itself. Returns nothing.

### Transducers

#### `base64Decode(): Transducer<string, number>`

#### `base64Encode(urlSafe?: boolean, bufSize?: number): Transducer<number, string>`

#### `benchmark(): Transducer<any, number>`

#### `bits(wordSize?: number, msbFirst?: boolean): Transducer<number, number>`

#### `cat<T>(): Transducer<T[], T>`

#### `convolve2d(src: number[], width: number, height: number, weights: number[], kwidth: number, kheight: number, wrap?: boolean): Transducer<number[], number>`

#### `dedupe<T>(equiv?: (a: T, b: T) => boolean): Transducer<T, T>`

#### `delayed<T>(t: number): Transducer<T, Promise<T>>`

#### `distinct<T>(mapfn?: (x: T) => any): Transducer<T, T>`

#### `drop<T>(n: number): Transducer<T, T>`

#### `dropNth<T>(n: number): Transducer<T, T>`

#### `dropWhile<T>(pred: Predicate<T>): Transducer<T, T>`

#### `duplicate<T>(n?: number): Transducer<T, T>`

#### `filter<T>(pred: Predicate<T>): Transducer<T, T>`

#### `filterFuzzy<A, B>(query: ArrayLike<B>, key?: (x: A) => ArrayLike<B>, eq?: Predicate2<any>): Transducer<A, A>`

#### `flatten<T>(): Transducer<T | Iterable<T>, T>`

#### `flattenWith<T>(fn: (x: T) => Iterable<T>): Transducer<T | Iterable<T>, T>`

#### `hexDump(cols?: number, addr?: number): Transducer<number, string>`

#### `indexed<T>(): Transducer<T, [number, T]>`

#### `inspect<T>(prefix?: string): Transducer<T, T>`

#### `interleave<A, B>(sep: B | (() => B)): Transducer<A, A | B>`

#### `interpose<A, B>(sep: B | (() => B)): Transducer<A, A | B>`

#### `keep<T>(f?: ((x: T) => any)): Transducer<T, T>`

#### `labeled<L, T>(id: L | ((x: T) => L)): Transducer<T, [L, T]>`

#### `map<A, B>(fn: (x: A) => B): Transducer<A, B>`

#### `mapcat<A, B>(fn: (x: A) => Iterable<B>): Transducer<A, B>`

#### `mapDeep(spec: TransformSpec): Transducer<any, any>`

#### `mapIndexed<A, B>(fn: (i: number, x: A) => B, offset = 0): Transducer<A, B>`

#### `mapKeys(keys: IObjectOf<(x: any) => any>, copy?: boolean): Transducer<any, any>`

#### `mapNth<A, B>(n: number, offset?: number, fn: (x: A) => B): Transducer<A, A | B>`

#### `mapVals<A, B>(fn: (v: A) => B, copy = true): Transducer<IObjectOf<A>, IObjectOf<B>>`

#### `matchFirst<T>(pred: Predicate<T>): Transducer<T, T>`

#### `matchLast<T>(pred: Predicate<T>): Transducer<T, T>`

#### `movingAverage(n: number): Transducer<number, number>`

#### `movingMedian<A, B>(n: number, key?: ((x: A) => B), cmp?: Comparator<B>): Transducer<A, A>`

#### `multiplex<T, A, B>(a: Transducer<T, A>, b: Transducer<T, B>...): Transducer<T, [A, B...]>`

#### `multiplexObj<A, B>(xforms: IObjectOf<Transducer<A, any>>, rfn?: Reducer<B, [PropertyKey, any]>): Transducer<A, B>`

#### `noop<T>(): Transducer<T, T>`

#### `padLast<T>(n: number, fill: T): Transducer<T, T>`

#### `page<T>(page: number, pageLen = 10): Transducer<T, T>`

#### `partition<T>(size: number, step?: number, all?: boolean): Transducer<T, T[]>`

#### `partitionBy<T>(fn: (x: T) => any): Transducer<T, T[]>`

#### `partitionOf<T>(sizes: number[]): Transducer<T, T[]>`

#### `partitionSort<A, B>(n: number, key?: ((x: A) => B), cmp?: Comparator<B>): Transducer<A, A>`

#### `partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, keyfn: (x: T) => PropertyKey, reset = true, all = true): Transducer<T, IObjectOf<T>>`

#### `pluck<A, B>(key: PropertyKey): Transducer<A, B>`

#### `rename<A, B>(kmap: IObjectOf<PropertyKey>, rfn?: Reducer<B, [PropertyKey, A]>): Transducer<A[], B>`

#### `sample<T>(prob: number): Transducer<T, T>`

#### `scan<A, B>(rfn: Reducer<B, A>, acc?: B): Transducer<A, B>`

#### `selectKeys(...keys: PropertyKey[]): Transducer<any, any>`

#### `sideEffect<T>(fn: (x: T) => void): Transducer<T, T>`

#### `streamShuffle<T>(n: number, maxSwaps?: number): Transducer<T, T>`

#### `streamSort<A, B>(n: number, key?: ((x: A) => B), cmp?: Comparator<B>): Transducer<A, A>`

#### `struct<T>(fields: StructField[]): Transducer<any, T>`

#### `swizzle<T>(order: PropertyKey[]): Transducer<T, any>`

#### `take<T>(n: number): Transducer<T, T>`

#### `takeLast<T>(n: number): Transducer<T, T>`

#### `takeNth<T>(n: number): Transducer<T, T>`

#### `takeWhile<T>(pred: Predicate<T>): Transducer<T, T>`

#### `throttle<T>(delay: number): Transducer<T, T>`

#### `throttleTime<T>(delay: number): Transducer<T, T>`

#### `utf8Decode(): Transducer<number, string>`

#### `utf8Encode(): Transducer<string, number>`

### Reducers

#### `add(): Reducer<number, number>`

#### `assocMap<A, B>(): Reducer<Map<A, B>, [A, B]>`

#### `assocObj<T>(): Reducer<IObjectOf<T>, [PropertyKey, T]>`

#### `conj<T>(): Reducer<Set<T>, T>`

#### `count(offset?: number, step?: number): Reducer<number, any>`

#### `every<T>(pred?: Predicate<T>): Reducer<boolean, T>`

#### `frequencies<A, B>(key: (x: A) => B): Reducer<Map<B, number>, A>`

#### `groupBinary<T>(bits: number, key: (x: T) => number, branch?: () => IObjectOf<T[]>, leaf?: Reducer<any, T>, left?: PropertyKey, right?: PropertyKey): Reducer<any, T>`

#### `groupByMap<A, B, C>(key: (x: A) => B, rfn?: Reducer<C, A>): Reducer<Map<B, C>, A>`

#### `groupByObj<A, C>(key: (x: A) => PropertyKey, rfn?: Reducer<C, A>, init?: () => IObjectOf<C>): Reducer<IObjectOf<C>, A>`

#### `juxtR(...reducers: Reducer<any, any>): Reducer<any,any>`

#### `last(): last<T>(): Reducer<T, T>`

#### `max(): Reducer<number, number>`

#### `maxCompare<T>(ident: () => T, cmp: Comparator<T> = compare): Reducer<T, T>`

#### `mean(): Reducer<number, number>`

#### `min(): Reducer<number, number>`

#### `minCompare<T>(ident: () => T, cmp: Comparator<T> = compare): Reducer<T, T>`

#### `mul(): Reducer<number, number>`

#### `push<T>(): Reducer<T[], T>`

#### `pushCopy<T>(): Reducer<T[], T>`

#### `reductions<A, B>(rfn: Reducer<A, B>): Reducer<A[], B>`

#### `some<T>(pred?: Predicate<T>): Reducer<boolean, T>`

#### `str(sep = ""): Reducer<string, any>`

### Generators / Iterators

#### `choices<T>(choices: T[], weights?: number[])`

#### `concat<T>(...xs: Iterable<T>[]): IterableIterator<T>`

#### `cycle<T>(input: Iterable<T>): IterableIterator<T>`

#### `iterate<T>(fn: (x: T) => T, seed: T): IterableIterator<T>`

#### `keys(x: any): IterableIterator<string>`

#### `normRange(n?: number): IterableIterator<number>`

#### `pairs(x: any): IterableIterator<[string, any]>`

#### `range(from?: number, to?: number, step?: number): IterableIterator<number>`

#### `range2d(x1: number, x2: number, y1: number, y2: number, stepx?: number, stepy?: number): IterableIterator<number>`

#### `range3d(x1: number, x2: number, y1: number, y2: number, z1: number, z2: number, stepx?: number, stepy?: number, stepz?: number): IterableIterator<number>`

#### `repeat<T>(x: T, n?: number): IterableIterator<T>`

#### `repeatedly<T>(fn: () => T, n?: number): IterableIterator<T>`

#### `reverse<T>(input: Iterable<T>): IterableIterator<any>`

#### `tuples(...src: Iterable<any>[]): IterableIterator<any[]>`

#### `vals<T>(x: IObjectOf<T>): IterableIterator<T>`

#### `wrap<T>(src: T[], n = 1, left = true, right = true): IterableIterator<T>`

## Authors

- Karsten Schmidt

## License

&copy; 2016-2018 Karsten Schmidt // Apache Software License 2.0
