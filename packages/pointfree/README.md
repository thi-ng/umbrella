# @thi.ng/pointfree

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)

## About

[Pointfree](https://en.wikipedia.org/wiki/Concatenative_programming_language),
functional composition via lightweight (2KB gzipped) Forth style stack
execution engine using vanilla JS functions as words and arbitrary stack
values (incl. other stack functions / words). Supports nested execution
environments, quotations, stack mapping and currently includes 60+ stack
operators, conditionals, looping constructs, math, binary & logic ops etc.

Originally, this project started out as precursor of the [Charlie Forth
VM/REPL](http://forth.thi.ng) (JS) and
[@thi.ng/synstack](http://thi.ng/synstack) (C11), but has since been
refactored to be more generally useful as environment for building data
processing pipelines in a [pointfree / concatenative programming
style](https://en.wikipedia.org/wiki/Concatenative_programming_language)
rather than acting as fullblown VM.

In terms of processing pipeline composition, this approach is somewhat
related to
[transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers),
however the pointfree method and stack as communication medium between
different sub-processes *can* be more powerful, since each sub-process
("words" in Forth-speak) can consume or produce any number of
intermediate values from/to the stack and stack programs can have any number of nested [conditionals](#control-flow).

## Status

ALPHA

- [x] support literal numbers, strings, arrays, objects in program
- [ ] execution context wrapper for stack(s), env, error traps
- [ ] env stack & more env accessors
- [ ] more string, array & object words
- [ ] full stack consumer /  transformer
- [ ] transducer wrapper
- [x] more (useful) examples
- [ ] string definitions / program parsing

## Installation

```
yarn add @thi.ng/pointfree
```

## Usage examples

#### About stack effects

(Note: TOS = Top Of Stack)

```
( x y -- x )
```

The items in front of the `--` describe the relevant state of the stack
before the execution of a word (the args expected/consumed by the word);
the part after the `--' is the state of the stack after execution (the
results). Thhis is the standard approach to document the effect a word
has on the stack structure.

#### `run(stack: Stack, program: StackProgram, env?: StackEnv, onerror?: Trap)`

`run()` is the main function of this library. It takes an initial stack,
a pointfree stack program and optional environment (an arbitrary
object), executes program and then returns tuple of: `[status, stack,
env]`.

Alternatively, we can use `runU()` to return an unwrapped section of the result stack. We use this for some of the examples below.

A stack program consists of an array of any values and functions with this signature:

```
type Stack = any[];
type StackEnv = any;
type StackFn = (stack: Stack, env?: StackEnv) => void;
```

Each program function can arbitrarily modify both the stack and/or environment.

Any non-function value in the program is placed on the stack as is.

```typescript
import * as pf from "@thi.ng/pointfree";

// calculate (1 + 2 + 3) * 10
pf.run(
    // the initial stack
    [10, 1, 2, 3],
    // a pointfree stack program w/ stack effects
    [
        pf.add,  // ( 10 1 2 3 -- 10 1 5 )
        pf.add,  // ( 10 1 5 -- 10 6 )
        pf.mul,  // ( 10 6 -- 60 )
    ])
// [ true, [6], {}]
```

### Custom word definitions

Custom words can be defined via the `word()` and `wordU()` functions. The latter uses `runU()` to execute the word and returns unwrapped value(s) from result.

*Important*: Unwrapped words CANNOT be used as part of larger stack programs. Their use case is purely for standalone application.

```typescript
// define new word to compute multiply-add:
// ( x y z -- x*y+z )
const madd = pf.word([pf.invrot, pf.mul, pf.add]);

// compute 3 * 5 + 10
madd([3, 5, 10]);
// [ true, [25], {}]

// unwrapped version
const maddU = pf.wordU([pf.invrot, pf.mul, pf.add]);

// compute 3 * 5 + 10
maddU([3, 5, 10]);
// 25
```

### Factoring

Factoring is a crucial aspect of developing programs in concatenative
languages. The general idea is to decompose a larger solution into
smaller re-usable words.

```typescript
// compute square of x
// ( x -- x*x )
const pow2 = pf.word([pf.dup, pf.mul]);

// test word with given stack
pow2([-10])
// [true, [100], {}]

// compute magnitude of 2d vector
// ( x y -- mag )
const mag2 = pf.wordU([
    pow2,    // ( x y -- x y^2 )
    pf.swap, // ( x y^2 -- y^2 x )
    pow2,    // ( y^2 x -- y^2 x^2 )
    pf.add,  // ( y^2 x^2 -- sum )
    pf.sqrt
]);

mag2([-10, 10])
// 14.142135623730951
```

### Quotations

Quoatations are programs (arrays) stored on the stack itself and enable
a form of dynamic meta programming. Quotations are executed via `execQ`.
This example uses a quoted form of above `pow2` word:

```typescript
pf.runU([10], [
    // push quotation on stack
    [pf.dup, pf.mul],
    // execute
    pf.execQ,
]);
// 100
```

```typescript
// a quotation is just an array of values/words
// this function is a quotation generator
const tupleQ = (n) => [n, pf.collect];
// predefine fixed size tuples
const pair = tupleQ(2);
const triple = tupleQ(3);
// define word which takes an id & tuple quotation
// when executed first builds tuple on stack
// then stores it under `id` in current environment
const storeTuple = (id, tuple) => pf.word([tuple, pf.execQ, id, pf.store]);

// transform stack into tuples, stored in env
pf.run([1,2,3,4,5], [storeTuple("a", pair), storeTuple("b", triple)])[2];
// { a: [ 4, 5 ], b: [ 1, 2, 3 ] }
```


### Conditionals

See `cond` documentation further below...

```typescript
// negate TOS item ONLY if negative, else do nothing
const abs = pf.wordU([pf.dup, pf.isNeg, pf.cond(pf.neg)]);

// test w/ negative inputs
abs([-42])
// 42

// test w/ positive inputs
abs([42])
// 42
```

```typescript
// `condM` is similar to JS `switch() { case ... }`
const classify = (x) =>
    pf.runU([x],
        pf.condM({
            0: ["zero"],
            1: ["one"],
            default: [
                pf.dup,
                pf.isPos,
                pf.cond(["many"], ["invalid"])
            ]
        })
    );

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

```typescript
// print countdown from 3
pf.run([3], pf.loop(pf.isPos, [pf.dup, pf.print, pf.dec]))
// 3
// 2
// 1
// [ true, [ 0 ], undefined ]
```

### In-place stack value transformation

The `map()`, `map2()`, `mapN()` higher order words can be used to transform stack items in place using vanilla JS functions:

- `map(f)` - map TOS
- `map2(f)` - pops top 2 stack items, pushes result back on stack
- `mapN(f)` - map stack item @ TOS - n (see stack effects further below)

```typescript
// full stack transformation
pf.run(
    // data items
    [10,20,30,40],
    [
        // push stack depth (i.e. number of items) on stack
        pf.depth,
        // define loop construct
        pf.loop(
            // test predicate
            pf.isPos,
            [
                // duplicate counter
                pf.dup,
                // map item @ stack[TOS - counter]
                pf.mapN(x => x * 10),
                // decrease counter
                pf.dec
            ]),
        // remove counter from stack
        pf.drop
    ]);
// [ true, [ 100, 200, 300, 400 ], {} ]
```

TODO more examples forthcoming

## Core vocabulary

By default, each word checks for stack underflow and throws an error if
there are insufficient values on the stack.

Note: Some of the words are higher-order functions, accepting arguments
at word construction time and return a pre-configured stack function.

### Stack modification

| Word | Stack effect |
| --- | --- |
| `collect` | `( n -- [...] )` |
| `depth` | `( -- stack.length )` |
| `drop` | `( x -- )` |
| `drop2` | `( x y -- )` |
| `dropIf` | If TOS is truthy: `( x -- )` |
| `dup` | `( x -- x x )` |
| `dup2` | `( x y -- x y x y )` |
| `dupIf` | If TOS is truthy: `( x -- x x )` |
| `map(fn)` | `( x -- f(x) )` |
| `map2(fn)` | `( x y -- f(x,y) )` |
| `mapN(fn)` | `( n -- f(stack[-n]) )` |
| `nip` | `( x y -- y )` |
| `over` | `( x y -- x y x )` |
| `pick` | `( x -- stack[x] )` |
| `push(...args)` | `( -- ...args )` |
| `rot` | `( x y z -- y z x )` |
| `invrot` | `( x y z -- z x y )` |
| `swap` | `( x y -- y x )` |
| `swap2` | `( a b c d -- c d a b )` |
| `tuck` | `( x y -- y x y )` |

### Dynamic execution

| Word | Stack effect |
| --- | --- |
| `exec` | ` ( w -- ? )` |
| `execQ` | ` ( q -- ? )` |

### Math

| Word | Stack effect |
| --- | --- |
| `add` | `( x y -- x+y )` |
| `sub` | `( x y -- x-y )` |
| `mul` | `( x y -- x*y )` |
| `div` | `( x y -- x/y )` |
| `mod` | `( x y -- x%y )` |
| `inc` | `( x -- x+1 )` |
| `dec` | `( x -- x-1 )` |
| `neg` | `( x -- -x )` |
| `lsl` | `( x y -- x<<y )` |
| `lsr` | `( x y -- x>>y )` |
| `lsru` | `( x y -- x>>>y )` |
| `bitAnd` | `( x y -- x&y )` |
| `bitOr` | `( x y -- x|y )` |
| `bitXor` | `( x y -- x^y )` |
| `bitNot` | `( x -- ~x )` |

### Logic

| Word | Stack effect |
| --- | --- |
| `eq` | `( x y -- x===y )` |
| `equiv` | `( x y -- equiv(x,y) )` |
| `neq` | `( x y -- x!==y )` |
| `and` | `( x y -- x&&y )` |
| `or` | `( x y -- x||y )` |
| `not` | `( x -- !x )` |
| `lt` | `( x y -- x<y )` |
| `gt` | `( x y -- x>y )` |
| `lteq` | `( x y -- x<=y )` |
| `gteq` | `( x y -- x>=y )` |
| `isZero` | `( x -- x===0 )` |
| `isPos` | `( x -- x>0 )` |
| `isNeg` | `( x -- x<0 )` |
| `isNull` | `( x -- x==null )` |

### Environment

| Word | Stack effect |
| --- | --- |
| `load` | `( k -- env[k] )` |
| `store` | `( x k -- )` |
| `loadKey(k)` | `( -- env[k] )` |
| `storeKey(k)` | `( x -- )` |
| `pushEnv` | `( -- env )` |

### Arrays, objects, strings

| Word | Stack effect |
| --- | --- |
| `at` | `( obj k -- obj[k] )` |
| `storeAt` | `( val obj k -- )` |
| `length` | `( x -- x.length )` |
| `print` | `( x -- )` |

### Control flow

#### `cond(_then: StackFn | StackProgram, _else?: StackFn | StackProgram)`

Higher order word. Takes two stack programs: truthy and falsey branches,
respectively. When executed, pops TOS and runs only one of the branches
depending if TOS was truthy or not.

Note: Unlike JS `if() {...} else {...}` constructs, the actual
conditional is NOT part of this word (only the branches are).

#### `condM(cases: IObjectOf<StackFn | StackProgram>)`

Higher order word. Essentially like JS `switch`. Takes an object of
stack programs with keys in the object being used to check for equality
with TOS. If a match is found, executes corresponding stack program. If
a default key is specified and no other cases matched, run default
program. In all other cases throws an error.

**Important:** The default case has the original TOS re-added to the stack
before execution.

#### `loop = (test: StackFn | StackProgram, body: StackFn | StackProgram)`

Takes a `test` and `body` stack program. Applies test to copy of TOS and
executes body. Repeats while test is truthy.

### Word creation and indirect execution

#### `word(prog: StackProgram, env?: StackEnv)`

Higher order word. Takes a StackProgram and returns it as StackFn to be
used like any other word.

If the optional `env` is given, uses a shallow copy of that environment
(one per invocation) instead of the main one passed by `run()` at
runtime. This is useful in conjunction with `pushEnv` and `store` or
`storeKey` to save results of sub procedures in the main env.

#### `exec`

Executes TOS as stack function and places result back on stack. Useful
for dynamic function dispatch (e.g. based on conditionals or config
loaded from env).

## Authors

- Karsten Schmidt

## License

&copy; 2015 - 2018 Karsten Schmidt // Apache Software License 2.0
