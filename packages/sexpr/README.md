# @thi.ng/sexpr

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/sexpr.svg)](https://www.npmjs.com/package/@thi.ng/sexpr)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/sexpr.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [Tokenize only (iterator)](#tokenize-only-iterator)
    - [AST generation](#ast-generation)
    - [Interpreter](#interpreter)
    - [Custom syntax](#custom-syntax)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Basic, but configurable and extensible
[S-Expression](https://en.wikipedia.org/wiki/S-expression) tokenizer,
parser, AST builder and runtime / interpreter skeleton for custom,
sandboxed DSL implementations.

The following default syntax rules are used:

- whitespace: space, tab, newline, comma
- expression delimiters: `(`, `)`
- numbers: any float notation valid in JS, hex ints prefixed w/ `0x`
- string delimiters: `"`

Everything else parsed as is...

## Status

ALPHA

## Installation

```bash
yarn add @thi.ng/sexpr
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)

## Usage examples

```ts
import { tokenize, parse, runtime } from "@thi.ng/sexpr";
```

### Tokenize only (iterator)

```ts
[...tokenize(`(* (+ 3 5) 10)`)];
// [ '(', '*', '(', '+', '3', '5', ')', '10', ')']
```

### AST generation

```ts
parse(tokenize(`(* (+ 3 5) 10)`));
```

```json
{
  "type": "root",
  "children": [
    {
      "type": "expr",
      "value": "(",
      "children": [
        {
          "type": "sym",
          "value": "*"
        },
        {
          "type": "expr",
          "value": "(",
          "children": [
            {
              "type": "sym",
              "value": "+"
            },
            {
              "type": "number",
              "value": 3
            },
            {
              "type": "number",
              "value": 5
            }
          ]
        },
        {
          "type": "number",
          "value": 10
        }
      ]
    }
  ]
}
```

### Interpreter

```ts
import { Fn2 } from "@thi.ng/api";
import { defmulti, DEFAULT } from "@thi.ng/defmulti";
import { Node, Sym } from "@thi.ng/sexpr";

// multi-dispatch fn for DSL builtins
// we will call this function for each S-expression
// and will delegate to the actual implementation based on
// the expression's first item (a symbol name)
const builtins = defmulti<Node, Node[], any>((x) => (<Sym>x).value);

// build runtime w/ impls for all AST node types
// the two generics are the types of the custom environment (if used)
// and the result type(s)
const rt = runtime<any, any>({
    // delegate to builtins
    expr: (x, env) => builtins(x.children[0], x.children, env),
    // lookup symbol in environment
    sym: (x, env) => env[x.value],
    // strings and numbers evaluate verbatim
    str: (x) => x.value,
    num: (x) => x.value
});

// helper HOF for math ops
const op = (fn: Fn2<number, number, number>) =>
    (_: Node, vals: Node[], env: any) =>
        vals.slice(2).reduce(
            (acc, x) => fn(acc, rt(x, env)),
            rt(vals[1], env)
        );

// add builtins
builtins.addAll({
    "+": op((acc, x) => acc + x),
    "*": op((acc, x) => acc * x),
    "-": op((acc, x) => acc - x),
    "/": op((acc, x) => acc / x),
    count: (_, [__, x]) => rt(x).length
});

// add default/fallback implementation
// to allow calling functions stored in environment
builtins.add(DEFAULT, (x, [_, ...args], env) => {
    const f = env[(<Sym>x).value];
    assert(!!f, "missing impl");
    return f.apply(null, args.map((a) => rt(a, env)));
});

// evaluator
const $eval = (src: string, env: any = {}) =>
    rt(parse(tokenize(src)).children[0], env);

// evaluate expression w/ given env bindings
$eval(`(* foo (+ 1 2 3 (count "abcd")))`, { foo: 10 });
// 100
// i.e. 100 = 10 * (1 + 2 + 3 + 4)

// call env function
$eval(
    `(join (+ 1 2) (* 3 4))`,
    { join: (...xs: any[]) => xs.join(",") }
);
// "3,12"
```

See
[test/](https://github.com/thi-ng/umbrella/tree/master/packages/sexpr/test/)
for a more in-depth version of this example...

### Custom syntax

```ts
// define syntax overrides (keep default whitespace rules)
const syntax = { scopeOpen: "<{", scopeClose: "}>", string: "'" };

parse(tokenize(`<nest { a '2' b 3 }>`, syntax), syntax);
```

```json
{
  "type": "root",
  "children": [
    {
      "type": "expr",
      "value": "<",
      "children": [
        {
          "type": "sym",
          "value": "nest"
        },
        {
          "type": "expr",
          "value": "{",
          "children": [
            {
              "type": "sym",
              "value": "a"
            },
            {
              "type": "str",
              "value": "2"
            },
            {
              "type": "sym",
              "value": "b"
            },
            {
              "type": "num",
              "value": 3
            }
          ]
        }
      ]
    }
  ]
}
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2019 Karsten Schmidt // Apache Software License 2.0
