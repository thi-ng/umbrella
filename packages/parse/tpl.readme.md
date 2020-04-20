# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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
- parser compilation from grammar DSL strings

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

### Context & reader creation

- [`defContext`](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/context.ts)

Source:
[/readers](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/readers)

- `defArrayReader`
- `defStringReader`

### Presets parsers

Source:
[/presets](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/presets)

- `WS` / `WS0` / `WS1` / `NL` / `DNL` / `SPACE` / `SPACES` / `SPACES0`
- `ALPHA` / `LOWER_CASE` / `UPPER_CASE` / `ALPHA_NUM`
- `ESC` / `UNICODE`
- `DIGIT` / `DIGITS` / `DIGITS0`
- `HEX_DIGIT` / `HEX_DIGITS` / `HEX_UINT`
- `BIT` / `BINARY_UINT`
- `INT` / `UINT` / `REAL` / `FLOAT` / `SIGN`

### Primitives

Source:
[/prims](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/prims)

- `always`
- `fail`
- `lit` / `litD` / `litP`
- `noneOf` / `noneOfD` / `noneOfP`
- `oneOf` / `oneOfD` / `oneOfP`
- `pass`
- `range` / `rangeD` / `rangeP`
- `satisfy` / `satisfyD`
- `skipWhile`
- `string` / `stringD`
- `stringOf`

### Anchors

- `anchor`
- `inputStart` / `inputEnd`
- `lineStart` / `lineEnd`
- `wordBoundary`
- `startsWith` / `endsWith`
- `entireLine`
- `entirely`

### Combinators

Source:
[/combinators](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/combinators)

- `alt` / `altD`
- `check`
- `expect`
- `maybe`
- `not`
- `oneOrMore` / `zeroOrMore` / `oneOrMoreD` / `zeroOrMoreD`
- `repeat` / `repeatD`
- `seq` / `seqD`
- `xform`

### Transformers

Source:
[/xform](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/xform)

Syntax sugars for `xform(parser, fn)`:

- `collect`
- `discard`
- `hoist`
- `join`
- `print`

Actual transforms:

- `comp` - scope transform composition
- `xfCollect`
- `xfDiscard`
- `xfFloat`
- `xfHoist`
- `xfInt(radix)`
- `xfJoin`
- `xfPrint`

## Grammar definition

Complex parsers can be constructed via
[`defGrammar()`](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/grammar.ts#L228),
which accepts a string of rule definitions in the built-in (and still
WIP) grammar rule definition language, similar to PEGs and regular
expressions:

Example grammar

```text
ws:      ' '+ => discard ;
sym:     [a-z] [a-z0-9_]* => join ;
num:     [0-9]+ => int ;
program: ( <num> | <sym> | <ws> )* ;
```

Here, each line is a single parse rule definition, with each rule
consisting of a sequence of one or more:

- `'x'` - single char literal (also supports `\uXXXX` unicode escapes)
- `"abc"` - mutli-char string
- `[a-z0-9!@]` - regex style char set (incl. char range support)
- `<rule_id>` - rule references (order independent)
- `( term | ... | )` - choice of sub-terms

Each of these terms can be immediately followed by one of these regexp
style repetition specs:

- `?` - zero or one occurrence
- `*` - zero or more
- `+` - one or more
- `{min,max}` - min-max repetitions

Furthermore, each rule can specify an optional rule transform function
which will only be applied after the rule's parser has successfully
completed. The transform is given at the end of a rule, separated by
`=>`.

Custom transforms can be supplied via an additional arg to
`defGrammar()`. The following default transforms are available by
default (can be overwritten) and correspond to the [above mentioned
transforms](#transformers):

- `collect` - collect sub terms into array
- `discard` - discard result
- `hoist` - use result of 1st child term only
- `join` - join sub terms into single string
- `float` - parse as floating point number
- `int` - parse as integer
- `hex` - parse as hex int

```ts
// define language
const lang = defGrammar(`
ws:      ' '+ => discard ;
sym:     [a-z] [a-z0-9_]* => join ;
num:     [0-9]+ => int ;
program: ( <num> | <sym> | <ws> )* ;
`);

// define input & parser context
const ctx = defContext("1 2 add 3 mul");

// parse & print AST
print(lang.rules.program)(ctx)
// program: null
//   num: 1
//   num: 2
//   sym: "add"
//   num: 3
//   sym: "mul"

// parse result
// true

ctx.children
// [
//   { id: 'num', state: null, children: null, result: 1 },
//   { id: 'num', state: null, children: null, result: 2 },
//   { id: 'sym', state: null, children: null, result: 'add' },
//   { id: 'num', state: null, children: null, result: 3 },
//   { id: 'sym', state: null, children: null, result: 'mul' }
// ]
```

## Examples

### SVG path parser example

```ts
import {
    INT, WS0,
    alt, oneOf, seq, zeroOrMore,
    collect, discard, xform,
    defContext
} from "@thi.ng/parse";

// whitespace parser
// discard() removes results from AST
const wsc = discard(zeroOrMore(oneOf(" ,")));

// svg path parser rules
// collect() collects child results in array, then removes children
// INT & WS0 are preset parsers (see section above)
const point = collect(seq([INT, wsc, INT]));
const move = collect(seq([oneOf("Mm"), WS0, point, WS0]));
const line = collect(seq([oneOf("Ll"), WS0, point, WS0]));
const curve = collect(seq([oneOf("Cc"), WS0, point, wsc, point, wsc, point, WS0]));
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
    INT, WS0,
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
const program = zeroOrMore(alt([value, op, WS0]))

// prepare parser context (incl. reader) and execute
program(defContext("10 5 3 * + -2 * 10 /"));

// print result data stack, i.e. result of:
// 3 * 5 + 10 * -2 / 10 (in infix notation)
console.log(stack);
// [-5]
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
