# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO

### SVG path parser example

```ts
const ws = discard(zeroOrMore(WS));
const wsc = discard(zeroOrMore(oneOf(" ,")));

const point = collect(seq([INT, wsc, INT]));
const move = collect(seq([oneOf("Mm"), ws, point, ws]));
const line = collect(seq([oneOf("Ll"), ws, point, ws]));
const curve = collect(seq([oneOf("Cc"), ws, point, wsc, point, wsc, point, ws]));
const close = xform(oneOf("Zz"), ($) => ($.result = [$.result], $));

const path = collect(zeroOrMore(alt([move, line, curve, close])));

const ctx = defContext("M0,1L2 3c4,5-6,7 8 9z");
path(ctx);
// true

ctx.result
// [["M", [0, 1]], ["L", [2, 3]], ["c", [4, 5], [-6, 7], [8, 9]], ["z"]]
```

### RPN parser & interpreter example

```ts
import {
    INT, WS,
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
const program = zeroOrMore(alt([value, op, zeroOrMore(WS)]))

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
- `oneOrMore` / `zeroOrMore` -
- `repeat` -
- `seq` -

### Transformers

- `xform` -
- `check` -
- `collect` -
- `discard` -
- `expect` -
- `merge` -

Source: [/xform](https://github.com/thi-ng/umbrella/tree/feature/parse/packages/parse/src/xform)

- `comp` - transform composition
- `xfCollect` -
- `xfFloat` -
- `xfInt` -
- `xfMerge` -

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
