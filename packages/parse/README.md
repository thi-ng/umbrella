<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/parse](https://media.thi.ng/umbrella/banners-20230807/thing-parse.svg?6f08b6c5)

[![npm version](https://img.shields.io/npm/v/@thi.ng/parse.svg)](https://www.npmjs.com/package/@thi.ng/parse)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/parse.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Features](#features)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Context & reader creation](#context--reader-creation)
  - [Presets parsers](#presets-parsers)
  - [Primitives](#primitives)
    - [Naming conventions / suffixes](#naming-conventions--suffixes)
  - [Anchors](#anchors)
  - [Combinators](#combinators)
  - [Transformers](#transformers)
- [Grammar definition](#grammar-definition)
  - [Terms](#terms)
  - [Repetitions](#repetitions)
  - [Discarding results](#discarding-results)
  - [Lookahead](#lookahead)
  - [Term modifier ordering](#term-modifier-ordering)
  - [Rule transforms](#rule-transforms)
- [Examples](#examples)
  - [S-expression DSL](#s-expression-dsl)
  - [SVG path parser example](#svg-path-parser-example)
  - [RPN parser & interpreter example](#rpn-parser--interpreter-example)
- [Authors](#authors)
- [License](#license)

## About

Purely functional parser combinators & AST generation for generic inputs.

There's a 2h 45m long video tutorial (live stream) introducing this package: [Building a web editor for creating/testing parse grammars](https://www.youtube.com/watch?v=mXp92s_VP40)

### Features

- Parser generation/compilation via built-in grammar DSL
- Small API surface, easy-to-grok syntax
- All parsers implemented as composable, higher-order functions
- All state centrally kept/managed by a parser context given as arg
- Support for custom readers (currently only string & array-like numeric
  inputs (incl. typed arrays) supported)
- Automatic AST generation & ability to transform/prune nodes during parsing
- Node transforms are composable too
- Each AST node (optionally) retains reader information (position, line
  num, column) - disabled by default to save memory
- Common, re-usable preset parsers & node transforms included

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bparse%5D+in%3Atitle)

## Related packages

- [@thi.ng/fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm) - Composable primitives for building declarative, transducer based Finite-State Machines & matchers for arbitrary data streams
- [@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-fsm) - Transducer-based Finite State Machine transformer

## Installation

```bash
yarn add @thi.ng/parse
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/parse"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const parse = await import("@thi.ng/parse");
```

Package sizes (brotli'd, pre-treeshake): ESM: 5.21 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                              | Description                                                                                             | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg" width="240"/>  | Markdown to Hiccup to HTML parser / transformer                                                         | [Demo](https://demo.thi.ng/umbrella/markdown/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mastodon-feed.jpg" width="240"/>    | Mastodon API feed reader with support for different media types, fullscreen media modal, HTML rewriting | [Demo](https://demo.thi.ng/umbrella/mastodon-feed/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mastodon-feed)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/> | Parser grammar livecoding editor/playground & codegen                                                   | [Demo](https://demo.thi.ng/umbrella/parse-playground/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>  | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation                | [Demo](https://demo.thi.ng/umbrella/procedural-text/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)  |

**Note:** Please also see the [dedicated wiki
page](https://github.com/thi-ng/umbrella/wiki/Parser-grammars) collecting
various grammar examples and links to their playgrounds.

## API

[Generated API docs](https://docs.thi.ng/umbrella/parse/)

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

#### Naming conventions / suffixes

The `D` suffix is used for *discarding* behavior, i.e. parsers
which do not retain their result in the AST after successful matching.
These should be preferred whenever possible, for lower memory usage and
(possibly) better performance...

The `P` suffix is used to indicate **predicate** based parsers, i.e.
using user provided functions applied to individual inputs (characters)
in order to decide about successful matching.

- `always`
- `fail`
- `lit` / `litD` / `litP`
- `noneOf` / `noneOfD` / `noneOfP`
- `oneOf` / `oneOfD` / `oneOfP`
- `pass` / `passD`
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

- `alt` / `altS` / `altD`
- `check`
- `expect`
- `lookahead`
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

- `collect` - collect child results into array
- `count` - count number of children
- `discard` - discard result
- `float` / `int` / `hexInt` - join child results and parse as number
- `hoist` / `hoistResult` - hoist first child / child result
- `join` - join child results into string
- `json` - join child results into string and parse as JSON
- `nest` - apply another parser to result
- `print` - print AST
- `replace` - replace AST node result w/ pre-configured value
- `trim` - trim node result (string only)
- `withID` - assign custom AST node ID

Actual transforms:

- `comp` - scope transform composition
- `xfCollect`
- `xfCount`
- `xfDiscard`
- `xfFloat`
- `xfHoist` / `xfHoistResult`
- `xfInt(radix)`
- `xfJoin`
- `xfNest`
- `xfPrint`
- `xfReplace`
- `xfTrim`
- `xfID`

## Grammar definition

Complex parsers can be constructed via
[`defGrammar()`](https://github.com/thi-ng/umbrella/tree/develop/packages/parse/src/grammar.ts#L320),
which accepts a string of rule definitions in the built-in (and still
WIP) grammar rule definition language, similar to PEGs and regular
expressions:

Example grammar

```text
# line comment
ws:      ' '+ => discard ;
sym:     [a-z] [a-z0-9_]* => join ;
num:     [0-9]+ => int ;
program: ( <num> | <sym> | <ws> )* ;
```

Here, each line (apart from the first) is a single parse rule
definition, with each rule consisting of a sequence of one or more:

### Terms

- `.` - matches **any** single char
- `'x'` - single char literal
- `"abc"` - multi-char string
- `[a-z0-9_@]` - regex style char set (incl. char range support, inversion via `^`)
- `<rule_id>` - rule references (order independent)
- `( term | ... | )` - choice of sub-terms

Literals, strings and char sets can include `\uXXXX` unicode escapes (if
given within a JS source string, double escaping must be used, i.e.
`\\uXXXX`).

### Repetitions

All of these terms can be immediately followed by one of these regexp
style repetition specs:

- `?` - zero or one occurrence
- `*` - zero or more
- `+` - one or more
- `{n}`, `{min,}` or `{min,max}` - fixed size, min-infinity or min-max
  repetitions

### Discarding results

All terms can be suffixed with the `!` modifier to discard their results
and help produce a cleaner result AST.

```text
link: '['! <linktitle> "]("! <linkurl> ')'! => collect ;
linktitle: [^\\u005d]+ => join ;
linkurl: [^\\u0029]+ => join ;
```

Given a valid input like `[abc](def)`, the above `link` parser's result
will just be the array `["abc", "def"]` with other terms discarded from
the AST.

**Important**: A parse rule MUST produce a result for at least one of
its successfully matched terms. Use the `discard` rule transform to
discard the entire result (instead of the `!` modifier)...

### Lookahead

All terms can be suffixed with an optional, capturing or non-capturing
lookahead group:

- `(?-...)`: non-capturing
- `(?+...)`: capturing

```text
# accept any character until end of current line
# <NL> is a built-in preset rule to match newline chars...
rest: .(?-<NL>!) ;
```

When using lookahead, both the main and look-ahead parsers are run
repeatedly for as long as the former succeeds and UNTIL the latter
passes or the end of input is reached. If the `ahead` parser never
passes, the entire term fails and any partial matches are discarded.

Depending on capture behavior, the result of the `ahead` parser is
captured or omitted and the final read position is adjusted accordingly.

Currently, iff capture is disabled, the ahead parser MUST discard its
own result (see section above). On successful match the final read
position will then be restored to the beginning of ahead pattern.

Iff capture is enabled, the ahead parser MAY discard its own result, but
the final read position will not be re-adjusted as in the non-capturing
version.

**Important:** Since the main term will be repeated automatically, DO
NOT use repetition modifiers `?` or `*`, since both of these will cause
the parser to go into an infinite loop. This is expected behavior and
not a bug.

### Term modifier ordering

The above mentioned optional term modifiers MUST always be given in this
order:

- Repetitions (`?*+` etc.)
- Discard flag (`!`)
- Lookahead (`(?-...)` / `(?+...)`)

```text
[a-z]+!         # valid
[a-z]{4}!       # valid
[a-z]!          # valid
[a-z]!(?+[0-9]) # valid
[a-z]!+         # invalid
[a-z]!{4}       # invalid
[a-z](?+'X')!   # invalid
```

### Rule transforms

Furthermore, each rule can specify an optional rule transform function, result
string or even another parser rule, which will only be applied after the rule's
parser has successfully completed. The transform is given at the end of a rule,
separated by `=>`.

If another parser rule is specified (via `<ruleid>`), it will be applied to
result of the main rule in a separate parse context and its own results will be
transplanted back into the main AST.

If a result string is given (e.g. `"foo"`), it will be used as the rule's result
instead and the node's children will be removed.

Custom transforms functions can be supplied via an additional arg to
`defGrammar()`. The following default transforms are available by default (can
be overwritten) and correspond to the [above mentioned
transforms](#transformers):

- `binary` - parse as binary number
- `collect` - collect sub terms into array
- `discard` - discard result
- `float` - join & parse as floating point number
- `hex` - join & parse as hex integer
- `hoist` - replace AST node with its 1st child
- `hoistR` - use result of 1st child term only
- `int` - join & parse as integer
- `join` - join sub terms into single string
- `json` - join & parse as JSON
- `print` - print out node's subtree (AST)
- `trim` - trim result

For convenience, the following built-in parser presets are available as
rule references in the grammar definition as well:

- `ALPHA`
- `ALPHA_NUM`
- `BIT`
- `DIGIT`
- `DNL` - discarded newline
- `END` - input end
- `ESC` - escape sequences
- `FLOAT`
- `HEX_DIGIT`
- `INT`
- `LEND` - line end
- `LSTART` - line start
- `NL` - newline chars
- `START` - input start
- `STRING`
- `UNICODE`
- `WB` - word boundary
- `WS`
- `WS0`
- `WS1`

## Examples

### S-expression DSL

(Also see
[@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
as a useful tool for processing/interpreting/compiling the result AST)

```ts tangle:export/readme-sexpr.ts
import { defContext, defGrammar, print } from "@thi.ng/parse";

// define language via grammar DSL
// the upper-cased rule names are built-ins
const lang = defGrammar(`
list: '('! <expr> ')'! ;
sym: ( <ALPHA_NUM> | [?!$+\\u002d*/.~#^=<>] )+ => join ;
expr: ( <FLOAT> | <STRING> | <sym> | <list> | <WS1> )* ;
`);

// define input & parser context
const ctx = defContext(`
(def hello (x) (str "hello, " x))

(print (hello 42))
`);

// parse & print AST
print(lang!.rules.expr)(ctx);
// expr: null
//   list: null
//     expr: null
//       sym: "def"
//       sym: "hello"
//       list: null
//         expr: null
//           sym: "x"
//       list: null
//         expr: null
//           sym: "str"
//           string: "hello, "
//           sym: "x"
//   list: null
//     expr: null
//       sym: "print"
//       list: null
//         expr: null
//           sym: "hello"
//           real: 42

// parse result
// true

// the two top-level s-expressions...
console.log(ctx.children);
// [
//   { id: 'list', state: null, children: [ [Object] ], result: null },
//   { id: 'list', state: null, children: [ [Object] ], result: null }
// ]
```

### SVG path parser example

```ts tangle:export/readme-svg.ts
import {
    INT, WS0,
    alt, collect, defContext, discard,
    oneOf, seq, xform, zeroOrMore
} from "@thi.ng/parse";

// whitespace parser
// discard() removes matched result from AST
const wsc = discard(zeroOrMore(oneOf(" ,")));

// SVG path parser rules
// collect() collects child results in array, then removes children
// INT & WS0 are preset parsers (see readme section above)
const point = collect(seq([INT, wsc, INT]));
const move = collect(seq([oneOf("Mm"), WS0, point, WS0]));
const line = collect(seq([oneOf("Ll"), WS0, point, WS0]));
const curve = collect(
    seq([oneOf("Cc"), WS0, point, wsc, point, wsc, point, WS0])
);
// xform used here to wrap result in array
// (to produce same result format as parsers above)
const close = xform(
    oneOf("Zz"),
    (scope) => ((scope!.result = [scope!.result]), scope)
);

// main path parser
const path = collect(zeroOrMore(alt([move, line, curve, close])));

// prepare parse context & reader
const ctx = defContext("M0,1L2 3c4,5-6,7 8 9z");
// parse input into AST
console.log(path(ctx));
// true

// transformed result of AST root node
console.log(ctx.result);
// [
//   [ 'M', [ 0, 1 ] ],
//   [ 'L', [ 2, 3 ] ],
//   [ 'c', [ 4, 5 ], [ -6, 7 ], [ 8, 9 ] ],
//   [ 'z' ]
// ]
```

### RPN parser & interpreter example

```ts tangle:export/readme-rpn.ts
import type { Fn, FnN2 } from "@thi.ng/api";
import {
    INT, WS0,
    alt, altS, defContext, xform, zeroOrMore
} from "@thi.ng/parse";

type StackFn = Fn<number[], void>;
type Op = { arity: number; fn: StackFn };

// wrapper for pure 2-arity stack functions/ops
const defOp2 =
    (fn: FnN2): StackFn =>
    (stack) => {
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(fn(a, b));
    };

// operator/word implementations
const ops: Record<string, Op> = {
    "+": { arity: 2, fn: defOp2((a, b) => a + b) },
    "-": { arity: 2, fn: defOp2((a, b) => a - b) },
    "*": { arity: 2, fn: defOp2((a, b) => a * b) },
    "/": { arity: 2, fn: defOp2((a, b) => a / b) },
    // prints top stack item to console
    print: { arity: 1, fn: (stack) => console.log(stack.pop()) },
    // duplicates top stack item
    dup: { arity: 1, fn: (stack) => stack.push(stack[stack.length - 1]) },
    // swaps two topmost stack items
    swap: {
        arity: 2,
        fn: (stack) => {
            const a = stack.pop()!;
            const b = stack.pop()!;
            stack.push(a, b);
        },
    },
};

// simple RPN parser & interpreter runtime
const interpret = (src: string, debug = true) => {
    // data stack for execution
    const stack: number[] = [];

    // signed integer parser (using INT preset) with transform fn.
    // the user fn here is only used for pushing values on data stack
    // also, if a transform returns null, the parse scope will
    // be removed from the result AST
    const value = xform(INT, (scope) => {
        stack.push(scope!.result);
        return null;
    });

    // parser (with transform) for any of the registered operators
    // the transform here applies the op in RPN fashion to the data stack
    // stack underflow handling omitted for brevity
    const op = xform(altS(Object.keys(ops)), (scope) => {
        const id = scope!.result;
        const { arity, fn } = ops[id];
        if (debug) console.log(id, stack);
        if (stack.length < arity) {
            throw new Error(
                "stack underflow " +
                `("${id}" needs ${arity} args, got ${JSON.stringify(stack)})`
            );
        }
        fn(stack);
        return null;
    });

    // parser for complete RPN program, combines above two parsers
    // and the whitespace preset as alternatives
    const program = zeroOrMore(alt([value, op, WS0]));
    // apply parser to source code
    program(defContext(src));
    // return result stack
    return stack;
};

// checking operator arity
try { interpret("1 +"); } catch (e) { console.warn(e); }
// Error: stack underflow ("+" needs 2 args, got [1])

// execute: (3 * 5 + 10) * -2 / 10 (in infix notation)
interpret("10 5 3 * + -2 * 10 / print");
// * [ 10, 5, 3 ]
// + [ 10, 15 ]
// * [ 25, -2 ]
// / [ -50, 10 ]
// print [ -5 ]
// -5

// execute: ((5 + 3)**2) / 2) - (5 + 3)**2
interpret("5 3 + dup * dup 2 / swap - print");
// + [ 5, 3 ]
// dup [ 8 ]
// * [ 8, 8 ]
// dup [ 64 ]
// / [ 64, 64, 2 ]
// swap [ 64, 32 ]
// - [ 32, 64 ]
// print [ -32 ]
// -32
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-parse,
  title = "@thi.ng/parse",
  author = "Karsten Schmidt",
  note = "https://thi.ng/parse",
  year = 2020
}
```

## License

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
