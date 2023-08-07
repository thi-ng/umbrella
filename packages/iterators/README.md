<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/iterators](https://media.thi.ng/umbrella/banners-20230807/thing-iterators.svg?0c3536b7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/iterators.svg)](https://www.npmjs.com/package/@thi.ng/iterators)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/iterators.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [butLast](#butlast)
  - [cached](#cached)
  - [concat](#concat)
  - [constantly](#constantly)
  - [consume](#consume)
  - [cycle](#cycle)
  - [dedupe](#dedupe)
  - [dedupeWith](#dedupewith)
  - [dense](#dense)
  - [drop](#drop)
  - [dropNth](#dropnth)
  - [dropWhile](#dropwhile)
  - [every](#every)
  - [filter](#filter)
  - [flatten](#flatten)
  - [flattenWith](#flattenwith)
  - [fnil](#fnil)
  - [fork](#fork)
  - [frequencies](#frequencies)
  - [groupBy](#groupby)
  - [identity](#identity)
  - [indexed](#indexed)
  - [interleave](#interleave)
  - [interpose](#interpose)
  - [iterate](#iterate)
  - [iterator](#iterator)
  - [juxt](#juxt)
  - [last](#last)
  - [map](#map)
  - [mapcat](#mapcat)
  - [mapIndexed](#mapindexed)
  - [maybeIterator](#maybeiterator)
  - [maybeObjectIterator](#maybeobjectiterator)
  - [objectIterator](#objectiterator)
  - [partition](#partition)
  - [partitionBy](#partitionby)
  - [randomSample](#randomsample)
  - [range](#range)
  - [reduce](#reduce)
  - [reductions](#reductions)
  - [reduced](#reduced)
  - [repeat](#repeat)
  - [repeatedly](#repeatedly)
  - [reverse](#reverse)
  - [some](#some)
  - [take](#take)
  - [takeNth](#takenth)
  - [takeWhile](#takewhile)
  - [takeLast](#takelast)
  - [walk](#walk)
  - [walkIterator](#walkiterator)
  - [zip](#zip)
- [Authors](#authors)
- [License](#license)

## About

Clojure inspired, composable ES6 iterators & generators.

Most of the provided functionality here is also available in the form of
more composable & efficient transducers via
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

## Status

**DEPRECATED** - superseded by other package(s)

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Biterators%5D+in%3Atitle)

## Related packages

- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers) - Lightweight transducer implementations for ES6 / TypeScript

## Installation

```bash
yarn add @thi.ng/iterators
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/iterators"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const iterators = await import("@thi.ng/iterators");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.38 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/iterators/)

In alphabetical order:

### butLast

Signature: `butLast<T>(input: Iterable<T>) => IterableIterator<T>`

Yields iterator of all but the last value of input.

```ts
[...ti.butLast([])]
// []
[...ti.butLast([1])]
// []
[...ti.butLast([1,2])]
// [ 1 ]
[...ti.butLast([1,2,3])]
// [ 1, 2 ]
[...ti.butLast("hello")]
// [ "h", "e", "l", "l" ]
[...ti.butLast(ti.range(10))]
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
```

### cached

Signature: `cached<T>(input: Iterable<T>) => CachedIterableIterator<T>`

Consumes and **lazily** caches values of a **finite** input and returns
a no-arg function, which when called return new iterator. These iterator
instances always start from the beginning of the cache and allows for
separate states and sharing of cached results among arbitrary number of
iterators. The original input is only consumed when attempting to read
beyond current cache boundary.

```ts
c = ti.cached(ti.range(10));
a = c();
b = c();
a.next();
// { done: false, value: 0 } -> from original
b.next();
// { done: false, value: 0 } -> from cache
b.next();
// { done: false, value: 1 } -> from original
a.next();
// { done: false, value: 1 } -> from cache

angles = ti.cached(ti.range(0, 360, 45));
[...angles()]
// [ 0, 45, 90, 135, 180, 225, 270, 315 ]

ti.zip(
    angles(),
    ti.map(
        ti.juxt(Math.sin, Math.cos),
        ti.map(
            (x)=> x * 180 / Math.PI,
            angles()
        )
    )
);
// { "0":   [ 0, 1 ],
//   "45":  [ 0.8060754911159176, -0.5918127259718502 ],
//   "90":  [ -0.9540914674728181, -0.2995153947555356 ],
//   "135": [ 0.3232114532680857, 0.9463267704531728 ],
//   "180": [ 0.5715301650260188, -0.8205810566088714 ],
//   "225": [ -0.9996891031455815, 0.02493385353255689 ],
//   "270": [ 0.6117273014893283, 0.7910687129526641 ],
//   "315": [ 0.27563309945482667, -0.9612629164203338 ] }
```

### concat

Signature: `concat<T>(...inputs: Iterable<T>[]) => IterableIterator<T>`

Produces iterator yielding **lazy** concatenation of given iterables.
For practical purposes none but the last input should be infinite. Any
`null` or `undefined` input arguments are skipped in the output.

```ts
[... ti.concat([1, 2, 3], [10, 20, 30], [100, 200, 300])]
// [ 1, 2, 3, 10, 20, 30, 100, 200, 300 ]

[...ti.concat.apply(null, ["abc", null, [1, 2, 3]])]
// [ "a", "b", "c", 1, 2, 3 ]
```

### constantly

Signature: `constantly<T>(x: T) => (...args: any[]) => T`

Helper function returning a new fn which takes any number of args and
always returns `x`.

```ts
// define an iterable of unknown size
iter = ti.takeWhile(x => x < 0.98, ti.repeatedly(()=> Math.random()));

// use map & reduce to determine size of iterable:
// `constantly` as mapping fn maps all values to 1
// then reduce is used to sum
ti.reduce((a, b)=> a + b, 0, ti.map(ti.constantly(1), iter))
// 241 (varying)

// some complex data transformation
times10 = (flt, coll) => [...ti.map(x => x * 10, ti.filter(flt, coll))];

// some user selectable config
filterModes = {
    odd: x => (x % 2) == 1,
    even: x => (x % 2) == 0,
    all: ti.constantly(true)
};

// use `constantly` as pluggable bypass filter predicate fn
times10(filterModes[???], [1, 2, 3]);
// [10, 30] (odd)
// [20] (even)
// [10, 20, 30] (all)
```

### consume

Signature: `consume(input: Iterator<any>, n?: number) => void`

Helper function. Consumes & discards items from iterator (possibly for
side effects) and optionally only up to the given number of steps.

### cycle

Signature: `cycle<T>(input: Iterable<T>) => IterableIterator<T>`

Produces iterator which **lazily** caches & **infinitely** repeats
sequence of input. **Important:** Input MUST be finite, use `take` to
truncate input or output if necessary.

```ts
[... ti.take(10, ti.cycle(ti.range(3)))]
// [0, 1, 2, 0, 1, 2, 0, 1, 2, 0]
```

### dedupe

Signature: `dedupe<T>(input: Iterable<T>) => IterableIterator<T>`

Produces iterator which discards successive duplicate values from input.
**Important:** Uses `===` for equality checks.

```ts
[... ti.dedupe([1, 2, 2, 3, 4, 4, 4, 3])]
// [1, 2, 3, 4, 3]
```

### dedupeWith

Signature: `dedupeWith<T>(equiv: (a:T, b: T) => boolean, input: Iterable<T>) => IterableIterator<T>`

Like `dedupe`, but uses given function `equiv` to determine equivalence
of successive values.

```ts
var coll = [{ a: 1 }, { a: 1, b: 2 }, { a: 2, b: 2 }, { a: 2, b: 2 }, { a: 3 }];
var eq = (a, b) => a.a === b.a;

[...ti.dedupeWith(eq, coll)]
// [ { a: 1 }, { a: 2, b: 2 }, { a: 3 } ]
```

### dense

Signature: `dense<T>(input: Iterable<T>) => IterableIterator<T>`

Yields iterator of all non-`null` and non-`undefined` values of input
(e.g. a sparse array).

```ts
var a = []
a[10] = 1;
a[20] = 2;

[...ti.dense(a)]
// [1, 2]
```

### drop

Signature: `drop<T>(n: number, input: Iterable<T>) => IterableIterator<T>`

Consumes & discards up to `n` items from input and returns remaining
(possibly exhausted) iterator.

```ts
[... ti.drop(5, ti.range(10))]
// [5, 6, 7, 8, 9]
[... ti.drop(5, ti.range(3))]
// []
[... ti.take(5, ti.drop(5, ti.range()))]
// [ 5, 6, 7, 8, 9 ]
```

### dropNth

Signature: `dropNth<T>(n: number, input: Iterable<T>) => IterableIterator<T>`

Produces iterator which drops every `n`th item from input.

```ts
[... ti.dropNth(2, ti.range(10))]
// [0, 2, 4, 6, 8]
[... ti.dropNth(3, ti.range(10))]
// [ 0, 1, 3, 4, 6, 7, 9 ]
```

### dropWhile

Signature: `dropWhile<T>(pred: (x: T) => boolean, input: Iterable<T>) => IterableIterator<T>`

Consumes input and calls `pred` for each item. Discards all items whilst
`pred` returns `true`, then returns remaining (possibly exhausted)
iterator.

```ts
[... ti.dropWhile((x) => x < 5, ti.range(10))]
// [5, 6, 7, 8, 9]
```

### every

Signature: `every<T>(pred: (x: T) => boolean, input: Iterable<T>) => boolean`

Consumes input and calls `pred` for each item. When `pred` returns not
`true`, process stops and returns `false` itself. When all items pass
the predicate, the function returns `true`.

If input is empty/exhausted prior to execution, `every` will return
`false`.

```ts
var nums = ti.iterator([2, 4, 6, 8, 10]);

ti.every((x) => (x % 2) === 0, nums);
// true, all passed
nums.next()
// { value: undefined, done: true }

nums = ti.iterator([2, 3, 4]);
ti.every((x) => (x % 2) === 0, nums);
// false, `every` stopped at `3`
nums.next()
// { value: 4, done: false }

ti.every((x) => true, [])
// false (empty input)
```

### filter

Signature: `filter<T>(pred: (x: T) => boolean, input: Iterable<T>) => IterableIterator<T>`

Consumes input and calls `pred` for each item. Yields iterator of items
for which `pred` returned `true`.

```ts
var multOf3 = (x) => (x % 3) === 0;
[... ti.filter(multOf3, ti.range(10))];
// [ 0, 3, 6, 9 ]
```

### flatten

Signature: `flatten(input: Iterable<any>, flatObjects = true) => IterableIterator<any>`

Produces iterator which recursively flattens input (using
`flattenWith`). **Important:** Recursion only applies to iterable types
(excluding strings) and objects (enabled by default, using
`objectIterator`, see below).

```ts
[... ti.flatten([1, [2, 3], [4, [5, ["abc"]]]])]
// [ 1, 2, 3, 4, 5, "abc" ]

[...ti.flatten([{ a: 1 }, { a: 23, b: 42, c: [1, 2, 3] }])]
// ["a", 1, "a", 23, "b", 42, "c", 1, 2, 3]

// don't flatten objects
[...ti.flatten([{ a: 1 }, [1, 2, 3], { a: 23, b: 42, c: [1, 2, 3] }], false)]
// [ { a: 1 }, 1, 2, 3, { a: 23, b: 42, c: [ 1, 2, 3 ] } ]
```

### flattenWith

Signature: `flattenWith(tx: (x: any) => any, input: Iterable<any>) => IterableIterator<any>`

Produces iterator which selectively & recursively flattens input. The
first arg `tx` is a transformation fn called for each
non-`null/undefined` value taken from the input. It's used to check and
possibly obtain an iteratable value for further flattening. **The
transformer must return `undefined` if the value can't or shouldn't be
flattened**. If a value is returned it MUST be iterable.

The default transformer used by `flatten` is:

```ts
let defaultTx = x =>
    (typeof x !== "string" && (maybeIterator(x) || maybeObjectIterator(x))) ||
    undefined;

// transformer allowing any iterable and strings
// if `x` is a string, return its numeric charcode sequence for flattening
let tx = x => typeof x == "string" ? ti.map(x => x.charCodeAt(0), x) : ti.maybeIterator(x);

[...ti.flattenWith(tx, ["ROOT", undefined, ["CHILD_1", null, ["CHILD_2"]]])]
// [ 82, 79, 79, 84, undefined, 67, 72, 73, 76, 68, 95, 49, null, 67, 72, 73, 76, 68, 95, 50 ]
```

### fnil

Signature: `fnil(fn: (...args: any[]) => any, ...ctors: (() => any)[]) => (...args: any[]) => any`

Takes a function `fn` and up to 3 `ctor` functions. Produces a new
function that calls `fn`, replacing a `null` or `undefined` arg with the
value obtained by calling its related positional `ctor` fn (e.g. the
first ctor is used to supply first arg, etc.).

The function `fn` can take any number of arguments, however only the
first 3 are being potentially patched, how many depends on the number of
`ctor` fns supplied.

```ts
hello = (greet, name) => `${greet}, ${name}!`;

helloEN = ti.fnil(hello, () => "Hi", () => "user");
helloDE = ti.fnil(hello, () => "Hallo", () => `Teilnehmer #${(Math.random()*100)|0}`);

helloEN(); // "Hi, user!"
helleEN(null,"toxi"); // "Hi, toxi!"
helloEN("Howdy","toxi"); // "Howdy, toxi!"

helloDE(); // "Hallo, Teilnehmer #42!"

inc = x => x + 1
// build new fn which calls ctor to supply 0 if arg is null or undefined
adder = ti.fnil(inc, () => 0);

adder();
// 1 => returns 0 (from ctor fn) + 1
adder(null);
// 1 => same as above
adder(10);
// 11 => arg was given, so 10 + 1

// generic object prop updater using given fn `f`
updateWith = f => (obj, id) => { return obj[id] = f(obj[id]), obj; }

// accumulate letter frequencies of string into object
// fnil is used here to avoid `NaN` each time an yet unknown letter is encountered
ti.reduce(updateWith(adder), {}, "abracadabra");
// { a: 5, b: 2, r: 2, c: 1, d: 1 }
```

### fork

Signature: `fork<T>(input: Iterable<T>, cacheLimit = 16) => () => IterableIterator<T>`

Similar to `cached`, this function allows multiple consumers of a single
input, however is only using a sliding window of N cached values
(`cached` stores the entire input).

`fork` returns a no-arg function, which returns a new forked iterator
when called. There's no limit to the number of active forks.

**Important:** The use case for `fork` is synchronized consumption at
similar speeds (up to `cacheLimit` divergence). The cache is shared by
*all* forks. If one of the forks consumes the input faster than the
given `cacheLimit`, the other forks will lose intermediate values. If in
doubt, increase the cache limit to a higher value (default 16). The
cache uses
[@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
to avoid unnecessary copying during window sliding.

```ts
// stream of random numbers, as sliding partitions of 5 values
src = ti.partition(5, 1, ti.repeatedly(()=> (Math.random() * 100) | 0, 10));

// setup forking, only caching single value
f = ti.fork(src, 1);

// create 4 forks (by calling f()), each with their own transformer:
raw = f();
// simple moving average
sma = ti.map((part)=> ti.reduce((a, b) => a + b, 0, part) / part.length, f());
// minimum
min = ti.map((part)=> ti.reduce((a, b) => Math.min(a, b), 100, part), f());
// maximum
max = ti.map((part)=> ti.reduce((a, b) => Math.max(a, b), -1, part), f());

// consume the forks in synchronized manner
for(let part of raw) {
    console.log(`part: ${part}, avg: ${sma.next().value}, min: ${min.next().value}, ${max.next().value}`);
}

// part: 81,29,46,94,38, avg: 57.6, min: 29, 94
// part: 29,46,94,38,93, avg: 60, min: 29, 94
// part: 46,94,38,93,67, avg: 67.6, min: 38, 94
// part: 94,38,93,67,33, avg: 65, min: 33, 94
// part: 38,93,67,33,59, avg: 58, min: 33, 93
// part: 93,67,33,59,76, avg: 65.6, min: 33, 93
```

### frequencies

Signature: `frequencies<T>(input: Iterable<T>, key?: (v: T) => any): IterableIterator<FrequencyPair<T>[]>`

Consumes input, applies `key` fn (if given) to each item and yields
iterator of 2-element tuples, each `[key, freq]` (where `freq` is the
number of times the item occurred). **Important:** The input MUST be
finite. Implementation uses `JSON.stringify` to determine key equality.
If no `key` fn is given, the original values will be used as key.

```ts
// without key fn
[... ti.frequencies([[1,2], [2,3], [1,2], [2,4]])]
// [ [[1, 2], 2],
//   [[2, 3], 1],
//   [[2, 4], 1] ]

// with key fn
[... ti.frequencies([1, 2, 3, 4, 5, 9, 3], (x) => x & ~1)]
// [ [ 0, 1 ], [ 2, 3 ], [ 4, 2 ], [ 8, 1 ] ]

// letter frequencies
var isLetter = (x) => /[a-z]/i.test(x);
[... ti.frequencies(ti.filter(isLetter, "hello world!"))].sort((a, b) => b[1] - a[1])
// [ ["l", 3], ["o", 2], ["h", 1], ["e", 1], ["w", 1], ["r", 1], ["d", 1] ]
```

### groupBy

Signature: `groupBy<T>(key: (v) => any, input: Iterable<T>) => { [id: string]: T[] }`

Consumes input, applies `key` fn to each item and returns object of
items grouped by result of `key` fn. **Important:** The input MUST be
finite. Implementation uses `JSON.stringify` to determine key equality.

```ts
// group into multiples of 2
groupBy((x) => x & ~1, [1, 2, 3, 4, 5, 9, 3])
// { '0': [ 1 ], '2': [ 2, 3, 3 ], '4': [ 4, 5 ], '8': [ 9 ] }

groupBy((x) => x.toUpperCase(), "AbRaCadaBra")
// { '"A"': [ 'A', 'a', 'a', 'a', 'a' ],
//   '"B"': [ 'b', 'B' ],
//   '"R"': [ 'R', 'r' ],
//   '"C"': [ 'C' ],
//   '"D"': [ 'd' ] }
```

### identity

Signature: `identity<T>(x: T) => T`

Helper function. Simply returns its argument.

```ts
ti.identity() // undefined
ti.identity(null) // null
ti.identity(42) // 42

tests = [true, true, undefined, true]

// all tests succeeded?
ti.every(ti.identity, tests);
// false

// mark missing test results as success
ti.every(ti.fnil(ti.identity, () => true), tests);
// true
```

### indexed

Signature: `indexed<T>(input: Iterable<T>) => IterableIterator<[number, T]>`

Yields iterator producing `[index, value]` pairs of input.

```ts
[...ti.indexed("hello")]
// [ [ 0, "h" ], [ 1, "e" ], [ 2, "l" ], [ 3, "l" ], [ 4, "o" ] ]
```

### interleave

Signature: `interleave(...inputs: Iterable<any>[]) => IterableIterator<any>`

Takes an arbitrary number of iterators and yields iterator of
interleaved items from each input. Terminates as soon as one of the
inputs is exhausted.

```ts
[... ti.interleave(ti.range(), ti.range(100, 200), ti.range(200, 205))]
// [ 0, 100, 200, 1, 101, 201, 2, 102, 202, 3, 103, 203, 4, 104, 204 ]
```

### interpose

Signature: `interpose(x: any, input: Iterable<any>) => IterableIterator<any>`

Produces an iterator which injects `x` between each item from input
`iter`.

```ts
[... ti.interpose("/", ti.range(5))]
// [ 0, "/", 1, "/", 2, "/", 3, "/", 4 ]
```

### iterate

Signature: `iterate<T>(fn: (x: T) => T, seed: T) => IterableIterator<T>`

Produces an iterator of the infinite results of iteratively applying
`fn` to `seed`.

**Important:** Use `take` to truncate sequence.

```ts
[... ti.take(10, ti.iterate((x) => x * 2, 1))]
// [ 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 ]
```

### iterator

Signature: `iterator<T>(x: Iterable<T>) => Iterator<T>`

Syntax sugar. Returns `x[Symbol.iterator]()`. Most functions in this
module call this automatically for each input.

### juxt

Signature: `juxt<T>(...fns: ((x: T) => any)[]) => (x: T) => any[]`

Takes arbitrary number of functions and returns new function, which
takes single argument `x` and produces array of result values of
applying each input function to `x` (juxtoposition of the given
transformation functions).

```ts
var kernel = ti.juxt(
    (x) => x - 1,
    (x) => x,
    (x) => x + 1
);
kernel(1)
// [0, 1, 2]

[... ti.map(kernel, ti.range(3))]
// [ [-1, 0, 1], [0, 1, 2], [1, 2, 3] ]
```

### last

Signature: `last<T>(input: Iterable<T>) => T`

Consumes a **finite** iterator and returns last item.

**Important:** Never attempt to use with an infinite input!

```ts
ti.last(ti.range(10))
// 9

// last item of truncated infinite input
ti.last(ti.take(10, ti.range()))
// 9
```

### map

Signature: `map<T>(fn: (...args: any[]) => T, ...inputs: Iterable<any>[]) => IterableIterator<T>`

Consumes an arbitrary number of iterators and applies `fn` to each of
their values. Produces iterator of results. Iteration stops as soon as
one of the inputs is exhausted. The mapping `fn` should accept as many
arguments as there are inputs to `map`. Provides a fast path for single
input mapping.

```ts
[... ti.map((x)=> x*10, ti.range(10))]
// [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

[... ti.map((x, y, z) => [x, y, z], ti.range(5), ti.range(0, 100, 10), ti.range(0, 1000, 100))]
// [ [0, 0, 0], [1, 10, 100], [2, 20, 200], [3, 30, 300], [4, 40, 400] ]
```

### mapcat

Signature: `mapcat<T>(fn: (...args: any[]) => Iterable<T>, ...inputs: Iterable<any>[]) => IterableIterator<T>`

Like `map`, but expects mapping fn to return an iterable result and
produces iterator which yields the flat concatenation of results (only
the first level of nesting is removed). `null` or `undefined` values
returned by the mapping fn are skipped in the output.

```ts
[... ti.mapcat((x) => ti.repeat(x, 3), "hello")]
// [ "h", "h", "h", "e", "e", "e", "l", "l", "l", "l", "l", "l", "o", "o", "o" ]

[...ti.mapcat((x) => x < 5 ? ti.repeat(x,x) : null, ti.range(10))]
// [ 1, 2, 2, 3, 3, 3, 4, 4, 4, 4 ]
```

### mapIndexed

Signature: `mapIndexed<T>(fn: (i: number, ...args: any[]) => T[], ...inputs: Iterable<any>[]) => IterableIterator<T>`

Like `map`, but too passes a monotonically increasing `index` as first
argument to mapping fn.

```ts
[... ti.mapIndexed((i, a, b) => [i, a, b], "hello", "there")]
// [ [0, "h", "t"],
//   [1, "e", "h"],
//   [2, "l", "e"],
//   [3, "l", "r"],
//   [4, "o", "e"] ]
```

### maybeIterator

Signature: `maybeIterator(x: any) => any`

Helper function, returning arg's iterator (if present) or else
`undefined`.

### maybeObjectIterator

Signature: `maybeObjectIterator(x: any) => any`

Helper function, checks if `x` is object-like (but no generator) and
returns `objectIterator(x)` or else `undefined`.

### objectIterator

Signature: `objectIterator(x: any) => IterableIterator<any[]>`

Produces iterator of an object"s key/value pairs.

```ts
[... ti.objectIterator({a: 23, b: 42, c: [1, 2, 3]})]
// [ ["a", 23], ["b", 42], ["c", [1, 2, 3]] ]
```

### partition

Signature: `partition<T>(n: number, step: number, input: Iterable<T>, all = false) => IterableIterator<T[]>`

Produces iterator of fixed size partitions/chunks of input values.
Produces overlapping partitions, if `step` < partition size `n`. Unless
the optional `all` flag is enabled, returns only completely filled
partitions. If `all = true`, the last partition produced may have less
than `n` items (though never empty).

```ts
[... ti.partition(3, 3, ti.range(10))]
// [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]

[... ti.partition(3, 3, ti.range(10), true)]
// [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [9] ]

[... ti.partition(3, 1, ti.range(10))]
// [ [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5],
//   [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9] ]

[... ti.partition(3, 5, ti.range(10))]
// [ [0, 1, 2], [5, 6, 7] ]
```

### partitionBy

Signature: `partitionBy<T>(fn: (x: T) => any, input: Iterable<T>) => IterableIterator<T[]>`

Produces iterator of partitions/chunks of input values. Applies `fn` to
each item and starts new partition each time `fn` returns new result.

```ts
[... ti.partitionBy((x) => x / 5 | 0, ti.range(11))]
// [ [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10] ]
```

### randomSample

Signature: `randomSample<T>(prob: number, input: Iterable<T>) => IterableIterator<T>`

Produces iterator which consumes input and yields values with given
probability (0 .. 1 range).

```ts
[... ti.randomSample(0.1, ti.range(100))]
// [ 10, 13, 16, 21, 22, 24, 32, 35, 37, 81, 93 ]
```

### range

Signature: `range(from?: number, to?: number, step?: number) => IterableIterator<number>`

Produces iterator of monotonically increasing or decreasing values with
optional `step` value.

- If called without arguments, produces values from 0 .. +∞.
- If called with 1 arg: 0 ... n (exclusive)
- If called with 2 arg: `from` ... `to` (exclusive)

If `from` > `to` and no `step` is given, a `step` of `-1` is used.

```ts
[... ti.take(5, ti.range())]
// [0, 1, 2, 3, 4]

[... ti.range(5)]
// [0, 1, 2, 3, 4]

[... ti.range(100, 105)]
// [100, 101, 102, 103, 104]

[... ti.range(5,0)]
// [5, 4, 3, 2, 1]

[... ti.range(0, 50, 10)]
// [0, 10, 20, 30, 40]

[... ti.range(50, -1, -10)]
// [50, 40, 30, 20, 10, 0]
```

### reduce

Signature: `reduce<A, B>(rfn: (acc: B, x: A) => B | ReducedValue<B>, acc: B, input: Iterable<A>) => B`

Consumes and reduces input using reduction function `rfn`, then returns
reduced result value. `rfn` can abort reduction process by returning a
value wrapped using `reduced(x)`. If this is done, then this value is
unwrapped and returned as final result.

If input is empty, returns initial `acc`umulator arg.

```ts
ti.reduce((acc, x) => acc + x, 0, ti.range(10))
// 45

// infinite input with early termination
ti.reduce((acc, x) => { return acc += x, acc >= 15 ? ti.reduced(acc) : acc }, 0, ti.range())
// 15
```

### reductions

Signature: `reductions<A, B>(rfn: (acc: B, x: A) => B | ReducedValue<B>, acc: B, input: Iterable<A>) => IterableIterator<B[]>`

Like `reduce`, but yields an iterator of all intermediate reduction
results. Always yields at least initial `acc`umulator arg, even if input
is empty.

Thus, the result is the equivalent of an *exclusive* [scan
operation](http://http.developer.nvidia.com/GPUGems3/gpugems3_ch39.html)
(with the exception of possible early bail out via `reduced`).

```ts
[... ti.reductions((acc, x) => acc + x, 0, ti.range(10))]
// [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45 ]

// with early termination
[... ti.reductions((acc, x) => { return acc += x, acc >= 15 ? ti.reduced(acc) : acc }, 0, ti.range())]
// [ 0, 1, 3, 6, 10, 15 ]
```

### reduced

Signature: `reduced<T>(x: T) => ReducedValue<T>`

For use inside reduction functions only. Wraps result in marker type to
cause early termination of reduction (see example above).

### repeat

Signature: `repeat<T>(x: T, n?: number) => IterableIterator<T>`

Produces an iterator of infinite (by default) repetitions of value `x`.
If `n` is given, produces only that many values.

```ts
[... ti.take(5, ti.repeat(42))]
// [42, 42, 42, 42, 42]

[... ti.repeat(42, 5)]
// [42, 42, 42, 42, 42]
```

### repeatedly

Signature: `repeatedly<T>(fn: () => T, n?: number) => IterableIterator<T>`

Produces an iterator of infinite (by default) results of calling the
no-arg `fn` repeatedly. If `n` is given, produces only that many values.

```ts
[... ti.take(3, ti.repeatedly(() => Math.random()))]
// [ 0.9620186971807614, 0.8191901643942394, 0.5964328949163533 ]

[... ti.repeatedly(() => Math.random(), 3)]
// [ 0.46381477224416057, 0.22568030685532992, 0.5494769470662977 ]
```

### reverse

Signature: `reverse<T>(input: Iterable<T>) => IterableIterator<T>`

Yields iterator **lazily** producing reverse result order of input
(**must be finite**). If input is not already array-like (strings are
for this purpose), the function first consumes & caches input as array.

```ts
[...ti.reverse([1, 2, 3])]
// [3, 2, 1]

[...ti.reverse("hello")]
// [ "o", "l", "l", "e", "h" ]

[...ti.reverse(ti.take(10, ti.iterate(x => x * 2, 1)))]
// [ 512, 256, 128, 64, 32, 16, 8, 4, 2, 1 ]
```

### some

Signature: `some<T>(pred: (x: T) => boolean, input: Iterable<T>) => T`

Consumes iterator and calls `pred` for each item. When `pred` returns
`true`, process stops and returns this first successful item. When none
of the items pass the predicate, the function returns `undefined`.

```ts
var nums = ti.iterator([1, 2, 3]);

ti.some((x) => (x % 2) === 0, nums);
// 2, the 1st value which passed
nums.next()
// { value: 3, done: false }

nums = ti.iterator([1, 2, 3]);
ti.some((x) => x > 3, nums);
// undefined
nums.next()
// { value: undefined, done: true }
```

### take

Signature: `take<T>(n: number, input: Iterable<T>) => IterableIterator<T>`

Produces iterator of the first `n` values of input (or less than `n`, if
input is too short...)

```ts
[... ti.take(3, ti.range())]
// [ 0, 1, 2 ]
```

### takeNth

Signature: `takeNth<T>(n: number, input: Iterable<T>) => IterableIterator<T>`

Produces an iterator only yielding every `n`th item from input.

```ts
[... ti.takeNth(3, ti.range(10))]
// [ 0, 3, 6, 9 ]
```

### takeWhile

Signature: `takeWhile<T>(pred: (x: T) => boolean, input: Iterable<T>) => IterableIterator<T>`

Produces iterator which calls `pred` for each item of input and
terminates as soon as `pred` returns `false`.

**Important:** Due to lack of look-ahead in the ES6 iterator API, the
value failing the given `pred` will be lost when working with the
original iterator *after* `takeWhile`.

```ts
var input = ti.range(10);
[... ti.takeWhile((x)=> x < 5, input)]
// [ 0, 1, 2, 3, 4 ]
[... input]
// note: `5` is missing (the value which failed takeWhile)
// [ 6, 7, 8, 9 ]
```

### takeLast

Signature: `takeLast<T>(n: number, input: Iterable<T>) => IterableIterator<T>`

Consumes input and produces iterator of the last `n` values of input (or
less than `n`, if input is too short...)

**Important:** Never attempt to use with infinite inputs!

```ts
[... ti.takeLast(5, ti.range(1000))]
// [ 995, 996, 997, 998, 999 ]

[... ti.takeLast(5, ti.range(3))]
// [ 0, 1, 2 ]
```

### walk

- Signature: `walk(fn: (x: any) => void, input: Iterable<any>, postOrder = false) => void`
- Signature: `walk(fn: (x: any) => void, children: (x: any) => any, input: Iterable<any>, postOrder = false) => void`

Recursively walks input and applies `fn` to each element (for in-place
editing or side effects). Only iterable values and objects (but not
strings) are traversed further. Traversal is pre-order by default, but
can be changed to post-order via last arg.

Note: Object traversal is done via `objectIterator()` and so will
include pairs of `[k, v]` values.

The optional `children` fn can be used to select child values of the
currently visited value. If this function is given then only its return
values will be traversed further (with the same constraint as mentioned
above). If the fn returns `null` or `undefined`, no children will be
visited.

```ts
// dummy SVG document
let doc = {
    tag: "svg",
    content: [
        {
            tag: "g",
            content: [
                { tag: "rect" },
                { tag: "circle" }
            ]
        },
        { tag: "circle", attr: { fill: "red" } }
    ]
};

// transformer fn for circle tags
// injects/overrides certain attribs
let circleTX = x => {
    if (x.tag === "circle") {
        x.attr = x.attr || {};
        x.attr.x = Math.random()*100;
        x.attr.y = Math.random()*100;
        x.attr.r = 5;
    }
};

// transform doc
ti.walk(circleTX, (x) => x.content, doc);

doc.content[0].content[1]
// { tag: "circle", attr: { x: 83.9269, y: 31.129, r: 5 } }
doc.content[1]
// { tag: "circle", attr: { fill: "red", x: 37.963, y: 87.521, r: 5 } }
```

### walkIterator

- Signature: `walkIterator(input: Iterable<any>, postOrder = false) => IterableIterator<any>`
- Signature: `walkIterator(input: Iterable<any>, children: (x: any) => any, postOrder = false) => IterableIterator<any>`

Yields an iterator performing either pre-order (default) or post-order
[traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order) of
input. Only iterable values and objects (but not strings) are traversed
further.

Note: Object traversal is done via `objectIterator()` and so will
include pairs of `[k, v]` values.

The optional `children` fn can be used to select child values of the
currently visited value. If this function is given then only its return
values will be traversed further (with the same constraint as mentioned
above). If the fn returns `null` or `undefined`, no children will be
visited.

```ts
// pre-order traversal
[...ti.map(JSON.stringify, ti.walkIterator([[[1, [2]], [3, [4]]], [5]], false))]
// [ "[[[1,[2]],[3,[4]]],[5]]",
//   "[[1,[2]],[3,[4]]]",
//   "[1,[2]]",
//   "1",
//   "[2]",
//   "2",
//   "[3,[4]]",
//   "3",
//   "[4]",
//   "4",
//   "[5]",
//   "5" ]

// post-order traversal
[...ti.map(JSON.stringify, ti.walkIterator([[[1, [2]], [3, [4]]], [5]], true))]
// [ "1",
//   "2",
//   "[2]",
//   "[1,[2]]",
//   "3",
//   "4",
//   "[4]",
//   "[3,[4]]",
//   "[[1,[2]],[3,[4]]]",
//   "5",
//   "[5]",
//   "[[[1,[2]],[3,[4]]],[5]]" ]
```

### zip

Signature: `zip(keys: Iterable<any>, vals: Iterable<any>, target?: any) => any`

Takes an iterator of keys and iterator of values, pairwise combines
items from each input and associates them as key-value mappings in a
given target object (if `target` is missing, returns new object). Stops
as soon as either input is exhausted.

```ts
ti.zip("abcdef", ti.range())
// { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 }

ti.zip(ti.range(5,10), ti.range(100,200), new Uint8Array(16))
// [ 0, 0, 0, 0, 0, 100, 101, 102, 103, 104, 0, 0, 0, 0, 0, 0 ]

var langs=[
    {id: "js", name: "JavaScript"},
    {id: "clj", name: "Clojure"},
    {id: "ts", name: "TypeScript"}
];

ti.zip(ti.map((x)=> x.id, langs), langs)
// { js: { id: "js", name: "JavaScript" },
//   clj: { id: "clj", name: "Clojure" },
//   ts: { id: "ts", name: "TypeScript" } }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-iterators,
  title = "@thi.ng/iterators",
  author = "Karsten Schmidt",
  note = "https://thi.ng/iterators",
  year = 2017
}
```

## License

&copy; 2017 - 2023 Karsten Schmidt // Apache License 2.0
