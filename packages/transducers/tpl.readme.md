<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

{{meta.status}}

### 7.0.0 release

Thanks to a [PR](https://github.com/thi-ng/umbrella/pull/223) and [related
issue](https://github.com/thi-ng/umbrella/issues/186) by
[@gavinpc-mindgrub](https://github.com/gavinpc-mindgrub), various transducers
functions have been fixed for the case when they're invoked with an _empty_
string as input iterable. Furthermore,
[`flatten()`](https://docs.thi.ng/umbrella/transducers/functions/flatten.html) is
_always_ treating strings as atomic values now, whereas before top-level strings
would be split into individual characters.

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

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

### Basic usage patterns

```ts
import { comp, distinct, filter, map } from "@thi.ng/transducers";

// compose transducer
xform = comp(
    filter((x) => (x & 1) > 0), // odd numbers only
    distinct(),                 // distinct numbers only
    map((x) => x * 3)           // times 3
);

import { transduce, push } from "@thi.ng/transducers";

// collect into array (push)
transduce(xform, push(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// [ 3, 9, 15 ]

// re-use same xform, but collect into ES6 Set
transduce(xform, conj(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// Set { 3, 9, 15 }

import { iterator } from "@thi.ng/transducers";

// or apply as transforming iterator
// no reduction, only transformations
[...iterator(xform, [1, 2, 3, 4, 5])]
// [ 3, 9, 15]

// alternatively provide an input iterable and
// use xform as transforming iterator
[...filter((x) => /[A-Z]/.test(x), "Hello World!")]
// ["H", "W"]

import { step } from "@thi.ng/transducers";

// single step execution
// returns undefined if transducer returned no result for this input
// returns array if transducer step produced multiple results
f = step(xform);
f(1) // 3
f(2) // undefined
f(3) // 9
f(4) // undefined

f = step(take)
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
const vertices = [...iterator(
    comp(
        interpolateHermite(10),
        mapIndexed((x, y) => [x, y])
    ),
    // duplicate first & last vals (1x LHS / 2x RHS)
    // this is only needed for hermite interpolation
    // (see doc string for `interpolateHermite`)
    extendSides(values, 1, 2)
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
import { filterFuzzy } from "@thi.ng/transducers";

[...filterFuzzy("ho", ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo", "heyoka"]
[...filterFuzzy("hlo", ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo"]

// works with any array-like values & supports custom key extractors
[...filterFuzzy(
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
import { frequencies, map, reduce, transduce } from "@thi.ng/transducers";

// use the `frequencies` reducer to create
// a map counting occurrence of each value
transduce(map((x) => x.toUpperCase()), frequencies(), "hello world");
// Map { 'H' => 1, 'E' => 1, 'L' => 3, 'O' => 2, ' ' => 1, 'W' => 1, 'R' => 1, 'D' => 1 }

// reduction only (no transform)
reduce(frequencies(), [1, 1, 1, 2, 3, 4, 4]);
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// direct reduction if input is given
frequencies([1, 1, 1, 2, 3, 4, 4]);
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// with optional key function, here to bin by word length
frequencies(
    (x) => x.length,
    "my camel is collapsing and needs some water".split(" ")
);
// Map { 2 => 2, 5 => 3, 10 => 1, 3 => 1, 4 => 1 }
```

```ts
import { groupByMap } from "@thi.ng/transducers";

// actual grouping (here: by word length)
groupByMap(
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
import { page, comp, iterator, map, padLast, range } from "@thi.ng/transducers";

// extract only items for given page id & page length
[...page(0, 5, range(12))]
// [ 0, 1, 2, 3, 4 ]

// when composing with other transducers
// it's most efficient to place `page()` early on in the chain
// that way only the page items will be further processed
[...iterator(comp(page(1, 5), map(x => x * 10)), range(12))]
// [ 50, 60, 70, 80, 90 ]

// use `padLast()` to fill up missing values
[...iterator(comp(page(2, 5), padLast(5, "n/a")), range(12))]
// [ 10, 11, 'n/a', 'n/a', 'n/a' ]

// no values produced for invalid pages
[...page(3, 5, range(12))]
// []
```

### Multiplexing / parallel transducer application

`multiplex` and `multiplexObj` can be used to transform values in
parallel using the provided transducers (which can be composed as usual)
and results in a tuple or keyed object.

```ts
import { map, multiplex, multiplexObj, push, transduce } from "@thi.ng/transducers";

transduce(
    multiplex(
        map((x) => x.charAt(0)),
        map((x) => x.toUpperCase()),
        map((x) => x.length)
    ),
    push(),
    ["Alice", "Bob", "Charlie"]
);
// [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]

transduce(
    multiplexObj({
        initial: map((x) => x.charAt(0)),
        name: map((x) => x.toUpperCase()),
        len: map((x) => x.length)
    }),
    push(),
    ["Alice", "Bob", "Charlie"]
);
// [ { len: 5, name: 'ALICE', initial: 'A' },
//   { len: 3, name: 'BOB', initial: 'B' },
//   { len: 7, name: 'CHARLIE', initial: 'C' } ]
```

### Moving average using sliding window

```ts
import { comp, map, mean, partition, push, reduce transduce } from "@thi.ng/transducers";

// use nested reduce to compute window averages
transduce(
    comp(
        partition(5, 1),
        map(x => reduce(mean(), x))
    ),
    push(),
    [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10]
)
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]
```

This combined transducer is also directly available as:

```ts
import { movingAverage } from "@thi.ng/transducers";

[...movingAverage(5, [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10])]
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]
```

### Benchmark function execution time

```ts
import { benchmark, mean, repeatedly, transduce } from "@thi.ng/transducers";

// function to test
fn = () => {
    let x;
    for (i = 0; i < 1e6; i++) {
        x = Math.cos(i);
    }
    return x;
};

// compute the mean of 100 runs
transduce(benchmark(), mean(), repeatedly(fn, 100));
// 1.93 (milliseconds)
```

### Apply inspectors to debug transducer pipeline

```ts
import { comp, filter, map, push, trace, transduce } from "@thi.ng/transducers";

// alternatively, use sideEffect() for arbitrary side fx
transduce(
    comp(
        trace("orig"),
        map((x) => x + 1),
        trace("mapped"),
        filter((x) => (x & 1) > 0)
    ),
    push(),
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
here](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/struct.ts).

```ts
import { struct } from "@thi.ng/transducers";

// Higher-order transducer to convert linear input into structured objects
// using given field specs and ordering. A single field spec is an array of
// 2 or 3 items: `[name, size, transform?]`. If `transform` is given, it will
// be used to produce the final value for this field. In the example below,
// it is used to unwrap the ID field values, e.g. from `[0] => 0`
[
    ...struct(
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
import { comp, map, mapcat, push, rename, transduce } from "@thi.ng/transducers";

transduce(
    comp(
        // split into rows
        mapcat((x) => x.split("\n")),
        // split each row
        map((x) => x.split(",")),
        // convert each row into object, rename array indices
        rename({ id: 0, name: 1, alias: 2, num: "length" })
    ),
    push(),
    ["100,typescript\n101,clojure,clj\n110,rust,rs"]
);
// [ { num: 2, name: 'typescript', id: '100' },
//   { num: 3, alias: 'clj', name: 'clojure', id: '101' },
//   { num: 3, alias: 'rs', name: 'rust', id: '110' } ]
```

### Early termination

```ts
import { comp, flatten, push, take, transduce } from "@thi.ng/transducers";

// result is realized after max. 7 values, irrespective of nesting
transduce(comp(flatten(), take(7)), push(), [
    1,
    [2, [3, 4, [5, 6, [7, 8], 9, [10]]]]
]);
// [1, 2, 3, 4, 5, 6, 7]
```

### Scan operator

```ts
import {
	comp, count, iterator, map, push, pushCopy, repeat, scan, transduce
} from "@thi.ng/transducers";

// this transducer uses 2 scans (a scan = inner reducer per item)
// 1) counts incoming values
// 2) forms an array of the current counter value `x` & repeated `x` times
// 3) emits results as series of reductions in the outer array produced
//    by the main reducer
// IMPORTANT: since arrays are mutable we use `pushCopy` as the inner reducer
// instead of `push` (the outer reducer)
xform = comp(
    scan(count()),
    map(x => [...repeat(x,x)]),
    scan(pushCopy())
)

[...iterator(xform, [1, 1, 1, 1])]
// [ [ [ 1 ] ],
//   [ [ 1 ], [ 2, 2 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ], [ 4, 4, 4, 4 ] ] ]

// more simple & similar to previous, but without the 2nd xform step
transduce(comp(scan(count()), scan(pushCopy())), push(), [1,1,1,1])
// [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ]
```

### Weighted random choices

```ts
import { choices, frequencies, take, transduce } from "@thi.ng/transducers";

[...take(10, choices("abcd", [1, 0.5, 0.25, 0.125]))]
// [ 'a', 'a', 'b', 'a', 'a', 'b', 'a', 'c', 'd', 'b' ]

transduce(
    take(1000),
    frequencies(),
    choices("abcd", [1, 0.5, 0.25, 0.125])
);
// Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
```

### Keyframe interpolation

See
[`tween()`](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/tween.ts)
docs for details.

```ts
import { tween } from "@thi.ng/transducers";

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

{{pkg.docs}}

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
import type { IDeref } from "@thi.ng/api";

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
import { map, push, range, transduce, type IXform } from "@thi.ng/transducers";

class Mul implements IXform<number, number> {

    constructor(public factor = 10) {}

    xform() {
        return map((x) => this.factor * x);
    }
}

transduce(new Mul(11), push(), range(4))
// [0, 11, 22, 33, 44]

import { comp, drop, push, range, takeNth, transduce } from "@thi.ng/transducers";

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

#### consume

`consume(src: Iterable<any>): void`

Similar to `run()`, consumes given iterable, presumably for any implicit
side-effects. Iterable MUST be finite!

```ts
import { consume, repeatedly2d } from "@thi.ng/transducers";

// here the function given to repeatedly2d() has only a side-effect, however
// repeatedly2d() itself is lazy. Using consume() then forces this lazy iterator/generator
// to be realized and so also the side-effects to be executed
consume(repeatedly2d((x, y) => console.log("output:", [x, y]), 2, 3));
// output: [ 0, 0 ]
// output: [ 1, 0 ]
// output: [ 0, 1 ]
// output: [ 1, 1 ]
// output: [ 0, 2 ]
// output: [ 1, 2 ]
```

### Transducers

All of the following functions can be used and composed as transducers.
With a few exceptions, most also accept an input iterable and then
directly yield a transforming iterator, e.g.

```ts
import { map, push, range, transduce } from "@thi.ng/transducers";

// as transducer
transduce(map((x) => x*10), push(), range(4))
// [ 0, 10, 20, 30 ]

// as transforming iterator
[...map((x) => x*10, range(4))]
// [ 0, 10, 20, 30 ]
```

- [benchmark](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/benchmark.ts)
- [cat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/cat.ts)
- [converge](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/converge.ts)
- [convolve2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/convolve.ts)
- [dedupe](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/dedupe.ts)
- [delayed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/delayed.ts)
- [distinct](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/distinct.ts)
- [dropNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/drop-nth.ts)
- [dropWhile](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/drop-while.ts)
- [drop](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/drop.ts)
- [duplicate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/duplicate.ts)
- [filterFuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/filter-fuzzy.ts)
- [filter](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/filter.ts)
- [flattenWith](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/flatten-with.ts)
- [flatten](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/flatten.ts)
- [flatten1](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/flatten1.ts)
- [indexed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/indexed.ts)
- [interleave](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interleave.ts)
- [interpolate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpolate.ts)
- [interpolate-hermite](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpolate-hermite.ts)
- [interpolate-linear](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpolate-linear.ts)
- [interpose](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpose.ts)
- [keep](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/keep.ts)
- [labeled](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/labeled.ts)
- [length](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/length.ts)
- [mapDeep](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-deep.ts)
- [mapIndexed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-indexed.ts)
- [mapKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-keys.ts)
- [mapNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-nth.ts)
- [mapVals](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-vals.ts)
- [map](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map.ts)
- [mapcat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/mapcat.ts)
- [matchFirst](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/match-first.ts)
- [matchLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/match-last.ts)
- [movingAverage](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/moving-average.ts)
- [movingMedian](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/moving-median.ts)
- [multiplexObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/multiplex-obj.ts)
- [multiplex](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/multiplex.ts)
- [noop](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/noop.ts)
- [padLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pad-last.ts)
- [page](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/page.ts)
- [partitionBy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-by.ts)
- [partitionOf](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-of.ts)
- [partitionSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-sort.ts)
- [partitionSync](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-sync.ts)
- [partitionTime](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-time.ts)
- [partitionWhen](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-when.ts)
- [partition](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition.ts)
- [peek](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/peek.ts)
- [pluck](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pluck.ts)
- [rechunk](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rechunk.ts)
- [rename](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rename.ts)
- [sample](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sample.ts)
- [scan](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/scan.ts)
- [selectKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/select-keys.ts)
- [sideEffect](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/side-effect.ts)
- [slidingWindow](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sliding-window.ts)
- [streamShuffle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/stream-shuffle.ts)
- [streamSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/stream-sort.ts)
- [struct](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/struct.ts)
- [swizzle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/swizzle.ts)
- [takeLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take-last.ts)
- [takeNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take-nth.ts)
- [takeWhile](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take-while.ts)
- [take](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take.ts)
- [throttleTime](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/throttle-time.ts)
- [throttle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/throttle.ts)
- [toggle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/toggle.ts)
- [trace](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/trace.ts)
- [wordWrap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/word-wrap.ts)

### Generators / Iterators

- [choices](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/choices.ts)
- [concat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/concat.ts)
- [curve](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/curve.ts)
- [cycle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/cycle.ts)
- [dup](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/dup.ts)
- [extendSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/extend-sides.ts)
- [iterate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iterate.ts)
- [keyPermutations](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/key-permutations.ts)
- [keys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/keys.ts)
- [line](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/line.ts)
- [normRange](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-range.ts)
- [normRange2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-range.ts)
- [normRange3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-range.ts)
- [padSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pad-sides.ts)
- [pairs](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pairs.ts)
- [palindrome](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/palindrome.ts)
- [permutations](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/permutations.ts)
- [permutationsN](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/permutationsN.ts)
- [range](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range.ts)
- [range2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range2d.ts)
- [range3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range3d.ts)
- [rangeNd](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range-nd.ts)
- [repeat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeat.ts)
- [repeatedly](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeatedly.ts)
- [repeatedly2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeatedly2d.ts)
- [repeatedly3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeatedly3d.ts)
- [reverse](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/reverse.ts)
- [sortedKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sorted-keys.ts)
- [symmetric](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/symmetric.ts)
- [tween](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/tween.ts)
- [vals](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/vals.ts)
- [wrapSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/wrap-sides.ts)
- [zip](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/zip.ts)

### Reducers

As with transducer functions, reducer functions can also given an
optional input iterable. If done so, the function will consume the input
and return a reduced result (as if it would be called via `reduce()`).

- [add](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/add.ts)
- [assocMap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/assoc-map.ts)
- [assocObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/assoc-obj.ts)
- [conj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/conj.ts)
- [count](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/count.ts)
- [div](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/div.ts)
- [every](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/every.ts)
- [fill](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/fill.ts)
- [frequencies](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/frequencies.ts)
- [groupBinary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/group-binary.ts)
- [groupByMap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/group-by-map.ts)
- [groupByObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/group-by-obj.ts)
- [last](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/last.ts)
- [max](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/max.ts)
- [maxCompare](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/max-compare.ts)
- [maxMag](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/max-mag.ts)
- [mean](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/mean.ts)
- [min](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min.ts)
- [minCompare](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min-compare.ts)
- [minMag](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min-mag.ts)
- [minMax](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min-max.ts)
- [mul](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/mul.ts)
- [normCount](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-count.ts)
- [normFrequencies](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-frequencies.ts)
- [normFrequenciesAuto](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-frequencies-auto.ts)
- [push](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push.ts)
- [pushCopy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push-copy.ts)
- [pushSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push-sort.ts)
- [reductions](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/reductions.ts)
- [some](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/some.ts)
- [str](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/str.ts)
- [sub](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sub.ts)

<!-- include ../../assets/tpl/footer.md -->
