<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Due to the lack of native vector operations in JS, this compile target
is much more involved than the
[@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl)
code gen and uses a pluggable backend to perform all math ops. The
default backend delegates all ops to
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
and
[@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices),
which altogether provide ~750 optimized vector/matrix functions.

### Unsupported features

- texture lookups (see [texture tunnel
  demo](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)
  for a monkey-patched solution)
- derivatives (`dFdx`, `dFdy`, `fwidth`) - probably never supported in
  this env
- `out` / `inout` function args (see
  [#96](https://github.com/thi-ng/umbrella/issues/96) for discussion)

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

```ts
// AST node functions from main shader-ast pkg
import {
    mul,
    defn,
    float,
    ret,
    vec3
} from "@thi.ng/shader-ast";

// codegen / compiler
import { targetJS } from "@thi.ng/shader-ast-js";

const js = targetJS();

const hello = defn("vec4", "hello", ["float"], (n) => [
    ret(vec4(mul(vec3(1, 2, 3), n), -1))
]);

js(hello)

const Module = js.compile(hello);
Module.hello(10);
// [10, 20, 30, -1]
```

<!-- include ../../assets/tpl/footer.md -->
