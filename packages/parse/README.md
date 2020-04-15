<!-- This file is generated - DO NOT EDIT! -->

# ![parse](https://media.thi.ng/umbrella/banners/thing-parse.svg?02e4088b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/parse.svg)](https://www.npmjs.com/package/@thi.ng/parse)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/parse.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [RPN parser & interpreter example](#rpn-parser--interpreter-example)
  - [Context & reader creation](#context--reader-creation)
  - [Presets parsers](#presets-parsers)
  - [Primitives](#primitives)
  - [Anchors](#anchors)
  - [Combinators](#combinators)
  - [Transformers](#transformers)
- [Authors](#authors)
- [License](#license)

## About

Purely functional parser combinators & AST generation for generic inputs.

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/parse
```

Package sizes (gzipped, pre-treeshake): ESM: 1.97 KB / CJS: 2.17 KB / UMD: 2.08 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/parse/)

TODO

### RPN parser & interpreter example

```ts
import {
    INT, WS,
    alt, oneOf, repeat0, xform,
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
const program = repeat0(alt([value, op, WS]));

// prepare parser context (incl. reader) and execute
program(defContext("10 5 3 * + -2 * 10 /"));

// print result data stack, i.e. result of:
// 3 * 5 + 10 * -2 / 10 (in infix notation)
console.log(stack);
// [-5]
```

### Context & reader creation

- `defContext` -
- `defStringReader` -

### Presets parsers

Source: [constants.ts](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/constants.ts)

- `ALPHA` -
- `ALPHA_NUM` -
- `DIGIT` -
- `DIGITS_0` -
- `DIGITS_1` -
- `FLOAT` -
- `HEX_DIGIT` -
- `HEX_DIGITS_1` -
- `HEX_UINT` -
- `INT` -
- `UINT` -
- `SIGN` -
- `WS` -

### Primitives

Source: [/prims](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/prims)

- `always` -
- `lift` -
- `lit` -
- `noneOf` -
- `oneOf` -
- `range` -
- `satisfy` -
- `string` -

### Anchors

- `anchor` -
- `inputStart` / `inputEnd` -
- `lineStart` / `lineEnd` -

### Combinators

Source: [/combinators](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/combinators)

- `alt` -
- `maybe` -
- `not` -
- `repeat` -
- `seq` -

### Transformers

- `xform` -
- `check` -
- `discard` -
- `expect` -
- `merge` -

Source: [/xform](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/xform)

- `comp` - transform composition
- `xfFloat` -
- `xfInt` -
- `xfMerge` -

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
