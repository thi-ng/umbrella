<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

> [!NOTE]
> This DSL implementation has been extracted as standalone package from
> existing work/examples bundled in the thi.ng/umbrella monorepo (i.e.
> [lispy-repl](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl))

## Core language features

The core language is intentionally kept minimal, aimed at data transformations,
and currently only contains the following:

### Constants
- `T`: true
- `F`: false
- `null`: null
- `PI`
- `HALF_PI`
- `TAU`

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
- `(while test body... (recur (...))?)`: loop while test is truthy
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

The core language can be easily customized/extended by defining new items in the
root environment `ENV` (see example below) or passing a custom environment to
[`evalSource()`](https://docs.thi.ng/umbrella/lispyfunctions/evalSource.html).

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
import { evalSource, ENV } from "@thi.ng/lispy";

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
evalSource(SRC, {...ENV, name: "lispy"});

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

<!-- include ../../assets/tpl/footer.md -->
