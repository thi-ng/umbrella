<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
