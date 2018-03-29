# @thi.ng/pointfree

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [A brief comparison](#a-brief-comparison)
- [Status](#status)
- [Installation](#installation)
- [Usage](#usage)
    - [Custom word definitions](#custom-word-definitions)
    - [Factoring](#factoring)
    - [Quotations](#quotations)
    - [Array transformations](#array-transformations)
    - [Conditionals](#conditionals)
    - [Loops](#loops)
    - [In-place stack value transformation](#in-place-stack-value-transformation)
    - [R-stack usage](#r-stack-usage)
- [Core vocabulary](#core-vocabulary)
    - [D-Stack modification](#d-stack-modification)
    - [R-Stack modification](#r-stack-modification)
    - [Dynamic execution](#dynamic-execution)
    - [Primitive math](#primitive-math)
    - [Logic](#logic)
    - [Environment](#environment)
    - [Arrays, objects, strings](#arrays-objects-strings)
    - [I/O](#io)
    - [Control flow](#control-flow)
    - [Word creation and execution](#word-creation-and-execution)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

[Pointfree](https://en.wikipedia.org/wiki/Concatenative_programming_language)
functional composition via lightweight (3KB gzipped), stack-based
[Forth](https://en.wikipedia.org/wiki/Forth_(programming_language))
inspired DSL:

- words implemented as tiny vanilla JS functions (easily extensible)
- optimized pre-composition/compilation of custom user defined words (see [comp.ts](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree/src/comp.ts))
- dual stack (main & stash/scratch space)
- nested execution environments (scopes)
- arbitrary stack values
- nested quotations (static or dynamically generated programs stored on stack)
- includes ~85 stack operators:
    - conditionals
    - looping constructs
    - array / tuple ops
    - math, binary & logic ops
    - currying quotations
    - higher order combinators
    - environment manipulation etc.

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
rather than acting as fullblown VM. Some words and operations have been
influenced by [Factor](http://factorcode.org) and
[Popr](https://github.com/HackerFoo/poprc).

### A brief comparison

(details explained further below)

```typescript
// define word to compute dot product of two vectors
const dotp = pf.word([pf.vmul, [pf.add], 0, pf.mapl]);
// another word to normalize a vector (re-uses `dotp`)
const normalize = pf.word([pf.dup, pf.dup, dotp, pf.sqrt, pf.vdiv]);

// `word(...)` creates a functional composition of given body
// each stack function accepts & returns a stack context tuple
// i.e. normalize = vdiv(sqrt(dotp(dup(dup(ctx)))));

// `unwrap` retrieves a value/section of the result stack
unwrap(dotp([[ [1, 2, 3], [4, 5, 6] ]]))
// 32

unwrap(normalize([[ [10, -10, 0] ]]))
// [ 0.7071067811865475, -0.7071067811865475, 0 ]
```

The same in standard imperative style:

```typescript
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
[transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers),
however the pointfree method and use of a stack as sole communication
medium between different sub-processes **can** be more flexible, since
each function ("word" in Concatenative-programming-speak) can consume or
produce any number of intermediate values from/on the stack.
Furthermore, on-stack quotations can be used for dynamic programming
approaches and conditionals can be used to cause non-linear controlflow.

## Status

BETA - in active development

## Installation

```
yarn add @thi.ng/pointfree
```

## Usage

```typescript
import * as pf from "@thi.ng/pointfree";
```

The main type aliases used by this DSL are:

```typescript
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

Each program function ("word") accepts a `StackContext`
tuple and can arbitrarily modify both its stacks and/or environment and
returns the updated context (usually the same instance as passed in, but
could also produce a new one). Any side effects are allowed.

A `StackProgram` is an array of stack functions and non-function values.
The latter are replaced by calls to `push` which pushes the given value
on the stack as is. Therefore, a stack program like: `[1, 2, pf.add]`
compiles to:

```
pf.add(pf.push(2)(pf.push(1)(<initial context>)))
```

#### About stack effects

Most concatenative languages use stack effect comments as the standard
approach to document the effect a word has on the stack structure.

```
( x y -- x )
```

The items in front of the `--` describe the relevant state of the stack
before the execution of a word (the args expected/consumed by the word).
The part after the `--` is the state of the stack after execution (the
results). If no args are given on the LHS, the word consumes no args. If
no args are given on the RHS, no result values are produced.

(Note: **TOS** = Top Of Stack)

#### `run(program: StackProgram, stack?: StackContext)`

`run()` is the main user function of this library. It takes a stack
program and optional `StackContext` with initial stacks and environment
(an arbitrary object). It executes the program and returns the updated
context.

Alternatively, we can use `runU()` to return an unwrapped value or
section of the result stack. This is merely syntax sugar and we use this
for some of the examples below.

```typescript
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

```typescript
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
smaller re-usable units, words, quotations.

```typescript
// compute square of x
// ( x -- x*x )
const pow2 = pf.word([pf.dup, pf.mul]);

// test word with given (partial) stack context
pow2([[-10]])
// [ [ 100 ] ]

// compute magnitude of 2d vector (using `pow2`)
// ( x y -- mag )
const mag2 = pf.wordU([
    pow2,    // ( x y -- x y^2 )
    pf.swap, // ( x y^2 -- y^2 x )
    pow2,    // ( y^2 x -- y^2 x^2 )
    pf.add,  // ( y^2 x^2 -- sum )
    pf.sqrt
]);

mag2([[-10, 10]])
// 14.142135623730951
```

### Quotations

A `StackProgram` residing as data on the stack is called a quotation.
Quoatations enable a form of dynamic meta programming and are used by
several built-in words. Quoations are used like lambdas / anonymous
functions in traditional functional programming, though **they're not
closures** nor do they need to be complete. Quotations can be nested and
are executed via `execq`.

This example uses a quoted form of the above `pow2` word:

```typescript
pf.runU(
    [
        // push quotation on stack
        [pf.dup, pf.mul],
        // execute
        pf.execq,
    ],
    // initial (partial) stack context
    [[10]]
);
// 100
```

#### Currying & composing quotations

Since quoatations are just arrays, we can treat them as data. E.g. The
functional composition of two quotations is the same as concatenating
two arrays:

```
// `cat` is used to concatenate arrays
// the result quotation computes: `(x+10)*10`
pf.runU([ [10, pf.add], [10, pf.mul], pf.cat, pf.execq], [[1]])
// 110
```

As with [partial
application](https://en.wikipedia.org/wiki/Partial_application) in
functional programming, we can "curry" quotations and use `pushl` to
prepend (or `pushr` to append) arguments to a given quotation (array).

```typescript
// build & execute curried quotation
pf.run([10, [pf.add], pf.pushl, pf.execq], [[13]]);
// 23
```

Furthermore, the ES6 spread operator can be used to dissolve a quotation
in a larger word/program (i.e. as a form of inlining code).

```typescript
// a quotation is just an array of values/words
// this function is a quotation generator
const tupleQ = (n) => [n, pf.collect];
// predefine fixed size tuples
const pair = tupleQ(2);
const triple = tupleQ(3);

// define another quotation which takes an id and
// when executed stores TOS under `id` key in current environment
const storeQ = (id) => [id, pf.store]

// define word which inlines given quotation and `storeQ`
// when executed first runs quotation
// then stores result in current environment object
const storeID = (id, quot) => pf.word([...quot, ...storeQ(id)]);

// alternatively we could write:
const storeID = (id, quot) =>
    pf.word([quot, pf.execq, storeQ(id), pf.execq]);

// transform stack into tuples, stored in env
// `runE()` only returns the result environment
pf.runE(
    [storeID("a", pair), storeID("b", triple)],
    // (`ctx()` completes a partial definition)
    pf.ctx([1, 2, 3, 4, 5])
);
// { a: [ 4, 5 ], b: [ 1, 2, 3 ] }

// same again without quotations
pf.runE(
    [2, pf.collect, "a", pf.store, 3, pf.collect, "b", pf.store],
    // stack context tuple [DS, RS, ENV]
    [[1, 2, 3, 4, 5], [], {}]
);
// { a: [ 4, 5 ], b: [ 1, 2, 3 ] }
```

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

```typescript
// multiply each array item * 10
pf.runU([[1, 2, 3, 4], [10, pf.mul], pf.mapll]);
// [ 10, 20, 30, 40 ]

// drop even numbers, duplicate odd ones
pf.runU([[1, 2, 3, 4], [pf.dup, pf.even, pf.cond(pf.drop, pf.dup)], pf.mapll])
// [ 1, 1, 3, 3 ]

// reduction example (using `mapl`)
// the `0` is the initial reduction result
pf.runU([0, [1, 2, 3, 4], [pf.add], pf.mapl])
// 10

// using `foldl` allows a different (better) argument order
// for reduction purposes
pf.runU([[1, 2, 3, 4], [pf.add], 0, pf.foldl])
// 10
```

#### Bind stack values to object keys

`bindkeys` takes an array of keys and target object, then pops & binds
deeper stack values to their respective keys in object. Pushes result
object back on stack at the end. Throws error if there're less stack
values than keys in given array.

```typescript
runU([1,2,3, ["a","b","c"], {}, bindkeys])
// { c: 3, b: 2, a: 1 }
```

#### Combine array transform op with other stack values

```typescript
// helper word to extract a 8bit range from a 32bit int
// ( x s -- x (x>>s)&0xff )
const extractByte = pf.word([
    pf.over,  // ( x s x )
    pf.swap,  // ( x x s )
    pf.lsru,  // ( x x>>>s )
    0xff,     // ( x x>>>s 0xff )
    pf.bitand // ( x (x>>s)&0xff )
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

```typescript
// negate TOS item ONLY if negative, else do nothing
const abs = pf.wordU([pf.dup, pf.isneg, pf.cond(pf.neg)]);

// test w/ negative inputs
abs([[-42]])
// 42

// test w/ positive inputs
abs([42])
// 42
```

```typescript
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
as test produces a truthy result.

```typescript
// print countdown from 3
pf.run(
    pf.loop(
        // test
        [pf.dup, pf.ispos], // ( x -- x bool )
        // loop body
        ["counter: ", pf.over, pf.add, pf.print, pf.dec] // ( x -- x-1 )
    ),
    // initial stack context
    [[3]]);
// counter: 3
// counter: 2
// counter: 1
// [ [ 0 ] ]
```

Alternatively, the `dotimes` construct is more suitable for simple
counter based iterations:

```typescript
pf.run([3, pf.dotimes(["i=", pf.swap, pf.add, pf.print])])
// i=0
// i=1
// i=2
```

### In-place stack value transformation

The `maptos()`, `map2()` higher order words can be used to transform
stack items in place using vanilla JS functions:

- `maptos(f)` - replaces TOS with result of given function.
- `map2(f)` - takes top 2 values from stack, calls function and writes
  back result. The arg order is (TOS, TOS-1) - this is how all primitive
  math ops are implemented

```typescript

```

### R-stack usage

The second stack ("R-stack") is useful to store interim processing state
without having to resort to complex stack shuffling ops. There're
several words available for moving data between main ("D-stack") and the
r-stack and to manipulate the structure of the R-stack itself.

```typescript
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

| Word | Stack effect | Description |
| --- | --- | --- |
| `drop` | `( x -- )` | remove TOS |
| `drop2` | `( x y -- )` | remove top 2 vals |
| `dropIf` | `( x -- ? )` | remove only if TOS truthy |
| `dsp` | `( -- stack.length )` | push d-stack depth |
| `dup` | `( x -- x x )` | duplicate TOS |
| `dup2` | `( x y -- x y x y )` | duplicate top 2 vals |
| `dupIf` | `( x -- x x? )` | dup only if TOS truthy |
| `maptos(fn)` | `( x -- f(x) )` | transform TOS w/ `f` |
| `map2(fn)` | `( x y -- f(y, x) )` | reduce top 2 vals with `f`, single result |
| `nip` | `( x y -- y )` | remove `x` from stack |
| `over` | `( x y -- x y x )` | push dup of `x` |
| `pick` | `( n -- stack[n] )` | dup deeper stack value |
| `push(...args)` | `( -- ...args )` | push `args` on stack |
| `rot` | `( x y z -- y z x )` | rotate top 3 vals down/left |
| `invrot` | `( x y z -- z x y )` | rotate top 3 vals up/right |
| `swap` | `( x y -- y x )` | swap top 2 vals |
| `swap2` | `( a b c d -- c d a b )` | swap top 2 pairs |
| `tuck` | `( x y -- y x y )` | insert dup of TOS |

### R-Stack modification

| Word | Stack effect | Description |
| --- | --- | --- |
| `rdrop` | `( x -- )` | drop TOS from r-stack |
| `rdrop2` | `( x y -- )` | remove top 2 vals from r-stack |
| `rswap` | `( x y -- y x )` | swap top 2 vals on r-stack |
| `rswap2` | `( a b c d -- c d a b )` | swap top 2 pairs on r-stack |
| `rsp` | `( -- stack.length )` | push r-stack depth on d-stack |
| `movdr` | `( x -- )` (d-stack effect) | push d-stack TOS on r-stack |
| `movrd` | `( -- x )` (d-stack effect) | push r-stack TOS on d-stack |
| `cpdr` | `( x -- x )` (d-stack effect) | copy d-stack TOS on r-stack |
| `cprd` | `( -- x )` (d-stack effect) | copy r-stack TOS on d-stack |

### Dynamic execution

| Word | Stack effect | Description |
| --- | --- | --- |
| `exec` | ` ( w -- ? )` | call TOS as (compiled) word w/ curr ctx |
| `execq` | ` ( q -- ? )` | execute TOS as quotation w/ curr ctx|

### Primitive math

| Word | Stack effect | Description |
| --- | --- | --- |
| `add` | `( x y -- x+y )` |
| `sub` | `( x y -- x-y )` |
| `mul` | `( x y -- x*y )` |
| `div` | `( x y -- x/y )` |
| `mod` | `( x y -- x%y )` |
| `inc` | `( x -- x+1 )` |
| `dec` | `( x -- x-1 )` |
| `neg` | `( x -- -x )` |
| `even` | `( x -- bool )` | true, if `x` is even |
| `odd` | `( x -- bool )` | true, if `x` is odd |
| `min` | `( x y -- min(x, y) )` |
| `max` | `( x y -- max(x, y) )` |
| `log` | `( x -- log(x) )` |
| `pow` | `( x y -- pow(x, y) )` |
| `rand` | `( -- Math.random() )` |
| `sqrt` | `( x -- sqrt(x) )` |
| `sin` | `( x -- sin(x) )` |
| `cos` | `( x -- cos(x) )` |
| `atan2` | `( x y -- atan2(y, x) )` |
| `lsl` | `( x y -- x<<y )` |
| `lsr` | `( x y -- x>>y )` |
| `lsru` | `( x y -- x>>>y )` |
| `bitand` | `( x y -- x&y )` |
| `bitor` | `( x y -- x\|y )` |
| `bitxor` | `( x y -- x^y )` |
| `bitnot` | `( x -- ~x )` |

### Logic

| Word | Stack effect |
| --- | --- |
| `eq` | `( x y -- x===y )` |
| `equiv` | `( x y -- equiv(x,y) )` |
| `neq` | `( x y -- x!==y )` |
| `and` | `( x y -- x&&y )` |
| `or` | `( x y -- x\|\|y )` |
| `not` | `( x -- !x )` |
| `lt` | `( x y -- x<y )` |
| `gt` | `( x y -- x>y )` |
| `lteq` | `( x y -- x<=y )` |
| `gteq` | `( x y -- x>=y )` |
| `iszero` | `( x -- x===0 )` |
| `ispos` | `( x -- x>0 )` |
| `isneg` | `( x -- x<0 )` |
| `isnull` | `( x -- x==null )` |

### Environment

| Word | Stack effect | Description |
| --- | --- | --- |
| `load` | `( k -- env[k] )` | pushes `env[k]` on d-stack |
| `store` | `( x k -- )` | stores TOS as `env[k]` |
| `loadkey(k)` | `( -- env[k] )` | like `load` w/ predefined key |
| `storekey(k)` | `( x -- )` | like `store` w/ predefined key |
| `pushenv` | `( -- env )` | pushes curr env on d-stack |

### Arrays, objects, strings

| Word | Stack effect | Description |
| --- | --- | --- |
| `at` | `( obj k -- obj[k] )` | `obj` can be array/obj/string |
| `bindkeys` | `(v1 v2 .. [k1 k2 ..] obj -- obj )` | bind key/value pairs in `obj` |
| `collect` | `( ... n -- [...] )` | tuple of top `n` vals |
| `foldl` | `( arr q init -- x )` | like `mapl`, but w/ `init` val for reduction |
| `length` | `( x -- x.length )` | length of arraylike |
| `list` | `( -- [] )` | create new empty array |
| `mapl` | `( arr q -- ? )` | transform array w/ quotation (no explicit result array) |
| `mapll` | `( arr q -- ? )` | transform array w/ quotation |
| `obj` | `( -- {} )` | create new empty object |
| `pushl` | `( x arr -- arr )` | push `x` on LHS of array |
| `pushr` | `( arr x -- arr )` | push `x` on RHS of array |
| `popr` | `( arr -- arr arr[-1] )` | extract RHS of array as new TOS |
| `pull` | `( arr -- x arr )` | short for: `[popr, swap]` |
| `pull2` | `( arr -- x y arr )` | short for: `[pull, pull]` |
| `pull3` | `( arr -- x y z arr )` | short for: `[pull2, pull]` |
| `pull4` | `( arr -- a b c d arr )` | short for: `[pull2, pull2]` |
| `split` | `( arr x -- [...] [...] )` | split array at index `x` |
| `storeat` | `( val obj k -- )` | `obj` can be array/obj |
| `tuple(n)` | `( ... -- [...] )` | HOF, like `collect`, but w/ predefined size |
| `vec2` | `( x y -- [x, y] )` | same as `tuple(2)` |
| `vec3` | `( x y z -- [x, y, z] )` | same as `tuple(3)` |
| `vec4` | `( x y z w -- [x, y, z, w] )` | same as `tuple(4)` |
| `vadd` | `( a b -- c )` | add 2 arrays (or array + scalar) |
| `vsub` | `( a b -- c )` | subtract 2 arrays (or array + scalar) |
| `vmul` | `( a b -- c )` | multiply 2 arrays (or array + scalar) |
| `vdiv` | `( a b -- c )` | divide 2 arrays (or array + scalar) |
| `op2v(f)` | `( a b -- c )` | HOF word gen, e.g. `vadd` is based on |

### I/O

| Word | Stack effect | Description |
| --- | --- | --- |
| `print` | `( x -- )` | `console.log(x)` |
| `printds` | `( -- )` | print out D-stack |
| `printrs` | `( -- )` | print out R-stack |

### Control flow

#### `cond(_then: StackFn | StackProgram, _else?: StackFn | StackProgram)`

Higher order word. Takes two stack programs: truthy and falsey branches,
respectively. When executed, pops TOS and runs only one of the branches
depending if TOS was truthy or not.

Note: Unlike JS `if() {...} else {...}` constructs, the actual
conditional is **not** part of this word (only the branches are).

#### `cases(cases: IObjectOf<StackFn | StackProgram>)`

Higher order word. Essentially like JS `switch`. Takes an object of
stack programs with keys in the object being used to check for equality
with TOS. If a match is found, executes corresponding stack program. If
a default key is specified and no other cases matched, run default
program. In all other cases throws an error.

**Important:** The default case/branch has the original TOS re-added to
the stack before execution.

#### `loop = (test: StackFn | StackProgram, body: StackFn | StackProgram)`

Takes a `test` and `body` stack program. Applies test to TOS and
executes body. Repeats while test is truthy.

#### `dotimes(body: StackProc = [])`

Pops TOS and executes given `body` word/quotation `n` times. In each
iteration pushes current counter on d-stack prior to executing body.
With empty body acts as finite range generator 0 .. n.

### Word creation and execution

#### `word(prog: StackProgram, env?: StackEnv, mergeEnv = false)`

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

#### `wordU(prog: StackProgram, n = 1, env?: StackEnv, mergeEnv = true)`

Like `word()`, but uses `runU()` for execution and returns `n` unwrapped
values from result stack.

#### `unwrap(ctx: StackContext, n = 1)`

Takes a result tuple returned by `run()` and unwraps one or more items
from result stack. If no `n` is given, defaults to single value (TOS)
and returns it as is. Returns an array for all other `n`.

#### `ctx(stack: Stack = [], env: StackEnv = {}): StackContext`

Creates a new StackContext tuple from given d-stack and/or environment
only (the r-stack is always initialized empty).

#### `run(prog: StackProc, ctx?: StackContext = [[], [], {}]): StackContext`

Executes given stack word or program using (optional) context.

#### `runU(prog: StackProc, ctx?: StackContext, n = 1): any`

Like `run()`, but returns unwrapped result. Syntax sugar for:
`unwrap(run(...),n)`

#### `runE(prog: StackProc, ctx?: StackContext): any`

Like `run()`, but returns result environment. Syntax sugar for:
`run(...)[2]`

## Authors

- Karsten Schmidt

## License

&copy; 2015 - 2018 Karsten Schmidt // Apache Software License 2.0
