# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This library provides altogether ~130 transducers, reducers, sequence
generators (ES6 generators/iterators) and additional supporting
functions for composing data transformation pipelines.

The overall concept and many of the core functions offered here are
directly inspired by the original Clojure implementation by Rich Hickey,
though the implementation does heavily differ (also in contrast to some
other JS based implementations) and dozens of less common, but generally
highly useful operators have been added. See full list below.

Furthermore, most transducers & reducers provided here accept an
optional input iterable, which allows them to be used directly as
transformers instead of having to wrap them in one of the execution
functions (i.e. `transduce()`/`transduceRight()`, `reduce()`/`reduceRight()`,
`iterator()`, `run()`, `step()`). If called this way, transducer functions
will return a transforming ES6 iterator (generator) and reducing functions
will return a reduced result of the given input iterable.

${status}

### 7.0.0 release

Thanks to a [PR](https://github.com/thi-ng/umbrella/pull/223) and
[related issue](https://github.com/thi-ng/umbrella/issues/186) by
@gavinpc-mindgrub, various transducers functions have been fixed for the
case when they're invoked with an _empty_ string as input iterable.
Furthermore,
[`flatten()`](https://github.com/thi-ng/umbrella/blob/develop/packages/transducers/src/xform/flatten.ts)
is _always_ treating strings as atomic values now, whereas before
top-level strings would be split into individual characters.

### 6.0.0 release

BREAKING CHANGES:

- The `interpolate` iterator for keyframe interpolation has been renamed
  to `tween`. In its place there's a new higher order transducer called
  `interpolate`, incl. syntax-sugar versions `interpolateHermite` and
  `interpolateLinear`.
- The previously deprecated `wrapLeft`, `wrapRight` and `wrapBoth`
  iterators have been removed.
- The `wrap` iterator has been renamed to `wrapSides` and has a new
  signature/arguments, more aligned with the ones listed below.

The following new iterators have been added:

- `extendSides`
- `padSides`
- `symmetric`

### 5.0.0 release

Several previously included internal support functions have been
migrated to the
[@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
package. You'll need to update your imports if you've been using any of
these directly. Note that some of these functions also have changes to
their arg order. See changelog.

Functions using randomness now all support an optional PRNG
implementation of the `IRandom` interface from the
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
package.

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

### Basic usage patterns

```ts
// compose transducer
xform = tx.comp(
    tx.filter((x) => (x & 1) > 0), // odd numbers only
    tx.distinct(),                 // distinct numbers only
    tx.map((x) => x * 3)           // times 3
);

// collect into array (tx.push)
tx.transduce(xform, tx.push(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// [ 3, 9, 15 ]

// re-use same xform, but collect into ES6 Set
tx.transduce(xform, tx.conj(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// Set { 3, 9, 15 }

// or apply as transforming iterator
// no reduction, only transformations
[...tx.iterator(xform, [1, 2, 3, 4, 5])]
// [ 3, 9, 15]

// alternatively provide an input iterable and
// use xform as transforming iterator
[...tx.filter((x) => /[A-Z]/.test(x), "Hello World!")]
// ["H", "W"]

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

### Interpolation & SVG generation

This example uses the
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
package for quick SVG generation.

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/transducers/hermite-tx.png)

```ts
import { asSvg, svgDoc, circle, polyline } from "@thi.ng/geom";

// source values
const values = [5, 10, 4, 8, 20, 2, 11, 7];

// interpolate values and transform into 2D points
const vertices = [...tx.iterator(
    tx.comp(
        tx.interpolateHermite(10),
        tx.mapIndexed((x, y) => [x, y])
    ),
    // duplicate first & last vals (1x LHS / 2x RHS)
    // this is only needed for hermite interpolation
    // (see doc string for `interpolateHermite`)
    tx.extendSides(values, 1, 2)
)];

// generate SVG
asSvg(
    svgDoc(
        { width: 800, height: 200, "stroke-width": 0.1 },
        // interpolated points as polyline
        polyline(vertices, { stroke: "red" }),
        // original values as dots
        ...values.map((y, x) => circle([x * 10, y], 0.2))
    )
)
```

### Fuzzy search

```ts
[...tx.filterFuzzy("ho", ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo", "heyoka"]
[...tx.filterFuzzy("hlo", ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo"]

// works with any array-like values & supports custom key extractors
[...tx.filterFuzzy(
    [1, 3],
    { key: (x) => x.tags },
    [
        { tags: [1, 2, 3] },
        { tags: [2, 3, 4] },
        { tags: [4, 5, 6] },
        { tags: [1, 3, 6] }
    ]
)]
// [ { tags: [ 1, 2, 3 ] }, { tags: [ 1, 3, 6 ] } ]
```

### Histogram generation & result grouping

```ts
// use the `frequencies` reducer to create
// a map counting occurrence of each value
tx.transduce(tx.map((x) => x.toUpperCase()), tx.frequencies(), "hello world");
// Map { 'H' => 1, 'E' => 1, 'L' => 3, 'O' => 2, ' ' => 1, 'W' => 1, 'R' => 1, 'D' => 1 }

// reduction only (no transform)
tx.reduce(tx.frequencies(), [1, 1, 1, 2, 3, 4, 4]);
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// direct reduction if input is given
tx.frequencies([1, 1, 1, 2, 3, 4, 4]);
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// with optional key function, here to bin by word length
tx.frequencies(
    (x) => x.length,
    "my camel is collapsing and needs some water".split(" ")
);
// Map { 2 => 2, 5 => 3, 10 => 1, 3 => 1, 4 => 1 }

// actual grouping (here: by word length)
tx.groupByMap(
    { key: (x) => x.length },
    "my camel is collapsing and needs some water".split(" ")
);
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
[...tx.page(0, 5, tx.range(12))]
// [ 0, 1, 2, 3, 4 ]

// when composing with other transducers
// it's most efficient to place `page()` early on in the chain
// that way only the page items will be further processed
[...tx.iterator(tx.comp(tx.page(1, 5), tx.map(x => x * 10)), tx.range(12))]
// [ 50, 60, 70, 80, 90 ]

// use `padLast()` to fill up missing values
[...tx.iterator(tx.comp(tx.page(2, 5), tx.padLast(5, "n/a")), tx.range(12))]
// [ 10, 11, 'n/a', 'n/a', 'n/a' ]

// no values produced for invalid pages
[...tx.page(3, 5, tx.range(12))]
// []
```

### Multiplexing / parallel transducer application

`multiplex` and `multiplexObj` can be used to transform values in
parallel using the provided transducers (which can be composed as usual)
and results in a tuple or keyed object.

```ts
tx.transduce(
    tx.multiplex(
        tx.map((x) => x.charAt(0)),
        tx.map((x) => x.toUpperCase()),
        tx.map((x) => x.length)
    ),
    tx.push(),
    ["Alice", "Bob", "Charlie"]
);
// [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]

tx.transduce(
    tx.multiplexObj({
        initial: tx.map((x) => x.charAt(0)),
        name: tx.map((x) => x.toUpperCase()),
        len: tx.map((x) => x.length)
    }),
    tx.push(),
    ["Alice", "Bob", "Charlie"]
);
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
)
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]

// this combined transducer is also directly
// available as: `tx.movingAverage(n)`
[...tx.movingAverage(5, [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10])]
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]
```

### Benchmark function execution time

```ts
// function to test
fn = () => {
    let x;
    for (i = 0; i < 1e6; i++) {
        x = Math.cos(i);
    }
    return x;
};

// compute the mean of 100 runs
tx.transduce(tx.benchmark(), tx.mean(), tx.repeatedly(fn, 100));
// 1.93 (milliseconds)
```

### Apply inspectors to debug transducer pipeline

```ts
// alternatively, use tx.sideEffect() for any side fx
tx.transduce(
    tx.comp(
        tx.trace("orig"),
        tx.map((x) => x + 1),
        tx.trace("mapped"),
        tx.filter((x) => (x & 1) > 0)
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

The `struct` transducer is simply a composition of: `partitionOf -> partition -> rename -> mapKeys`. [See code
here](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/struct.ts).

```ts
// Higher-order transducer to convert linear input into structured objects
// using given field specs and ordering. A single field spec is an array of
// 2 or 3 items: `[name, size, transform?]`. If `transform` is given, it will
// be used to produce the final value for this field. In the example below,
// it is used to unwrap the ID field values, e.g. from `[0] => 0`
[
    ...tx.struct(
        [["id", 1, (id) => id[0]], ["pos", 2], ["vel", 2], ["color", 4]],
        [0, 100, 200, -1, 0, 1, 0.5, 0, 1, 1, 0, 0, 5, 4, 0, 0, 1, 1]
    )
];
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
        tx.mapcat((x) => x.split("\n")),
        // split each row
        tx.map((x) => x.split(",")),
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
tx.transduce(tx.comp(tx.flatten(), tx.take(7)), tx.push(), [
    1,
    [2, [3, 4, [5, 6, [7, 8], 9, [10]]]]
]);
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
)

[...tx.iterator(xform, [1, 1, 1, 1])]
// [ [ [ 1 ] ],
//   [ [ 1 ], [ 2, 2 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ], [ 4, 4, 4, 4 ] ] ]

// more simple & similar to previous, but without the 2nd xform step
tx.transduce(tx.comp(tx.scan(tx.count()), tx.scan(tx.pushCopy())), tx.push(), [1,1,1,1])
// [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ]
```

### Weighted random choices

```ts
[...tx.take(10, tx.choices("abcd", [1, 0.5, 0.25, 0.125]))];
// [ 'a', 'a', 'b', 'a', 'a', 'b', 'a', 'c', 'd', 'b' ]

tx.transduce(
    tx.take(1000),
    tx.frequencies(),
    tx.choices("abcd", [1, 0.5, 0.25, 0.125])
);
// Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
```

### Keyframe interpolation

See
[`tween()`](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/tween.ts)
docs for details.

```ts
[
    ...tween(
        10,
        0,
        100,
        (a, b) => [a, b],
        ([a, b], t) => Math.floor(a + (b - a) * t),
        [20, 100],
        [50, 200],
        [80, 0]
    )
];
// [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
```

## API

${docLink}

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
    [0]: () => A;
    /**
     * Completion. When called usually just returns `acc`, but stateful
     * transformers should flush/apply their outstanding results.
     */
    [1]: (acc: A) => A;
    /**
     * Reduction step. Combines new input with accumulator.
     * If reduction should terminate early, wrap result via `reduced()`
     */
    [2]: (acc: A, x: B) => A | Reduced<A>;
}

// A concrete example:
const push: Reducer<any[], any> = [
    // init
    () => [],
    // completion (nothing to do in this case)
    (acc) => acc,
    // step
    (acc, x) => (acc.push(x), acc)
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

- `reduced(x: any): any`
- `isReduced(x: any): boolean`
- `ensureReduced(x: any): Reduced<any>`
- `unreduced(x: any): any`

#### IReducible

By default `reduce()` consumes inputs via the standard ES6 `Iterable`
interface, i.e. using a `for..of..` loop, but uses optimized routes
for some types: Array-like inputs are consumed via a traditional
`for`-loop and custom optimized iterations can be provided via
implementations of the `IReducible` interface in the source collection
type. Examples can be found here:

- [DCons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons/src/index.ts#L156)
- [SortedMap](https://github.com/thi-ng/umbrella/tree/develop/packages/associative/src/sorted-map.ts#L276)

**Note:** The `IReducible` interface is only used by `reduce()`,
`transduce()` and `run()`.

#### Transducer

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

#### IXform interface

Interface for types able to provide some internal functionality (or
derive some related transformation) as `Transducer`. Implementations of
this interface can be directly passed to all functions in this package
where a `Transducer` arg is expected.

```ts
class Mul implements IXform<number, number> {

    constructor(public factor = 10) {}

    xform() {
        return map((x) => this.factor * x);
    }
}

transduce(new Mul(11), push(), range(4))
// [0, 11, 22, 33, 44]

// also usable w/ comp(), iterator(), step(), run() etc.
transduce(
    comp(drop(1), new Mul(11), takeNth(2)),
    push(),
    range(4)
)
// [11, 33]
```

### Composition & execution

#### comp

`comp(f1, f2, ...)`

Returns new transducer composed from given transducers. Data flow is
from left to right. Offers fast paths for up to 10 args. If more are
given, composition is done dynamically via for loop.

#### compR

`compR(rfn: Reducer<any, any>, fn: (acc, x) => any): Reducer<any, any>`

Helper function to compose reducers.

#### iterator

`iterator<A, B>(tx: Transducer<A, B>, xs: Iterable<A>): IterableIterator<B>`

Similar to `transduce()`, but emits results as ES6 iterator (and hence
doesn't use a reduction function).

#### reduce

`reduce<A, B>(rfn: Reducer<A, B>, acc?: A, xs: Iterable<B>): A`

Reduces `xs` using given reducer and optional initial
accumulator/result. If `xs` implements the `IReducible` interface,
delegates to that implementation. Likewise, uses a fast route if `xs` is
an `ArrayLike` type.

#### reduceRight

`reduceRight<A, B>(rfn: Reducer<A, B>, acc?: A, xs: ArrayLike<B>): A`

Similar to `reduce`, however only accepts `ArrayLike` sources and reduces them
into right-to-left order.

#### transduce

`transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc?: C, xs: Iterable<A>): C`

Transforms iterable using given transducer and combines results with
given reducer and optional initial accumulator/result.

#### transduceRight

`transduceRight<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc?: C, xs: ArrayLike<A>): C`

Similar to `transduce`, however only accepts `ArrayLike` sources and processes
them into right-to-left order.

#### run

`run<A, B>(tx: Transducer<A, B>, fx: (x: B) => void, xs: Iterable<A>)`

Transforms iterable with given transducer and optional side effect
without any reduction step. If `fx` is given it will be called with
every value produced by the transducer. If `fx` is _not_ given, the
transducer is assumed to include at least one `sideEffect()` step
itself. Returns nothing.

### Transducers

All of the following functions can be used and composed as transducers.
With a few exceptions, most also accept an input iterable and then
directly yield a transforming iterator, e.g.

```ts
// as transducer
tx.transduce(tx.map((x) => x*10), tx.push(), tx.range(4))
// [ 0, 10, 20, 30 ]

// as transforming iterator
[...tx.map((x) => x*10, tx.range(4))]
// [ 0, 10, 20, 30 ]
```

- [benchmark](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/benchmark.ts)
- [cat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/cat.ts)
- [converge](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/converge.ts)
- [convolve2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/convolve.ts)
- [dedupe](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/dedupe.ts)
- [delayed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/delayed.ts)
- [distinct](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/distinct.ts)
- [dropNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/drop-nth.ts)
- [dropWhile](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/drop-while.ts)
- [drop](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/drop.ts)
- [duplicate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/duplicate.ts)
- [filterFuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/filter-fuzzy.ts)
- [filter](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/filter.ts)
- [flattenWith](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/flatten-with.ts)
- [flatten](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/flatten.ts)
- [indexed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/indexed.ts)
- [interleave](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/interleave.ts)
- [interpolate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/interpolate.ts)
- [interpolate-hermite](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/interpolate-hermite.ts)
- [interpolate-linear](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/interpolate-linear.ts)
- [interpose](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/interpose.ts)
- [keep](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/keep.ts)
- [labeled](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/labeled.ts)
- [mapDeep](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/map-deep.ts)
- [mapIndexed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/map-indexed.ts)
- [mapKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/map-keys.ts)
- [mapNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/map-nth.ts)
- [mapVals](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/map-vals.ts)
- [map](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/map.ts)
- [mapcat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/mapcat.ts)
- [matchFirst](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/match-first.ts)
- [matchLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/match-last.ts)
- [movingAverage](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/moving-average.ts)
- [movingMedian](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/moving-median.ts)
- [multiplexObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/multiplex-obj.ts)
- [multiplex](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/multiplex.ts)
- [noop](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/noop.ts)
- [padLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/pad-last.ts)
- [page](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/page.ts)
- [partitionBy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/partition-by.ts)
- [partitionOf](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/partition-of.ts)
- [partitionSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/partition-sort.ts)
- [partitionSync](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/partition-sync.ts)
- [partitionTime](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/partition-time.ts)
- [partition](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/partition.ts)
- [peek](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/peek.ts)
- [pluck](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/pluck.ts)
- [rename](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/rename.ts)
- [sample](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/sample.ts)
- [scan](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/scan.ts)
- [selectKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/select-keys.ts)
- [sideEffect](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/side-effect.ts)
- [slidingWindow](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/sliding-window.ts)
- [streamShuffle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/stream-shuffle.ts)
- [streamSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/stream-sort.ts)
- [struct](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/struct.ts)
- [swizzle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/swizzle.ts)
- [takeLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/take-last.ts)
- [takeNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/take-nth.ts)
- [takeWhile](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/take-while.ts)
- [take](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/take.ts)
- [throttleTime](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/throttle-time.ts)
- [throttle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/throttle.ts)
- [toggle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/toggle.ts)
- [trace](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/trace.ts)
- [wordWrap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/xform/word-wrap.ts)

### Generators / Iterators

- [choices](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/choices.ts)
- [concat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/concat.ts)
- [curve](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/curve.ts)
- [cycle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/cycle.ts)
- [dup](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/dup.ts)
- [extendSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/extend-sides.ts)
- [iterate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/iterate.ts)
- [keyPermutations](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/key-permutations.ts)
- [keys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/keys.ts)
- [line](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/line.ts)
- [normRange](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/norm-range.ts)
- [normRange2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/norm-range.ts)
- [normRange3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/norm-range.ts)
- [padSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/pad-sides.ts)
- [pairs](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/pairs.ts)
- [palindrome](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/palindrome.ts)
- [permutations](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/permutations.ts)
- [permutationsN](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/permutationsN.ts)
- [range](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/range.ts)
- [range2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/range2d.ts)
- [range3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/range3d.ts)
- [rangeNd](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/range-nd.ts)
- [repeat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/repeat.ts)
- [repeatedly](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/repeatedly.ts)
- [reverse](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/reverse.ts)
- [sortedKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/sorted-keys.ts)
- [symmetric](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/symmetric.ts)
- [tween](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/tween.ts)
- [vals](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/vals.ts)
- [wrapSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/wrap-sides.ts)
- [zip](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iter/zip.ts)

### Reducers

As with transducer functions, reducer functions can also given an
optional input iterable. If done so, the function will consume the input
and return a reduced result (as if it would be called via `reduce()`).

- [add](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/add.ts)
- [assocMap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/assoc-map.ts)
- [assocObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/assoc-obj.ts)
- [conj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/conj.ts)
- [count](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/count.ts)
- [div](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/div.ts)
- [every](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/every.ts)
- [fill](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/fill.ts)
- [frequencies](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/frequencies.ts)
- [groupBinary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/group-binary.ts)
- [groupByMap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/group-by-map.ts)
- [groupByObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/group-by-obj.ts)
- [last](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/last.ts)
- [maxCompare](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/max-compare.ts)
- [max](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/max.ts)
- [mean](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/mean.ts)
- [minCompare](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/min-compare.ts)
- [min](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/min.ts)
- [mul](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/mul.ts)
- [push](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/push.ts)
- [pushCopy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/push-copy.ts)
- [pushSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/push-sort.ts)
- [reductions](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/reductions.ts)
- [some](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/some.ts)
- [str](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/str.ts)
- [sub](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rfn/sub.ts)

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
