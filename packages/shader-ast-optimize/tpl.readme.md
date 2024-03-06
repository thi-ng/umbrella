<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

### defOptimized()

The function
[`defOptimize()`](https://docs.thi.ng/umbrella/shader-ast-optimize/functions/defOptimized.html)
can be used as direct replacement for [thi.ng/shader-ast]()'s
[`defMain()`](https://docs.thi.ng/umbrella/shader-ast/functions/defMain.html) to
define automatically optimized shader `main()` functions.

### Tree optimizations

Currently, only the following operations are supported/considered:

#### Constant folding

- scalar math operators
- scalar math built-in functions
- single component vector swizzling
- literal hoisting

```ts tangle:export/readme1.ts
import {
  add, defn, float, mul, neg, ret, scope, vec2, $x, $y
} from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { constantFolding } from "@thi.ng/shader-ast-optimize";

// function def
const foo = defn("float", "foo", ["float"], (x) => [
  ret(mul(x, add(neg(float(10)), 42)))
]);

const bar = vec2(100, 200);

// program def
const prog = scope([
  foo,
  foo(add(float(1), float(2))),
  foo(add($x(bar), $y(bar)))
], true);

// GLSL codegen
const glsl = targetGLSL();

// unoptimized AST as GLSL (see section above)
console.log(glsl(prog));
// #version 300 es
// float foo(in float _s0) {
// return (_s0 * ((-10.0) + 42.0));
// }
// foo((1.0 + 2.0));
// foo((vec2(100.0, 200.0).x + vec2(100.0, 200.0).y));

// with constant folding
console.log(glsl(constantFolding(prog)))
// #version 300 es
// float foo(in float _s0) {
// return (_s0 * 32.0);
// }
// foo(3.0);
// foo(300.0);

const expr = mul(float(4), $x(vec2(2)))

console.log(glsl(expr))
// (4.0 * vec2(2.0).x)

// optimize single expression
console.log(glsl(constantFolding(expr)))
// 8.0
```

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

TODO

<!-- include ../../assets/tpl/footer.md -->
