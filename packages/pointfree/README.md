# @thi.ng/pointfree

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)

## About

[Pointfree](https://en.wikipedia.org/wiki/Concatenative_programming_language),
functional composition via lightweight (1.8KB gzipped) Forth style stack
execution engine using vanilla JS functions as words and arbitrary stack
values (incl. other stack functions / words). Supports nested execution
environments and currently includes approx. 50 stack operators,
conditionals, looping constructs, math & logic ops etc.

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

- [ ] support literal numbers, strings, arrays, objects in program
- [ ] execution context wrapper for stack(s), env, error traps
- [ ] env stack & more env accessors
- [ ] more string, array & object words
- [ ] full stack consumer /  transformer
- [ ] transducer wrapper
- [ ] more (useful) examples
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

`run()` takes an initial stack, a pointfree stack program and optional environment (an arbitrary object), executes program and then returns tuple of: `[status, stack, env]`

A stack program consists of an array of functions with this signature:

```
type Stack = any[];
type StackEnv = any;
type StackFn = (stack: Stack, env?: StackEnv) => void;
```

Each program function can arbitrarily modify both the stack and/or environment.`

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

```typescript
// define new word to compute multiply-add:
// ( x y z -- x*y+z )
const madd = pf.word([pf.invrot, pf.mul, pf.add]);

// compute 3 * 5 + 10
madd([3, 5, 10]);
// [ true, [25], {}]
```

### Vanilla JS words

```typescript
// compute square of x
// ( x -- x*x )
const pow2 = pf.word([pf.dup, pf.mul]);

// test word with given stack
pow2([10])
// [true, [100], {}]

// compute magnitude of 2d vector
// ( x y -- mag )
const mag2 = pf.word([
    pow2,    // ( x y -- x y^2 )
    pf.swap, // ( x y^2 -- y^2 x )
    pow2,    // ( y^2 x -- y^2 x^2 )
    pf.add,  // ( y^2 x^2 -- sum )
    pf.map((x)=> Math.sqrt(x))
]);

mag2([-10, 10])[1];
// [ 14.142135623730951 ]
```

### Conditionals

See `cond` documentation further below...

```typescript
// negate TOS item ONLY if negative, else do nothing
const abs = pf.word([pf.dup, pf.isNeg, pf.cond(pf.neg)]);

abs([-42], abs)[1]
// [ 42 ]

abs([42], abs)[1]
// [ 42 ]
```

```typescript
// `condM` is similar to JS `switch() { case ... }`
const classify = pf.condM({
    0: pf.push("zero"),
    1: pf.push("one"),
    default: [
        pf.dup,
        pf.isPos,
        pf.cond(pf.push("many"), pf.push("invalid"))
    ]
});

classify([0])[1]
// [ "zero" ]
classify([1])[1]
// [ "one" ]
classify([100])[1]
// [ "many" ]
classify([-100])[1]
// [ "invalid" ]
```

### Loops

```typescript
// print countdown from 3
pf.run([3], [pf.loop(pf.isPos, [pf.dup, pf.print, pf.dec])])
// 3
// 2
// 1
// [ true, [ 0 ], undefined ]
```

### Environment accumulator

```typescript
makeIDObject = (k) => pf.word([
    // this inner word uses a blank environment
    // to create new objects of `{id: <TOS>}
    pf.word([pf.push("id"), pf.store, pf.pushEnv], {}),
    pf.push(k),
    pf.store
]);
// transform stack into result object
pf.run([1, 2], [makeIDObject("a"), makeIDObject("b")])[2]
// { a: { id: 2 }, b: { id: 1 } }
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
| `drop` | `( x -- )` |
| `drop2` | `( x y -- )` |
| `dropIf` | If TOS is truthy: `( x -- )` |
| `dup` | `( x -- x x )` |
| `dup2` | `( x y -- x y x y )` |
| `dupIf` | If TOS is truthy: `( x -- x x )` |
| `map(fn)` | `( x -- f(x) )` |
| `map2(fn)` | `( x y -- f(x,y) )` |
| `nip` | `( x y -- y )` |
| `over` | `( x y -- x y x )` |
| `pick` | `( x -- stack[x] )` |
| `push(...args)` | `( -- ...args )` |
| `rot` | `( x y z -- y z x )` |
| `invrot` | `( x y z -- z x y )` |
| `swap` | `( x y -- y x )` |
| `swap2` | `( a b c d -- c d a b )` |
| `tuck` | `( x y -- y x y )` |
| `depth` | `( -- stack.length )` |

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

### Misc

| Word | Stack effect |
| --- | --- |
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
