<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/lispy](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-lispy.svg?a9b3f1f7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/lispy.svg)](https://www.npmjs.com/package/@thi.ng/lispy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/lispy.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Core language features](#core-language-features)
  - [Constants](#constants)
  - [Predicates](#predicates)
  - [Basic math ops](#basic-math-ops)
  - [Boolean logic operators](#boolean-logic-operators)
  - [Bitwise operators](#bitwise-operators)
  - [Comparison operators](#comparison-operators)
  - [Constants & functions from JS-native `Math`](#constants--functions-from-js-native-math)
  - [Selected utilities from thi.ng/math package](#selected-utilities-from-thingmath-package)
  - [Functional programming](#functional-programming)
  - [Control flow](#control-flow)
  - [List/array/object processing](#listarrayobject-processing)
  - [String processing](#string-processing)
  - [Regexp](#regexp)
  - [Misc utilities](#misc-utilities)
- [Extensibility](#extensibility)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Lightweight, extensible, interpreted Lisp-style DSL for embedding in other projects.

> [!NOTE]
> This DSL implementation has been extracted as standalone package from
> existing work/examples bundled in the thi.ng/umbrella monorepo (i.e.
> [lispy-repl](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl))

## Core language features

The core language is intentionally kept minimal, aimed at data transformations,
configuration, user code snippets/expressions, and currently only contains the
following:

### Constants
- `T`: true
- `F`: false
- `null`: null
- `PI`
- `HALF_PI`
- `TAU`
- `INF`: ∞
- `-INF`: -∞

### Predicates

- `(zero? x)`: zero check
- `(nan? x)`: NaN check
- `(neg? x)`: < 0 check
- `(null? x)`: Null(ish) check
- `(pos? x)`: > 0 check

### Basic math ops

- `(+ x y...)`
- `(- x y...)`
- `(* x y...)`
- `(/ x y...)`
- `(inc x)`: increment (+1)
- `(dec x)`: decrement (-1)

### Boolean logic operators

- `(and x y ...)`
- `(or x y ...)`
- `(not x)`

### Bitwise operators

- `(<< x y)`
- `(>> x y)`
- `(>>> x y)`
- `(bit-and x y)`
- `(bit-or x y)`
- `(bit-xor x y)`
- `(bit-not x)`

### Comparison operators

- `(< x y)`
- `(<= x y)`
- `(> x y)`
- `(>= x y)`
- `(== x y)`
- `(!= x y)`

### Constants & functions from JS-native `Math`

All included...

### Selected utilities from thi.ng/math package

- `(clamp x min max)`: clamp value to interval
- `(deg x)`: convert radians to degrees
- `(fit x a b c d)`: fit value from interval `[a..b]` into `[c..d]`
- `(mix a b t)`: linear interpolation (same as GLSL `mix()`)
- `(rad x)`: convert degrees to radians
- `(smoothstep e1 e2 x)`: same as GLSL `smoothstep()`
- `(step edge x)`: same as GLSL `step()`

### Functional programming

- `(always ...)`: function which always returns true
- `(comp f g)`: functional composition
- `(def name val)`: define global symbol
- `(defn name (...args) body)`: define global function
- `(fnull? x fn)`: function which returns `(fn)` if x is nullish
- `(identity x)`: function which always returns its arg
- `(never ...)`: function which always returns false
- `(partial fn arg)`: partial application (currying)

### Control flow

- `(env! (sym val ...))`: modify bindings in current env
- `(if test truthy falsey?)`: conditional with optional false branch
- `(let (sym val ...) body)`: locally scoped var bindings/expression
- `(while test body...)`: loop while test is truthy
- `(-> ...)`: Clojure-style thread-first S-expression re-writing
    - `(-> a (+ b) (* c))` → `(* (+ a b) c)`
- `(->> ...)`: Clojure-style thread-last S-expression re-writing
    - `(->> a (+ b) (* c))` → `(* c (+ b a))`

### List/array/object processing

- `(get arr index)`: get array/object value at index/key
- `(set! arr index value)`: set array/object value for index/key
- `(concat x y ...)`: same as `Array.prototype.concat(...)`
- `(count x)`: number of items (also for strings)
- `(filter fn list)`: list/array filtering
- `(first x)`: first item of array
- `(map fn list)`: list/array transformation
- `(next x)`: remaining array items (after first)
- `(push arr x...)`: same as `Array.prototype.push(...)`
- `(reduce fn init list)`: list/array reduction

### String processing

- `(capitalize x)`
- `(float x)`: same as `parseFloat(x)`
- `(int x radix?)`: same as `parseInt(x, radix)`
- `(join sep arr)`: same as `Array.prototype.join(sep)`
- `(lower x)`
- `(pad-left x width fill)`
- `(pad-right x width fill)`
- `(str x...)`: coerce values to string, concat results
- `(substr x from to?)`
- `(trim x)`
- `(upper x)`

### Regexp

- `(re-match re x)`
- `(re-test re x)`
- `(regexp str flags?)`
- `(replace str regexp replacement)`

### Misc utilities

- `(env)`: JSON stringified version of current env
- `(syms)`: Array of symbol names in current env
- `(print x...)`: aka `console.log(...)`

## Extensibility

The core language can be easily customized/extended by defining new symbols (or
redefining existing ones) in the root environment `ENV` (see example below) or
passing a custom environment to
[`evalSource()`](https://docs.thi.ng/umbrella/lispy/functions/evalSource.html).

## Status

**BETA** - possibly breaking changes forthcoming

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.99 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/sexpr](https://github.com/thi-ng/umbrella/tree/develop/packages/sexpr)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

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

> [!NOTE]
> Please also see
> [/tests](https://github.com/thi-ng/umbrella/blob/develop/packages/lispy/test)
> for more small code examples..

```ts tangle:export/readme-1.ts
import { evalSource, ENV } from "@thi.ng/lispy";

// define custom root environment
const CUSTOM_ENV = {
    ...ENV,
    // re-define print fn (actually the same as default)
    print: console.log,
    // pre-define new global variable
    name: "lispy"
};

const SRC = `
(print (+ 1 2 3 4))
;; 10

;; local variables
(let (a 23 b 42) (print (+ a b)))
;; 65

;; define global var/fn
;; here, a curried version of the built-in print fn
(def greetings! (partial print "hello,"))

;; print greeting ('name' symbol provided via custom env)
(greetings! name)
;; hello, lispy!

;; basic loop w/ local var
(let (i 0)
  (while (< i 5)
    (print i)
    (env! (i (inc i)))))
;; 0
;; 1
;; 2
;; 3
;; 4

;; threading/rewriting operators
(->> name (str "hello, ") (print "result:"))
;; result: hello, lispy

;; print contents of default environment
(print (env))
`;

// execute with customized environment
evalSource(SRC, CUSTOM_ENV);

// output:
// 10
// 65
// hello, lispy
// 0
// 1
// 2
// 3
// 4
// result: hello, lispy
// {
//   "+": "<function>",
//   "*": "<function>",
//   "-": "<function>",
//   "/": "<function>",
//   "inc": "<function>",
//   "dec": "<function>",
//   "null?": "<function>",
//   "zero?": "<function>",
//   "neg?": "<function>",
//   "pos?": "<function>",
//   "nan?": "<function>",
//   "=": "<function>",
//   "!=": "<function>",
//   "<": "<function>",
//   "<=": "<function>",
//   ">=": "<function>",
//   ">": "<function>",
//   "T": true,
//   "F": false,
//   "null": null,
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
//   "get": "<function>",
//   "set!": "<function>",
//   "push": "<function>",
//   "concat": "<function>",
//   "count": "<function>",
//   "first": "<function>",
//   "next": "<function>",
//   "str": "<function>",
//   "join": "<function>",
//   "lower": "<function>",
//   "upper": "<function>",
//   "capitalize": "<function>",
//   "pad-left": "<function>",
//   "pad-right": "<function>",
//   "substr": "<function>",
//   "trim": "<function>",
//   "regexp": "<function>",
//   "re-test": "<function>",
//   "re-match": "<function>",
//   "replace": "<function>",
//   "identity": "<function>",
//   "always": "<function>",
//   "never": "<function>",
//   "int": "<function>",
//   "float": "<function>",
//   "print": "<function>",
//   "partial": "<function>",
//   "partial2": "<function>",
//   "comp": "<function>",
//   "comp2": "<function>",
//   "fnull?": "<function>",
//   "reduce": "<function>",
//   "map": "<function>",
//   "filter": "<function>",
//   "name": "lispy",
//   "greetings!": "<function>"
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
  year = 2023
}
```

## License

&copy; 2023 - 2025 Karsten Schmidt // Apache License 2.0
