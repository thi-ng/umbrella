<!-- This file is generated - DO NOT EDIT! -->

# ![parse](https://media.thi.ng/umbrella/banners/thing-parse.svg?02e4088b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/parse.svg)](https://www.npmjs.com/package/@thi.ng/parse)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/parse.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Context & reader creation](#context--reader-creation)
  - [Presets parsers](#presets-parsers)
  - [Primitives](#primitives)
  - [Combinators](#combinators)
  - [Transformers](#transformers)
  - [SVG path parser example](#svg-path-parser-example)
  - [RPN parser & interpreter example](#rpn-parser--interpreter-example)
- [Authors](#authors)
- [License](#license)

## About

Purely functional parser combinators & AST generation for generic inputs.

### Features

- small API surface, easy-to-grok syntax
- all parsers implemented as composable, higher-order functions
- all state centrally kept/managed by a parser context given as arg
- support for custom readers (currently only string & array-like numeric
  inputs (incl. typed arrays) supported)
- automatic AST generation & ability to transform/prune nodes during parsing
- node transforms are composable too
- each AST node (optionally) retains reader information (position, line
  num, column) - disabled by default to save memory
- common, re-usable preset parsers & node transforms included

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/parse
```

Package sizes (gzipped, pre-treeshake): ESM: 2.47 KB / CJS: 2.69 KB / UMD: 2.55 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/parse/)

TODO

### Context & reader creation

- [`defContext`](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/context.ts)

Source:
[/readers](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/readers)

- `defArrayReader`
- `defStringReader`

### Presets parsers

Source:
[/presets](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/presets)

- `WS` / `WS_0` / `WS_1`
- `ALPHA` / `LOWER_CASE` / `UPPER_CASE` / `ALPHA_NUM`
- `DIGIT` / `DIGITS_0` / `DIGITS_1`
- `HEX_DIGIT` / `HEX_DIGITS_1`
- `INT` / `UINT` / `HEX_UINT` / `FLOAT` / `SIGN`

### Primitives

Source:
[/prims](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/prims)

- `anchor`
- `always`
- `fail`
- `inputStart` / `inputEnd`
- `lineStart` / `lineEnd`
- `lit` / `dlit`
- `noneOf`
- `oneOf`
- `pass`
- `range`
- `satisfy`
- `string` / `dstring`

### Combinators

Source:
[/combinators](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/combinators)

- `alt`
- `check`
- `discard`
- `expect`
- `maybe`
- `not`
- `oneOrMore` / `zeroOrMore`
- `repeat`
- `seq`
- `xform`

### Transformers

Source:
[/xform](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/xform)

Syntax sugars for `xform(parser, fn)`:

- `collect`
- `hoist`
- `join`
- `print`

Actual transforms:

- `comp` - scope transform composition
- `xfCollect`
- `xfFloat`
- `xfHoist`
- `xfInt`
- `xfJoin`
- `xfPrint`

### SVG path parser example

```ts
import {
    INT, WS_0,
    alt, oneOf, seq, zeroOrMore,
    collect, discard, xform,
    defContext
} from "@thi.ng/parse";

// whitespace parser
// discard() removes results from AST
const wsc = discard(zeroOrMore(oneOf(" ,")));

// svg path parser rules
// collect() collects child results in array, then removes children
// INT & WS_0 are preset parsers (see section above)
const point = collect(seq([INT, wsc, INT]));
const move = collect(seq([oneOf("Mm"), WS_0, point, WS_0]));
const line = collect(seq([oneOf("Ll"), WS_0, point, WS_0]));
const curve = collect(seq([oneOf("Cc"), WS_0, point, wsc, point, wsc, point, WS_0]));
// xform used here to wrap result in array
// (to produce same result format as parsers above)
const close = xform(oneOf("Zz"), ($) => ($.result = [$.result], $));

// main path parser
const path = collect(zeroOrMore(alt([move, line, curve, close])));

// prepare parse context & reader
const ctx = defContext("M0,1L2 3c4,5-6,7 8 9z");
// parse input into AST
path(ctx);
// true

// transformed result of AST root node
ctx.result
// [["M", [0, 1]], ["L", [2, 3]], ["c", [4, 5], [-6, 7], [8, 9]], ["z"]]
```

### RPN parser & interpreter example

```ts
import {
    INT, WS_0,
    alt, oneOf, xform, zeroOrMore
    defContext
} from "@thi.ng/parse";

// data stack for execution
const stack = [];

// operator implementations
const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

// signed integer parser (using INT preset) with transform fn
// user fn here only used for pushing values on data stack
// also, if a transform returns null, the parse scope will
// be removed from the result AST
const value = xform(INT, (scope) => {
    stack.push(scope.result);
    return null;
});

// parser for any of the registered operators (again w/ transform)
// the transform here applies the op in RPN fashion to the data stack
const op = xform(oneOf(Object.keys(ops)), (scope) => {
    const b = stack.pop();
    const a = stack.pop();
    stack.push(ops[scope.result](a, b));
    return null;
});

// parser for complete RPN program, combines above two parsers
// and the whitespace preset as alternatives
const program = zeroOrMore(alt([value, op, WS_0]))

// prepare parser context (incl. reader) and execute
program(defContext("10 5 3 * + -2 * 10 /"));

// print result data stack, i.e. result of:
// 3 * 5 + 10 * -2 / 10 (in infix notation)
console.log(stack);
// [-5]
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
