<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/lispy](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-lispy.svg?a9b3f1f7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/lispy.svg)](https://www.npmjs.com/package/@thi.ng/lispy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/lispy.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 208 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Lightweight, extensible, interpreted Lisp-style DSL for embedding in other projects.

> [!NOTE] This DSL implementation has been extracted as standalone package from
> existing work/examples bundled in the thi.ng/umbrella monorepo (i.e.
> [lispy-repl](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl))

The core language is intentionally kept extremely minimal and currently only
contains the following:

- basic math ops (multi-arity)
- logic operators (multi-arity)
    - `and`
    - `or`
    - `not`
- bitwise operators
    - `<<`
    - `>>` / `>>>`
    - `bit-and`
    - `bit-or`
    - `bit-xor`
    - `bit-not`
- comparison operators
- constants & functions from JS-native `Math`
- selected utilities from [thi.ng/math](https://thi.ng/math) package
    - `HALF_PI`
    - `TAU`
    - `clamp`: clamp value to interval
    - `deg`: convert radians to degrees
    - `fit`: fit value from one interval into another
    - `mix`: linear interpolation (same as GLSL `mix()`)
    - `rad`: convert degrees to radians
    - `step`: same as GLSL `step()`
    - `smoothstep`: same as GLSL `smoothstep()`
- basic FP programming constructs
    - `comp`: functional composition
    - `def`: define global symbol
    - `defn`: define global function
    - `let`: locally scope var bindings/expression
    - `partial`: partial application (currying)
- basic list/array processing
    - `aget`: get array index
    - `aset`: set array index
    - `count`: number of items
    - `concat`: same as `Array.prototype.concat(...)`
    - `filter`: list/array filtering
    - `first`: first item of array
    - `map`: list/array transformation
    - `next`: remaining array items (after first)
    - `push`: same as `Array.prototype.push(...)`
    - `reduce`: list/array reduction
- misc utilities
    - `print`: aka `console.log(...)`
    - `env`: JSON stringified version of current root env

The core language can be easily customized/extended by defining new items in the
root environment `ENV` (see example below).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blispy%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/lispy
```

ESM import:

```ts
import * as lispy from "@thi.ng/lispy";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/lispy"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const lispy = await import("@thi.ng/lispy");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.40 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/sexpr](https://github.com/thi-ng/umbrella/tree/develop/packages/sexpr)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                        | Description                                               | Live demo                                        | Source                                                                        |
|:------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/lispy-repl.png" width="240"/> | Browser REPL for a Lispy S-expression based mini language | [Demo](https://demo.thi.ng/umbrella/lispy-repl/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/lispy/)

```ts tangle:export/readme-1.ts
import { evalExpressions, ENV } from "@thi.ng/lispy";

// define custom FFI in the root environment
// (here it's actually the same as default print fn)
ENV.print = console.log;

const SRC = `
(print (+ 1 2 3 4))
;; 10

;; local variables
(let (a 23 b 42) (print (+ a b)))
;; 65

;; define global var/fn
;; here, a curried version of the built-in print fn
(def greetings! (partial print "hello,"))

;; print greeting (name will be provided externally)
(greetings! name)
;; hello, lispy!

;; print contents of default environment
(print (env))
`;

evalExpressions(SRC, {...ENV, name: "lispy"});

// output:
// 10
// 65
// hello, lispy!
//
// {
//   "+": "<function>",
//   "*": "<function>",
//   "-": "<function>",
//   "/": "<function>",
//   "=": "<function>",
//   "!=": "<function>",
//   "<": "<function>",
//   "<=": "<function>",
//   ">=": "<function>",
//   ">": "<function>",
//   "and": "<function>",
//   "or": "<function>",
//   "not": "<function>",
//   "<<": "<function>",
//   ">>": "<function>",
//   ">>>": "<function>",
//   "bit-and": "<function>",
//   "bit-or": "<function>",
//   "bit-xor": "<function>",
//   "bit-not": "<function>",
//   "E": 2.718281828459045,
//   "LN10": 2.302585092994046,
//   "LN2": 0.6931471805599453,
//   "LOG10E": 0.4342944819032518,
//   "LOG2E": 1.4426950408889634,
//   "PI": 3.141592653589793,
//   "SQRT1_2": 0.7071067811865476,
//   "SQRT2": 1.4142135623730951,
//   "abs": "<function>",
//   "acos": "<function>",
//   "acosh": "<function>",
//   "asin": "<function>",
//   "asinh": "<function>",
//   "atan": "<function>",
//   "atan2": "<function>",
//   "atanh": "<function>",
//   "cbrt": "<function>",
//   "ceil": "<function>",
//   "clz32": "<function>",
//   "cos": "<function>",
//   "cosh": "<function>",
//   "exp": "<function>",
//   "expm1": "<function>",
//   "floor": "<function>",
//   "fround": "<function>",
//   "hypot": "<function>",
//   "imul": "<function>",
//   "log": "<function>",
//   "log10": "<function>",
//   "log1p": "<function>",
//   "log2": "<function>",
//   "max": "<function>",
//   "min": "<function>",
//   "pow": "<function>",
//   "random": "<function>",
//   "round": "<function>",
//   "sign": "<function>",
//   "sin": "<function>",
//   "sinh": "<function>",
//   "sqrt": "<function>",
//   "tan": "<function>",
//   "tanh": "<function>",
//   "trunc": "<function>",
//   "HALF_PI": 1.5707963267948966,
//   "TAU": 6.283185307179586,
//   "clamp": "<function>",
//   "deg": "<function>",
//   "fit": "<function>",
//   "mix": "<function>",
//   "rad": "<function>",
//   "step": "<function>",
//   "smoothstep": "<function>",
//   "aget": "<function>",
//   "aset": "<function>",
//   "push": "<function>",
//   "concat": "<function>",
//   "count": "<function>",
//   "first": "<function>",
//   "next": "<function>",
//   "print": "<function>",
//   "env": "<function>",
//   "partial": "<function>",
//   "partial2": "<function>",
//   "comp": "<function>",
//   "comp2": "<function>",
//   "reduce": "<function>",
//   "map": "<function>",
//   "filter": "<function>"
// }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-lispy,
  title = "@thi.ng/lispy",
  author = "Karsten Schmidt",
  note = "https://thi.ng/lispy",
  year = 2025
}
```

## License

&copy; 2025 Karsten Schmidt // Apache License 2.0
