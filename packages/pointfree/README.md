# @thi.ng/pointfree

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)

## About

Super-lightweight (1.5KB gzipped) Forth style stack execution engine
using vanilla JS functions as words and arbitrary stack values (incl.
other stack functions / words) and supporting nested execution
environments. Includes several dozen common / useful stack operators,
conditionals, looping constructs, math & logic ops etc.

Originally, this project started out as precursor for the [CharlieREPL
Forth VM](http://forth.thi.ng) (JS) and
[@thi.ng/synstack](http://thi.ng/synstack) (C11), but has since been
refactored to be more generally useful as environment for building data
processing pipelines in a [pointfree / concatenative programming
style](https://en.wikipedia.org/wiki/Concatenative_programming_language)
rather than acting as VM.

## Installation

```
yarn add @thi.ng/pointfree
```

## Usage examples

```typescript
import * as pf from "@thi.ng/pointfree";

// run() takes an initial stack, a pointfree stack program and optional env
// executes program and then returns tuple of:
// [ status, stack, env]
pf.run([1, 2], [
    pf.add,            // add 2 top most stack items
    pf.push("result"), // push the string "result" on the stack
    pf.store           // store value under key in env
])
// [ true, [], {result: 3}]
```

TODO examples forthcoming

## Authors

- Karsten Schmidt

## License

&copy; 2015 - 2018 Karsten Schmidt // Apache Software License 2.0
