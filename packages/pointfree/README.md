<!-- This file is generated - DO NOT EDIT! -->

# ![pointfree](https://media.thi.ng/umbrella/banners/thing-pointfree.svg?e49713a7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pointfree.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Reading links](#reading-links)
  - [A brief comparison](#a-brief-comparison)
  - [Status](#status)
  - [Support packages](#support-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
    - [About stack effects](#about-stack-effects)
    - [run](#run)
  - [Custom word definitions](#custom-word-definitions)
  - [Factoring](#factoring)
  - [Quotations](#quotations)
    - [Quotations as vanilla JS function calls](#quotations-as-vanilla-js-function-calls)
    - [Currying & composing quotations](#currying--composing-quotations)
  - [Dataflow combinators](#dataflow-combinators)
    - [dip](#dip)
    - [keep](#keep)
    - [bi & tri](#bi--tri)
    - [bis & tris](#bis--tris)
    - [bia & tria](#bia--tria)
  - [Array transformations](#array-transformations)
    - [Bind stack values to object keys](#bind-stack-values-to-object-keys)
    - [Combine array transform op with deeper stack values](#combine-array-transform-op-with-deeper-stack-values)
  - [Conditionals](#conditionals)
  - [Loops](#loops)
  - [In-place stack value transformation](#in-place-stack-value-transformation)
  - [R-stack usage](#r-stack-usage)
- [Core vocabulary](#core-vocabulary)
  - [D-Stack modification](#d-stack-modification)
  - [R-Stack modification](#r-stack-modification)
  - [Word & quotation execution / combinators](#word--quotation-execution--combinators)
  - [Primitive math](#primitive-math)
  - [Logic](#logic)
  - [Environment](#environment)
  - [Arrays, objects, strings](#arrays-objects-strings)
    - [String specific](#string-specific)
  - [I/O](#io)
  - [Error handling](#error-handling)
  - [Control flow](#control-flow)
    - [cond](#cond)
    - [condq](#condq)
    - [cases](#cases)
    - [loop](#loop)
    - [loopq](#loopq)
    - [dotimes](#dotimes)
  - [Word creation and execution](#word-creation-and-execution)
    - [word](#word)
    - [wordU](#wordu)
    - [unwrap](#unwrap)
    - [ctx](#ctx)
    - [run](#run)
    - [runU](#runu)
    - [runE](#rune)
- [Authors](#authors)
- [License](#license)

## About

[Pointfree](https://en.wikipedia.org/wiki/Concatenative_programming_language)
functional composition via lightweight (~3KB gzipped), stack-based embedded DSL.

This module implements the language's core components in vanilla ES6 and
is perfectly usable like that. **The related
[@thi.ng/pointfree-lang](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree-lang)
module defines an actual language with a powerful and more concise
syntax around this module and might be better suited for some use
cases.**

Current features:

- words implemented as tiny vanilla JS functions (easily extensible)
- optimized pre-composition/compilation of custom user defined words
  (see
  [word.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree/src/word.ts))
- dual stack (main & stash/scratch space)
- nested execution environments (scopes)
- arbitrary stack values
- nested quotations (static or dynamically generated programs stored on stack)
- includes 100+ operators:
    - conditionals
    - looping constructs
    - 20+ dataflow / quotation combinators (`dip`, `keep`, `bi` etc.)
    - array / tuple ops
    - math, binary & logic ops
    - currying quotations
    - higher order combinators
    - environment manipulation etc.
- stack comments & documentation for most ops/words
- [over 330 test cases](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree/test/index.ts)

### Reading links

For a great overview & history of this type of this type of programming,
please see:

- [Concatenative Programming: From Ivory to Metal](https://www.youtube.com/watch?v=_IgqJr8jG8M)
  (John Purdy's talk @ Stanford Computer Systems Colloquium)
- [Concatenative.org Wiki](http://concatenative.org/)
  - [Name code not values](http://concatenative.org/wiki/view/Concatenative%20language/Name%20code%20not%20values)
  - [Concatenation is composition](http://concatenative.org:8080/wiki/view/Concatenative%20language/Concatenation%20is%20composition)
- [Thinking Forth E-book](http://thinking-forth.sourceforge.net/)

Originally, this project started out as precursor of the [Charlie Forth
VM/REPL](http://forth.thi.ng) (JS) and
[@thi.ng/synstack](http://thi.ng/synstack) VM (C11), but has since been
refactored to be more generally useful as environment for building data
processing pipelines in a [pointfree / concatenative programming
style](https://en.wikipedia.org/wiki/Concatenative_programming_language)
rather than acting as full-blown VM. Some words and concepts have been
ported from [Factor](http://factorcode.org) and
[Popr](https://github.com/HackerFoo/poprc).

### A brief comparison

(details explained further below)

```ts
// define word to compute dot product of two vectors
const dotp = pf.word([pf.vmul, [pf.add], 0, pf.foldl]);
// another word to normalize a vector (uses `dotp`)
const normalize = pf.word([pf.dup, pf.dup, dotp, pf.sqrt, pf.vdiv]);

// `word(...)` creates a functional composition of given body
// each stack function accepts & returns a stack context tuple
// i.e. normalize = vdiv(sqrt(dotp(dup(dup(ctx)))));

// `unwrap` retrieves a value/section of the result stack
pf.unwrap(dotp([[ [1, 2, 3], [4, 5, 6] ]]))
// 32

pf.unwrap(normalize([[ [10, -10, 0] ]]))
// [ 0.7071067811865475, -0.7071067811865475, 0 ]
```

The same in standard imperative style:

```ts
function dotp(a, b) {
    let sum = 0;
    for(let i = 0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

function normalize(v) {
    const mag = Math.sqrt(dotp(v, v));
    for(let i = 0; i < v.length; i++) {
        v[i] /= mag;
    }
    return v;
}

dotp([1,2,3], [4,5,6]);
// 32

normalize([10, -10, 0])
// [ 0.7071067811865475, -0.7071067811865475, 0 ]
```

In terms of composing processing pipelines, this approach is somewhat
related to
[transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers),
however the pointfree method and use of a stack as sole communication
medium between different sub-processes **can** be more flexible, since
each function ("word" in Concatenative-programming-speak) can consume or
produce any number of intermediate values from/on the stack.
Furthermore, on-stack quotations and dataflow combinators can be used
for dynamic programming approaches and conditionals can be used to cause
non-linear control flow.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpointfree%5D+in%3Atitle)

### Support packages

- [@thi.ng/pointfree-lang](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree-lang) - Forth style syntax layer/compiler & CLI for the [@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree) DSL

## Installation

```bash
yarn add @thi.ng/pointfree
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/pointfree"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const pointfree = await import("@thi.ng/pointfree");
```

Package sizes (gzipped, pre-treeshake): ESM: 3.33 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                      | Live demo | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:---------------------------------|:----------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-svg.png" width="240"/> | Generate SVG using pointfree DSL |           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-svg) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pointfree/)

The main type aliases used by this DSL are:

```ts
type Stack = any[]
type StackEnv = any
type StackFn = (ctx: StackContext) => StackContext
type StackProgram = any[]
type StackProc = StackFn | StackProgram
type StackContext = [Stack, Stack, StackEnv?]
```

The `StackContext` tuple consists of:

- **d-stack** - main data stack
- **r-stack** - "return stack" (in Forth speak), mainly used as scratch
  space for internal data
- **env** - arbitrary data object defining the current environment

Each program function ("word") accepts a `StackContext` tuple and can
arbitrarily modify both its stacks and/or environment and must return
the updated context (usually the same instance as passed in, but could
also produce a new one). Any side effects are allowed.

A `StackProgram` is an array of stack functions and non-function values.
The latter are replaced by calls to `push` which pushes the given value
on the stack as is. Therefore, a stack program like: `[1, 2, pf.add]`
compiles to:

```ts
pf.add(pf.push(2)(pf.push(1)(<initial context>)))
```

#### About stack effects

Most concatenative languages use stack effect comments as the standard
approach to document the effect a word has on the stack structure.

```forth
( x y -- x )
```

The items in front of the `--` describe the relevant state of the stack
before the execution of a word (the args expected/consumed by the word).
The part after the `--` is the state of the stack after execution (the
results). If no args are given on the LHS, the word consumes no args. If
no args are given on the RHS, no result values are produced.

(Note: **TOS** = Top Of Stack)

#### run

`run(program: StackProgram, stack?: StackContext)`

The main user function of this library. It takes a stack program and
optional `StackContext` with initial stacks and environment (an
arbitrary object). It executes the program and returns the updated
context.

Alternatively, we can use `runU()` to return an unwrapped value or
section of the result stack. This is merely syntax sugar and we use this
for some of the examples below.

```ts
// calculate (1 + 2 + 3) * 10
pf.run(
    // a pointfree stack program w/ stack effects
    [
        10, 1, 2, 3, // initial data values
        pf.add,      // ( 10 1 2 3 -- 10 1 5 )
        pf.add,      // ( 10 1 5 -- 10 6 )
        pf.mul,      // ( 10 6 -- 60 )
    ]
)
// [ [ 60 ], [], {}]

// this is the same as this functional composition:
pf.mul(pf.add(pf.add(pf.ctx([10, 1, 2, 3]))))
// [ [ 60 ], [], {}]
```

### Custom word definitions

Custom words can be defined via the `word()` and `wordU()` functions.
The latter uses `runU()` to execute the word and returns unwrapped
value(s) from result context.

**Important**: Unwrapped words **cannot** be used as part of larger
stack programs. Their use case is purely standalone application.

```ts
// define new word to compute multiply-add:
// ( x y z -- x*y+z )
const madd = pf.word([pf.invrot, pf.mul, pf.add]);

// compute 3 * 5 + 10
madd([[3, 5, 10]]);
// [ [ 25 ] ]

// unwrapped version
const maddU = pf.wordU([madd]);

// compute 3 * 5 + 10
maddU([3, 5, 10]);
// 25
```

### Factoring

Factoring is a crucial aspect of developing programs in concatenative
languages. The general idea is to decompose a larger solution into
smaller re-usable units, words, quotations. These often extremely small
words can be much easier tested and reused.

```ts
// compute square of x
// ( x -- x*x )
const pow2 = pf.word([pf.dup, pf.mul]);

// test word with given (partial) stack context
pf.unwrap(pow2([[-10]]))
// 100

// compute magnitude of 2d vector (using `pow2`)
// ( x y -- mag )
const mag2 = pf.wordU([
    // `bia` is a combinator,
    // which applies quotation to both inputs
    [pow2], pf.bia, // ( x*x y*y )
    pf.add,         // ( x*x+y*y )
    pf.sqrt         // ( sqrt(x*x+y*y) )
]);

mag2([[-10, 10]])
// 14.142135623730951
```

### Quotations

A `StackProgram` residing as data on the stack is called a quotation.
Quotations enable a form of dynamic meta programming and are used by
several built-in words and combinators. Quoations are used like lambdas
/ anonymous functions in traditional functional programming, are
executed in the current environment, but needn't be complete units of
execution. Quotations can be nested, composed and are executed via
`exec`.

This example uses a quoted form of the above `pow2` word:

```ts
pf.runU(
    [
        // push quotation on stack
        [pf.dup, pf.mul],
        // execute
        pf.exec,
    ],
    // initial (partial) stack context
    [[10]]
);
// 100
```

#### Quotations as vanilla JS function calls

Quoations can be used to define (or dynamically construct) JS function
calls. For that a quotation needs to take the form of an
[S-expression](https://en.wikipedia.org/wiki/S-expression), i.e. the
first element of the quotation is the actual function to be called and
all other values in the quotation are passed as arguments. The result of
the function call is placed back on the stack.

```ts
pf.runU(
    [
        [(a,b) => a + b, 1, 2],
        pf.execjs
    ]
);
// 3
```

#### Currying & composing quotations

Since quoatations are just arrays, we can treat them as data, i.e. **the
functional composition of two quotations is the same as concatenating
two arrays**:

```js
const add10 = [10, pf.add];
const mul10 = [10, pf.mul];

// `cat` is used to concatenate arrays
// the result quotation computes: `(x+10)*10`
pf.runU([ add10, mul10, pf.cat, pf.exec ], [[1]])
// 110
```

As with [partial
application](https://en.wikipedia.org/wiki/Partial_application) in
functional programming, we can "curry" quotations and use `pushl` to
prepend (or `pushr` to append) arguments to a given quotation (array).
Also see [the section about combinators](#dataflow-combinators) for more
advanced options.

```ts
// build & execute curried quotation
pf.run([10, [pf.add], pf.pushl, pf.exec], [[13]]);
// 23
```

Furthermore, the ES6 spread operator can be used to dissolve a quotation
in a larger word/program (i.e. as a form of inlining code).

```ts
// a quotation is just an array of values/words
// this function is a quotation generator
const tupleQ = (n) => [n, pf.collect];
// define another quotation which takes an id and
// when executed stores TOS under `id` key in current environment
const storeQ = (id) => [id, pf.store]

// define word which inlines both `tupleQ` and `storeQ`
const storeID = (id, size) => pf.word([...tupleQ(size), ...storeQ(id)]);

// transform stack into tuples, stored in env
// `runE()` only returns the result environment
pf.runE(
    [storeID("a", 2), storeID("b", 3)],
    // (`ctx()` creates a complete StackContext tuple)
    pf.ctx([1, 2, 3, 4, 5])
);
// { a: [ 4, 5 ], b: [ 1, 2, 3 ] }
```

### Dataflow combinators

Combinators are higher-order constructs, enabling powerful data
processing patterns, e.g. applying multiple quotations to single or
multiple values, preserving/excluding stack values during processing etc.

Most of these combinators have been ported from the
[Factor](http://docs.factorcode.org:8080/content/article-dataflow-combinators.html)
language.

Btw. the number suffixes indicate the number of values or quotations
each combinator deals with... not all versions are shown here.

#### dip

`dip` / `dip2` / `dip3` / `dip4`

Removes one or more stack values before applying quotation, then
restores them again after. Most other combinators are internally built
on `dip` and/or `keep`.

```ts
// remove `20` before executing quot, then restores after
// with the effect of apply qout to 2nd topmost value (here: 10)
pf.run([10, 20, [pf.inc], pf.dip])[0]
// [11, 20]

// dip2 removes & restores 2 values
pf.run([1, 2, 3, [10, pf.add], pf.dip2])[0]
// [11, 2, 3]
```

#### keep

`keep` / `keep2` / `keep3`

Calls a quotation with a value on the d-stack, restoring the value after
quotation finished.

```ts
// here `add` would normally consume two stack values
// but `keep2` restores them again after the quot has run
pf.run([1, 2, [pf.add], pf.keep2])[0]
// [3, 1, 2]
```

#### bi & tri

- `bi` / `bi2` / `bi3`
- `tri` / `tri2` / `tri3`

`bi` takes one value and two quotations. Applies first quot to the
value, then applies second quot to the same value.

```ts
pf.run([2, [10, pf.add], [10, pf.mul], pf.bi])[0]
// [12, 20]

// `bi3` takes 3 stack values and 2 quots (hence "bi")
pf.run([2, 10, 100, [pf.add, pf.add], [pf.mul, pf.mul], pf.bi3])[0]
// [112, 2000]
```

`tri` takes 3 quotations, else same as `bi`:

```ts
pf.run([10, [pf.dec], [pf.dup, pf.mul], [pf.inc], pf.tri])[0]
// [9, 100, 11]
```

#### bis & tris

- `bis` / `bis2`
- `tris` / `tris2`

`bis` applies first quot `p` to `x`, then applies 2nd quot `q` to `y`.

( x y p q -- px qy )

```ts
pf.run([10, 20, [pf.inc], [pf.dec], pf.bis])[0]
// [11, 19]

// bis2 expects quotations to take 2 args
// computes: 10+20 and 30-40
pf.run([10, 20, 30, 40, [pf.add], [pf.sub], pf.bis2])[0]
// [30, -10]
```

#### bia & tria

- `bia` / `bia2`
- `tria` / `tria2`

Applies the quotation `q` to `x`, then to `y`.

( x y q -- qx qy )

```ts
pf.run([10, 20, [pf.inc], pf.bia])[0]
// [11, 21]

// tria2 takes 6 values and applies quot 3x pairwise
// i.e. 10+20, 30+40, 50+60
pf.run([10, 20, 30, 40, 50, 60, [pf.add], pf.tria2])[0]
// [30, 70, 110]
```

See [tests](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree/test/index.ts#L579) for more examples...

### Array transformations

The DSL includes several array transforming words and constructs, incl.
array/vector math ops, splitting, deconstructing, push/pull (both
LHS/RHS) and the `mapl` & `mapll` words, both of which act as
generalization for `map`, `filter`, `mapcat` and `reduce`. The only
difference between `mapl` and `mapll` is that the former does **not**
produce a result array (only flat results pushed on stack), whereas
`mapll` always produces a new array.

`mapl` takes an array and a quotation. Loops over array, pushes each
value on the stack and applies quotation for each.

```ts
// multiply each array item * 10
pf.runU([[1, 2, 3, 4], [10, pf.mul], pf.mapll]);
// [ 10, 20, 30, 40 ]

// same packaged as standalone function
const map_mul10 = pf.word([[10, pf.mul], pf.mapll, pf.unwrap]);
map_mul10([[[1, 2, 3, 4]]]);
// [ 10, 20, 30, 40 ]

// the above case can also be solved more easily via vector math words
// multiply vector * scalar
pf.runU([[1, 2, 3, 4], 10, pf.vmul]);
// [ 10, 20, 30, 40 ]

// multiply vector * vector
pf.runU([[1, 2, 3, 4], [10, 20, 30, 40], pf.vmul]);
// [ 10, 40, 90, 160 ]

// drop even numbers, duplicate odd ones
// here using nested quotations (`condq` is explained further below)
pf.runU([[1, 2, 3, 4], [pf.dup, pf.even, [pf.drop], [pf.dup], pf.condq], pf.mapll])
// [ 1, 1, 3, 3 ]

// reduction example (using `mapl`)
// the `0` is the initial reduction result
pf.runU([0, [1, 2, 3, 4], [pf.add], pf.mapl])
// 10

// using `foldl` allows a different (better) argument order
// for reduction purposes (uses `mapl` internally)
// ( arr q init -- reduction )
pf.runU([[1, 2, 3, 4], [pf.add], 0, pf.foldl])
// 10
```

#### Bind stack values to object keys

`bindkeys` takes an array of keys and target object, then pops & binds
deeper stack values to their respective keys in object. Pushes result
object back on stack at the end. Throws error if there're less remaining
stack values than keys in given array.

```ts
runU([1, 2, 3, ["a","b","c"], {}, bindkeys])
// { c: 3, b: 2, a: 1 }
```

#### Combine array transform op with deeper stack values

```ts
// helper word to extract a 8bit range from a 32bit int
// `x` is the orig number, `s` bit shift amount
// ( x s -- x byte )
const extractByte = pf.word([
    pf.over,  // ( x s x )
    pf.swap,  // ( x x s )
    pf.lsru,  // ( x x>>>s )
    0xff,     // ( x x>>>s 0xff )
    pf.bitand // ( x (x>>>s)&0xff )
]);

// decompose a number into 4 bytes
// the 1st array defines the bitshift offsets for each byte
// ( x -- a b c d )
const splitBytes = pf.word([[24, 16, 8, 0], [extractByte, pf.swap], pf.mapl, pf.drop]);

// decompose the number 0xdecafbad into 4 bytes
splitBytes([[0xdecafbad]]);
// [ [ 222, 202, 251, 173 ] ]
// in hex: [ [ 0xde, 0xca, 0xfb, 0xad ] ]
```

### Conditionals

See `cond` documentation further below...

```ts
// negate TOS item ONLY if negative, else do nothing
const abs = pf.wordU([pf.dup, pf.isneg, pf.cond(pf.neg)]);

// test w/ negative inputs
abs([[-42]])
// 42

// test w/ positive inputs
abs([42])
// 42
```

```ts
// `cases()` is similar to JS `switch() { case ... }`
const classify = (x) =>
    pf.unwrap(
        pf.cases({
            0: ["zero"],
            1: ["one"],
            default: [
                pf.dup,
                pf.ispos,
                pf.cond(["many"], ["invalid"])
            ]
        })([[x]]));

classify(0);
// "zero"
classify(1);
// "one"
classify(100);
// "many"
classify(-1);
// "invalid"
```

### Loops

`loop` takes two quotations (a test and a body). Executes body as long
as test produces a truthy result. There's also `loopq` which reads its
arguments (same as `loop`) from the stack.

```ts
// print countdown from 3
pf.run(
    [
        // test
        [pf.dup, pf.ispos], // ( x -- x bool )
        // loop body
        ["counter: ", pf.over, pf.add, pf.print, pf.dec], // ( x -- x-1 )
        pf.loopq
    ],
    // initial stack context
    [[3]]
);
// counter: 3
// counter: 2
// counter: 1
// [ [ 0 ] ]
```

Alternatively, the `dotimes` construct is more suitable for simple
counter based iterations. Like `loopq` it's not an higher-order word and
works with a body quotation, which is executed `n` times.

```ts
pf.run([3, ["counter: ", pf.swap, pf.add, pf.print], pf.dotimes])
// counter: 0
// counter: 1
// counter: 2
```

`loop`/`loopq` and `dotimes` can be used to create more complex/custom
looping constructs:

```ts
// 2D range/grid loop
//
// (cols rows body -- ? )
//
// iterates over `rows` as outer and `cols` as inner loop
// executes body quotation with this stack effect
// ( x y -- )
const loop2 = pf.word([
    pf.maptos(pf.word), // first compile body
    pf.movdr,           // move body move to r-stack
    [
        pf.over,
        [pf.over, pf.cprd, pf.exec], pf.dotimes,
        pf.drop,
    ], pf.dotimes,
    pf.drop,            // cleanup both stacks
    pf.rdrop,
]);

pf.run([2, 3, [pf.vec2, pf.print], loop2]);
// [ 0, 0 ]
// [ 1, 0 ]
// [ 0, 1 ]
// [ 1, 1 ]
// [ 0, 2 ]
// [ 1, 2 ]
// [ [], [], {} ]

// To keep/collect the grid coordinates for future use
// use `vec2` and `invrot` to rotate them 2 places down the stack
// the last 2 words `dsp, collect` are used to group
// all stack items into a single tuple
pf.runU([2, 3, [pf.vec2, pf.invrot], loop2, pf.dsp, pf.collect]);
// [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ], [ 0, 2 ], [ 1, 2 ] ]
```

### In-place stack value transformation

The `maptos()`, `map2()` higher order words can be used to transform
stack items in place using vanilla JS functions:

- `maptos(f)` - replaces TOS with result of given function.
- `map2(f)` - takes top 2 values from stack, calls function and writes
  back result. The arg order is (TOS, TOS-1) - this is how all primitive
  math ops are implemented

### R-stack usage

The second stack ("R-stack") is useful to store interim processing state
without having to resort to complex stack shuffling ops. There're
several words available for moving data between main ("D-stack") and the
r-stack and to manipulate the structure of the R-stack itself.

```ts
// this example partitions the main stack into triples

// helper word to check if there're values on d-stack
// (`dsp` return d-stack pointer, i.e. the current depth of the stack)
notempty = pf.word([pf.dsp, pf.ispos])
// helper word to collect max `n` items into a tuple
// ( ... n -- [...] )
collectmax = pf.word([pf.dsp, pf.dec, pf.min, pf.collect])

pf.runU([
    // create result array
    [],
    // desired partition size
    3,
    // move both values onto r-stack
    pf.movdr2,
    // start loop
    pf.loop(
        // test if there're more items on d-stack
        notempty,
        [
            // copy r-stack TOS to d-stack (partition size)
            pf.cprd,
            // create tuple
            collectmax,
            // swap r-stack values
            pf.rswap,
            // copy result array from r-stack to d-stack
            pf.cprd,
            // push tuple into result array
            pf.pushl,
            // drop result array from d-stack
            pf.drop,
            // swap r-stack vals again to restore orig order
            pf.rswap
        ]),
    // drop partition size from r-stack
    pf.rdrop,
    // move result array from r-stack to d-stack
    pf.movrd
    ],
    // initial stack context (to be partitioned)
    pf.ctx([1,2,3,4,5,6,7,8])
);
// [ [ 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ] ]
```

TODO more examples forthcoming

## Core vocabulary

By default, each word checks for stack underflow and throws an error if
there are insufficient values on the stack. These checks can be disabled
by calling `pf.safeMode(false)`.

Note: Some of the words are higher-order functions, accepting arguments
at word construction time and return a pre-configured stack function.

### D-Stack modification

| Word            | Stack effect               | Description                               |
|-----------------|----------------------------|-------------------------------------------|
| `drop`          | `( x -- )`                 | remove TOS                                |
| `drop2`         | `( x y -- )`               | remove top 2 vals                         |
| `dropif`        | `( x -- ? )`               | remove only if TOS truthy                 |
| `dsp`           | `( -- stack.length )`      | push d-stack depth                        |
| `dup`           | `( x -- x x )`             | duplicate TOS                             |
| `dup2`          | `( x y -- x y x y )`       | duplicate top 2 vals                      |
| `dup3`          | `( x y z -- x y z x y z )` | duplicate top 3 vals                      |
| `dupif`         | `( x -- x x? )`            | dup only if TOS truthy                    |
| `maptos(fn)`    | `( x -- f(x) )`            | transform TOS w/ `f`                      |
| `map2(fn)`      | `( x y -- f(y, x) )`       | reduce top 2 vals with `f`, single result |
| `nip`           | `( x y -- y )`             | remove `x` from stack                     |
| `over`          | `( x y -- x y x )`         | push dup of `x`                           |
| `pick`          | `( n -- stack[n] )`        | dup deeper stack value                    |
| `push(...args)` | `( -- ...args )`           | push `args` on stack                      |
| `rot`           | `( x y z -- y z x )`       | rotate top 3 vals down/left               |
| `invrot`        | `( x y z -- z x y )`       | rotate top 3 vals up/right                |
| `swap`          | `( x y -- y x )`           | swap top 2 vals                           |
| `swap2`         | `( a b c d -- c d a b )`   | swap top 2 pairs                          |
| `tuck`          | `( x y -- y x y )`         | insert dup of TOS                         |

### R-Stack modification

| Word     | Stack effect                  | Description                    |
|----------|-------------------------------|--------------------------------|
| `rdrop`  | `( x -- )`                    | drop TOS from r-stack          |
| `rdrop2` | `( x y -- )`                  | remove top 2 vals from r-stack |
| `rswap`  | `( x y -- y x )`              | swap top 2 vals on r-stack     |
| `rswap2` | `( a b c d -- c d a b )`      | swap top 2 pairs on r-stack    |
| `rsp`    | `( -- stack.length )`         | push r-stack depth on d-stack  |
| `movdr`  | `( x -- )` (d-stack effect)   | push d-stack TOS on r-stack    |
| `movrd`  | `( -- x )` (d-stack effect)   | push r-stack TOS on d-stack    |
| `cpdr`   | `( x -- x )` (d-stack effect) | copy d-stack TOS on r-stack    |
| `cprd`   | `( -- x )` (d-stack effect)   | copy r-stack TOS on d-stack    |

### Word & quotation execution / combinators

| Word    | Stack effect                  | Description                             |
|---------|-------------------------------|-----------------------------------------|
| `exec`  | `( w -- ? )`                  | call TOS as (compiled) word w/ curr ctx |
| `dip`   | `( x q -- .. x )`             |                                         |
| `dip2`  | `( x y q -- .. x y )`         |                                         |
| `dip3`  | `( x y z q -- .. x y z )`     |                                         |
| `dip4`  | `( x y z w q -- .. x y z w )` |                                         |
| `keep`  | `( x q -- .. x )`             |                                         |
| `keep2` | `( x y q -- .. x y )`         |                                         |
| `keep3` | `( x y z q -- .. x y z )`     |                                         |
| `bi`    | `( x p q -- pres qres )`      |                                         |
| `bi2`   | `( x y p q -- pres qres )`    |                                         |
| `bi3`   | `( x y z p q -- pres qres )`  |                                         |

### Primitive math

| Word     | Stack effect             | Description          |
|----------|--------------------------|----------------------|
| `add`    | `( x y -- x+y )`         |                      |
| `sub`    | `( x y -- x-y )`         |                      |
| `mul`    | `( x y -- x*y )`         |                      |
| `div`    | `( x y -- x/y )`         |                      |
| `mod`    | `( x y -- x%y )`         |                      |
| `inc`    | `( x -- x+1 )`           |                      |
| `dec`    | `( x -- x-1 )`           |                      |
| `neg`    | `( x -- -x )`            |                      |
| `even`   | `( x -- bool )`          | true, if `x` is even |
| `odd`    | `( x -- bool )`          | true, if `x` is odd  |
| `min`    | `( x y -- min(x, y) )`   |                      |
| `max`    | `( x y -- max(x, y) )`   |                      |
| `log`    | `( x -- log(x) )`        |                      |
| `pow`    | `( x y -- pow(x, y) )`   |                      |
| `rand`   | `( -- Math.random() )`   |                      |
| `sqrt`   | `( x -- sqrt(x) )`       |                      |
| `sin`    | `( x -- sin(x) )`        |                      |
| `cos`    | `( x -- cos(x) )`        |                      |
| `atan2`  | `( x y -- atan2(y, x) )` |                      |
| `lsl`    | `( x y -- x<<y )`        |                      |
| `lsr`    | `( x y -- x>>y )`        |                      |
| `lsru`   | `( x y -- x>>>y )`       |                      |
| `bitand` | `( x y -- x&y )`         |                      |
| `bitor`  | `( x y -- x\|y )`        |                      |
| `bitxor` | `( x y -- x^y )`         |                      |
| `bitnot` | `( x -- ~x )`            |                      |

### Logic

| Word     | Stack effect            |
|----------|-------------------------|
| `eq`     | `( x y -- x===y )`      |
| `equiv`  | `( x y -- equiv(x,y) )` |
| `neq`    | `( x y -- x!==y )`      |
| `and`    | `( x y -- x&&y )`       |
| `or`     | `( x y -- x\|\|y )`     |
| `not`    | `( x -- !x )`           |
| `lt`     | `( x y -- x<y )`        |
| `gt`     | `( x y -- x>y )`        |
| `lteq`   | `( x y -- x<=y )`       |
| `gteq`   | `( x y -- x>=y )`       |
| `iszero` | `( x -- x===0 )`        |
| `ispos`  | `( x -- x>0 )`          |
| `isneg`  | `( x -- x<0 )`          |
| `isnull` | `( x -- x==null )`      |

### Environment

| Word          | Stack effect      | Description                    |
|---------------|-------------------|--------------------------------|
| `load`        | `( k -- env[k] )` | pushes `env[k]` on d-stack     |
| `store`       | `( x k -- )`      | stores TOS as `env[k]`         |
| `loadkey(k)`  | `( -- env[k] )`   | like `load` w/ predefined key  |
| `storekey(k)` | `( x -- )`        | like `store` w/ predefined key |
| `pushenv`     | `( -- env )`      | pushes curr env on d-stack     |

### Arrays, objects, strings

| Word       | Stack effect                        | Description                                             |
|------------|-------------------------------------|---------------------------------------------------------|
| `at`       | `( obj k -- obj[k] )`               | `obj` can be array/obj/string                           |
| `bindkeys` | `(v1 v2 .. [k1 k2 ..] obj -- obj )` | bind key/value pairs in `obj`                           |
| `collect`  | `( ... n -- [...] )`                | tuple of top `n` vals                                   |
| `foldl`    | `( arr q init -- x )`               | like `mapl`, but w/ `init` val for reduction            |
| `length`   | `( x -- x.length )`                 | length of arraylike                                     |
| `list`     | `( -- [] )`                         | create new empty array                                  |
| `mapl`     | `( arr q -- ? )`                    | transform array w/ quotation (no explicit result array) |
| `mapll`    | `( arr q -- ? )`                    | transform array w/ quotation                            |
| `obj`      | `( -- {} )`                         | create new empty object                                 |
| `pushl`    | `( x arr -- arr )`                  | push `x` on LHS of array                                |
| `pushr`    | `( arr x -- arr )`                  | push `x` on RHS of array                                |
| `popr`     | `( arr -- arr arr[-1] )`            | extract RHS of array as new TOS                         |
| `pull`     | `( arr -- x arr )`                  | short for: `[popr, swap]`                               |
| `pull2`    | `( arr -- x y arr )`                | short for: `[pull, pull]`                               |
| `pull3`    | `( arr -- x y z arr )`              | short for: `[pull2, pull]`                              |
| `pull4`    | `( arr -- a b c d arr )`            | short for: `[pull2, pull2]`                             |
| `split`    | `( arr x -- [...] [...] )`          | split array at index `x`                                |
| `setat`    | `( val obj k -- obj )`              | `obj` can be array/obj                                  |
| `tuple(n)` | `( ... -- [...] )`                  | HOF, like `collect`, but w/ predefined size             |
| `vec2`     | `( x y -- [x, y] )`                 | same as `tuple(2)`                                      |
| `vec3`     | `( x y z -- [x, y, z] )`            | same as `tuple(3)`                                      |
| `vec4`     | `( x y z w -- [x, y, z, w] )`       | same as `tuple(4)`                                      |
| `vadd`     | `( a b -- c )`                      | add 2 arrays (or array + scalar)                        |
| `vsub`     | `( a b -- c )`                      | subtract 2 arrays (or array + scalar)                   |
| `vmul`     | `( a b -- c )`                      | multiply 2 arrays (or array + scalar)                   |
| `vdiv`     | `( a b -- c )`                      | divide 2 arrays (or array + scalar)                     |
| `op2v(f)`  | `( a b -- c )`                      | HOF word gen, e.g. `vadd` is based on                   |

#### String specific

| Word       | Stack effect         | Description                |
|------------|----------------------|----------------------------|
| `ismatch`  | `( str re -- bool )` | Test regexp against string |
| `fromjson` | `( str -- x )`       | Parse JSON string          |
| `tojson`   | `( x -- str )`       | JSON stringify             |

### I/O

| Word      | Stack effect | Description       |
|-----------|--------------|-------------------|
| `print`   | `( x -- )`   | `console.log(x)`  |
| `printds` | `( -- )`     | print out D-stack |
| `printrs` | `( -- )`     | print out R-stack |

### Error handling

There's currently only one error handling construct available:

`$try` expects a body and error handler quotation on stack. Executes
body within an implicit `try .. catch` and if an error was thrown pushes
it on stack and executes error quotation.

```ts
pf.runU([
    // body quotation
    [pf.div],
    // error handler
    [pf.drop, "eek", pf.print],
    pf.$try
]);
// eek
```

### Control flow

#### cond

`cond(_then: StackFn | StackProgram, _else?: StackFn | StackProgram)`

Higher order word. Takes two stack programs: truthy and falsey branches,
respectively. When executed, pops TOS and runs only one of the branches
depending if TOS was truthy or not.

Note: Unlike JS `if() {...} else {...}` constructs, the actual
conditional is **not** part of this word (only the branches are).

#### condq

Non-HOF version of `cond`, expects `test` result and both branches on
d-stack. Executes `thenq` word/quotation if `test` is truthy, else runs
`elseq`.

```forth
( test thenq elseq -- ? )
```

#### cases

`cases(cases: IObjectOf<StackFn | StackProgram>)`

Higher order word. Essentially like JS `switch`. Takes an object of
stack programs with keys in the object being used to check for equality
with TOS. If a match is found, executes corresponding stack program. If
a default key is specified and no other cases matched, run default
program. In all other cases throws an error.

**Important:** The default case/branch has the original TOS re-added to
the stack before execution.

#### loop

`loop(test: StackFn | StackProgram, body: StackFn | StackProgram)`

Takes a `test` and `body` stack program. Applies test to TOS and
executes body. Repeats while test is truthy.

#### loopq

Non-HOF version of `loop`. Expects test result and body quotation/word
on d-stack.

```forth
( testq bodyq -- ? )
```

#### dotimes

```forth
( n body -- ? )
```

Pops `n` and `body` from d-stack and executes given `body` word /
quotation `n` times. In each iteration pushes current counter on d-stack
prior to executing body. With empty body acts as finite range generator
0 .. n.

### Word creation and execution

#### word

`word(prog: StackProgram, env?: StackEnv, mergeEnv = false)`

Higher order word. Takes a `StackProgram` and returns it as `StackFn` to
be used like any other built-in word. Unknown stack effect.

If the optional `env` is given, uses a shallow copy of that environment
(one per invocation) instead of the current one passed by `run()` at
runtime. If `mergeEnv` is true (default), the user provided env will be
merged with the current env (also shallow copies). This is useful for
providing external configuration (or local variables) or in conjunction
with `pushenv` and `store` or `storekey` to save results of sub
procedures in the main env.

**Note**: The provided (or merged) env is only active within the
execution scope of the word.

#### wordU

`wordU(prog: StackProgram, n = 1, env?: StackEnv, mergeEnv = true)`

Like `word()`, but uses `runU()` for execution and returns `n` unwrapped
values from result stack.

#### unwrap

`unwrap(ctx: StackContext, n = 1)`

Takes a result tuple returned by `run()` and unwraps one or more items
from result stack. If no `n` is given, defaults to single value (TOS)
and returns it as is. Returns an array for all other `n`.

#### ctx

`ctx(stack: Stack = [], env: StackEnv = {}): StackContext`

Creates a new StackContext tuple from given d-stack and/or environment
only (the r-stack is always initialized empty).

#### run

`run(prog: StackProc, ctx?: StackContext = [[], [], {}]): StackContext`

Executes given stack word or program using (optional) context.

#### runU

`runU(prog: StackProc, ctx?: StackContext, n = 1): any`

Like `run()`, but returns unwrapped result. Syntax sugar for:
`unwrap(run(...),n)`

#### runE

`runE(prog: StackProc, ctx?: StackContext): any`

Like `run()`, but returns result environment. Syntax sugar for:
`run(...)[2]`

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pointfree,
  title = "@thi.ng/pointfree",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pointfree",
  year = 2015
}
```

## License

&copy; 2015 - 2021 Karsten Schmidt // Apache Software License 2.0
